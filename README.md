# Fernwood Cabin A: sponsor microsite

A static, single-page project site for **Fernwood Cabin A**, a 12×16 off-grid cabin at Fernwood, a wooded property in Oscoda County, Michigan, documented on **Smarter Circuits**. It explains the build to potential product and cash sponsors, shows the full materials estimate, and collects partnership inquiries.

- **Stack:** Next.js 16 (static export), React 19, TypeScript, plain CSS. No UI or runtime libraries beyond Next/React.
- **Output:** a fully static site in `out/`, deployable to Vercel, Netlify, Cloudflare Pages or any static host.
- **Content lives in `src/data/`**, separate from layout. Totals, diagrams and statuses are computed from that data.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000, with dev-only placeholder warnings
npm run build        # static site → ./out (warns about remaining placeholders)
npm run build:strict # same, but FAILS if any placeholder remains; use before sending the site out
npm run typecheck
npm start            # serves ./out locally (npx serve)
```

Requires Node 20.9+. TypeScript is pinned to 5.x on purpose: Next's build-time type check uses the TypeScript 5 JavaScript API, which the native TypeScript 7 compiler does not provide.

---

## Where to update things

| What | File | Notes |
|---|---|---|
| **Live channel stats (hero row)** | automatic: `src/data/channel-stats.json` | Refreshed daily by the deploy workflow from the YouTube Data API once the `YOUTUBE_API_KEY` secret is set (see below). You can also add past snapshots by hand, e.g. from YouTube Studio, to improve the growth figure. |
| **Channel statistics** | `src/data/channel.ts` → `channelMetrics` | Set `value` (display string) **and** `asOf` (`"YYYY-MM"`), and ideally `note` (source). `null` values never render as numbers. |
| YouTube channel URL | `src/data/channel.ts` → `channel.youtubeUrl` | Adds "Visit on YouTube" links when set. |
| **Sponsor statuses** | `src/data/sponsors.ts` → `sponsorCategories[].status` | One of `seeking`, `in-discussion`, `sponsored`, `owner-supplied`, `purchased`, `completed`. Updates the category grid, materials table, phase cards and sponsor-covered total. |
| Featured opportunity cards | `src/data/sponsors.ts` → `featuredOpportunities` | `status`, plus optional `statusLabel` (e.g. "Seeking product partners"). |
| **Material prices and quantities** | `src/data/materials.ts` → `materials` | `quantity × unitCost` = subtotal. Base, contingency, working budget, chart, and filtered totals are all computed. |
| Per-line sponsor coverage | `src/data/materials.ts` | Optional `sponsorStatus` override and `sponsorCoveredAmount` for partial coverage. |
| Material lifecycle | `src/data/materials.ts` → `status` | `estimated`, `selected`, `purchased`, `installed`, `owner-supplied`. |
| Contingency rate / public budget line | `src/data/materials.ts` | `CONTINGENCY_RATE`, `PUBLIC_BUDGET_SUMMARY` |
| **Project phases** | `src/data/phases.ts` | `status`, `completedOn` (only when actually done), `photos`, `videos`. |
| **Photos** | `public/media/` + `src/data/media.ts` | Drop the file in `public/media/`, set the slot's `src: "/media/file.jpg"` and a specific `alt`. |
| **Contact details / form delivery** | `src/data/contact.ts` (or env vars) | See [Contact form](#contact-form). |
| Project facts, dimensions, cut lists | `src/data/project.ts` | Feeds the diagrams, spec tables, and framing take-off. |
| FAQ | `src/data/faq.ts` | Array of `{ q, a: [paragraphs] }`. |
| SEO, domain, nav | `src/data/site.ts` | Domain via `NEXT_PUBLIC_SITE_URL`. |
| Social preview image | `public/og-image.png` | Currently a text-only placeholder (1200×630). |
| Favicon | `src/app/icon.svg` | Placeholder mark. |

---

## Placeholders to replace before production

`npm run build` lists everything outstanding, `npm run dev` shows a checklist panel in the corner, and `npm run build:strict` refuses to build while any remain.

1. **Channel metrics** (all six): subscribers, monthly views, average views, annual growth, audience geography, sponsor/project video performance. `src/data/channel.ts`. Until they're filled, production shows "Available on request". The historical figure (≈ 5,250 subscribers, June 2026) is kept only as a code comment and is not published.
2. **YouTube channel URL:** `src/data/channel.ts`.
3. **Sponsorship contact email:** `src/data/contact.ts` → `email`. Not invented.
4. ~~Contact form provider~~: done (Web3Forms).
5. **Production domain:** `NEXT_PUBLIC_SITE_URL`. Enables canonical URL, `og:url`, and absolute social image URLs. No domain is assumed.
6. **Photos:** 9 slots in `src/data/media.ts` (property, cabin site, forest, drawings, tools & materials, construction progress, three YouTube thumbnails).
7. **Social preview image:** `public/og-image.png` (replace with a real project photo at 1200×630).
8. **Favicon:** `src/app/icon.svg`.

Also **verify before publishing** (these are not auto-detected):

- **Phase statuses** in `src/data/phases.ts`. Currently only "Property acquired" is `complete` and "Site assessment" is `in-progress`; everything else is `planned`, with the wood stove as `stretch`. Adjust to reality.
- **Material line-item breakdown** in `src/data/materials.ts`. Framing, posts, concrete, sheet goods, doors and windows use the brief's quantities and approximate prices. The remaining groups (roofing, insulation, envelope, siding, interior, fixtures, plumbing, electrical, heating, hardware) split the brief's category figures and ranges into line items marked **Allowance**. The lines reconcile exactly to the stated **$18,735.60** base (→ $2,810.34 contingency → $21,545.94 working budget). Swap in the detailed estimate's actual lines when convenient; totals recompute automatically.

---

## Contact form

The form has full client-side validation: required fields, email and URL format, an error summary that takes focus and links to each field, `aria-invalid`/`aria-describedby` on fields, and a honeypot field.

**Active provider: [Web3Forms](https://web3forms.com)** (free plan). Submissions are emailed to the address the access key was created for; change that address in the Web3Forms dashboard, not in this repo. The key lives in `src/data/contact.ts` (`web3formsKey`, or override with `NEXT_PUBLIC_WEB3FORMS_KEY`). It is designed to be public: it can only deliver to your inbox. Web3Forms only accepts submissions from real browsers; server-side or scripted requests are rejected on the free plan.

Other supported providers:

| Provider | Setup |
|---|---|
| **Formspree** | `NEXT_PUBLIC_CONTACT_PROVIDER=formspree`, `NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/<id>` |
| **Netlify Forms** | `NEXT_PUBLIC_CONTACT_PROVIDER=netlify`. `public/__forms.html` registers the `sponsor-inquiry` form at deploy time. Enable form detection in the Netlify UI. |
| **Your own API / serverless function** | `NEXT_PUBLIC_CONTACT_PROVIDER=endpoint`, `NEXT_PUBLIC_CONTACT_ENDPOINT=/api/inquiry`. Receives a JSON POST. See `docs/examples/resend-relay.ts` for a Resend relay that works on Vercel, Netlify, or Cloudflare Pages Functions. |
| **mailto** | `provider: "mailto"` + `email`. Opens the visitor's mail app pre-filled. |
| **none** (default) | Validates, but tells the visitor nothing was sent. It never pretends to succeed. |

You can set these in `src/data/contact.ts` instead of env vars. `NEXT_PUBLIC_*` vars are baked in at build time, so rebuild after changing them.

"Discuss this…" buttons on the sponsor cards jump to the form and pre-fill the product/category field.

---

## Deployment

The site is a static export (`output: "export"` in `next.config.ts`).

- **GitHub Pages (configured):** `.github/workflows/deploy.yml` builds and publishes on every push to `main`, for the custom domain `https://cabin.smartercircuits.com`. One-time setup:
  1. Repo **Settings → Pages → Source: GitHub Actions**.
  2. **Settings → Pages → Custom domain:** `cabin.smartercircuits.com`, then tick **Enforce HTTPS** once the certificate is issued. (Workflow-based deploys ignore `CNAME` files, so the domain is set here.)
  3. DNS at your domain host: a `CNAME` record for `cabin` pointing to `<your-github-username>.github.io`.
  4. Contact form: already connected through Web3Forms (see [Contact form](#contact-form)). To switch providers, set repository **variables** `CONTACT_PROVIDER` and `CONTACT_ENDPOINT` under Settings → Secrets and variables → Actions → Variables.
  5. On GitHub's free plan, Pages needs a public repository.
- **Vercel:** import the repo; framework preset Next.js. Set env vars in project settings.
- **Netlify:** build command `npm run build`, publish directory `out`.
- **Cloudflare Pages:** build command `npm run build`, output directory `out`, `NODE_VERSION=20` or higher.
- **Any static host:** upload `out/`.

For a pre-send gate, use `npm run build:strict` as the build command in production.

---

## Project structure

```
src/
  app/            layout (metadata, fonts), page (section order, JSON-LD, build-time placeholder check), globals.css, icon.svg
  components/     header, hero, diagrams (CabinElevation, PlanDiagrams), BudgetExplorer, CategoryBrowser, ContactForm, …
    sections/     one component per page section
  data/           ALL editable content (see table above)
  lib/            types, status vocabulary, budget math, formatting, placeholder detection
public/           og-image.png, __forms.html (Netlify), media/ (your photos)
docs/examples/    Resend relay example, OG image generator
```

### Live YouTube stats

The row beneath the hero facts shows Smarter Circuits subscribers, total views, video count and subscriber growth, read from `src/data/channel-stats.json` at build time.

- **Updating:** the deploy workflow runs daily at 11:00 UTC (and on every push). When the repository secret `YOUTUBE_API_KEY` exists, `scripts/update-channel-stats.mjs` records a snapshot for the day, commits it, and the site redeploys with the new numbers. Without the secret the last recorded numbers stay up.
- **Getting a key (free):** Google Cloud Console → create a project → enable **YouTube Data API v3** → Credentials → Create API key (restrict it to the YouTube Data API). Then: `gh secret set YOUTUBE_API_KEY` (paste the key when prompted). The daily run uses 1 of the 10,000 free quota units.
- **Growth:** measured over the past 12 months once a year of snapshots exists; until then, from the earliest snapshot, and the row shows which ("since Jun 2026"). The first baseline is the approximate June 2026 figure (≈ 5,250), marked "approx." on the site; replace or remove it in the JSON if you have an exact number.
- YouTube rounds public subscriber counts to three significant figures (e.g. 5.89K), so small day-to-day changes may not show.

### Content rules built into the site

- Nothing claims permits, engineering approval, code compliance or structural certification. Diagrams are stamped *conceptual / not for construction*. Post layout is drawn schematically, with no fabricated spacing.
- Owner-supplied equipment (batteries, charge controllers, two 3,000 W inverters, wood stove) is shown for transparency, excluded from all totals, and never listed as a sponsorship need.
- The two inverter systems are shown as independent, not paralleled.
- No sponsors, testimonials, metrics or completion dates are invented. Placeholders can't appear in production as real data.
- Editorial standards are stated plainly: no promised positive reviews, no raw footage, and no whitelisting as a standard deliverable.

### Accessibility

Semantic landmarks, skip link, keyboard-operable nav, filters, accordions and chart bars, visible focus rings, `prefers-reduced-motion` and `forced-colors` support, 44 px touch targets, and text alternatives for every diagram. The materials table becomes stacked cards below 760 px. The elevation drawing scrolls horizontally on phones.
