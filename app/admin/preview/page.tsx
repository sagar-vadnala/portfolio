import Link from "next/link";
import { X } from "lucide-react";
import { EngagementProvider } from "@/lib/engagement-context";
import { HomeSections } from "@/components/sections/HomeSections";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getHomeData, getPublicCodingProfiles } from "@/lib/content-queries";

export const dynamic = "force-dynamic";

// Renders the exact public design with DRAFT content included, so unpublished
// edits never reach real visitors but are still previewable before publishing.
export default async function AdminPreviewPage() {
  const [data, codingProfiles] = await Promise.all([getHomeData(true), getPublicCodingProfiles(true)]);
  const name = data.profile?.name ?? "";

  return (
    <EngagementProvider>
      {/* Floats at the bottom so it never collides with the fixed top navbar. */}
      <div className="fixed bottom-4 left-1/2 z-100 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full bg-achievement px-4 py-2 text-sm font-medium text-[#04121f] shadow-2xl">
        Preview mode — drafts included, never shown to visitors
        <Link href="/admin" className="inline-flex items-center gap-1 underline">
          <X size={14} />
          Exit preview
        </Link>
      </div>

      <Navbar name={name} />
      <main className="flex-1">
        <HomeSections data={data} />
      </main>
      <Footer name={name} email={data.profile?.email ?? ""} codingProfiles={codingProfiles} />
    </EngagementProvider>
  );
}
