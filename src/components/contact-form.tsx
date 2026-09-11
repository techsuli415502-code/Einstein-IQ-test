"use client";

import * as React from "react";
import { Mail, User, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type FormState = {
  name: string;
  email: string;
  message: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [form, setForm] = React.useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.name.trim()) {
      next.name = "Please enter your name.";
    } else if (form.name.trim().length < 2) {
      next.name = "Your name should be at least 2 characters.";
    }
    if (!form.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!emailRegex.test(form.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) {
      next.message = "Please enter a message.";
    } else if (form.message.trim().length < 10) {
      next.message = "Your message should be at least 10 characters.";
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    // Simulate a short delay so the button shows a clear "sending" state.
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }, 400);
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrors({});
  };

  if (submitted) {
    return (
      <article
        className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-foreground">
            Thanks for your message
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Your submission has been received on the front end. Please connect
            this form to your preferred email service before using it in
            production so messages are actually delivered to an inbox. For a
            guaranteed reply in the meantime, email us directly at the address
            shown on the Contact page.
          </p>
          <div className="mt-6">
            <Button onClick={handleReset}>Send another message</Button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-semibold text-foreground">
        Send a message
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Fill in the fields below. Required fields are marked with an asterisk.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 space-y-5"
        aria-label="Contact form"
      >
        <div className="space-y-1.5">
          <Label htmlFor="contact-name" className="text-sm font-medium">
            Name <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <User
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              placeholder="Your name"
              className="pl-9"
              required
            />
          </div>
          {errors.name && (
            <p
              id="name-error"
              role="alert"
              className="text-xs text-destructive"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-email" className="text-sm font-medium">
            Email <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="you@example.com"
              className="pl-9"
              required
            />
          </div>
          {errors.email && (
            <p
              id="email-error"
              role="alert"
              className="text-xs text-destructive"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="contact-message"
            className="text-sm font-medium"
          >
            Message <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <MessageSquare
              className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            <Textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={
                errors.message ? "message-error" : undefined
              }
              placeholder="Your question, feedback or suggestion"
              className="min-h-[140px] resize-y pl-9 pt-2"
              required
            />
          </div>
          {errors.message && (
            <p
              id="message-error"
              role="alert"
              className="text-xs text-destructive"
            >
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            This form is a front end demo in the current build. For a guaranteed
            reply, use the direct email shown below.
          </p>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="sm:min-w-[160px]"
          >
            {isSubmitting ? "Sending..." : "Submit"}
            {!isSubmitting && (
              <Send className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      </form>
    </article>
  );
}
