import { channel, channelMetrics, secondChannel } from "@/data/channel";
import { monthYear } from "@/lib/format";
import { ImageSlot } from "../ImageSlot";
import { SectionHeader } from "../SectionHeader";

const isDev = process.env.NODE_ENV !== "production";

export function Channel() {
  const placeholders = channelMetrics.filter((m) => m.value === null);

  return (
    <section className="section section--dark" id="channel" aria-labelledby="channel-title">
      <div className="container">
        <SectionHeader index="08" eyebrow="Channel" title={channel.name} id="channel-title">
          <p>{channel.positioning}</p>
        </SectionHeader>

        <div className="split split--wide-right">
          <div>
            <h3>What Fernwood Cabin A adds</h3>
            <p className="muted">
              Fernwood Cabin A applies the channel&apos;s existing DIY and technical approach to a full construction project:
            </p>
            <ul className="topic-list" style={{ marginBottom: 24 }}>
              {channel.fernwoodExpansion.map((t) => <li key={t}>{t}</li>)}
            </ul>
            {channel.youtubeUrl && (
              <a className="btn btn--ghost" href={channel.youtubeUrl} target="_blank" rel="noopener noreferrer">
                Visit {channel.name} on YouTube
              </a>
            )}

            <div className="card" style={{ marginTop: 28 }}>
              <p className="kicker" style={{ marginBottom: 6 }}>Also on YouTube</p>
              <h3>{secondChannel.name}</h3>
              <p className="muted" style={{ fontSize: "0.93rem" }}>{secondChannel.focus}</p>
              <p className="muted" style={{ fontSize: "0.88rem" }}>
                Sponsor coverage runs on {channel.name} by default; arrangements that include {secondChannel.name} can be discussed.
              </p>
              {secondChannel.youtubeUrl && (
                <a className="btn btn--ghost btn--small" href={secondChannel.youtubeUrl} target="_blank" rel="noopener noreferrer">
                  Visit {secondChannel.name} on YouTube
                </a>
              )}
            </div>
          </div>

          <div>
            {isDev && placeholders.length > 0 && (
              <div className="dev-warning" role="alert">
                <strong>Development only: {placeholders.length} channel metric(s) are placeholders.</strong> Placeholder values are never shown as
                real numbers. In production they read &ldquo;Available on request&rdquo;. Update <code>src/data/channel.ts</code> with verified
                figures and an as-of date.
              </div>
            )}
            <dl className="metric-grid">
              {channelMetrics.map((m) => {
                const pending = m.value === null;
                return (
                  <div key={m.id} className={`metric ${pending ? "metric--placeholder" : ""} ${pending && isDev ? "metric--dev" : ""}`}>
                    <dt>{m.label}</dt>
                    <dd>{pending ? (isDev ? "PLACEHOLDER · not real data" : "Available on request") : m.value}</dd>
                    {!pending && (
                      <span className="src">
                        {m.asOf ? `As of ${monthYear(m.asOf)}` : ""}
                        {m.note ? ` · ${m.note}` : ""}
                      </span>
                    )}
                  </div>
                );
              })}
            </dl>
            <p className="muted" style={{ fontSize: "0.85rem", marginTop: 12 }}>
              Figures are published only once verified, with an as-of date. Detailed analytics are available to prospective partners on request.
            </p>
          </div>
        </div>

        <div className="grid grid-3" style={{ marginTop: 36 }}>
          <ImageSlot id="thumb-1" />
          <ImageSlot id="thumb-2" />
          <ImageSlot id="thumb-3" />
        </div>
      </div>
    </section>
  );
}
