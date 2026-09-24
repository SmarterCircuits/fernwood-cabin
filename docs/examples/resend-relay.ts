/**
 * EXAMPLE ONLY — not compiled with the site (docs/ is excluded in tsconfig).
 *
 * A tiny serverless relay that receives the contact form's JSON POST and
 * emails it with Resend (https://resend.com). Works as:
 *   - Vercel:            api/inquiry.ts       (export default handler below)
 *   - Netlify Functions:  netlify/functions/inquiry.ts
 *   - Cloudflare Pages:   functions/api/inquiry.ts  (use onRequestPost)
 *
 * Then set:
 *   NEXT_PUBLIC_CONTACT_PROVIDER=endpoint
 *   NEXT_PUBLIC_CONTACT_ENDPOINT=/api/inquiry
 * and on the host:
 *   RESEND_API_KEY=...        INQUIRY_TO=you@yourdomain    INQUIRY_FROM=site@yourdomain
 */

type Inquiry = {
  name: string;
  company: string;
  email: string;
  website?: string;
  category: string;
  partnership: string;
  value?: string;
  message: string;
};

const required: (keyof Inquiry)[] = ["name", "company", "email", "category", "partnership", "message"];

export async function handleInquiry(body: unknown, env: Record<string, string | undefined>) {
  const data = body as Partial<Inquiry>;
  for (const k of required) {
    if (typeof data[k] !== "string" || !data[k]!.trim()) return { status: 400, body: { error: `Missing ${k}` } };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email!)) return { status: 400, body: { error: "Invalid email" } };

  const text = [
    `Name: ${data.name}`,
    `Company: ${data.company}`,
    `Email: ${data.email}`,
    `Website: ${data.website || "—"}`,
    `Product / category: ${data.category}`,
    `Partnership type: ${data.partnership}`,
    `Estimated value: ${data.value || "—"}`,
    "",
    data.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.INQUIRY_FROM,
      to: env.INQUIRY_TO,
      reply_to: data.email,
      subject: `Fernwood Cabin A partnership inquiry: ${data.company}`,
      text,
    }),
  });
  return res.ok ? { status: 200, body: { ok: true } } : { status: 502, body: { error: "Email provider error" } };
}

// Vercel / Netlify (Web-standard Request/Response)
export default async function handler(req: Request) {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const result = await handleInquiry(await req.json().catch(() => ({})), process.env);
  return Response.json(result.body, { status: result.status });
}

// Cloudflare Pages Functions
export const onRequestPost = async ({ request, env }: { request: Request; env: Record<string, string> }) => {
  const result = await handleInquiry(await request.json().catch(() => ({})), env);
  return Response.json(result.body, { status: result.status });
};
