import Link from "next/link";
import { Brain, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-secondary/40 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Brain className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-base font-semibold tracking-tight">
                {siteConfig.name}
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              A free online IQ style quiz for practicing logical reasoning,
              pattern recognition, problem solving and cognitive skills. Built
              for learning and entertainment, not clinical assessment.
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {siteConfig.contactEmail}
            </a>
          </div>

          <div className="space-y-3 md:justify-self-center">
            <h2 className="text-sm font-semibold text-foreground">Pages</h2>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2 text-sm">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="space-y-3 md:justify-self-end">
            <h2 className="text-sm font-semibold text-foreground">
              About the Quiz
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>25 mixed reasoning questions</li>
              <li>Instant feedback after each answer</li>
              <li>Estimated IQ score and skill band</li>
              <li>Full answer review at the end</li>
              <li>No sign up, runs in your browser</li>
              <li>Practice and entertainment only</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="max-w-md sm:text-right">
            Not affiliated with Albert Einstein or his estate. The name is
            inspired by the idea of intelligence and reasoning.
          </p>
        </div>
      </div>
    </footer>
  );
}
