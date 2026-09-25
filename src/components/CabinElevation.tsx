import { cabin, roof } from "@/data/project";

/**
 * Conceptual side elevation along the 16-ft length. All geometry is derived
 * from src/data/project.ts. Post height (grade to floor framing) is to scale;
 * post spacing is not fixed yet, so posts are placed schematically and no
 * spacing is dimensioned. The service platform sits at its `drawnHeight`.
 *
 * `minimal` renders a light line drawing for the hero (no dimensions).
 */
export function CabinElevation({ minimal = false, titleId }: { minimal?: boolean; titleId?: string }) {
  const S = 30; // px per ft
  const x0 = 150; // low-wall face
  const x1 = x0 + cabin.length * S; // high-wall face
  const groundY = 600;
  const joist = 11.25 / 12 * S; // 2x12 depth
  const floorBottom = groundY - cabin.postHeight * S; // underside of floor framing
  const floorTop = floorBottom - joist;
  const sp = cabin.servicePlatform;
  const platY = groundY - sp.drawnHeight * S; // top of service platform deck
  const platT = 6;
  const lowTop = floorTop - cabin.lowWall * S;
  const highTop = floorTop - cabin.highWall * S;
  const slope = roof.rise / cabin.length;
  const roofY = (x: number) => lowTop - (x - x0) * slope; // top of wall line
  const ohL = x0 - roof.overhangFront * S;
  const ohR = x1 + roof.overhangBack * S;
  const roofT = 12; // drawn roof thickness
  const pitchAngle = (Math.atan(slope) * 180) / Math.PI;

  // Solar array: dashed band just above the roof, inset from the ends.
  const sA = x0 + 1.2 * S;
  const sB = x1 - 1.2 * S;
  const sOff = 16;

  const postXs = [x0 + 10, x0 + (x1 - x0) / 3, x0 + (2 * (x1 - x0)) / 3, x1 - 10];

  const stroke = minimal ? "currentColor" : undefined;

  if (minimal) {
    return (
      <svg viewBox="60 30 800 600" role="img" aria-labelledby={titleId}>
        {titleId && <title id={titleId}>Line drawing of Fernwood Cabin A: single-slope metal roof with a future solar array, raised on posts with a service platform underneath</title>}
        <g fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" opacity="0.9">
          <line x1="70" y1={groundY} x2="850" y2={groundY} opacity="0.5" />
          <polygon points={`${x0},${floorTop} ${x0},${lowTop} ${x1},${highTop} ${x1},${floorTop}`} />
          <polygon points={`${ohL},${roofY(ohL)} ${ohR},${roofY(ohR)} ${ohR},${roofY(ohR) - roofT} ${ohL},${roofY(ohL) - roofT}`} />
          <polygon
            points={`${sA},${roofY(sA) - roofT - 6} ${sB},${roofY(sB) - roofT - 6} ${sB},${roofY(sB) - roofT - 6 - sOff} ${sA},${roofY(sA) - roofT - 6 - sOff}`}
            strokeDasharray="6 5"
            opacity="0.7"
          />
          <rect x={x0} y={floorTop} width={x1 - x0} height={joist} />
          {postXs.map((x) => (
            <rect key={x} x={x - 6} y={floorBottom} width="12" height={groundY - floorBottom} opacity="0.7" />
          ))}
          <rect x={x0} y={platY} width={x1 - x0} height={platT} opacity="0.6" />
          {/* vertical siding rhythm */}
          {Array.from({ length: 15 }, (_, i) => x0 + (i + 1) * S).map((x) => (
            <line key={x} x1={x} y1={floorTop} x2={x} y2={roofY(x) + 2} opacity="0.18" />
          ))}
        </g>
      </svg>
    );
  }

  const dimArrow = (x1d: number, y1d: number, x2d: number, y2d: number) => (
    <>
      <line className="dwg-dim" x1={x1d} y1={y1d} x2={x2d} y2={y2d} markerStart="url(#tick)" markerEnd="url(#tick)" />
    </>
  );

  return (
    <svg viewBox="0 0 920 710" role="img" aria-labelledby="elev-title elev-desc">
      <title id="elev-title">Conceptual side elevation of Fernwood Cabin A</title>
      <desc id="elev-desc">
        A 16-foot-long cabin with an 8-foot low wall and 12-foot high wall. The metal shed roof rises 4 feet over the length for a 3:12 pitch, with
        1-foot overhangs at each end, a horizontal run of 18 feet, and a future solar array on the roof. The floor framing sits 4 feet above
        grade on eight pressure-treated 4x6 posts. Between the posts, a service platform at truck-tailgate height holds a roll-out black tank,
        two 65-gallon water tanks and a water pump, and gives access to the diesel heater and electrical equipment. Post positions are schematic.
      </desc>
      <defs>
        <marker id="tick" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="10" markerHeight="10" orient="auto">
          <path d="M2 8 L8 2" stroke="var(--forest)" strokeWidth="1.5" />
        </marker>
        <marker id="arrowL" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9" fill="none" stroke="var(--ink-3)" strokeWidth="1.5" />
        </marker>
        <pattern id="earth" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" className="dwg-hatch" />
        </pattern>
      </defs>

      {/* ground */}
      <rect x="40" y={groundY} width="840" height="18" fill="url(#earth)" />
      <line className="dwg-ground" x1="40" y1={groundY} x2="880" y2={groundY} />

      {/* posts (schematic) */}
      {postXs.map((x) => (
        <rect key={x} className="dwg-post" x={x - 7} y={floorBottom} width="14" height={groundY - floorBottom} />
      ))}

      {/* service platform + equipment (schematic) */}
      <rect className="dwg-frame" x={x0} y={platY} width={x1 - x0} height={platT} />
      {(() => {
        // Place each item in a gap between the schematic posts.
        const gap = (a: number, b: number) => ({ x: postXs[a] + 12, w: postXs[b] - postXs[a] - 24 });
        const g1 = gap(1, 2);
        const g2 = gap(2, 3);
        const items = [
          { ...gap(0, 1), h: 26, rx: 8, label: "black tank" },
          { x: g1.x, w: 48, h: 30, rx: 6, label: "65 gal" },
          { x: g1.x + 52, w: 48, h: 30, rx: 6, label: "65 gal" },
          { x: g1.x + 104, w: g1.w - 104, h: 16, rx: 3, label: "pump" },
          { x: g2.x, w: 52, h: 22, rx: 3, label: "heater" },
          { x: g2.x + 56, w: g2.w - 56, h: 22, rx: 3, label: "electrical" },
        ];
        return items.map((it, i) => (
          <g key={i}>
            <rect className="dwg-equip" x={it.x} y={platY - it.h} width={it.w} height={it.h} rx={it.rx} />
            <text className="dwg-label dwg-label--ink" x={it.x + it.w / 2} y={platY - it.h / 2 + 4} textAnchor="middle" style={{ fontSize: 11 }}>
              {it.label}
            </text>
          </g>
        ));
      })()}
      <path className="dwg-thin" d={`M${postXs[0] + 40} ${platY + 18} H${postXs[0] + 14}`} markerEnd="url(#arrowL)" />
      <text className="dwg-label dwg-label--wood" x={postXs[0] + 46} y={platY + 22} style={{ fontSize: 11 }}>tank rolls out</text>
      <text className="dwg-label dwg-label--wood" x={(postXs[1] + postXs[2]) / 2} y={platY + 22} textAnchor="middle" style={{ fontSize: 11 }}>water tanks + pump</text>
      <text className="dwg-label dwg-label--wood" x={x1 + 14} y={platY - 4} style={{ fontSize: 12 }}>Service platform</text>
      <text className="dwg-label dwg-label--wood" x={x1 + 14} y={platY + 12} style={{ fontSize: 12 }}>at {sp.heightLabel}</text>

      {/* floor framing */}
      <rect className="dwg-frame" x={x0} y={floorTop} width={x1 - x0} height={joist} />

      {/* wall */}
      <polygon className="dwg-fill" points={`${x0},${floorTop} ${x0},${lowTop} ${x1},${highTop} ${x1},${floorTop}`} />

      {/* roof */}
      <polygon
        className="dwg-roof"
        points={`${ohL},${roofY(ohL)} ${ohR},${roofY(ohR)} ${ohR},${roofY(ohR) - roofT} ${ohL},${roofY(ohL) - roofT}`}
      />

      {/* future solar */}
      <polygon
        className="dwg-solar"
        points={`${sA},${roofY(sA) - roofT - 5} ${sB},${roofY(sB) - roofT - 5} ${sB},${roofY(sB) - roofT - 5 - sOff} ${sA},${roofY(sA) - roofT - 5 - sOff}`}
      />
      <text
        className="dwg-label"
        x={(sA + sB) / 2}
        y={roofY((sA + sB) / 2) - roofT - 34}
        textAnchor="middle"
        transform={`rotate(${-pitchAngle} ${(sA + sB) / 2} ${roofY((sA + sB) / 2) - roofT - 34})`}
      >
        Future solar array
      </text>
      <text
        className="dwg-label dwg-label--ink"
        x={(x0 + x1) / 2 - 60}
        y={roofY((x0 + x1) / 2 - 60) + 22}
        textAnchor="middle"
        transform={`rotate(${-pitchAngle} ${(x0 + x1) / 2 - 60} ${roofY((x0 + x1) / 2 - 60) + 22})`}
      >
        Metal roof · {roof.pitch}
      </text>

      {/* pitch triangle */}
      <g transform={`translate(${x0 + 0.6 * S} ${roofY(x0 + 0.6 * S) + 34})`}>
        <path className="dwg-dim" d={`M0 0 H${2 * S} V${-2 * S * slope} Z`} />
        <text className="dwg-label" x={S} y="15" textAnchor="middle">12</text>
        <text className="dwg-label" x={2 * S + 6} y={-S * slope + 4}>3</text>
      </g>

      {/* labels inside wall */}
      <text className="dwg-label dwg-label--ink dwg-label--lg" x={(x0 + x1) / 2} y={floorTop - 70} textAnchor="middle">
        {cabin.width} × {cabin.length} ft · {cabin.floorArea} sq ft
      </text>
      <text className="dwg-label dwg-label--ink" x={(x0 + x1) / 2} y={floorTop - 48} textAnchor="middle">
        Wood-framed · insulated · structural sheathing
      </text>
      <text className="dwg-label dwg-label--wood" x={(x0 + x1) / 2} y={floorTop + joist - 9} textAnchor="middle" style={{ fontSize: 11 }}>
        2x12 floor framing
      </text>
      <text className="dwg-label dwg-label--wood dwg-halo" x={(x0 + x1) / 2} y={groundY - 14} textAnchor="middle" style={{ fontSize: 12 }}>
        {cabin.posts.count} × PT {cabin.posts.size} posts — schematic; layout per final design
      </text>

      {/* ---- dimensions ---- */}
      {/* length 16 ft */}
      <line className="dwg-ext" x1={x0} y1={floorTop} x2={x0} y2={groundY + 44} />
      <line className="dwg-ext" x1={x1} y1={floorTop} x2={x1} y2={groundY + 44} />
      {dimArrow(x0, groundY + 38, x1, groundY + 38)}
      <text className="dwg-label" x={(x0 + x1) / 2} y={groundY + 33} textAnchor="middle">{cabin.length} ft cabin length</text>

      {/* run 18 ft incl overhangs */}
      <line className="dwg-ext" x1={ohL} y1={roofY(ohL)} x2={ohL} y2={groundY + 78} />
      <line className="dwg-ext" x1={ohR} y1={roofY(ohR)} x2={ohR} y2={groundY + 78} />
      {dimArrow(ohL, groundY + 72, ohR, groundY + 72)}
      <text className="dwg-label" x={(ohL + ohR) / 2} y={groundY + 67} textAnchor="middle">
        ≈ {roof.horizontalRun} ft horizontal run incl. overhangs · sloped length ≈ {roof.slopeLengthLabel}
      </text>

      {/* overhang labels */}
      <text className="dwg-label" x={(ohL + x0) / 2} y={groundY + 96} textAnchor="middle">{roof.overhangFront} ft overhang</text>
      <text className="dwg-label" x={(x1 + ohR) / 2} y={groundY + 96} textAnchor="middle">{roof.overhangBack} ft overhang</text>

      {/* low wall 8 ft */}
      <line className="dwg-ext" x1={x0} y1={lowTop} x2={x0 - 70} y2={lowTop} />
      <line className="dwg-ext" x1={x0} y1={floorTop} x2={x0 - 70} y2={floorTop} />
      {dimArrow(x0 - 60, floorTop, x0 - 60, lowTop)}
      <text className="dwg-label" x={x0 - 68} y={(floorTop + lowTop) / 2} textAnchor="middle" transform={`rotate(-90 ${x0 - 68} ${(floorTop + lowTop) / 2})`}>
        ≈ {cabin.lowWall} ft low wall
      </text>

      {/* post height 4 ft: grade to underside of floor framing */}
      <line className="dwg-ext" x1={x0} y1={floorBottom} x2={x0 - 70} y2={floorBottom} />
      <line className="dwg-ext" x1={x0 - 70} y1={groundY} x2={x0 - 50} y2={groundY} />
      {dimArrow(x0 - 60, groundY, x0 - 60, floorBottom)}
      <text className="dwg-label" x={x0 - 68} y={(groundY + floorBottom) / 2} textAnchor="middle" transform={`rotate(-90 ${x0 - 68} ${(groundY + floorBottom) / 2})`}>
        {cabin.postHeight} ft posts
      </text>

      {/* high wall 12 ft */}
      <line className="dwg-ext" x1={x1} y1={highTop} x2={x1 + 110} y2={highTop} />
      <line className="dwg-ext" x1={x1} y1={floorTop} x2={x1 + 110} y2={floorTop} />
      {dimArrow(x1 + 100, floorTop, x1 + 100, highTop)}
      <text className="dwg-label" x={x1 + 116} y={(floorTop + highTop) / 2} textAnchor="middle" transform={`rotate(-90 ${x1 + 116} ${(floorTop + highTop) / 2})`}>
        ≈ {cabin.highWall} ft high wall
      </text>

      {/* rise 4 ft */}
      <line className="dwg-ext" x1={x0} y1={lowTop} x2={x1 + 60} y2={lowTop} />
      {dimArrow(x1 + 52, lowTop, x1 + 52, highTop)}
      <text className="dwg-label" x={x1 + 44} y={(lowTop + highTop) / 2} textAnchor="middle" transform={`rotate(-90 ${x1 + 44} ${(lowTop + highTop) / 2})`}>
        {roof.rise} ft rise
      </text>
    </svg>
  );
}
