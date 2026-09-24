import { cabin, property, roof } from "@/data/project";
import { CabinElevation } from "./CabinElevation";

const themes = [
  "Compelling content",
  "Fast growing audience",
  "Multi-channel exposure",
  "Trusted reviews",
  "Real-world product testing",
  "Long-term documentation",
];

export function Hero() {
  const facts = [
    { k: "Cabin", v: `${cabin.width} × ${cabin.length} ft` },
    { k: "Footprint", v: `${cabin.floorArea} sq ft` },
    { k: "Property", v: `${property.acres} wooded acres` },
    { k: "Roof", v: `${roof.pitch} metal` },
    { k: "Power", v: "Solar, 2 × 3 kW" },
    { k: "Location", v: "Oscoda County, MI" },
  ];

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-inner">
          <div>
            <p className="eyebrow">Fernwood · {property.locationLine}</p>
            <h1 id="hero-title">Building Fernwood Cabin A</h1>
            <p className="hero-sub">
              A {cabin.width}×{cabin.length} off-grid cabin on 10 acres of northern Michigan woodland.
            </p>
            <p className="hero-copy">
              A real, privately owned build shown on two YouTube channels, <strong>Smarter Circuits</strong> and <strong>Life at Fernwood</strong>,
              from the first footing to years of daily use. Every product that goes into this cabin is chosen because the build needs it, installed
              on camera, and revisited after it has lived through northern Michigan winters.
            </p>
            <ul className="hero-themes" aria-label="What the project combines">
              {themes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="hero-ctas">
              <a className="btn btn--primary" href="#contact">
                Partner With the Project
              </a>
              <a className="btn btn--ghost" href="#design">
                Explore the Build
              </a>
            </div>
          </div>
          <figure className="hero-figure" style={{ margin: 0 }}>
            <CabinElevation minimal titleId="hero-drawing-title" />
            <figcaption>Conceptual elevation</figcaption>
          </figure>
        </div>
      </div>
      <div className="facts-strip">
        <div className="container">
          <dl>
            {facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
