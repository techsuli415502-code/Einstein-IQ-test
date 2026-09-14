import Link from "next/link";
import type { Metadata } from "next";
import { Brain, ShieldCheck, Target, RefreshCw, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RectangleAd } from "@/components/adsterra-ad";
import { AuthorCard } from "@/components/author-card";
import { siteConfig, authorProfile } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Einstein IQ Test, why we built a free online IQ quiz, what reasoning skills it covers, and how it differs from a clinical IQ assessment.",
  alternates: {
    canonical: "/about",
  },
  keywords: [
    "About Einstein IQ Test",
    "online IQ test",
    "reasoning practice",
    "cognitive skills quiz",
    "free IQ quiz",
  ],
  openGraph: {
    title: "About Einstein IQ Test",
    description:
      "Why we built a free online IQ quiz and what reasoning skills it covers.",
    url: `${siteConfig.url}/about`,
    type: "article",
  },
};

const values = [
  {
    icon: Target,
    title: "Reasoning practice",
    body: "We focus on questions that build real reasoning skills: pattern recognition, logical deduction, number sequences and analytical thinking.",
  },
  {
    icon: ShieldCheck,
    title: "Clear and useful content",
    body: "Every page is written to be useful first. No hype, no inflated claims, no exaggerated score promises. Just clear explanations of how the quiz works.",
  },
  {
    icon: RefreshCw,
    title: "Free and open",
    body: "The quiz is free, runs in your browser, and does not require an account. You can take it as many times as you like.",
  },
  {
    icon: Heart,
    title: "Transparency",
    body: "We are upfront that this is an online IQ style quiz for practice and entertainment. It is not a clinical or professional assessment.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-hero-gradient">
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-xs font-medium text-primary">
            <Brain className="h-3.5 w-3.5" aria-hidden="true" />
            About the project
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            About Einstein IQ Test
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {siteConfig.name} is a free online IQ style quiz built for people
            who want to practice reasoning in a clean, fast and honest
            format. The site brings together 45 questions across three
            categories (Math, Science, and History), with 15 questions in
            each. You get instant feedback after every answer, a per-section
            score, and a complete answer review at the end.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              What Einstein IQ Test is
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {siteConfig.name} is a small, focused web project. It offers a
              single self contained IQ style quiz that runs fully in your
              browser. You can think of it as a quick reasoning workout. The
              quiz covers a balanced mix of cognitive skills, including
              verbal reasoning, mathematical reasoning, shape and pattern
              logic, and odd one out puzzles. Each question has one correct
              answer and a short explanation that appears in the review
              section at the end.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              The website was created to give curious learners a quick and
              friendly way to test their reasoning without sign ups, ads
              cluttering the experience, or exaggerated score promises. The
              quiz takes around ten minutes for most people and can be taken
              as many times as you want. There is no account, no email, and
              no personal data stored on a server.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Why the website was created
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              We noticed that many online IQ quizzes either feel cluttered,
              demand an email before showing a score, or push inflated claims
              about what the result means. We wanted to build something
              different: a simple, fast, transparent quiz that focuses on the
              reasoning skills people actually want to practice. The aim is to
              give you a useful snapshot of how you handle different types of
              cognitive tasks, not to hand out a number that pretends to be a
              formal intelligence measurement.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              The name is inspired by the popular idea of intelligence,
              reasoning and problem solving associated with Albert Einstein.
              We are not affiliated with Albert Einstein, his estate, or any
              organization that administers clinical intelligence tests. The
              name simply reflects the spirit of curiosity and analytical
              thinking that we want to encourage.
            </p>
          </div>
        </div>
      </section>

      {/* In-content ad. */}
      <div className="py-6">
        <RectangleAd />
      </div>

      <section className="border-t border-border/60 bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            What you can do on this website
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            The site is intentionally small. Four pages, one quiz, a clear
            focus. Here is what you can do during a visit.
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            <li className="rounded-2xl border border-border bg-card p-5 shadow-sm card-hover">
              <h3 className="text-lg font-semibold text-foreground">
                Take the IQ quiz
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Answer 45 questions across Math, Science, and History, see your
                per-section score, and review every answer with a short
                explanation.
              </p>
            </li>
            <li className="rounded-2xl border border-border bg-card p-5 shadow-sm card-hover">
              <h3 className="text-lg font-semibold text-foreground">
                Practice cognitive skills
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Each question category targets a specific skill such as
                pattern recognition, number reasoning or analytical thinking.
              </p>
            </li>
            <li className="rounded-2xl border border-border bg-card p-5 shadow-sm card-hover">
              <h3 className="text-lg font-semibold text-foreground">
                Learn about IQ tests
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Read clear, useful content about how an IQ test works, what it
                measures, and how to get the best result.
              </p>
            </li>
            <li className="rounded-2xl border border-border bg-card p-5 shadow-sm card-hover">
              <h3 className="text-lg font-semibold text-foreground">
                Contact us
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Share feedback or questions through the contact page. We read
                every message and use it to improve the quiz and content.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Our commitments
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm card-hover"
              >
                <value.icon
                  className="h-6 w-6 text-primary"
                  aria-hidden="true"
                />
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* In-content ad. */}
      <div className="py-6">
        <RectangleAd />
      </div>

      {/* About the Author section - E-E-A-T signal */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              <Brain className="h-3.5 w-3.5" aria-hidden="true" />
              Meet the author
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
              Who Writes the Content
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              Every quiz question, educational section, and help article on{" "}
              {siteConfig.name} is written and reviewed by a real person who
              focuses on clarity, accuracy, and a helpful reader experience.
              We do not use auto-generated content for our educational
              material.
            </p>
          </div>
          <AuthorCard />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {authorProfile.name} works as a {authorProfile.role} on the
            Einstein IQ Test project. He researches each topic carefully,
            checks facts against reliable general knowledge sources, and
            rewrites explanations until they are easy to follow. If you spot
            an error or have a suggestion for a question, please reach out
            through the Contact Us page.
          </p>
        </div>
      </section>

      <section className="border-t border-border/60 bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Online quiz versus professional IQ assessment
          </h2>
          <div className="mt-8 space-y-5">
            <p className="leading-relaxed text-muted-foreground">
              It is important to understand the difference between an online
              IQ quiz like this one and a professional IQ assessment. A
              clinical IQ test is usually administered by a licensed
              psychologist using standardized tools, takes several hours, and
              produces a detailed cognitive profile. It is used in education,
              clinical psychology, and neuropsychology.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              This website is not that. The Einstein IQ Test quiz is a short,
              self serve online assessment designed for practice, learning,
              and curiosity. The score reflects how many of these specific 22
              questions you answered correctly. It is not a clinical IQ score,
              it is not a formal intelligence measurement, and it should not
              be used to make decisions about education, employment, or
              health.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              If you are looking for a formal evaluation, please reach out to
              a licensed psychologist in your area. If you are looking for a
              quick, honest, and well designed reasoning quiz, you are in the
              right place.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Ready to take the quiz?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Jump back to the home page and try the 45 question quiz. It
              takes around 15 to 25 minutes and your answers stay in your
              browser.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/#iq-quiz">Start IQ Test</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
