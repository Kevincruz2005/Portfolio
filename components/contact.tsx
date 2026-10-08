"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  LoaderCircle,
  LockKeyhole,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { profile } from "@/lib/data";

type FormStatus = "idle" | "sending" | "success" | "error";
type DeliveryStatus = "checking" | "ready" | "unavailable";
type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const initialForm = {
  name: "",
  email: "",
  message: "",
  website: "",
};

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [emailChecked, setEmailChecked] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>("checking");
  const [feedback, setFeedback] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [emailCopied, setEmailCopied] = useState(false);

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/contact", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to check email delivery.");
        return response.json() as Promise<{ configured?: boolean }>;
      })
      .then((result) => {
        setDeliveryStatus(result.configured ? "ready" : "unavailable");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setDeliveryStatus("unavailable");
      });

    return () => controller.abort();
  }, []);

  const checkEmail = () => {
    if (deliveryStatus !== "ready") {
      setFeedback(`Email delivery is being configured. Contact me at ${profile.email}.`);
      return;
    }
    setEmailChecked(emailIsValid);
    setFieldErrors((current) => ({
      ...current,
      email: emailIsValid ? undefined : "Enter a valid reply email.",
    }));
    setFeedback(emailIsValid ? "Email format checked. You can write your message now." : "Enter a valid email address first.");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      setFeedback(`Copy did not complete. Email me at ${profile.email}.`);
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (deliveryStatus !== "ready") {
      setFeedback(`Email delivery is being configured. Contact me at ${profile.email}.`);
      return;
    }

    const errors: FieldErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      errors.name = "Enter your name using at least 2 characters.";
    }
    if (!emailChecked || !emailIsValid) {
      errors.email = "Check a valid reply email before sending.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      errors.message = "Write a message using at least 10 characters.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      setFeedback("Review the highlighted fields and try again.");
      return;
    }

    setFieldErrors({});
    setStatus("sending");
    setFeedback("Sending your message…");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "The message could not be sent.");
      }

      setStatus("success");
      setFeedback("Message sent. I’ll get back to you through the email address provided.");
      setForm(initialForm);
      setEmailChecked(false);
      setFieldErrors({});
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "The message could not be sent.");
    }
  };

  return (
    <section className="section contact-route" aria-labelledby="contact-heading">
      <div className="page-shell contact-route-layout">
        <div className="contact-route-intro">
          <p className="eyebrow">Contact / 04</p>
          <h1 id="contact-heading">Send a direct message.</h1>
          <p>
            Have a role, collaboration, or technical problem in mind? Share the
            details here and I can reply directly to your email.
          </p>
          <div className={`contact-channel-state is-${deliveryStatus}`}>
            <span aria-hidden="true" />
            {deliveryStatus === "checking"
              ? "Checking email delivery"
              : deliveryStatus === "ready"
                ? "Email delivery ready"
                : "Email setup required"}
          </div>

          <nav className="contact-fallback-links" aria-label="Alternative contact methods">
            <a href={`mailto:${profile.email}`}>
              <Mail aria-hidden="true" />
              {profile.email}
              <ArrowUpRight aria-hidden="true" />
            </a>
            <button className="copy-email-button" type="button" onClick={copyEmail}>
              {emailCopied ? <CheckCircle2 aria-hidden="true" /> : <Copy aria-hidden="true" />}
              {emailCopied ? "Email copied" : "Copy email"}
            </button>
            <a href={`tel:${profile.phone}`}>
              <Phone aria-hidden="true" />
              {profile.phone}
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" />
              GitHub
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin aria-hidden="true" />
              LinkedIn
              <ArrowUpRight aria-hidden="true" />
            </a>
          </nav>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <header className="contact-form-header">
            <div>
              <LockKeyhole aria-hidden="true" />
              <span>Send me a message</span>
            </div>
            <span>Direct email</span>
          </header>

          {deliveryStatus === "unavailable" ? (
            <p className="contact-setup-note" role="status">
              The direct email channel needs its private server credentials. You can
              still reach me through the verified links beside this form.
            </p>
          ) : null}

          <div className="honeypot-field" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(event) => setForm({ ...form, website: event.target.value })}
            />
          </div>

          <label className="contact-field" htmlFor="contact-name">
            <span>Name</span>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              minLength={2}
              maxLength={100}
              required
              value={form.name}
              onChange={(event) => {
                setForm({ ...form, name: event.target.value });
                setFieldErrors((current) => ({ ...current, name: undefined }));
              }}
              disabled={status === "sending"}
              placeholder="Your name"
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            />
            {fieldErrors.name ? <small id="contact-name-error" className="field-error">{fieldErrors.name}</small> : null}
          </label>

          <div className="contact-field">
            <label htmlFor="contact-email">Reply email</label>
            <div className="email-check-row">
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                value={form.email}
                onChange={(event) => {
                  setForm({ ...form, email: event.target.value });
                  setEmailChecked(false);
                  setFieldErrors((current) => ({ ...current, email: undefined }));
                }}
                disabled={status === "sending"}
                placeholder="you@example.com"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "contact-email-error contact-feedback" : "contact-feedback"}
              />
              <button
                type="button"
                className={emailChecked ? "email-check is-checked" : "email-check"}
                onClick={checkEmail}
                disabled={status === "sending" || deliveryStatus !== "ready" || !form.email}
              >
                {emailChecked ? <CheckCircle2 aria-hidden="true" /> : null}
                {emailChecked ? "Email checked" : "Check email"}
              </button>
            </div>
            {fieldErrors.email ? <small id="contact-email-error" className="field-error">{fieldErrors.email}</small> : null}
          </div>

          <label className="contact-field message-field" htmlFor="contact-message">
            <span>Message</span>
            <textarea
              id="contact-message"
              name="message"
              minLength={10}
              maxLength={5000}
              required
              value={form.message}
              onChange={(event) => {
                setForm({ ...form, message: event.target.value });
                setFieldErrors((current) => ({ ...current, message: undefined }));
              }}
              disabled={status === "sending" || deliveryStatus !== "ready" || !emailChecked}
              placeholder={emailChecked ? "Tell me what you are working on…" : "Verify your email to continue"}
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
            />
            {deliveryStatus !== "ready" || !emailChecked ? (
              <span className="message-lock" aria-hidden="true">
                <LockKeyhole />
                {deliveryStatus === "checking"
                  ? "Checking email channel"
                  : deliveryStatus === "unavailable"
                    ? "Email setup required"
                    : "Check email to unlock"}
              </span>
            ) : null}
            {fieldErrors.message ? <small id="contact-message-error" className="field-error">{fieldErrors.message}</small> : null}
          </label>

          <button
            className={`contact-submit is-${status}`}
            type="submit"
            disabled={status === "sending" || deliveryStatus !== "ready" || !emailChecked}
          >
            {status === "sending" ? <LoaderCircle className="spin" aria-hidden="true" /> : null}
            {status === "success" ? <CheckCircle2 aria-hidden="true" /> : null}
            {status === "error" ? <AlertCircle aria-hidden="true" /> : null}
            {status === "idle" ? <Send aria-hidden="true" /> : null}
            {status === "sending"
              ? "Sending…"
              : status === "success"
                ? "Message sent"
                : status === "error"
                  ? "Try again"
                  : "Send message"}
          </button>

          <p
            id="contact-feedback"
            className={`contact-feedback is-${status}`}
            role={status === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            {feedback || "Your reply address is used only to respond to this message."}
          </p>
        </form>
      </div>
    </section>
  );
}
