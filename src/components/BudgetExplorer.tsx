"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { materialGroups, materials } from "@/data/materials";
import { computeTotals, effectiveSponsorStatus, subtotal, totalsByGroup } from "@/lib/budget";
import { money, moneyRound, qty } from "@/lib/format";
import { sponsorStatusMeta } from "@/lib/status";
import type { MaterialGroupId, SponsorStatus } from "@/lib/types";
import { MaterialChip, SponsorChip } from "./Chip";

const groupLabel = new Map(materialGroups.map((g) => [g.id, g.label]));

export function BudgetExplorer() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<MaterialGroupId | "all">("all");
  const [sponsor, setSponsor] = useState<SponsorStatus | "all">("all");
  const [showAll, setShowAll] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const byGroup = useMemo(() => totalsByGroup(), []);
  const maxGroup = Math.max(...byGroup.map((g) => g.total));
  const sortedGroups = useMemo(() => [...byGroup].sort((a, b) => b.total - a.total), [byGroup]);

  const sponsorOptions = useMemo(
    () => Array.from(new Set(materials.map(effectiveSponsorStatus))) as SponsorStatus[],
    [],
  );

  const rows = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return materials.filter((m) => {
      if (group !== "all" && m.group !== group) return false;
      if (sponsor !== "all" && effectiveSponsorStatus(m) !== sponsor) return false;
      if (!q) return true;
      return [m.item, m.spec, m.category, groupLabel.get(m.group), m.note].some((f) => f?.toLowerCase().includes(q));
    });
  }, [deferredQuery, group, sponsor]);

  const filtered = computeTotals(rows);
  const isFiltered = group !== "all" || sponsor !== "all" || deferredQuery.trim() !== "";
  const PREVIEW = 15;
  const visibleRows = isFiltered || showAll ? rows : rows.slice(0, PREVIEW);
  const activeGroup = group !== "all" ? materialGroups.find((g) => g.id === group) : undefined;

  const reset = () => {
    setQuery("");
    setGroup("all");
    setSponsor("all");
  };

  return (
    <>
      {/* Category breakdown — single series, sorted, direct labels; click to filter */}
      <div className="card card--flat" style={{ marginBottom: 28 }}>
        <div className="diagram-title">
          <h3>Base estimate by category</h3>
          <span className="muted" style={{ fontSize: "0.85rem" }}>Select a bar to filter the list below</span>
        </div>
        <ul className="bars">
          {sortedGroups.map((g) => {
            const share = (g.total / computeTotals().base) * 100;
            return (
              <li
                key={g.id}
                className="bar-row"
                data-active={group === g.id}
                data-dim={group !== "all" && group !== g.id}
              >
                <button
                  type="button"
                  aria-pressed={group === g.id}
                  onClick={() => setGroup(group === g.id ? "all" : g.id)}
                  aria-label={`${g.label}: ${moneyRound(g.total)}, ${share.toFixed(1)}% of base estimate. Filter list`}
                >
                  <span className="bar-label">{g.label}</span>
                  <span className="bar-track" aria-hidden="true">
                    <span className="bar-fill" style={{ width: `${(g.total / maxGroup) * 100}%` }} />
                    <span className="bar-tip">
                      {g.label} · {money(g.total)} · {share.toFixed(1)}% · {g.count} lines
                    </span>
                  </span>
                  <span className="bar-value">{moneyRound(g.total)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="filters" role="search" aria-label="Filter materials">
        <div className="field">
          <label htmlFor="mat-search">Search materials</label>
          <input
            id="mat-search"
            type="search"
            placeholder="e.g. PEX, 2x12, window…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="field">
          <label htmlFor="mat-group">Category</label>
          <select id="mat-group" value={group} onChange={(e) => setGroup(e.target.value as MaterialGroupId | "all")}>
            <option value="all">All categories</option>
            {materialGroups.map((g) => (
              <option key={g.id} value={g.id}>{g.label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="mat-sponsor">Sponsor status</label>
          <select id="mat-sponsor" value={sponsor} onChange={(e) => setSponsor(e.target.value as SponsorStatus | "all")}>
            <option value="all">Any status</option>
            {sponsorOptions.map((s) => (
              <option key={s} value={s}>{s === "not-applicable" ? "Not a sponsor category" : sponsorStatusMeta[s].label}</option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn--ghost" onClick={reset} disabled={!isFiltered} style={{ opacity: isFiltered ? 1 : 0.5, cursor: isFiltered ? "pointer" : "default" }}>
          Clear filters
        </button>
      </div>

      {activeGroup?.rangeNote && <p className="callout" style={{ marginBottom: 12 }}>{activeGroup.rangeNote}</p>}

      <p className="results-bar" aria-live="polite">
        <span>
          Showing <strong>{visibleRows.length}</strong> of {isFiltered ? `${rows.length} matching` : materials.length} lines
        </span>
        <span>
          {isFiltered ? "Filtered" : "Base"} subtotal <strong>{money(filtered.base)}</strong>
          {filtered.optional > 0 && <> · optional {money(filtered.optional)}</>}
        </span>
      </p>

      <div className="table-wrap stackable">
        <div className="table-scroll" tabIndex={0} role="region" aria-label="Materials list">
          <table className="mat-table">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Item / specification</th>
                <th scope="col" className="r">Qty</th>
                <th scope="col">Unit</th>
                <th scope="col" className="r">Est. unit</th>
                <th scope="col" className="r">Subtotal</th>
                <th scope="col">Status</th>
                <th scope="col">Sponsor status</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((m) => (
                <tr key={m.id} className={m.optional ? "optional" : undefined}>
                  <td data-label="Category">
                    <span style={{ fontSize: "0.84rem" }}>{m.category}</span>
                  </td>
                  <td data-label="Item" className="item-cell">
                    <div className="item">
                      {m.item} {m.optional && <span className="tag">Optional</span>} {m.note && <span className="tag">{m.note}</span>}
                    </div>
                    {m.spec && <div className="spec">{m.spec}</div>}
                  </td>
                  <td data-label="Qty" className="r">{qty(m.quantity)}</td>
                  <td data-label="Unit">{m.unit}</td>
                  <td data-label="Est. unit" className="r">{money(m.unitCost)}</td>
                  <td data-label="Subtotal" className="r"><strong>{money(subtotal(m))}</strong></td>
                  <td data-label="Status"><MaterialChip status={m.status} /></td>
                  <td data-label="Sponsor">
                    {effectiveSponsorStatus(m) === "not-applicable" ? <span className="muted">—</span> : <SponsorChip status={effectiveSponsorStatus(m)} />}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: 28 }}>
                    No materials match. <button type="button" className="btn btn--link" onClick={reset}>Clear filters</button>
                  </td>
                </tr>
              )}
            </tbody>
            {rows.length > 0 && (
              <tfoot>
                <tr>
                  <td colSpan={5}>{isFiltered ? "Filtered subtotal (excl. optional)" : "Base estimate (excl. optional)"}</td>
                  <td className="r">{money(filtered.base)}</td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
      {visibleRows.length < rows.length && (
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <button type="button" className="btn btn--ghost" onClick={() => setShowAll(true)}>
            Show all {rows.length} lines
          </button>
        </div>
      )}
    </>
  );
}
