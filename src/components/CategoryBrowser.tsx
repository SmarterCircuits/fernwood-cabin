"use client";

import { useMemo, useState } from "react";
import { phases } from "@/data/phases";
import { sponsorCategories, sponsorGroups } from "@/data/sponsors";
import { sponsorStatusMeta } from "@/lib/status";
import type { SponsorStatus } from "@/lib/types";
import { SponsorChip } from "./Chip";
import { InterestButton } from "./InterestButton";

const phaseTitle = new Map(phases.map((p) => [p.id, p.title]));
const ORDER: SponsorStatus[] = ["seeking", "in-discussion", "sponsored", "completed", "purchased", "owner-supplied"];

export function CategoryBrowser() {
  const [filter, setFilter] = useState<SponsorStatus | "all">("all");

  const counts = useMemo(() => {
    const c: Partial<Record<SponsorStatus, number>> = {};
    for (const cat of sponsorCategories) c[cat.status] = (c[cat.status] ?? 0) + 1;
    return c;
  }, []);

  const visible = sponsorCategories.filter((c) => filter === "all" || c.status === filter);

  return (
    <>
      <div className="status-filter" role="group" aria-label="Filter categories by status">
        <button type="button" className="toggle" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
          All <span className="count">{sponsorCategories.length}</span>
        </button>
        {ORDER.filter((s) => counts[s]).map((s) => (
          <button key={s} type="button" className="toggle" aria-pressed={filter === s} onClick={() => setFilter(s)}>
            {sponsorStatusMeta[s].label} <span className="count">{counts[s]}</span>
          </button>
        ))}
      </div>

      <p className="visually-hidden" aria-live="polite">
        {visible.length} categories shown
      </p>

      {sponsorGroups.map((g) => {
        const cats = visible.filter((c) => c.group === g.id);
        if (!cats.length) return null;
        return (
          <div className="cat-group" key={g.id}>
            <h3>{g.label}</h3>
            <div className="cat-grid">
              {cats.map((c) => (
                <article className="cat-card" key={c.id} aria-labelledby={`cat-${c.id}`}>
                  <header>
                    <h4 id={`cat-${c.id}`}>{c.name}</h4>
                    <SponsorChip status={c.status} />
                  </header>
                  <p>{c.fit}</p>
                  {c.statusNote && <p className="note">{c.statusNote}</p>}
                  {c.phases?.length ? (
                    <p style={{ fontSize: "0.78rem" }}>
                      <span className="kicker">Appears in: </span>
                      {c.phases.map((id) => phaseTitle.get(id)).filter(Boolean).join(" · ")}
                    </p>
                  ) : null}
                  {(c.status === "seeking" || c.status === "in-discussion") && (
                    <InterestButton category={c.name}>
                      Discuss this category<span className="visually-hidden">: {c.name}</span>
                    </InterestButton>
                  )}
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
