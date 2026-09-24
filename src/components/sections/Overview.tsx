import { SectionHeader } from "../SectionHeader";
import { MaterialChip, PhaseChip, SponsorChip } from "../Chip";

const pillars = [
  {
    title: "Real world authenticity, not a set or staged production",
    body: "Fernwood is privately owned land and the cabin will be used for years. Products go in because the build needs them, and they stay in--continuing to be part of the channel's story.",
  },
  {
    title: "Transparency to supporters, sponsors, and the audience",
    body: "Quantities, cut lists, budgets and open design questions are published. No mistakes or failures will be hidden at any point.",
  },
  {
    title: "Documented end to end",
    body: "Planning, site work, framing, envelope, systems, finish and long-term use. Each stage is filmed for Smarter Circuits and Life at Fernwood.",
  },
];

export function Overview() {
  return (
    <section className="section" id="overview" aria-labelledby="overview-title">
      <div className="container">
        <SectionHeader index="01" eyebrow="Overview" title="A small smart cabin, built and shown in full over a series of videos" id="overview-title">
          <p>
            Fernwood Cabin A is a compact, insulated, off-grid cabin at Fernwood--a 10.3-acre woodland property in Oscoda County, Michigan. It extends the Smarter
            Circuits channel&apos;s hands-on demonstration capability. The build is
            planned in phases and every step is documented. 
          </p>
        </SectionHeader>

        <div className="grid grid-3">
          {pillars.map((p, i) => (
            <div className="pillar" key={p.title}>
              <p className="num-label">0{i + 1}</p>
              <h3>{p.title}</h3>
              <p className="muted">{p.body}</p>
            </div>
          ))}
        </div>

        {/* <div className="sub-head">
          <h3>How to read this site</h3>
          <p>Status labels are used consistently so nothing planned is mistaken for something finished.</p>
        </div>
        <div className="card card--flat">
          <ul className="legend-list">
            <li>
              <span><SponsorChip status="owner-supplied" label="Already owned" /></span>
              Equipment the owner already has: batteries, charge controllers, two inverters, a wood stove. Not a sponsorship need.
            </li>
            <li>
              <span><PhaseChip status="planned" /></span>
              Part of the design, not yet built.
            </li>
            <li>
              <span><MaterialChip status="estimated" /></span>
              A planning quantity or price, which may change with engineering, permitting and product selection.
            </li>
            <li>
              <span><SponsorChip status="seeking" /></span>
              A category where a product or project partner would genuinely fit.
              </li>
              <li>
              <span><MaterialChip status="selected" /></span>
              A specific product has been chosen.
            </li>
            <li>
              <span><MaterialChip status="installed" /></span>
              The product is in the building.
            </li>
            <li>
              <span><PhaseChip status="complete" /></span>
              The phase is finished and documented.
            </li>
          </ul>
        </div> */}
      </div>
    </section>
  );
}
