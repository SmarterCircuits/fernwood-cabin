"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { contact } from "@/data/contact";
import { sponsorCategories } from "@/data/sponsors";
import { INTEREST_EVENT } from "./InterestButton";

type Values = {
  name: string;
  company: string;
  email: string;
  website: string;
  category: string;
  partnership: string;
  value: string;
  message: string;
};
type Errors = Partial<Record<keyof Values, string>>;
type Status = { kind: "idle" | "sending" | "ok" | "warn" | "err"; text?: string };

const EMPTY: Values = { name: "", company: "", email: "", website: "", category: "", partnership: "", value: "", message: "" };
const LABELS: Record<keyof Values, string> = {
  name: "Name",
  company: "Company",
  email: "Email",
  website: "Website",
  category: "Product / category",
  partnership: "Type of partnership",
  value: "Estimated contribution / value",
  message: "Message",
};

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Enter your name.";
  if (!v.company.trim()) e.company = "Enter your company or organization.";
  if (!v.email.trim()) e.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter an email address like name@company.com.";
  if (v.website.trim()) {
    const withProto = /^https?:\/\//i.test(v.website.trim()) ? v.website.trim() : `https://${v.website.trim()}`;
    try {
      const u = new URL(withProto);
      if (!u.hostname.includes(".")) throw new Error();
    } catch {
      e.website = "Enter a valid website, e.g. company.com.";
    }
  }
  if (!v.category.trim()) e.category = "Tell us which product or category you have in mind.";
  if (!v.partnership) e.partnership = "Choose a partnership type.";
  if (v.message.trim().length < 20) e.message = "Add a short message (at least 20 characters).";
  return e;
}

function toText(v: Values) {
  const type = contact.partnershipTypes.find((t) => t.value === v.partnership)?.label ?? v.partnership;
  return [
    `Name: ${v.name}`,
    `Company: ${v.company}`,
    `Email: ${v.email}`,
    `Website: ${v.website || "—"}`,
    `Product / category: ${v.category}`,
    `Partnership type: ${type}`,
    `Estimated value: ${v.value || "—"}`,
    "",
    v.message,
  ].join("\n");
}

