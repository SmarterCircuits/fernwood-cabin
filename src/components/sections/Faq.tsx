import { faq } from "@/data/faq";
import { SectionHeader } from "../SectionHeader";

export function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <div className="split split--wide-right">
          <SectionHeader index="09" eyebrow="FAQ" title="Questions partners usually ask" id="faq-title">
            <p>Straight answers about the project, the power system, and how partnerships work.</p>
          </SectionHeader>
          <div className="faq">
            {faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <div className="answer">
                  {item.a.map((p) => <p key={p}>{p}</p>)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
