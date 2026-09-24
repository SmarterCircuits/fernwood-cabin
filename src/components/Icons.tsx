export function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="6.2" r="1" fill="currentColor" />
    </svg>
  );
}

export function Chevron() {
  return (
    <svg className="chev" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M2 5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/** Brand mark: a fern frond inside a shed-roof outline. */
export function BrandMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M4 14 L28 7 V28 H4 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 26 V13" stroke="#8fb79a" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 23 l-4-2 M16 23 l4-2 M16 19.5 l-3.2-1.8 M16 19.5 l3.2-1.8 M16 16 l-2.4-1.4 M16 16 l2.4-1.4" stroke="#8fb79a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
