"use client";

import { useId, useState, type FormEvent } from "react";
import { whatsappLink } from "@/lib/site";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done" }
  | { kind: "error"; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function SignupForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const emailId = useId();
  const messageId = useId();
  const chatLink = whatsappLink("Hi Sand & Silk! Please add me to your launch list.");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim().toLowerCase();

    if (!EMAIL_PATTERN.test(email)) {
      setStatus({ kind: "error", message: "Please enter a valid email address." });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        // `company` is a honeypot: real people never see or fill it.
        body: JSON.stringify({ email, company: form.get("company") ?? "" }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus({ kind: "done" });
    } catch {
      setStatus({
        kind: "error",
        message: chatLink
          ? "We couldn't save that just now. Please try again, or message us on WhatsApp."
          : "We couldn't save that just now. Please try again in a moment.",
      });
    }
  }

  if (status.kind === "done") {
    return (
      <p className="signup-thanks" role="status">
        Thank you. You&rsquo;ll be the first to know when we open.
      </p>
    );
  }

  return (
    <div className="signup">
      <form className="signup-form" onSubmit={onSubmit} noValidate aria-describedby={messageId}>
        <label htmlFor={emailId} className="visually-hidden">
          Email address
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Your email address"
          required
          aria-invalid={status.kind === "error" || undefined}
          disabled={status.kind === "sending"}
        />
        <input
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="honeypot"
          aria-hidden="true"
        />
        <button type="submit" className="btn btn-primary" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Joining…" : "Notify me"}
        </button>
      </form>

      <p id={messageId} className="signup-message" role="alert" aria-live="polite">
        {status.kind === "error" ? status.message : ""}
      </p>

      {chatLink && (
        <a className="btn btn-ghost" href={chatLink} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          Join on WhatsApp
        </a>
      )}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}
