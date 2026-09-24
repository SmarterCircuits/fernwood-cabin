import { phases } from "@/data/phases";
import { sponsorCategories } from "@/data/sponsors";
import { phaseStatusMeta } from "@/lib/status";
import { monthYear } from "@/lib/format";
import type { PhaseStatus } from "@/lib/types";
import { PhaseChip, SponsorChip } from "../Chip";
import { Chevron } from "../Icons";
import { ImageSlot } from "../ImageSlot";
import { SectionHeader } from "../SectionHeader";

const catById = new Map(sponsorCategories.map((c) => [c.id, c]));

const barColor: Record<PhaseStatus, string> = {
  complete: "var(--forest)",
  "in-progress": "var(--forest-2)",
  next: "var(--accent)",
  planned: "transparent",
  stretch: "transparent",
};

export function Phases() {
  const core = phases.filter((p) => p.status !== "stretch");
  const counts = core.reduce<Record<string, number>>((a, p) => ((a[p.status] = (a[p.status] ?? 0) + 1), a), {});
  const done = counts.complete ?? 0;

  return (
    <section className="section" id="phases" aria-labelledby="phases-title">
      <div className="container">
        <SectionHeader index="05" eyebrow="Build Phases" title="One system at a time" id="phases-title">
          <p>
            The cabin is built in phases, and each one is documented. Open a phase to see its materials and where partner products fit. Photos,
            videos and completion dates are added only as phases are actually finished.
          </p>
        </SectionHeader>

        <div className="progress">
          <div
            className="progress-bar"
            role="img"
            aria-label={`${done} of ${core.length} core phases complete`}
          >
            {core.map((p) => (
              <span key={p.id} style={{ flex: 1, background: barColor[p.status] }} />
            ))}
          </div>
          <p className="mono" style={{ margin: 0, fontSize: "0.85rem" }}>
            {done} / {core.length} phases complete
          </p>
          <div className="progress-legend">
            {(Object.keys(phaseStatusMeta) as PhaseStatus[])
              .filter((s) => counts[s] || s === "stretch")
              .map((s) => (
                <PhaseChip key={s} status={s} />
              ))}
          </div>
        </div>

        <ol className="timeline">
          {phases.map((p, i) => (
            <li className="phase" key={p.id} data-status={p.status}>
              <span className="phase-marker" aria-hidden="true">
                {p.status === "complete" ? "✓" : p.status === "stretch" ? "+" : String(i + 1).padStart(2, "0")}
              </span>
              <details className="phase-card" open={p.status === "in-progress" || p.status === "next"}>
                <summary>
                  <h3>
                    <span className="visually-hidden">Phase {i + 1}: </span>
                    {p.title}
                  </h3>
                  <span className="phase-head-right">
                    {p.completedOn && <span className="mono muted" style={{ fontSize: "0.8rem" }}>{monthYear(p.completedOn)}</span>}
                    <PhaseChip status={p.status} />
                    <Chevron />
                  </span>
                  <p>{p.summary}</p>
                </summary>
                <div className="phase-body">
                  <div>
                    <h4>Material needs</h4>
                    {p.materials.length ? (
                      <ul>{p.materials.map((m) => <li key={m}>{m}</li>)}</ul>
                    ) : (
                      <p className="muted" style={{ fontSize: "0.9rem" }}>No major materials.</p>
                    )}
                  </div>
                  <div>
                    <h4>Partner opportunities</h4>
                    {p.sponsorCategories.length ? (
                      <ul className="chip-list">
                        {p.sponsorCategories.map((id) => {
                          const c = catById.get(id);
                          if (!c) return null;
                          return (
                            <li key={id}>
                              <SponsorChip status={c.status} label={c.name} />
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="muted" style={{ fontSize: "0.9rem" }}>None for this phase.</p>
                    )}
                  </div>
                  <div>
                    <h4>Media</h4>
                    {p.photos?.length ? (
                      <div style={{ display: "grid", gap: 8 }}>{p.photos.map((id) => <ImageSlot key={id} id={id} />)}</div>
                    ) : null}
                    {p.videos?.length ? (
                      <ul style={{ marginTop: 8 }}>
                        {p.videos.map((v) => (
                          <li key={v.url}>
                            <a href={v.url} target="_blank" rel="noopener noreferrer">{v.label}</a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      !p.photos?.length && <p className="muted" style={{ fontSize: "0.9rem" }}>Photos and videos will be added as this phase is documented.</p>
                    )}
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ol>

        <div className="grid grid-2" style={{ marginTop: 28 }}>
          <ImageSlot id="progress" />
          <ImageSlot id="materials" />
        </div>
      </div>
    </section>
  );
}
