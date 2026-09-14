import Image from "next/image";
import { PenLine } from "lucide-react";
import { authorProfile, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Author card showing Jacob Moses, the Content Specialist who writes
 * and reviews the site's educational content. Used as an E-E-A-T
 * (Experience, Expertise, Authoritativeness, Trustworthiness) signal
 * for Google's quality raters and search algorithms.
 *
 * Design: clean horizontal card with a round initials avatar, the
 * author name, role badge, and a short bio. Compact, professional,
 * and consistent with the site's emerald + amber brand palette.
 *
 * The card is intentionally not flashy. The goal is to clearly
 * attribute the content to a real person (Jacob Moses) without
 * overstating credentials. Jacob is presented only as a Content
 * Specialist, not as a licensed psychologist or researcher.
 *
 * Variants:
 *   - "default": horizontal layout with avatar on the left, used on
 *     the home page after the FAQ and on the About page.
 *   - "compact": smaller version for tighter spaces.
 */
export function AuthorCard({
  variant = "default",
  className,
}: {
  variant?: "default" | "compact";
  className?: string;
}) {
  const isCompact = variant === "compact";

  return (
    <aside
      className={cn(
        "mx-auto max-w-3xl rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6",
        className
      )}
      aria-label={`About the author: ${authorProfile.name}, ${authorProfile.role}`}
      role="complementary"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Avatar */}
        <div className="flex shrink-0 justify-center sm:justify-start">
          <Image
            src={authorProfile.avatar}
            alt={`${authorProfile.name} avatar`}
            width={isCompact ? 56 : 72}
            height={isCompact ? 56 : 72}
            className="rounded-full border border-border"
            priority={false}
          />
        </div>

        {/* Text content */}
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:items-center sm:gap-2">
            <div className="flex items-center gap-1.5">
              <PenLine
                className="h-3.5 w-3.5 text-primary"
                aria-hidden="true"
              />
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Written by
              </span>
            </div>
            <h3 className="text-base font-semibold text-foreground sm:text-lg">
              {authorProfile.name}
            </h3>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {authorProfile.role}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {isCompact ? authorProfile.shortBio : authorProfile.bio}
          </p>
          <p className="text-xs text-muted-foreground/80">
            Content reviewed and maintained by the {siteConfig.name} editorial team.
          </p>
        </div>
      </div>
    </aside>
  );
}
