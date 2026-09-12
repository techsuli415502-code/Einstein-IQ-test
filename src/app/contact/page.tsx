import Link from "next/link";
import type { Metadata } from "next";
import { Mail, MessageSquare, Clock, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "@/components/contact-form";
import { RectangleAd } from "@/components/adsterra-ad";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Einstein IQ Test team. Send feedback, suggest new question types, or ask questions about the online IQ quiz. You can also email us directly.",
  alternates: {
    canonical: "/contact",
  },
  keywords: [
    "Contact Einstein IQ Test",
    "IQ test contact",
    "online IQ quiz feedback",
    "ask about IQ test",
    "Einstein IQ Test email",
  ],
  openGraph: {
    title: "Contact Us | Einstein IQ Test",
    description:
      "Send feedback or questions about the Einstein IQ Test online quiz, or email us directly.",
    url: `${siteConfig.url}/contact`,
    type: "article",
  },
};

const contactCards = [
  {
    icon: Mail,
    title: "Direct email",
    body: "Prefer email over a form? Send a message directly to our inbox and we will reply as soon as we can.",
    actionLabel: siteConfig.contactEmail,
    actionHref: `mailto:${siteConfig.contactEmail}`,
  },
  {
    icon: MessageSquare,
    title: "Use the form",
    body: "Fill in the short form below. It is the fastest way to share feedback, suggest new question types, or report an issue with the quiz.",
    actionLabel: "Scroll to form",
    actionHref: "#contact-form",
  },
  {
    icon: Clock,
    title: "Response time",
    body: "We read every message and aim to reply within two to three business days. Longer during busy periods or holidays.",
    actionLabel: null,
    actionHref: null,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-hero-gradient">
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-xs font-medium text-primary">
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            Get in touch
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Have a question about the Einstein IQ Test quiz, a suggestion for
            new question types, or feedback on the website? We would love to
            hear from you. Use the form below or send an email directly to our
            contact inbox.
          </p>
        </div>
      </section>

      {/* In-content ad. */}
      <div className="py-6">
        <RectangleAd />
      </div>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {contactCards.map((card) => {
              const Icon = card.icon;
              const content = (
                <>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-lg font-semibold text-foreground">
                    {card.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                  {card.actionLabel && card.actionHref && (
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      {card.actionLabel}
                      <ArrowRight
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </span>
                  )}
                </>
              );
              return card.actionHref ? (
                <a
                  key={card.title}
                  href={card.actionHref}
                  className="block rounded-2xl border border-border bg-card p-5 shadow-sm card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {content}
                </a>
              ) : (
                <article
                  key={card.title}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm card-hover"
                >
                  {content}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact-form" className="scroll-mt-24 pb-14 sm:pb-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <ContactForm />

          <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h2 className="text-base font-semibold text-foreground">
              Prefer to email us directly?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              You can also reach the Einstein IQ Test team by sending an email
              to our direct contact address. We read every message and reply as
              quickly as we can.
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {siteConfig.contactEmail}
            </a>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Prefer to explore first? Head back to the{" "}
            <Link
              href="/"
              className="font-medium text-primary hover:underline"
            >
              home page
            </Link>{" "}
            or read our{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-primary hover:underline"
            >
              privacy policy
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
