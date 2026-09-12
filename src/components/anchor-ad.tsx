"use client";

import * as React from "react";
import { X } from "lucide-react";
import { AdsterraAd } from "@/components/adsterra-ad";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

/**
 * Sticky bottom anchor ad.
 *
 * Renders a 728x90 leaderboard fixed to the bottom of the viewport on
 * desktop, and a 300x250 rectangle on mobile. Only one ad is rendered
 * at a time based on the viewport width, so the ad network does not
 * count hidden impressions.
 *
 * The user can dismiss the anchor for the current page view. When
 * dismissed, it stays dismissed for the rest of the session so it does
 * not annoy returning visitors.
 */
export function AnchorAd() {
  const isMobile = useIsMobile();
  const [dismissed, setDismissed] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    try {
      const stored = window.sessionStorage.getItem("adsterra-anchor-dismissed");
      if (stored === "1") setDismissed(true);
    } catch {
      // sessionStorage may be unavailable (e.g., privacy mode); ignore.
    }
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem("adsterra-anchor-dismissed", "1");
    } catch {
      // Ignore storage failures.
    }
  };

  if (dismissed || !mounted) return null;

  // Only render the appropriate size for the current viewport. This
  // prevents hidden impressions (loading an ad that is not visible).
  const size = isMobile ? "300x250" : "728x90";

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex flex-col items-center gap-1 border-t border-border bg-background/95 px-2 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/85"
      )}
      role="complementary"
      aria-label="Sponsored content"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Close ad"
        className="absolute right-2 top-1 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
        Advertisement
      </span>
      <AdsterraAd size={size} label={false} />
    </div>
  );
}
