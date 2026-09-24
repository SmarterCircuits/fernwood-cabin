import { designStatus, heating, plumbing, power } from "@/data/project";
import { ownerSupplied } from "@/data/materials";
import { SectionHeader } from "../SectionHeader";
import { SponsorChip } from "../Chip";

export function Systems() {
  const amps = Math.round(power.inverterWatts / power.volts);

  return (
    <section className="section section--alt" id="systems" aria-labelledby="systems-title">
      <div className="container">
        <SectionHeader index="04" eyebrow="Off-Grid Systems" title="Sized for what the cabin actually needs" id="systems-title">
          <p>
            No 100 A utility service and no suburban-style panel. Fernwood Cabin A runs on two small, independent inverter systems. Power is managed on
            purpose, and the aim is off-grid technology sized to real loads rather than oversized hardware.
          </p>
        </SectionHeader>

        <div className="diagram">
          <div className="diagram-title">
            <h3>Power architecture</h3>
            <span className="stamp">Conceptual · not a wiring diagram</span>
          </div>
          <div className="flow" role="group" aria-label="Power flow from solar to cabin loads">
            <div className="flow-node flow-node--future">
              <span className="kicker">Future · roof-mounted</span>
              <h4>Solar array</h4>
              <p>Installed on the metal roof in a later phase.</p>
            </div>
            <div className="flow-node flow-node--owned">
              <span className="kicker">Owner supplied</span>
              <h4>Charge controllers</h4>
              <p>Already planned; not a sponsorship need.</p>
            </div>
            <div className="flow-node flow-node--owned">
              <span className="kicker">Owner supplied</span>
              <h4>Battery storage</h4>
              <p>DC-side configuration to be finalized with the equipment.</p>
            </div>
            <div className="flow-systems">
              {power.systems.map((sys, i) => (
                <div key={sys.id}>
                  {i === 1 && <p className="flow-isolation" style={{ margin: "0 0 14px" }}>Independent · outputs not paralleled</p>}
                  <div className="flow-system">
                    <div className="flow-system-head">
                      <strong>{sys.name}</strong>
                      <span className="kicker">{sys.role}</span>
                    </div>
                    <div className="flow-node flow-node--owned">
                      <span className="kicker">Owner supplied</span>
                      <h4>{(power.inverterWatts / 1000).toFixed(0)},000 W inverter</h4>
                      <p>≈ {amps} A at {power.volts} V</p>
                    </div>
                    <div className="flow-node">
                      <span className="kicker">Branch distribution</span>
                      <h4>Small load center {sys.id}</h4>
                      <p>Breakers, disconnect, protection</p>
                    </div>
                    <div>
                      <span className="kicker">Loads</span>
                      <ul>{sys.loads.map((l) => <li key={l}>{l}</li>)}</ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="diagram-note">
            {power.paralleling} {power.inverterWatts.toLocaleString()} W ÷ {power.volts} V ≈ {amps} A maximum AC output per inverter.
          </p>
        </div>

        <div className="grid grid-3" style={{ marginTop: 20 }}>
          <div className="card card--flat">
            <h3>Electrical scope</h3>
            <ul style={{ fontSize: "0.93rem" }}>
              <li>Two small load centers with branch breakers</li>
              <li>≈ 4 general-use receptacles; GFCI where required</li>
              <li>Lighting: {power.lighting.join(", ").toLowerCase()}</li>
              <li>12/2 and 14/2 cable, boxes, switches, plates</li>
              <li>Inverter-to-panel conductors, disconnects, grounding</li>
              <li>Smoke / CO alarms</li>
            </ul>
            <p className="muted" style={{ fontSize: "0.85rem" }}>{designStatus.electrical}</p>
          </div>
          <div className="card card--flat">
            <h3>Already owned</h3>
            <p className="muted" style={{ fontSize: "0.9rem" }}>Not sponsorship needs, and excluded from the materials budget.</p>
            <ul className="owned-list">
              {ownerSupplied.map((o) => (
                <li key={o.item}>
                  <strong>{o.item}</strong>
                  <span>{o.note}</span>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 12, marginBottom: 0 }}><SponsorChip status="owner-supplied" /></p>
          </div>
          <div className="card card--flat">
            <h3>Efficiency is a system</h3>
            <p className="muted" style={{ fontSize: "0.9rem" }}>Each step makes the next one smaller.</p>
            <ol className="chain">
              {power.efficiencyChain.map((c) => <li key={c}>{c}</li>)}
            </ol>
          </div>
        </div>

        <div className="split split--even" style={{ marginTop: 20 }}>
          <div className="card card--flat">
            <h3>Heating</h3>
            <p style={{ fontSize: "0.95rem" }}>{heating.current}</p>
            <p style={{ fontSize: "0.95rem" }}>
              <strong>Stretch phase, not committed:</strong> {heating.woodStove}
            </p>
            <p className="muted" style={{ fontSize: "0.88rem", marginBottom: 0 }}>
              Heating partners could include compact high-efficiency heating, diesel heaters, mini-splits where appropriate, ventilation, and
              monitoring and control equipment.
            </p>
          </div>
          <div className="card card--flat">
            <h3>Plumbing & water</h3>
            <p style={{ fontSize: "0.95rem" }}>
              <strong>Fixtures:</strong> {plumbing.fixtures.join(" · ")}
            </p>
            <ul style={{ fontSize: "0.9rem", columns: "2 180px" }}>{plumbing.rough.map((r) => <li key={r}>{r}</li>)}</ul>
            <p style={{ fontSize: "0.93rem" }}>{plumbing.waterHeater}</p>
            <p style={{ fontSize: "0.93rem" }}>{plumbing.blackTank}</p>
            <p className="muted" style={{ fontSize: "0.88rem", marginBottom: 0 }}>
              <strong>Separate future phases, outside the cabin budget:</strong> {plumbing.excluded.join(", ").toLowerCase()}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
