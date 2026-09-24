import { budgetExclusions, CONTINGENCY_RATE, ownerSupplied, PRICE_DISCLAIMER, PUBLIC_BUDGET_SUMMARY } from "@/data/materials";
import { computeTotals } from "@/lib/budget";
import { money } from "@/lib/format";
import { BudgetExplorer } from "../BudgetExplorer";
import { InfoIcon } from "../Icons";
import { SectionHeader } from "../SectionHeader";

export function Budget() {
  const t = computeTotals();
  const pct = Math.round(CONTINGENCY_RATE * 100);

  return (
    <section className="section section--alt" id="budget" aria-labelledby="budget-title">
      <div className="container">
        <SectionHeader index="06" eyebrow="Materials & Budget" title={`Roughly ${PUBLIC_BUDGET_SUMMARY} in building materials`} id="budget-title">
          <p>
            Every line of the current materials estimate is below, from framing to smoke alarms. Totals are calculated from the line items, and
            the sponsor columns update as partnerships are confirmed.
          </p>
        </SectionHeader>

        <div className="disclaimer" role="note" style={{ marginBottom: 24 }}>
          <InfoIcon />
          <p style={{ margin: 0 }}>
            <strong>{PRICE_DISCLAIMER}</strong>
          </p>
        </div>

        <dl className="totals">
          <div className="total-card">
            <dt>Base material estimate</dt>
            <dd>{money(t.base)}</dd>
          </div>
          <div className="total-card">
            <dt>{pct}% planning contingency</dt>
            <dd>{money(t.contingency)}</dd>
          </div>
          <div className="total-card total-card--key">
            <dt>Working material budget</dt>
            <dd>
              {money(t.working)}
              <small>Base + contingency</small>
            </dd>
          </div>
          <div className="total-card">
            <dt>Sponsor-covered</dt>
            <dd>
              {money(t.sponsorCovered)}
              <small>{t.sponsorCovered === 0 ? "No partnerships confirmed yet" : "Confirmed partnerships"}</small>
            </dd>
          </div>
          <div className="total-card">
            <dt>Remaining projected cost</dt>
            <dd>
              {money(t.remaining)}
              <small>{t.purchased > 0 ? `After ${money(t.purchased)} already purchased` : "Working budget less sponsor-covered"}</small>
            </dd>
          </div>
        </dl>

        <BudgetExplorer />

        <div className="grid grid-2" style={{ marginTop: 28 }}>
          <div className="card card--flat">
            <h3>Not included in this budget</h3>
            <p className="muted" style={{ fontSize: "0.9rem" }}>
              This budget covers the cabin&apos;s construction materials, not every piece of site infrastructure. Several of these may become
              separate project phases.
            </p>
            <ul className="plain-list">
              {budgetExclusions.map((e) => <li key={e}>{e}</li>)}
            </ul>
          </div>
          <div className="card card--flat">
            <h3>Owner-supplied equipment</h3>
            <p className="muted" style={{ fontSize: "0.9rem" }}>Listed for transparency. $0 in the budget, and not sponsorship needs.</p>
            <ul className="owned-list">
              {ownerSupplied.map((o) => (
                <li key={o.item}>
                  <strong>{o.item}</strong>
                  <span>{o.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
