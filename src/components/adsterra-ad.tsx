"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Adsterra banner ad component.
 *
 * Each ad is rendered inside its own iframe that loads a static HTML
 * file from /public/ads/. The static file contains the Adsterra
 * atOptions script and the invoke.js loader. Using a real URL for the
 * iframe src (instead of srcDoc or document.write) means:
 *
 *   1. The ad network sees a proper referrer / window.location inside
 *      the iframe, which it needs for its publisher verification and
 *      for serving ads.
 *   2. Scripts inside the iframe execute on a normal document load
 *      timeline (no srcDoc quirks).
 *   3. Each iframe has its own window.atOptions global, so multiple
 *      ad units on the same page do not clash.
 *
 * If the ad still does not display, the most likely cause is that the
 * publisher has not yet approved the domain in the Adsterra dashboard,
 * or the ad network has no fill for the visitor's region / device.
 *
 * Two banner sizes are supported:
 *   - 300x250 medium rectangle (works on mobile and desktop)
 *   - 728x90 leaderboard (desktop only, hidden on small screens)
 */

type AdSize = "300x250" | "728x90";

const AD_UNITS: Record<AdSize, { src: string; width: number; height: number }> =
  {
    "300x250": {
      src: "/ads/300x250.html",
      width: 300,
      height: 250,
    },
    "728x90": {
      src: "/ads/728x90.html",
      width: 728,
      height: 90,
    },
  };

export function AdsterraAd({
  size,
  className,
  label = true,
}: {
  size: AdSize;
  className?: string;
  label?: boolean;
}) {
  const unit = AD_UNITS[size];

  return (
    <aside
      className={cn(
        "mx-auto flex flex-col items-center gap-1",
        className
      )}
      aria-label="Advertisement"
      role="complementary"
    >
      {label && (
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
          Advertisement
        </span>
      )}
      <iframe
        src={unit.src}
        title={`Advertisement ${unit.width}x${unit.height}`}
        width={unit.width}
        height={unit.height}
        scrolling="no"
        frameBorder={0}
        className="block border-0 bg-transparent"
        style={{ maxWidth: "100%" }}
      />
    </aside>
  );
}

/**
 * Convenience wrapper for the 728x90 leaderboard. Hidden on small screens
 * because 728 pixels wide does not fit in a mobile viewport.
 */
export function LeaderboardAd({ className }: { className?: string }) {
  return (
    <div className={cn("hidden md:block", className)}>
      <AdsterraAd size="728x90" />
    </div>
  );
}

/**
 * Convenience wrapper for the 300x250 medium rectangle. Visible on all
 * screen sizes because 300 pixels wide fits comfortably on mobile.
 */
export function RectangleAd({ className }: { className?: string }) {
  return <AdsterraAd size="300x250" className={className} />;
}
