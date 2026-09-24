/**
 * Shared content types. Every data file in src/data/ is typed against these,
 * so a typo in a status value is caught by `npm run typecheck` / `npm run build`.
 */

/** Sponsorship state of a category, opportunity, or material line. */
export type SponsorStatus =
  | "seeking" // Seeking sponsor
  | "in-discussion" // In discussion
  | "sponsored" // Sponsored (agreement in place)
  | "owner-supplied" // Owner supplied — not a sponsorship need
  | "purchased" // Purchased by the project
  | "completed" // Partnership delivered / installed
  | "not-applicable"; // Not a sponsorship category (e.g. commodity consumables)

/** Where a material line is in its lifecycle. */
export type MaterialStatus =
  | "estimated" // Quantity/price is a planning estimate
  | "selected" // Specific product chosen
  | "purchased" // Bought, on hand
  | "installed" // In the building
  | "owner-supplied"; // Already owned

/** Where a build phase is. */
export type PhaseStatus = "complete" | "in-progress" | "next" | "planned" | "stretch";

export interface MaterialItem {
  id: string;
  /** Budget group — drives the category filter and the budget breakdown chart. */
  group: MaterialGroupId;
  /** Fine-grained material category (e.g. "Structural lumber"). */
  category: string;
  item: string;
  spec: string;
  quantity: number;
  unit: string;
  /** Estimated unit cost in USD. Subtotal = quantity × unitCost (computed). */
  unitCost: number;
  status: MaterialStatus;
  /**
   * Sponsor category this line belongs to (id from src/data/sponsors.ts).
   * The line inherits that category's sponsor status unless `sponsorStatus`
   * overrides it below.
   */
  sponsorCategory?: string;
  /** Per-line override of the inherited sponsor status. */
  sponsorStatus?: SponsorStatus;
  /**
   * Dollar value covered by a sponsor when only part of the line is covered.
   * If omitted and the line's effective status is "sponsored" or "completed",
   * the full subtotal counts as sponsor-covered.
   */
  sponsorCoveredAmount?: number;
  /** Optional lines are shown but excluded from the base estimate. */
  optional?: boolean;
  note?: string;
}

export type MaterialGroupId =
  | "structure"
  | "sheathing"
  | "openings"
  | "roofing"
  | "insulation"
  | "envelope"
  | "siding"
  | "interior"
  | "fixtures"
  | "plumbing"
  | "electrical"
  | "heating"
  | "hardware";

export interface MaterialGroup {
  id: MaterialGroupId;
  label: string;
  /** Planning range quoted publicly for this group, if any. */
  rangeNote?: string;
}

export interface OwnerSuppliedItem {
  item: string;
  note: string;
}

export interface SponsorCategory {
  id: string;
  name: string;
  group: SponsorGroupId;
  status: SponsorStatus;
  /** Where the product fits in the build — shown on the card. */
  fit: string;
  /** Build phase ids (src/data/phases.ts) where this category appears on camera. */
  phases?: string[];
  /** Optional short public note, e.g. "Core hardware already owned". */
  statusNote?: string;
}

export type SponsorGroupId =
  | "structure"
  | "roof-solar"
  | "envelope"
  | "openings-exterior"
  | "interior"
  | "plumbing-water"
  | "electrical-energy"
  | "heating-air"
  | "tools-jobsite";

export interface FeaturedOpportunity {
  id: string;
  title: string;
  needed: string;
  detail: string;
  status: SponsorStatus;
  /** Overrides the default status label, e.g. "Seeking product partners". */
  statusLabel?: string;
  /** Sponsor category ids this opportunity covers (used for the contact form). */
  categories: string[];
  phases: string[];
}

export interface MediaLink {
  label: string;
  url: string;
}

export interface BuildPhase {
  id: string;
  title: string;
  status: PhaseStatus;
  summary: string;
  /** Plain-language material needs for the phase. */
  materials: string[];
  /** Sponsor category ids relevant to this phase. */
  sponsorCategories: string[];
  /** ISO date (YYYY-MM-DD) — only fill once the phase is actually complete. */
  completedOn?: string;
  /** Photo ids from src/data/media.ts. */
  photos?: string[];
  videos?: MediaLink[];
}

export interface ChannelMetric {
  id: string;
  label: string;
  /** Verified value as it should be displayed, e.g. "12,400". null = placeholder. */
  value: string | null;
  /** When the value was verified, e.g. "2026-09". Required alongside a value. */
  asOf: string | null;
  /** Source or context shown under the number, e.g. "YouTube Studio, last 28 days". */
  note?: string;
}

export interface MediaSlot {
  id: string;
  label: string;
  /** What photo belongs here — shown in the placeholder during development. */
  brief: string;
  /** Path under /public (e.g. "/media/property-01.jpg") or absolute URL. null = placeholder. */
  src: string | null;
  alt: string;
  caption?: string;
  /** Aspect ratio of the frame, e.g. "4 / 3". */
  aspect?: string;
}

export interface FaqItem {
  q: string;
  /** Paragraphs of the answer. */
  a: string[];
}
