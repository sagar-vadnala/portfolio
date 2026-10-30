"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { track, ANALYTICS_EVENTS } from "@/lib/analytics";
import { EngagementProvider } from "@/lib/engagement-context";
import { EngagementPrompt, type EngagementContact } from "@/components/contact/EngagementPrompt";

function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    track(ANALYTICS_EVENTS.PAGE_VIEW);
  }, [pathname]);

  return null;
}

export function AppProviders({ children, contact }: { children: React.ReactNode; contact: EngagementContact }) {
  return (
    // Honor the OS "reduce motion" setting for every Framer Motion animation on the site.
    <MotionConfig reducedMotion="user">
      <EngagementProvider>
        <PageViewTracker />
        {children}
        <EngagementPrompt {...contact} />
      </EngagementProvider>
    </MotionConfig>
  );
}
