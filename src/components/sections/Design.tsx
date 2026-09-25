import {
  cabin,
  cutList2x12,
  designStatus,
  envelope,
  framing2x4,
  framingNote,
  interior,
  openings,
  roof,
  stock2x12,
} from "@/data/project";
import { feetInches, qty } from "@/lib/format";
import { CabinElevation } from "../CabinElevation";
import { Footprint, RoofPlan } from "../PlanDiagrams";
import { SectionHeader } from "../SectionHeader";
import { ImageSlot } from "../ImageSlot";

const layerColors = ["#f4f1ea", "#f2d9a0", "#d9c09a", "#b8cfe0", "#e9e9e4", "#9b8b78"];

export function Design() {
  const net2x12 = cutList2x12.reduce((a, c) => a + (c.lengthIn * c.qty) / 12, 0);
  const pieces2x12 = cutList2x12.reduce((a, c) => a + c.qty, 0);
  const bought2x12 = stock2x12.reduce((a, s) => a + s.lengthFt * s.qty, 0);
  const boards2x12 = stock2x12.reduce((a, s) => a + s.qty, 0);
  const waste2x12 = ((bought2x12 - net2x12) / net2x12) * 100;

  const bought2x4 = framing2x4.stock.reduce((a, s) => a + s.lengthFt * s.qty, 0);
  const boards2x4 = framing2x4.stock.reduce((a, s) => a + s.qty, 0);
  const waste2x4 = ((bought2x4 - framing2x4.netLinearFt) / framing2x4.netLinearFt) * 100;

  return (
    <section className="section" id="design" aria-labelledby="design-title">
      <div className="container">
        <SectionHeader index="03" eyebrow="Cabin Design" title={`${cabin.width} × ${cabin.length} ft, built for winter`} id="design-title">
          <p>
            A wood-framed cabin on an elevated floor, with a single-slope metal roof that will later carry solar. It is insulated to be used, not
            stored in. The drawings below are conceptual; final structural details come out of permitting and final design.
          </p>
        </SectionHeader>

        <div className="diagram">
          <div className="diagram-title">
            <h3>Side elevation</h3>
            <span className="stamp">Conceptual</span>
          </div>
          <p className="scroll-hint" aria-hidden="true">Swipe sideways to see the full drawing →</p>
          <div className="diagram-scroll" tabIndex={0} role="region" aria-label="Side elevation drawing (scrollable)">
            <CabinElevation />
          </div>
          <p className="diagram-note">
            Dimensions are approximate. The floor framing sits {cabin.postHeight} ft above grade on eight PT 4x6 posts; post locations are
            dependent, with layout, footings, and connections upon code compliance. The service platform between the posts sits at{" "}
            {cabin.servicePlatform.heightLabel} so the black tank can roll straight out, and the diesel heater and electrical equipment stay
            reachable without entering the cabin.
          </p>
        </div>

        <div className="grid grid-3" style={{ marginTop: 20 }}>
          <div className="diagram">
            <div className="diagram-title">
              <h3>Footprint</h3>
              <span className="stamp">Conceptual</span>
            </div>
            <Footprint />
          </div>
          <div className="diagram">
            <div className="diagram-title">
              <h3>Roof plan</h3>
              <span className="stamp">Conceptual</span>
            </div>
            <RoofPlan />
          </div>
          <div className="card card--flat">
            <h3>Roof</h3>
            <dl className="spec-list">
              <div><dt>Type</dt><dd>{roof.type}</dd></div>
              <div><dt>Pitch</dt><dd>{roof.pitch} ({roof.rise} ft over {cabin.length} ft)</dd></div>
              <div><dt>Overhangs</dt><dd>≈ {roof.overhangFront} ft front and back</dd></div>
              <div><dt>Run / slope</dt><dd>≈ {roof.horizontalRun} ft / ≈ {roof.slopeLengthLabel}</dd></div>
              <div><dt>Area</dt><dd>≈ {roof.area} sq ft</dd></div>
              <div>
                <dt>Exposed-fastener layout</dt>
                <dd>
                  {roof.exposedFastenerLayout.panels} × {roof.exposedFastenerLayout.coverageWidthIn}-in panels, buy {roof.exposedFastenerLayout.purchaseLength},
                  trim to {roof.exposedFastenerLayout.trimLength}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="callout" style={{ marginTop: 20 }}>
          <p>
            <strong>Why the roof matters more than usual.</strong> Solar will be mounted to this roof later, so durability, waterproofing,
            attachment points and long-term serviceability all count. Standing-seam metal is of particular interest because mounting hardware can
            clamp to the seams without penetrating the roof. Exposed-fastener panels remain a viable lower-cost option. The final roofing product
            is open.
          </p>
        </div>

        {/* ---------- Envelope ---------- */}
        <div className="sub-head">
          <h3>Building envelope</h3>
          <p>Northern Michigan winters call for much more than a seasonal-shed envelope.</p>
        </div>
        <div className="split split--even">
          <div className="card card--flat">
            <h3>Planned wall assembly</h3>
            <p className="muted" style={{ fontSize: "0.92rem" }}>Likely strategy for the 2x4 exterior walls, inside to outside.</p>
            <ol className="assembly">
              <li className="dir" aria-hidden="true">Interior</li>
              {envelope.wallLayers.map((l, i) => (
                <li key={l.layer}>
                  <span className="swatch" style={{ background: layerColors[i] }} aria-hidden="true" />
                  <div>
                    <strong>{l.layer}</strong>
                    <span>{l.detail}</span>
                  </div>
                </li>
              ))}
              <li className="dir" aria-hidden="true">Exterior</li>
            </ol>
          </div>
          <div>
            <dl className="grid grid-2" style={{ gap: 12, margin: 0 }}>
              <div className="total-card"><dt>Gross wall area</dt><dd>≈ {envelope.grossWallArea} sq ft</dd></div>
              <div className="total-card"><dt>Doors & windows</dt><dd>≈ {envelope.openingArea} sq ft</dd></div>
              <div className="total-card"><dt>Net insulated wall</dt><dd>≈ {envelope.netWallArea} sq ft</dd></div>
              <div className="total-card"><dt>Floor (target {envelope.floorTarget})</dt><dd>{envelope.floorArea} sq ft</dd></div>
            </dl>
            <div className="card card--tint" style={{ marginTop: 16 }}>
              <h3>The cathedral roof is where building science matters most</h3>
              <p style={{ fontSize: "0.93rem" }}>
                The ceiling follows the roof slope (≈ {envelope.ceilingArea} sq ft). The 2x12 rafters leave plenty of cavity depth, but the assembly
                is not decided. Options under consideration:
              </p>
              <ul style={{ fontSize: "0.93rem" }}>
                {envelope.roofOptions.map((o) => <li key={o}>{o}</li>)}
              </ul>
              <p style={{ fontSize: "0.93rem", marginBottom: 6 }}><strong>Design questions:</strong></p>
              <ul className="check-list" style={{ fontSize: "0.9rem" }}>
                {envelope.roofQuestions.map((q) => <li key={q}>{q}</li>)}
              </ul>
              <p className="muted" style={{ fontSize: "0.85rem", marginTop: 12, marginBottom: 0 }}>{designStatus.roofAssembly}</p>
            </div>
          </div>
        </div>

        {/* ---------- Openings + interior ---------- */}
        <div className="grid grid-3" style={{ marginTop: 20 }}>
          <div className="card card--flat">
            <h3>Windows & doors</h3>
            <div className="table-wrap" style={{ border: 0 }}>
              <table>
                <thead><tr><th scope="col">Item</th><th scope="col">Size</th><th scope="col" className="r">Qty</th></tr></thead>
                <tbody>
                  {openings.map((o) => (
                    <tr key={o.item + o.size}><td>{o.item}</td><td className="mono">{o.size}</td><td className="r">{o.qty}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="muted" style={{ fontSize: "0.85rem", marginTop: 10 }}>Brands and models have not been selected.</p>
          </div>
          <div className="card card--flat">
            <h3>Interior program</h3>
            <ul>{interior.zones.map((z) => <li key={z}>{z}</li>)}</ul>
            <p style={{ fontSize: "0.9rem", marginBottom: 4 }}><strong>Plumbing fixtures:</strong></p>
            <p style={{ fontSize: "0.9rem" }}>{interior.fixtures.join(" · ")}</p>
            <p className="muted" style={{ fontSize: "0.85rem" }}>{interior.note}</p>
          </div>
          <div className="card card--flat">
            <h3>Structure</h3>
            <ul style={{ fontSize: "0.93rem" }}>{cabin.construction.map((c) => <li key={c}>{c}</li>)}</ul>
            <p className="muted" style={{ fontSize: "0.85rem" }}>{designStatus.structural}</p>
          </div>
        </div>

        {/* ---------- Framing take-off ---------- */}
        <div className="sub-head">
          <h3>Framing take-off</h3>
          <p>From the working framing design, with stock lengths chosen to keep waste low.</p>
        </div>
        <div className="grid grid-3">
          <div className="table-wrap">
            <table>
              <caption>2x12 cut list · {pieces2x12} pieces</caption>
              <thead><tr><th scope="col">Cut length</th><th scope="col" className="r">Qty</th><th scope="col" className="r">Linear ft</th></tr></thead>
              <tbody>
                {cutList2x12.map((c) => (
                  <tr key={c.lengthIn}>
                    <td className="mono">{feetInches(c.lengthIn)}</td>
                    <td className="r">{c.qty}</td>
                    <td className="r">{qty(Math.round((c.lengthIn * c.qty) / 12 * 10) / 10)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot><tr><td>Net required</td><td /><td className="r">≈ {qty(Math.round(net2x12 * 10) / 10)} lf</td></tr></tfoot>
            </table>
          </div>
          <div className="table-wrap">
            <table>
              <caption>2x12 stock purchase · {boards2x12} boards</caption>
              <thead><tr><th scope="col">Stock</th><th scope="col" className="r">Qty</th><th scope="col" className="r">Linear ft</th></tr></thead>
              <tbody>
                {stock2x12.map((s) => (
                  <tr key={s.lengthFt}><td className="mono">2x12 × {s.lengthFt} ft</td><td className="r">{s.qty}</td><td className="r">{s.lengthFt * s.qty}</td></tr>
                ))}
              </tbody>
              <tfoot><tr><td>Purchased</td><td /><td className="r">≈ {bought2x12} lf</td></tr></tfoot>
            </table>
            <dl className="stat-row" style={{ padding: "0 14px 14px" }}>
              <div><dt>Waste</dt><dd>≈ {waste2x12.toFixed(1)}%</dd></div>
            </dl>
          </div>
          <div className="table-wrap">
            <table>
              <caption>2x4 stock purchase · {boards2x4} boards</caption>
              <thead><tr><th scope="col">Stock</th><th scope="col" className="r">Qty</th><th scope="col" className="r">Linear ft</th></tr></thead>
              <tbody>
                {framing2x4.stock.map((s) => (
                  <tr key={s.lengthFt}><td className="mono">2x4 × {s.lengthFt} ft</td><td className="r">{s.qty}</td><td className="r">{s.lengthFt * s.qty}</td></tr>
                ))}
              </tbody>
              <tfoot><tr><td>Purchased</td><td /><td className="r">≈ {qty(bought2x4)} lf</td></tr></tfoot>
            </table>
            <dl className="stat-row" style={{ padding: "0 14px 14px" }}>
              <div><dt>Pieces</dt><dd>≈ {framing2x4.pieces}</dd></div>
              <div><dt>Net</dt><dd>≈ {qty(framing2x4.netLinearFt)} lf</dd></div>
              <div><dt>Waste</dt><dd>≈ {waste2x4.toFixed(1)}%</dd></div>
            </dl>
          </div>
        </div>
        <p className="muted" style={{ fontSize: "0.88rem", marginTop: 14 }}>
          {framingNote} Plus {framing2x4.spares}. Posts: {cabin.posts.count} × {cabin.posts.treatment.toLowerCase()} {cabin.posts.size}×{cabin.posts.stockLength}.
        </p>

        <div style={{ marginTop: 28, maxWidth: 560 }}>
          <ImageSlot id="drawings" />
        </div>
      </div>
    </section>
  );
}
