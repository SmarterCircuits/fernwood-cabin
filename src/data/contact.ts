/**
 * CONTACT CONFIGURATION
 * ------------------------------------------------------------------
 * No backend is included. Choose ONE provider and fill the matching fields,
 * or set NEXT_PUBLIC_CONTACT_PROVIDER / NEXT_PUBLIC_CONTACT_ENDPOINT.
 *
 *   "formspree" — endpoint: "https://formspree.io/f/<id>"   (JSON POST)
 *   "endpoint"  — endpoint: any URL accepting a JSON POST (your own API route,
 *                 a Cloudflare/Netlify/Vercel function, a Resend relay — see
 *                 docs/examples/)
 *   "netlify"   — Netlify Forms; no endpoint needed (public/__forms.html
 *                 registers the form at deploy time)
 *   "mailto"    — opens the visitor's mail client addressed to `email`
 *   "none"      — form validates but cannot send; shows a clear notice
 *
 * The creator's email address is intentionally NOT filled in. Add the real
 * address below once decided.
 */

export type ContactProvider = "none" | "formspree" | "endpoint" | "netlify" | "mailto";

const envProvider = process.env.NEXT_PUBLIC_CONTACT_PROVIDER as ContactProvider | undefined;

export const contact = {
  provider: (envProvider || "none") as ContactProvider,
  endpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || (null as string | null),
  /** PLACEHOLDER — public sponsorship contact email. */
  email: null as string | null,
  /** Netlify form name; must match public/__forms.html. */
  netlifyFormName: "sponsor-inquiry",
  responseNote: "Inquiries are read personally. Please allow a few business days for a reply.",
  partnershipTypes: [
    { value: "product", label: "Product" },
    { value: "cash", label: "Cash sponsorship" },
    { value: "combination", label: "Product + cash" },
    { value: "other", label: "Other" },
  ],
};
