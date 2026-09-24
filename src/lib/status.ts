import type { MaterialStatus, PhaseStatus, SponsorStatus } from "./types";

/** Tone maps to a CSS modifier class on .chip (see globals.css). */
export type Tone = "open" | "active" | "done" | "owned" | "neutral" | "muted";

export const sponsorStatusMeta: Record<SponsorStatus, { label: string; tone: Tone; help: string }> = {
  seeking: { label: "Seeking sponsor", tone: "open", help: "Open to product or cash partners." },
  "in-discussion": { label: "In discussion", tone: "active", help: "Conversations under way; not yet confirmed." },
  sponsored: { label: "Sponsored", tone: "done", help: "A partner agreement is in place." },
  "owner-supplied": { label: "Owner supplied", tone: "owned", help: "Already owned or provided by the project owner." },
  purchased: { label: "Purchased", tone: "neutral", help: "Bought by the project." },
  completed: { label: "Completed", tone: "done", help: "Partnership delivered and installed." },
  "not-applicable": { label: "—", tone: "muted", help: "Not offered as a sponsorship category." },
};

export const materialStatusMeta: Record<MaterialStatus, { label: string; tone: Tone }> = {
  estimated: { label: "Estimated", tone: "muted" },
  selected: { label: "Selected", tone: "active" },
  purchased: { label: "Purchased", tone: "neutral" },
  installed: { label: "Installed", tone: "done" },
  "owner-supplied": { label: "Owner supplied", tone: "owned" },
};

export const phaseStatusMeta: Record<PhaseStatus, { label: string; tone: Tone }> = {
  complete: { label: "Complete", tone: "done" },
  "in-progress": { label: "In progress", tone: "active" },
  next: { label: "Up next", tone: "open" },
  planned: { label: "Planned", tone: "muted" },
  stretch: { label: "Stretch phase", tone: "owned" },
};

/** Sponsor states whose value counts toward the "sponsor-covered" total. */
export const COVERED_STATUSES: SponsorStatus[] = ["sponsored", "completed"];
