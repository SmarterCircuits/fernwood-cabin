"use client";

import { useState } from "react";
import type { Placeholder } from "@/lib/placeholders";

/** Rendered only in `next dev`. Lists content that must be replaced before production. */
export function DevPanel({ items }: { items: Placeholder[] }) {
  const [open, setOpen] = useState(false);
  if (!items.length) return null;
  return (
    <aside className="dev-panel" aria-label="Development checklist">
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {items.length} placeholder{items.length === 1 ? "" : "s"} to replace
      </button>
      {open && (
        <div className="dev-body">
          <strong>Replace before production</strong> (dev only; this panel is not built into production)
          <ul>
            {items.map((p) => (
              <li key={p.what}>
                {p.what}
                <br />
                <code>{p.where}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
