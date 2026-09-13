import { Brain, ListChecks, Clock, ShieldCheck } from "lucide-react";

/**
 * Hero visual: a glassmorphism card containing a stylized brain SVG
 * with animated neural network connections, plus floating score chips
 * and a compact stats row at the bottom.
 *
 * The card uses backdrop-filter blur for the glass effect, an ambient
 * glow ring behind it, and contains:
 *   - A pulsing brain illustration (CSS animation)
 *   - Animated neural connection lines (SVG stroke-dasharray)
 *   - Two floating score chips ("128 IQ" and "Top 8%")
 *   - A 3-item stats row (Questions, Average time, Free)
 *
 * Animations gracefully degrade via prefers-reduced-motion CSS query.
 */

const stats = [
  { icon: ListChecks, value: "22", label: "Questions" },
  { icon: Clock, value: "~10 min", label: "Average" },
  { icon: ShieldCheck, value: "Free", label: "No sign up" },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md sm:max-w-lg">
      {/* Ambient glow ring behind the glass card */}
      <div className="hero-glass-glow absolute inset-0 rounded-3xl" aria-hidden="true" />

      {/* Floating score chip - top left */}
      <div
        className="hero-chip-float absolute -left-4 -top-4 z-20 hidden rounded-2xl border border-primary/30 bg-background/90 px-3 py-2 shadow-lg backdrop-blur sm:block"
        aria-hidden="true"
      >
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Result preview
        </p>
        <p className="text-lg font-bold leading-tight text-primary">
          128 <span className="text-xs font-medium text-muted-foreground">IQ</span>
        </p>
      </div>

      {/* Floating score chip - bottom right */}
      <div
        className="hero-chip-float-delay absolute -bottom-4 -right-4 z-20 hidden rounded-2xl border border-amber-500/30 bg-background/90 px-3 py-2 shadow-lg backdrop-blur sm:block"
        aria-hidden="true"
      >
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Skill band
        </p>
        <p className="text-sm font-bold leading-tight text-amber-600">
          Very strong
        </p>
      </div>

      {/* Glass card */}
      <div className="hero-glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
        {/* Brain + neural network SVG */}
        <div className="relative mx-auto aspect-square w-full max-w-[280px]">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hero-brain-pulse h-full w-full"
            role="img"
            aria-label="Stylized brain illustration with neural network connections"
          >
            <defs>
              <linearGradient id="heroBrainGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0F766E" />
                <stop offset="100%" stopColor="#0A4A45" />
              </linearGradient>
              <radialGradient id="heroSparkGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="100%" stopColor="#F59E0B" />
              </radialGradient>
              <radialGradient id="heroHaloGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0F766E" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#0F766E" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#0F766E" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Halo behind brain */}
            <circle cx="100" cy="100" r="95" fill="url(#heroHaloGrad)" />

            {/* Outer ring with tick marks (like a gauge) */}
            <circle
              cx="100"
              cy="100"
              r="85"
              stroke="#0F766E"
              strokeOpacity="0.18"
              strokeWidth="1"
              fill="none"
            />
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i * 10 * Math.PI) / 180;
              const x1 = 100 + Math.cos(angle) * 82;
              const y1 = 100 + Math.sin(angle) * 82;
              const x2 = 100 + Math.cos(angle) * (i % 3 === 0 ? 76 : 79);
              const y2 = 100 + Math.sin(angle) * (i % 3 === 0 ? 76 : 79);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#0F766E"
                  strokeOpacity={i % 3 === 0 ? 0.4 : 0.18}
                  strokeWidth={i % 3 === 0 ? 1.4 : 0.8}
                />
              );
            })}

            {/* Neural connection lines (animated dashes) */}
            <g stroke="url(#heroBrainGrad)" strokeWidth="1.5" fill="none">
              <path className="hero-neural-line" d="M 50 80 Q 75 65 100 90" />
              <path className="hero-neural-line" d="M 100 90 Q 125 65 150 80" />
              <path className="hero-neural-line" d="M 50 120 Q 75 105 100 120" />
              <path className="hero-neural-line" d="M 100 120 Q 125 105 150 120" />
              <path className="hero-neural-line" d="M 100 90 L 100 120" />
              <path className="hero-neural-line" d="M 50 80 L 50 120" />
              <path className="hero-neural-line" d="M 150 80 L 150 120" />
            </g>

            {/* Neural nodes */}
            <g fill="#0F766E">
              <circle cx="50" cy="80" r="4" />
              <circle cx="100" cy="90" r="5" />
              <circle cx="150" cy="80" r="4" />
              <circle cx="50" cy="120" r="4" />
              <circle cx="100" cy="120" r="5" />
              <circle cx="150" cy="120" r="4" />
            </g>

            {/* Pulsing core dot */}
            <circle cx="100" cy="105" r="3.5" fill="url(#heroSparkGrad)" />

            {/* Brain silhouette (simplified) centered */}
            <path
              d="
                M 100 30
                C 76 30 58 46 56 68
                C 44 72 38 84 42 96
                C 34 102 34 116 44 122
                C 44 138 60 152 80 152
                L 80 158
                C 80 162 84 166 88 166
                L 112 166
                C 116 166 120 162 120 158
                L 120 152
                C 140 152 156 138 156 122
                C 166 116 166 102 158 96
                C 162 84 156 72 144 68
                C 142 46 124 30 100 30
                Z
              "
              fill="url(#heroBrainGrad)"
              fillOpacity="0.92"
              stroke="#FFFFFF"
              strokeOpacity="0.15"
              strokeWidth="0.5"
            />

            {/* Center division line on brain */}
            <path
              d="M 100 32 L 100 150"
              stroke="#FFFFFF"
              strokeOpacity="0.25"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Brain fold hints */}
            <path
              d="
                M 70 50 Q 80 42 90 50
                M 110 50 Q 120 42 130 50
                M 60 80 Q 72 70 84 82
                M 116 82 Q 128 70 140 80
              "
              stroke="#FFFFFF"
              strokeOpacity="0.22"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />

            {/* Amber spark top right (Einstein 'aha' moment) */}
            <path
              d="
                M 160 22
                L 164 32
                L 174 36
                L 164 40
                L 160 50
                L 156 40
                L 146 36
                L 156 32
                Z
              "
              fill="url(#heroSparkGrad)"
            />
          </svg>
        </div>

        {/* Stats row at bottom of card */}
        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border/60 pt-5">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon
                className="mx-auto h-4 w-4 text-primary"
                aria-hidden="true"
              />
              <p className="mt-1 text-base font-bold tracking-tight text-foreground">
                {stat.value}
              </p>
              <p className="text-[11px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle brain badge overlay (top right of card, hidden on small screens) */}
      <div
        className="absolute right-3 top-3 z-20 hidden rounded-full border border-primary/30 bg-background/90 p-2 backdrop-blur sm:block"
        aria-hidden="true"
      >
        <Brain className="h-4 w-4 text-primary" />
      </div>
    </div>
  );
}
