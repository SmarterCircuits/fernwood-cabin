const usd0 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const usd2 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
const num = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

export const money = (n: number) => usd2.format(n);
export const moneyRound = (n: number) => usd0.format(n);
export const qty = (n: number) => num.format(n);

/** Round to cents without floating-point drift. */
export const cents = (n: number) => Math.round(n * 100) / 100;

/** "2026-09-24" → "Sep 2026" */
export function monthYear(iso: string) {
  const d = new Date(iso + (iso.length === 7 ? "-01" : "") + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

const FRACTIONS: Record<number, string> = { 1: "⅛", 2: "¼", 3: "⅜", 4: "½", 5: "⅝", 6: "¾", 7: "⅞" };

/** 143.5 → "11′ 11½″" (rounded to the nearest 1/8 in). */
export function feetInches(totalIn: number) {
  const eighths = Math.round(totalIn * 8);
  const ft = Math.floor(eighths / 96);
  const remEighths = eighths - ft * 96;
  const inches = Math.floor(remEighths / 8);
  const frac = FRACTIONS[remEighths % 8] ?? "";
  if (!inches && !frac) return `${ft}′`;
  return `${ft}′ ${inches || ""}${frac}″`;
}

const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 });
/** 5890 → "5.89K" */
export const compactNum = (n: number) => compact.format(n);

/** "2026-09-24" → "Sep 24, 2026" */
export function longDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
