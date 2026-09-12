"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Adsterra banner ad component.
 *
 * Each ad is rendered inside its own iframe (via srcDoc) so that the
 * `window.atOptions` global does not clash between multiple ad units on
 * the same page. Each iframe contains its own copy of the Adsterra
 * `invoke.js` script, which is the standard way to place multiple
 * banner ads from the same network on a single page.
 *
 * The two banner sizes used here come from the publisher dashboard and
 * correspond to the keys the publisher has registered.
 */

type AdSize = "300x250" | "728x90";

const AD_UNITS: Record<AdSize, { key: string; width: number; height: number }> =
  {
    "300x250": {
      key: "a85d8435f556fb74529f20a6d54f008d",
      width: 300,
      height: 250,
    },
    "728x90": {
      key: "45f97849eeff91fbd0c8466cdbcb38c3",
      width: 728,
      height: 90,
    },
  };

function buildAdHtml(size: AdSize): string {
  const unit = AD_UNITS[size];
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  html, body { margin: 0; padding: 0; background: transparent; overflow: hidden; }
  body { display: flex; align-items: center; justify-content: center; width: ${unit.width}px; height: ${unit.height}px; }
</style>
</head>
<body>
<script type="text/javascript">
  atOptions = {
    'key' : '${unit.key}',
    'format' : 'iframe',
    'height' : ${unit.height},
    'width' : ${unit.width},
    'params' : {}
  };
</script>
<script type="text/javascript" src="https://www.highrevenueformat.com/${unit.key}/invoke.js"></script>
</body>
</html>`;
}

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
  const srcDoc = React.useMemo(() => buildAdHtml(size), [size]);

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
        title={`Advertisement ${unit.width}x${unit.height}`}
        srcDoc={srcDoc}
        width={unit.width}
        height={unit.height}
        scrolling="no"
        frameBorder={0}
        className="block border-0 bg-transparent"
        style={{ maxWidth: "100%" }}
        loading="lazy"
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