async function deliver(v: Values): Promise<Status> {
  const payload = { ...v, source: "Fernwood Cabin A sponsor site" };
  switch (contact.provider) {
    case "formspree":
    case "endpoint": {
      if (!contact.endpoint) return { kind: "warn", text: "The form endpoint has not been configured yet." };
      const res = await fetch(contact.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return { kind: "ok" };
    }
    case "netlify": {
      const body = new URLSearchParams({ "form-name": contact.netlifyFormName, ...v });
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return { kind: "ok" };
    }
    case "mailto": {
      if (!contact.email) return { kind: "warn", text: "No contact email has been configured yet." };
      const subject = `Fernwood Cabin A partnership inquiry: ${v.company}`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(toText(v))}`;
      return { kind: "ok", text: "Your email app should open with the inquiry filled in. Send it from there." };
    }
    default:
      return {
        kind: "warn",
        text:
          process.env.NODE_ENV !== "production"
            ? "Development: no form provider is configured, so nothing was sent. See src/data/contact.ts and the README."
            : "Online inquiries are not connected yet, so nothing was sent.",
      };
  }
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Pre-fill the category when a "Discuss…" button elsewhere on the page is used.
  useEffect(() => {
    const onInterest = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) setValues((v) => ({ ...v, category: detail }));
    };
    window.addEventListener(INTEREST_EVENT, onInterest);
    return () => window.removeEventListener(INTEREST_EVENT, onInterest);
  }, []);

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (submitted) setErrors(validate(next)); // live re-validation after the first attempt
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const hp = (e.currentTarget.elements.namedItem("company_confirm") as HTMLInputElement | null)?.value;
    if (hp) return; // bot

    setSubmitted(true);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus({ kind: "idle" });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const result = await deliver(values);
      setStatus(result);
      if (result.kind === "ok" && contact.provider !== "mailto") {
        setValues(EMPTY);
        setSubmitted(false);
      }
    } catch {
      setStatus({
        kind: "err",
        text: contact.email
          ? `Something went wrong sending your inquiry. Please try again, or email ${contact.email}.`
          : "Something went wrong sending your inquiry. Please try again shortly.",
      });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const errorKeys = Object.keys(errors) as (keyof Values)[];
  const fieldProps = (k: keyof Values) => ({
    id: `f-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": [errors[k] ? `f-${k}-err` : "", k === "value" || k === "website" ? `f-${k}-hint` : ""].filter(Boolean).join(" ") || undefined,
  });
  const err = (k: keyof Values) =>
    errors[k] ? (
      <span className="field-error" id={`f-${k}-err`}>
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="6.5" fill="currentColor" /><path d="M7 3.5v4M7 9.6v.4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /></svg>
        {errors[k]}
      </span>
    ) : null;

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-describedby="form-note">
      {errorKeys.length > 0 && (
        <div className="error-summary" ref={summaryRef} tabIndex={-1} role="alert" aria-labelledby="err-sum-title">
          <h3 id="err-sum-title">Please fix {errorKeys.length === 1 ? "1 field" : `${errorKeys.length} fields`}</h3>
          <ul>
            {errorKeys.map((k) => (
              <li key={k}>
                <a href={k === "partnership" ? `#f-partnership-${contact.partnershipTypes[0].value}` : `#f-${k}`}>
                  {LABELS[k]}: {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="hp" aria-hidden="true">
        <label htmlFor="company_confirm">Leave this field empty</label>
        <input id="company_confirm" name="company_confirm" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="f-name">Name<span className="req" aria-hidden="true">*</span></label>
          <input type="text" autoComplete="name" required {...fieldProps("name")} />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="f-company">Company<span className="req" aria-hidden="true">*</span></label>
          <input type="text" autoComplete="organization" required {...fieldProps("company")} />
          {err("company")}
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="f-email">Email<span className="req" aria-hidden="true">*</span></label>
          <input type="email" autoComplete="email" inputMode="email" required {...fieldProps("email")} />
          {err("email")}
        </div>
        <div className="field">
          <label htmlFor="f-website">Website</label>
          <input type="url" autoComplete="url" inputMode="url" placeholder="company.com" {...fieldProps("website")} />
          <span className="hint" id="f-website-hint">Optional</span>
          {err("website")}
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-category">Product / category<span className="req" aria-hidden="true">*</span></label>
        <input type="text" list="category-options" required placeholder="e.g. Standing-seam roofing, windows, LED lighting" {...fieldProps("category")} />
        <datalist id="category-options">
          {sponsorCategories.filter((c) => c.status !== "owner-supplied").map((c) => <option key={c.id} value={c.name} />)}
        </datalist>
        {err("category")}
      </div>

      <fieldset aria-describedby={errors.partnership ? "f-partnership-err" : undefined}>
        <legend>Type of partnership<span className="req" aria-hidden="true">*</span></legend>
        <div className="radio-row">
          {contact.partnershipTypes.map((t) => (
            <label className="radio" key={t.value} htmlFor={`f-partnership-${t.value}`}>
              <input
                type="radio"
                id={`f-partnership-${t.value}`}
                name="partnership"
                value={t.value}
                checked={values.partnership === t.value}
                onChange={set("partnership")}
                aria-invalid={errors.partnership ? true : undefined}
              />
              {t.label}
            </label>
          ))}
        </div>
        {err("partnership")}
      </fieldset>

      <div className="field">
        <label htmlFor="f-value">Estimated contribution / value</label>
        <input type="text" placeholder="e.g. Roofing package, approx. $1,000 retail" {...fieldProps("value")} />
        <span className="hint" id="f-value-hint">Optional. A rough product value or budget is enough.</span>
      </div>

      <div className="field">
        <label htmlFor="f-message">Message<span className="req" aria-hidden="true">*</span></label>
        <textarea rows={6} required placeholder="What's the product, and where do you see it fitting into the build?" {...fieldProps("message")} />
        {err("message")}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
        <button type="submit" className="btn btn--primary" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending…" : "Send inquiry"}
        </button>
        <span className="hint" id="form-note"><span className="req">*</span> Required. {contact.responseNote}</span>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" style={{ outline: "none" }}>
        {status.kind === "ok" && (
          <div className="form-status form-status--ok">
            <strong>Thank you.</strong> {status.text ?? "Your inquiry has been sent."}
          </div>
        )}
        {status.kind === "warn" && (
          <div className="form-status form-status--warn">
            {status.text}
            {contact.email && (
              <> You can email <a href={`mailto:${contact.email}`}>{contact.email}</a> directly.</>
            )}
          </div>
        )}
        {status.kind === "err" && <div className="form-status form-status--err">{status.text}</div>}
      </div>
    </form>
  );
}
