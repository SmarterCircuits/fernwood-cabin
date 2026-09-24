import { property } from "@/data/project";
import { ImageSlot } from "../ImageSlot";
import { SectionHeader } from "../SectionHeader";

export function Project() {
  return (
    <section className="section section--alt" id="project" aria-labelledby="project-title">
      <div className="container">
        <SectionHeader index="02" eyebrow="The Project" title="Ten acres of northern Michigan woods" id="project-title">
          <p>{property.approach}</p>
        </SectionHeader>

        <div className="split">
          <div>
            <dl className="spec-list">
              <div>
                <dt>Location</dt>
                <dd>{property.locationLine}</dd>
              </div>
              <div>
                <dt>Size</dt>
                <dd>≈ {property.acres} acres</dd>
              </div>
              <div>
                <dt>Ownership</dt>
                <dd>{property.ownership}</dd>
              </div>
              <div>
                <dt>Land cover</dt>
                <dd>{property.cover}</dd>
              </div>
              <div>
                <dt>Access</dt>
                <dd>{property.access}</dd>
              </div>
              <div>
                <dt>Long-term goal</dt>
                <dd>{property.objective}</dd>
              </div>
            </dl>

            <h3 style={{ marginTop: 32 }}>What grows here</h3>
            <ul className="species" aria-label="Tree and plant species on the property">
              {property.species.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <div className="callout callout--forest" style={{ marginTop: 32 }}>
              <p>
                <strong>Fernwood</strong> is the property. <strong>Fernwood Cabin A</strong> is the first build on it. <strong>Life at Fernwood</strong> is the wider content concept around
                it. Sponsor-related coverage runs on <strong>Smarter Circuits</strong>, an established smart-home, electronics and DIY channel by default, but additional arrangements for Life at Fernwood are possible.
              </p>
            </div>
          </div>

          <div className="media-grid">
            <ImageSlot id="property" />
            <ImageSlot id="site" />
            <ImageSlot id="forest" />
          </div>
        </div>
      </div>
    </section>
  );
}
