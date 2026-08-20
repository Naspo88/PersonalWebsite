"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import type { Dictionary } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { validateContactForm, type ContactErrors, type ContactValues } from "@/lib/contact-form";
import { Field } from "@/components/field";

const EMPTY_VALUES: ContactValues = { name: "", email: "", message: "", company: "" };

export function ContactForm({ dictionary }: { dictionary: Dictionary }) {
  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "failed">("idle");
  const summaryRef = useRef<HTMLDivElement>(null);
  const openedAtRef = useRef(0);

  useEffect(() => {
    openedAtRef.current = Date.now();
  }, []);

  function update(field: keyof ContactValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function validateField(field: keyof ContactErrors) {
    const found = validateContactForm(values, dictionary);
    setErrors((current) => ({ ...current, [field]: found[field] }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validateContactForm(values, dictionary);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      summaryRef.current?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(siteConfig.contactEndpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, elapsedMs: Date.now() - openedAtRef.current }),
      });

      if (!response.ok) throw new Error(`Unexpected status ${response.status}`);

      setValues(EMPTY_VALUES);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <p
        role="status"
        className="flex items-center gap-3 rounded-lg border border-accent bg-surface p-6 text-fg"
      >
        <CheckCircle size={24} className="text-accent" aria-hidden />
        {dictionary.contact.success}
      </p>
    );
  }

  const errorEntries = Object.entries(errors).filter(([, message]) => Boolean(message));

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-xl">
      {errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 rounded-lg border border-danger bg-surface p-4"
        >
          <p className="flex items-center gap-2 font-mono text-sm text-fg">
            <WarningCircle size={18} className="text-danger" aria-hidden />
            {dictionary.contact.errors.summary}
          </p>
          <ul className="mt-3 space-y-1 text-sm text-fg-muted">
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a href={`#${field}`} className="underline underline-offset-4">
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-6">
        <Field
          id="name"
          label={dictionary.contact.name}
          value={values.name}
          error={errors.name}
          autoComplete="name"
          onChange={(value) => update("name", value)}
          onBlur={() => validateField("name")}
        />

        <Field
          id="email"
          type="email"
          label={dictionary.contact.email}
          value={values.email}
          error={errors.email}
          autoComplete="email"
          onChange={(value) => update("email", value)}
          onBlur={() => validateField("email")}
        />

        <Field
          id="message"
          label={dictionary.contact.message}
          help={dictionary.contact.messageHelp}
          value={values.message}
          error={errors.message}
          multiline
          onChange={(value) => update("message", value)}
          onBlur={() => validateField("message")}
        />

        <div aria-hidden className="absolute left-[-9999px]">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
          />
        </div>
      </div>

      {status === "failed" && (
        <p role="alert" className="mt-6 flex items-center gap-2 text-sm text-danger">
          <WarningCircle size={18} aria-hidden />
          {dictionary.contact.errors.submitFailed}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 inline-flex min-h-11 cursor-pointer items-center justify-center rounded bg-accent px-5 font-mono text-sm text-on-accent transition-colors duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? dictionary.contact.sending : dictionary.contact.send}
      </button>
    </form>
  );
}
