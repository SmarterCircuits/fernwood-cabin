import { phases } from "@/data/phases";
import {
  collaborationFormats,
  contentArc,
  editorialStandards,
  featuredOpportunities,
  participationLevels,
  productLifecycle,
  sponsorAdvantages,
  sponsorCategories,
} from "@/data/sponsors";
import { CategoryBrowser } from "../CategoryBrowser";
import { SponsorChip } from "../Chip";
import { InterestButton } from "../InterestButton";
import { SectionHeader } from "../SectionHeader";

const phaseTitle = new Map(phases.map((p) => [p.id, p.title]));
const catName = new Map(sponsorCategories.map((c) => [c.id, c.name]));

export function Sponsors() {
  return (
    <section className="section" id="sponsors" aria-labelledby="sponsors-title">
      <div className="container">
        <SectionHeader
          index="07"
          eyebrow="Sponsor Opportunities"
          title="Interested in putting your product to work in a real long-term build?"
          id="sponsors-title"
        >
          <p>
            Fernwood Cabin A is being built one system at a time. Product and project partners can take part wherever their equipment genuinely fits the
            build, from individual products to complete project phases.
          </p>
        </SectionHeader>

        {/* Why */}
        <div className="grid grid-4">
          {sponsorAdvantages.map((a) => (
            <div className="card card--flat adv-card" key={a.title}>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
            </div>
          ))}
          <div className="card card--tint adv-card">
            <h3>A product&apos;s life in the build</h3>
            <ol className="lifecycle" aria-label="Stages a product is shown in">
              {productLifecycle.map((s) => <li key={s}>{s}</li>)}
            </ol>
          </div>
        </div>

        {/* Featured */}
        <div className="sub-head">
          <h3>Current priority opportunities</h3>
          <p>Categories where the build needs a decision soon. Status is kept up to date.</p>
        </div>
        <div className="grid grid-3">
          {featuredOpportunities.map((o) => (
            <article className="card opp-card" key={o.id} aria-labelledby={`opp-${o.id}`}>
              <header>
                <h3 id={`opp-${o.id}`}>{o.title}</h3>
                <SponsorChip status={o.status} label={o.statusLabel} />
              </header>
              <p className="opp-need"><span className="kicker">Needed</span>{o.needed}</p>
              <p>{o.detail}</p>
              <footer>
                <span className="opp-phases">Phase: {o.phases.map((p) => phaseTitle.get(p)).join(", ")}</span>
                {(o.status === "seeking" || o.status === "in-discussion") && (
                  <InterestButton category={o.categories.map((c) => catName.get(c)).filter(Boolean).join(", ")}>
                    Discuss this
                  </InterestButton>
                )}
              </footer>
            </article>
          ))}
        </div>

        {/* Levels */}
        <div className="sub-head">
          <h3>Ways to participate</h3>
          <p>Partner opportunities range from individual products to complete project phases.</p>
        </div>
        <div className="levels">
          {participationLevels.map((l, i) => (
            <div key={l.title}>
              <div className="scale" aria-hidden="true">
                {participationLevels.map((_, j) => <i key={j} className={j <= i ? "on" : undefined} />)}
              </div>
              <h4>{l.title}</h4>
              <p>{l.body}</p>
            </div>
          ))}
        </div>

        {/* Content arc */}
        <div className="sub-head">
          <h3>Twenty stages of documentation</h3>
          <p>This is not a one-video placement. The build gives products a place across the whole project.</p>
        </div>
        <ol className="arc">
          {contentArc.map((s) => <li key={s}>{s}</li>)}
        </ol>

        {/* All categories */}
        <div className="sub-head">
          <h3>All partner categories</h3>
          <p>Every category shows its current status. Owner-supplied equipment is marked so it is never double-counted.</p>
        </div>
        <CategoryBrowser />

        {/* Formats + standards */}
        <div className="split split--even" style={{ marginTop: 20 }}>
          <div className="card card--flat">
            <h3>Example collaboration formats</h3>
            <p className="muted" style={{ fontSize: "0.9rem" }}>
              These are examples, not a fixed package. Specific deliverables are agreed case by case.
            </p>
            <ul className="check-list">
              {collaborationFormats.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
          <div className="card card--flat">
            <h3>Editorial standards</h3>
            <p className="muted" style={{ fontSize: "0.9rem" }}>
              Technically accurate coverage and real long-term use are worth more than scripted praise.
            </p>
            <ul className="check-list standards">
              {editorialStandards.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>

        <div className="cta-band" style={{ marginTop: 28 }}>
          <div>
            <h3>Have a product that belongs in this build?</h3>
            <p>Tell us what it is and where you think it fits. Product, cash and combined partnerships are all welcome.</p>
          </div>
          <a className="btn btn--primary" href="#contact">Partner With the Project</a>
        </div>
      </div>
    </section>
  );
}
