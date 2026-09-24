import { cabin, roof } from "@/data/project";

/** Roof plan: 4 × 36-in exposed-fastener panels over the 12-ft width. Conceptual. */
export function RoofPlan() {
  const S = 16; // px per ft
  const ox = 70;
  const oy = 40;
  const w = roof.width * S;
  const slopeFt = 18 + 6.625 / 12;
  const h = slopeFt * S;
  const panels = roof.exposedFastenerLayout.panels;
  const pw = w / panels;

  return (
    <svg viewBox="0 0 360 400" role="img" aria-labelledby="roofplan-title">
      <title id="roofplan-title">
        Roof plan: 12 ft wide by about 18 ft 6⅝ in sloped length, about 223 square feet, shown as four 36-inch metal panels with a future solar
        area.
      </title>
      <defs>
        <marker id="tick2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="10" markerHeight="10" orient="auto">
          <path d="M2 8 L8 2" stroke="var(--forest)" strokeWidth="1.5" />
        </marker>
      </defs>
      {Array.from({ length: panels }, (_, i) => (
        <rect key={i} className="dwg-panel" x={ox + i * pw} y={oy} width={pw} height={h} />
      ))}
      <rect x={ox} y={oy} width={w} height={h} fill="none" stroke="var(--ink)" strokeWidth="2" />
      <rect className="dwg-solar" x={ox + 14} y={oy + 2.2 * S} width={w - 28} height={h - 4.4 * S} />
      <text className="dwg-label dwg-halo dwg-halo--panel" x={ox + w / 2} y={oy + h / 2 - 6} textAnchor="middle" style={{ fill: "#fff" }}>
        future solar
      </text>
      <text className="dwg-label dwg-halo dwg-halo--panel" x={ox + w / 2} y={oy + h / 2 + 12} textAnchor="middle" style={{ fill: "#fff" }}>
        ≈ {roof.area} sq ft
      </text>
      {Array.from({ length: panels }, (_, i) => (
        <text key={i} className="dwg-label dwg-label--ink" x={ox + i * pw + pw / 2} y={oy + h + 18} textAnchor="middle" fontSize="11">
          36″
        </text>
      ))}
      <line className="dwg-dim" x1={ox} y1={oy + h + 32} x2={ox + w} y2={oy + h + 32} markerStart="url(#tick2)" markerEnd="url(#tick2)" />
      <text className="dwg-label" x={ox + w / 2} y={oy + h + 50} textAnchor="middle">{roof.width} ft</text>
      <line className="dwg-dim" x1={ox - 20} y1={oy} x2={ox - 20} y2={oy + h} markerStart="url(#tick2)" markerEnd="url(#tick2)" />
      <text className="dwg-label" x={ox - 28} y={oy + h / 2} textAnchor="middle" transform={`rotate(-90 ${ox - 28} ${oy + h / 2})`}>
        ≈ {roof.slopeLengthLabel} sloped
      </text>
      <text className="dwg-label dwg-label--ink" x={ox + w + 12} y={oy + 10} fontSize="11">high side</text>
      <text className="dwg-label dwg-label--ink" x={ox + w + 12} y={oy + h} fontSize="11">eave</text>
      <path d={`M${ox + w + 30} ${oy + 30} V${oy + h - 24}`} stroke="var(--ink-3)" strokeWidth="1.2" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9" fill="none" stroke="var(--ink-3)" strokeWidth="1.5" />
        </marker>
      </defs>
      <text className="dwg-label dwg-label--ink" x={ox + w + 38} y={oy + h / 2} fontSize="11" transform={`rotate(90 ${ox + w + 38} ${oy + h / 2})`} textAnchor="middle">
        drains
      </text>
    </svg>
  );
}

/** Footprint: 12 × 16 ft with dashed roof outline. No interior layout. */
export function Footprint() {
  const S = 15;
  const ox = 34;
  const oy = 44;
  const L = cabin.length * S;
  const W = cabin.width * S;
  return (
    <svg viewBox="0 0 360 290" role="img" aria-labelledby="footprint-title">
      <title id="footprint-title">Footprint: 12 by 16 feet, 192 square feet, with a 1-foot roof overhang at each end. Interior layout not shown.</title>
      <defs>
        <marker id="tick3" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="10" markerHeight="10" orient="auto">
          <path d="M2 8 L8 2" stroke="var(--forest)" strokeWidth="1.5" />
        </marker>
      </defs>
      <rect x={ox - S} y={oy} width={L + 2 * S} height={W} fill="none" stroke="var(--ink-3)" strokeDasharray="5 4" />
      <rect x={ox} y={oy} width={L} height={W} fill="#efeae0" stroke="var(--ink)" strokeWidth="2" />
      <text className="dwg-label dwg-label--ink dwg-label--lg" x={ox + L / 2} y={oy + W / 2 - 4} textAnchor="middle">
        {cabin.floorArea} sq ft
      </text>
      <text className="dwg-label dwg-label--ink" x={ox + L / 2} y={oy + W / 2 + 16} textAnchor="middle" fontSize="11">
        layout not yet published
      </text>
      <line className="dwg-dim" x1={ox} y1={oy + W + 22} x2={ox + L} y2={oy + W + 22} markerStart="url(#tick3)" markerEnd="url(#tick3)" />
      <text className="dwg-label" x={ox + L / 2} y={oy + W + 40} textAnchor="middle">{cabin.length} ft</text>
      <line className="dwg-dim" x1={ox + L + 32} y1={oy} x2={ox + L + 32} y2={oy + W} markerStart="url(#tick3)" markerEnd="url(#tick3)" />
      <text className="dwg-label" x={ox + L + 44} y={oy + W / 2 + 4}>{cabin.width} ft</text>
      <text className="dwg-label dwg-label--ink" x={ox - S} y={oy - 12} fontSize="11">- - roof outline, 1 ft overhangs</text>
    </svg>
  );
}
