import { PRICE_DISCLAIMER } from "@/data/materials";
import { nav, site } from "@/data/site";
import { channel } from "@/data/channel";
import { BrandMark } from "./Icons";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="brand" style={{ marginBottom: 12 }}>
              <BrandMark />
              <span>{site.projectName}</span>
            </p>
            <p>
              A 12×16 off-grid cabin in Oscoda County, Michigan, shown on the {channel.name} and {site.umbrella} YouTube channels.
            </p>
            <p style={{ fontSize: "0.82rem" }}>
              {PRICE_DISCLAIMER} Drawings are conceptual and not for construction. Structural, electrical and plumbing designs are subject to
              permitting and final design.
            </p>
          </div>
          <nav aria-label="Footer">
            <h2>Sections</h2>
            <ul>
              {nav.slice(0, 5).map((n) => <li key={n.id}><a href={`#${n.id}`}>{n.label}</a></li>)}
            </ul>
          </nav>
          <div>
            <h2>Partners</h2>
            <ul>
              {nav.slice(5).map((n) => <li key={n.id}><a href={`#${n.id}`}>{n.label}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© {year} {site.projectName} · {channel.name}</span>
          <span>No sponsor has editorial control over project coverage.</span>
        </div>
      </div>
    </footer>
  );
}
