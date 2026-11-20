import { connection } from "next/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppProviders } from "@/components/analytics/AppProviders";
import { getProfile, getPublicCodingProfiles } from "@/lib/content-queries";
import { isDatabaseConfigured } from "@/lib/prisma";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  // Database mode: render per request so an admin publish shows up immediately, no
  // rebuild/redeploy needed. Static mode (content/*.ts) prerenders, which also lets the
  // site build as a static export for GitHub Pages.
  if (isDatabaseConfigured) await connection();
  const [profile, codingProfiles] = await Promise.all([getProfile(), getPublicCodingProfiles()]);
  const name = profile?.name ?? "Portfolio";

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: profile?.headline,
    description: profile?.summary,
    address: profile?.location ? { "@type": "PostalAddress", addressLocality: profile.location } : undefined,
    sameAs: codingProfiles.map((l) => l.url),
  };

  return (
    <AppProviders contact={{ formEnabled: isDatabaseConfigured, email: profile?.email ?? "" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Navbar name={name} />
      <main className="flex-1">{children}</main>
      <Footer name={name} email={profile?.email ?? ""} codingProfiles={codingProfiles} />
    </AppProviders>
  );
}
