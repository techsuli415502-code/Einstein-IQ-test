import Link from "next/link";
import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Einstein IQ Test team. Send feedback, suggest new question types, or ask questions about the online IQ quiz.",
  alternates: {
    canonical: "/contact",
  },
  keywords: [
    "Contact Einstein IQ Test",
    "IQ test contact",
    "online IQ quiz feedback",
    "ask about IQ test",
  ],
  openGraph: {
    title: "Contact Us | Einstein IQ Test",
    description:
      "Send feedback or questions about the Einstein IQ Test online quiz.",
    url: `${siteConfig.url}/contact`,
    type: "article",
  },
};

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
            new question types, or feedback on the website? Send us a message
            using the form below and we will get back to you as soon as we can.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <ContactForm />

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
