import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { getProfile } from "@/lib/content-queries";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const viewport: Viewport = {
  themeColor: "#07090e",
};

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const name = profile?.name ?? "Portfolio";
  const headline = profile?.headline ?? "";
  const summary = profile?.summary ?? "";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${name} — ${headline}`,
      template: `%s — ${name}`,
    },
    description: summary,
    keywords: [
      "Sagar Vadnala",
      "Software Engineer",
      "Full-Stack Developer",
      "React",
      "Next.js",
      "TypeScript",
      "Flutter",
      "Socket.io",
      "SMART on FHIR",
    ],
    authors: [{ name }],
    openGraph: {
      type: "website",
      url: siteUrl,
      title: `${name} — ${headline}`,
      description: summary,
      siteName: name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — ${headline}`,
      description: summary,
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
