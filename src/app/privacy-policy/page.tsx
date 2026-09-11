import Link from "next/link";
import type { Metadata } from "next";
import { Shield, Lock, Cookie, BarChart3, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Einstein IQ Test privacy policy. Learn what information we collect, how the quiz works in your browser, and your choices about data.",
  alternates: {
    canonical: "/privacy-policy",
  },
  keywords: [
    "Einstein IQ Test privacy policy",
    "online IQ test privacy",
    "quiz data privacy",
    "IQ quiz cookies",
  ],
  openGraph: {
    title: "Privacy Policy | Einstein IQ Test",
    description:
      "How Einstein IQ Test handles information when you take the online IQ quiz.",
    url: `${siteConfig.url}/privacy-policy`,
    type: "article",
  },
};

const sections = [
  {
    id: "information-we-collect",
    icon: Shield,
    title: "Information We Collect",
    body: [
      "Einstein IQ Test is designed to be minimal when it comes to data. The quiz runs entirely in your browser. Your answers are stored only in the page state while you take the quiz, and they are cleared when you press Try Again or close the tab.",
      "We do not ask you to create an account, and we do not require an email address to take the quiz or see your score. The contact form on the Contact Us page asks for a name, email, and message, but in this build that information is only handled on the front end and is not transmitted to a server.",
    ],
  },
  {
    id: "how-we-use-information",
    icon: BarChart3,
    title: "How We Use Information",
    body: [
      "Any information that does reach us is used only to operate and improve the website. We do not sell or rent personal information to third parties. We do not use quiz answers to build profiles about individual users.",
      "If you submit a message through the contact form once it is connected to an email service, the information you provide will be used to respond to your inquiry and nothing else.",
    ],
  },
  {
    id: "quiz-data",
    icon: Lock,
    title: "Quiz Data",
    body: [
      "Your quiz answers, your score, and the review of correct and incorrect answers all stay in your browser session. They are not sent to a server, stored in a database, or shared with third parties.",
      "When you press Try Again, the quiz state is reset, all selected answers are cleared, and the score is recalculated fresh from your new responses. Refreshing the page or closing the tab also clears all quiz data.",
    ],
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookies",
    body: [
      "The website itself does not set cookies to track you across sessions. Any cookies you may notice come from your browser or from optional third party tools such as analytics, described below, if and when those are enabled.",
      "You can review, block, or delete cookies through your browser settings. Disabling cookies will not prevent the quiz from working, since the quiz relies on in page state rather than cookies.",
    ],
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics",
    body: [
      "If analytics is enabled on this site in the future, it may collect aggregate and anonymized information such as the pages visited, the type of device used, and general region. The goal is to understand which content is useful so we can improve it.",
      "We do not use analytics to identify individual users, and we do not connect analytics data to quiz answers or to information submitted through the contact form.",
    ],
  },
  {
    id: "third-party-services",
    icon: ExternalLink,
    title: "Third Party Services",
    body: [
      "Einstein IQ Test is a static website and does not rely on third party services for the quiz to work. If the site uses a hosting provider or a content delivery network, those providers may process basic technical information such as IP address in order to serve the page.",
      "We do not embed social media widgets, advertising networks, or hidden tracking pixels. If this changes in the future, this policy will be updated to reflect what is in use.",
    ],
  },
  {
    id: "advertising",
    icon: BarChart3,
    title: "Advertising",
    body: [
      "The current build of Einstein IQ Test does not display advertising. We do not run ad networks and we do not share data with advertising partners.",
      "If advertising is introduced in the future, we will update this section to explain which networks are used, what information they collect, and how you can opt out.",
    ],
  },
  {
    id: "data-security",
    icon: Lock,
    title: "Data Security",
    body: [
      "Because quiz answers are kept in your browser and are not transmitted to a server in this build, the risk of a server side data breach affecting your quiz answers is effectively zero.",
      "If the contact form is later connected to an email service, we will take reasonable steps to protect submitted messages in transit. No method of transmission or storage is fully secure, however, and you should keep that in mind when sharing personal details.",
    ],
  },
  {
    id: "childrens-privacy",
    icon: Shield,
    title: "Children's Privacy",
    body: [
      "The Einstein IQ Test quiz is suitable for general audiences, including older children who are interested in reasoning practice. We do not knowingly collect personal information from children.",
      "If you are a parent or guardian and you believe your child has provided personal information through the contact form, please reach out and we will take steps to delete that information from any system it may have reached.",
    ],
  },
  {
    id: "external-links",
    icon: ExternalLink,
    title: "External Links",
    body: [
      "The website may contain links to other websites that we believe are useful for people interested in reasoning and cognitive skills. Those external sites have their own privacy policies and we are not responsible for their practices.",
      "We encourage you to read the privacy policy of any website you visit through an external link before sharing information with that website.",
    ],
  },
  {
    id: "your-choices",
    icon: Shield,
    title: "Your Choices",
    body: [
      "You can take the quiz without sharing any personal information. You can clear your quiz answers at any time by pressing the Clear button on a question, by pressing Try Again on the result screen, or by closing the tab.",
      "You can also control cookies through your browser settings. Most browsers allow you to refuse new cookies, delete existing cookies, or be notified before a cookie is set. These settings will not affect the quiz itself.",
    ],
  },
  {
    id: "changes-to-this-policy",
    icon: BarChart3,
    title: "Changes to This Policy",
    body: [
      "We may update this privacy policy from time to time to reflect changes in the website or in legal requirements. When we do, we will update the date shown at the top of this page.",
      "If we make significant changes to how personal information is handled, we will highlight those changes on the home page or in another prominent place before the changes take effect.",
    ],
  },
  {
    id: "contact",
    icon: ExternalLink,
    title: "Contact",
    body: [
      "If you have any questions about this privacy policy or about how the quiz works, please reach out through the Contact Us page. We are happy to clarify anything that is unclear.",
      "Because the contact form is currently a front end demo, no message is sent in this build. To get in touch before the form is connected, please use your own email client.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 2026";

  return (
    <div className="bg-hero-gradient">
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-xs font-medium text-primary">
            <Shield className="h-3.5 w-3.5" aria-hidden="true" />
            Your privacy
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            This privacy policy explains how {siteConfig.name} handles
            information when you visit the website and take the online IQ
            quiz. We aim to be clear, honest, and specific about what does and
            does not happen with any data on this site.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                On this page
              </h2>
              <nav aria-label="Privacy policy sections" className="mt-3">
                <ul className="space-y-1.5 text-sm">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="space-y-12">
              {sections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <section.icon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      {section.title}
                    </h2>
                  </div>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="leading-relaxed text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground">
                  Still have questions?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  If anything in this policy is unclear, please get in touch
                  through the contact page or head back to take the quiz.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/contact"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Contact Us
                  </a>
                  <a
                    href="/#iq-quiz"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    Start IQ Test
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
