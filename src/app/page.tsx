import Link from "next/link";
import type { Metadata } from "next";
import {
  Brain,
  Target,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IQQuiz } from "@/components/iq-quiz";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RectangleAd, LeaderboardAd } from "@/components/adsterra-ad";
import { HeroVisual } from "@/components/hero-visual";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Free Online Einstein IQ Test | Logical Reasoning Quiz",
  description:
    "Take the Einstein IQ Test free online. Practice 45 general knowledge questions across Math, Science, and History with instant feedback after each answer. Free, no sign up.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Einstein IQ Test",
    "Free IQ Test",
    "Online IQ Test",
    "IQ Quiz",
    "Intelligence Test",
    "Logical Reasoning Test",
    "Pattern Recognition Test",
    "Problem Solving Test",
    "Cognitive Skills",
    "Analytical Thinking",
  ],
};

const faqs = [
  {
    q: "What is an IQ test?",
    a: "An IQ test is a structured assessment that asks a series of questions about reasoning, pattern recognition, number logic and problem solving. The result gives a rough indication of how quickly and accurately someone can solve these kinds of mental tasks. Clinical IQ tests are administered by trained professionals, while online quizzes like this one are for practice and entertainment.",
  },
  {
    q: "Is this IQ test free?",
    a: "Yes. The Einstein IQ Test quiz is completely free to take. There is no sign up, no email required and no payment step. You can run the quiz as many times as you like directly in your browser.",
  },
  {
    q: "How many questions are in the test?",
    a: "The quiz has 45 questions split evenly across three sections: 15 Math, 15 Science, and 15 History. Each question has four multiple choice options and exactly one correct answer.",
  },
  {
    q: "How long does the test take?",
    a: "Most people finish in around 15 to 25 minutes. There is no timer, so you can read each question carefully and take as long as you need. Going at a steady pace usually produces a more accurate result than rushing.",
  },
  {
    q: "Do I get feedback after each answer?",
    a: "Yes. The moment you select an answer, the quiz shows whether your choice was correct or incorrect, reveals the correct answer if you got it wrong, and gives a short explanation so you understand why. You can then move on to the next question at your own pace.",
  },
  {
    q: "Can I retake the IQ test?",
    a: "Yes. After you see your result, just press Try Again and the quiz resets. All answers are cleared and the score is calculated fresh from your new responses.",
  },
  {
    q: "Is this a real IQ score?",
    a: "No. This quiz is an online IQ style assessment designed for practice and entertainment. It is not a clinical or professionally administered IQ assessment, and the score should not be treated as a formal intelligence measurement. If you need a formal evaluation, please consult a licensed psychologist.",
  },
  {
    q: "Can I use the test on my phone?",
    a: "Yes. The quiz is fully responsive and works on phones, tablets, laptops and desktops. Buttons and answer options are sized for touch screens, and the layout adapts to small and large displays.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const measuredSkills = [
  {
    title: "Logical Reasoning",
    body: "Drawing conclusions from given statements and identifying which deduction must be true.",
  },
  {
    title: "Pattern Recognition",
    body: "Spotting repeating sequences in letters, shapes and numbers, and predicting the next item.",
  },
  {
    title: "Problem Solving",
    body: "Translating word problems into simple arithmetic and choosing the right operations.",
  },
  {
    title: "Memory",
    body: "Holding small pieces of information in mind while working through multi step questions.",
  },
  {
    title: "Number Reasoning",
    body: "Working with sequences, ratios, percentages and basic arithmetic relationships.",
  },
  {
    title: "Analytical Thinking",
    body: "Breaking a problem into parts, comparing options and choosing the most likely answer.",
  },
];

const tips = [
  "Read each question with care before looking at the options.",
  "Do not rush. A steady pace usually beats a fast guess.",
  "Look for patterns in numbers, letters and shapes.",
  "Check every option, even if the first one looks right.",
  "Stay focused and reduce distractions while taking the quiz.",
  "If a question feels tricky, clear your choice and reconsider it.",
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-hero-gradient">
        {/* Background layers: ambient lighting + neural pattern + particles */}
        <div className="hero-ambient" aria-hidden="true" />
        <div className="hero-pattern" aria-hidden="true" />
        <div className="hero-particles absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: text content */}
            <div className="space-y-7">
              <div className="hero-fade-up hero-fade-up-1 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Free online IQ style quiz
              </div>

              <h1 className="hero-fade-up hero-fade-up-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Test Your{" "}
                <span className="hero-glow-iq">IQ</span>{" "}
                Online
              </h1>

              <p className="hero-fade-up hero-fade-up-3 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Welcome to {siteConfig.name}. Take a free online IQ quiz
                that checks your logical reasoning, pattern recognition,
                problem solving, analytical thinking, number reasoning and
                cognitive skills. You get 45 questions across Math, Science,
                and History, with instant feedback after each answer and a
                clear score breakdown at the end. No sign up needed.
              </p>

              <div className="hero-fade-up hero-fade-up-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="hero-cta-primary sm:min-w-[180px]"
                >
                  <a href="#iq-quiz">
                    Start IQ Test
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary/30 bg-background/60 backdrop-blur-sm hover:bg-background/80"
                >
                  <Link href="/about">How it works</Link>
                </Button>
              </div>

              <p className="hero-fade-up hero-fade-up-5 text-xs text-muted-foreground">
                For practice and entertainment. Not a clinical or professional
                IQ assessment.
              </p>
            </div>

            {/* Right: glassmorphism visual card */}
            <div className="hero-fade-up hero-fade-up-5 relative">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Quiz section */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Take the Einstein IQ Test
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Answer 45 questions across Math, Science, and History with
              instant feedback after each answer. Get a per-section score
              and a complete answer review at the end. The quiz runs in your
              browser and your answers are not stored on a server.
            </p>
          </div>
          <IQQuiz />
        </div>
      </section>

      {/* In-content ad: between quiz and educational content. */}
      <div className="py-6">
        <RectangleAd />
      </div>

      {/* What is an IQ test */}
      <section className="border-t border-border/60 bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
                Understanding the quiz
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                What Is an IQ Test?
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                An IQ test, short for intelligence quotient test, is an
                assessment that uses a series of structured questions to gauge
                how well someone can reason, recognize patterns, and solve
                problems. Rather than asking what you memorized, an IQ test
                asks how you think. Each question presents a small puzzle in
                areas like number sequences, verbal reasoning, shape logic,
                and analytical deduction.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                The questions are designed to challenge your working memory,
                your ability to spot a hidden rule, and your speed in moving
                from a problem to a confident answer. Most modern IQ quizzes,
                including this one, focus on reasoning types that can be
                measured in a short, self paced format. A formal clinical IQ
                test is far longer and is administered by a trained
                professional, while online quizzes are designed for practice,
                curiosity, and self awareness.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                On this site, the goal is practical. You get a snapshot of
                how you handle a mix of cognitive tasks, and a score band that
                helps you understand where your strengths and weak spots might
                be. Treat the result as a starting point for learning rather
                than a fixed label.
              </p>
            </div>

            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                Step by step
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                How Does an Online IQ Test Work?
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                An online IQ test is built around a fixed set of multiple
                choice questions. Each question has one correct answer, and the
                quiz tracks which option you pick. When you reach the end, the
                script counts how many answers were right and shows your
                score along with a short interpretation.
              </p>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3 rounded-lg border border-border bg-background p-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    1
                  </span>
                  <span>
                    Press Start IQ Test to load the first question. You will
                    see one question at a time on the screen.
                  </span>
                </li>
                <li className="flex gap-3 rounded-lg border border-border bg-background p-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    2
                  </span>
                  <span>
                    Read the question and select one option. Use the Clear
                    button if you change your mind before moving on.
                  </span>
                </li>
                <li className="flex gap-3 rounded-lg border border-border bg-background p-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    3
                  </span>
                  <span>
                    Use Next to move forward and Previous to revisit an
                    earlier question. The progress bar shows how much is left.
                  </span>
                </li>
                <li className="flex gap-3 rounded-lg border border-border bg-background p-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    4
                  </span>
                  <span>
                    On the last question, press See Result. Your score and a
                    skill band appear immediately. You can restart any time.
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* In-content ad: between content blocks. */}
      <div className="py-6">
        <RectangleAd />
      </div>

      {/* What does an IQ test measure */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              <Target className="h-3.5 w-3.5" aria-hidden="true" />
              Skills covered
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
              What Does an IQ Test Measure?
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              A useful IQ quiz does not just check one skill. It combines
              several types of mental tasks so that the score reflects a
              broader picture of reasoning ability. The questions on this site
              fall into the categories below.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {measuredSkills.map((skill) => (
              <article
                key={skill.title}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm card-hover"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {skill.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {skill.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* In-content leaderboard: between content blocks. */}
      <div className="py-6">
        <LeaderboardAd />
      </div>

      {/* Why try an IQ test + Tips */}
      <section className="border-t border-border/60 bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                <Brain className="h-3.5 w-3.5" aria-hidden="true" />
                Practical value
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Why Try an IQ Test?
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Taking a short reasoning quiz has real practical value beyond
                curiosity. It can help you notice how you approach a new
                problem, which types of questions slow you down, and where
                your reasoning feels strong. This kind of self awareness is a
                useful starting point for any kind of learning.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2 rounded-lg border border-border bg-background p-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  Practice logical and analytical thinking in a structured
                  format that builds reasoning habits.
                </li>
                <li className="flex items-start gap-2 rounded-lg border border-border bg-background p-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  Spot patterns more quickly by exposing yourself to a mix of
                  sequence and odd one out questions.
                </li>
                <li className="flex items-start gap-2 rounded-lg border border-border bg-background p-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  Get a quick snapshot of your strengths across verbal,
                  number and shape reasoning.
                </li>
                <li className="flex items-start gap-2 rounded-lg border border-border bg-background p-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  Use the result as a starting point for puzzles, courses or
                  further reasoning practice.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
                Get a better result
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                How to Get the Best Result
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                A few small habits make a big difference. The goal is not to
                rush, but to read each question clearly and pick the option
                that best fits the rule behind the puzzle. The tips below will
                help you get the most accurate picture of your reasoning
                skills today.
              </p>
              <ul className="space-y-3">
                {tips.map((tip) => (
                  <li
                    key={tip}
                    className="flex items-start gap-2 rounded-lg border border-border bg-background p-3 text-sm text-foreground"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              FAQ
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              IQ Test FAQ
            </h2>
            <p className="mt-3 text-muted-foreground">
              Quick answers to the most common questions about the Einstein IQ
              Test quiz.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={faq.q}
                value={`item-${idx}`}
                className="rounded-lg border border-border bg-card px-4 mb-3 last:mb-0"
              >
                <AccordionTrigger className="text-base font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-border bg-secondary/40 p-5 text-center">
            <p className="text-sm text-muted-foreground">
              Ready to try the quiz for yourself?
            </p>
            <Button asChild size="lg">
              <a href="#iq-quiz">
                Start IQ Test
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Learn more about the project on the{" "}
            <Link
              href="/about"
              className="font-medium text-primary hover:underline"
            >
              About Us
            </Link>{" "}
            page or read the{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-primary hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Final in-content ad: after FAQ. */}
      <div className="py-6">
        <RectangleAd />
      </div>
    </>
  );
}
