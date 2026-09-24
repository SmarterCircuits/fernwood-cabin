import { CONTINGENCY_RATE, materialGroups, materials } from "@/data/materials";
import { sponsorCategories } from "@/data/sponsors";
import { COVERED_STATUSES } from "./status";
import { cents } from "./format";
import type { MaterialItem, SponsorStatus } from "./types";

const categoryStatus = new Map(sponsorCategories.map((c) => [c.id, c.status]));

export const subtotal = (m: MaterialItem) => cents(m.quantity * m.unitCost);

/** A line's sponsor status: its own override, else its sponsor category's. */
export function effectiveSponsorStatus(m: MaterialItem): SponsorStatus {
  if (m.sponsorStatus) return m.sponsorStatus;
  if (m.status === "owner-supplied") return "owner-supplied";
  return (m.sponsorCategory && categoryStatus.get(m.sponsorCategory)) || "not-applicable";
}

export function coveredAmount(m: MaterialItem) {
  if (!COVERED_STATUSES.includes(effectiveSponsorStatus(m))) return 0;
  return m.sponsorCoveredAmount ?? subtotal(m);
}

export interface BudgetTotals {
  base: number;
  contingency: number;
  working: number;
  optional: number;
  sponsorCovered: number;
  purchased: number;
  remaining: number;
}

export function computeTotals(items: MaterialItem[] = materials): BudgetTotals {
  let base = 0;
  let optional = 0;
  let sponsorCovered = 0;
  let purchased = 0;
  for (const m of items) {
    const s = subtotal(m);
    if (m.optional) {
      optional += s;
      continue;
    }
    base += s;
    sponsorCovered += coveredAmount(m);
    if (m.status === "purchased" || m.status === "installed") purchased += s - coveredAmount(m);
  }
  base = cents(base);
  const contingency = cents(base * CONTINGENCY_RATE);
  const working = cents(base + contingency);
  return {
    base,
    contingency,
    working,
    optional: cents(optional),
    sponsorCovered: cents(sponsorCovered),
    purchased: cents(purchased),
    // Remaining = what still has to be funded out of the working budget.
    remaining: cents(working - sponsorCovered - purchased),
  };
}

export function totalsByGroup(items: MaterialItem[] = materials) {
  return materialGroups
    .map((g) => ({
      ...g,
      total: cents(items.filter((m) => m.group === g.id && !m.optional).reduce((a, m) => a + subtotal(m), 0)),
      count: items.filter((m) => m.group === g.id).length,
    }))
    .filter((g) => g.count > 0);
}
