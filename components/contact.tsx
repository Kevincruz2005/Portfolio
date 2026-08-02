"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
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
    setFeedback(emailIsValid ? "Looks good. You can write your message now." : "Enter a valid email address first.");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (deliveryStatus !== "ready") {
      setFeedback(`Email delivery is being configured. Contact me at ${profile.email}.`);
      return;
    }

    if (!emailChecked || !emailIsValid) {
      setFeedback("Check your email address before sending.");
      return;
    }

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
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              disabled={status === "sending"}
              placeholder="Your name"
            />
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
                }}
                disabled={status === "sending"}
                placeholder="you@example.com"
                aria-describedby="contact-feedback"
              />
              <button
                type="button"
                className={emailChecked ? "email-check is-checked" : "email-check"}
                onClick={checkEmail}
                disabled={status === "sending" || deliveryStatus !== "ready" || !form.email}
              >
                {emailChecked ? <CheckCircle2 aria-hidden="true" /> : null}
                {emailChecked ? "Verified" : "Verify email"}
              </button>
            </div>
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
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              disabled={status === "sending" || deliveryStatus !== "ready" || !emailChecked}
              placeholder={emailChecked ? "Tell me what you are working on…" : "Verify your email to continue"}
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
