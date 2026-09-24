import { contact } from "@/data/contact";
import { channel } from "@/data/channel";
import { ContactForm } from "../ContactForm";
import { SectionHeader } from "../SectionHeader";

export function Contact() {
  return (
    <section className="section section--alt" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="split split--wide-right">
          <div className="contact-aside">
            <SectionHeader index="10" eyebrow="Contact" title="Partner with the project" id="contact-title">
              <p>
                If your product fits a real, long-term off-grid build, we&apos;d like to hear about it. Product, cash and combined partnerships
                are all welcome.
              </p>
            </SectionHeader>
            <dl>
              <dt>Project</dt>
              <dd>Fernwood Cabin A · Oscoda County, Michigan</dd>
              <dt>Channel</dt>
              <dd>
                {channel.youtubeUrl ? (
                  <a href={channel.youtubeUrl} target="_blank" rel="noopener noreferrer">{channel.name}</a>
                ) : (
                  channel.name
                )}
              </dd>
              {contact.email && (
                <>
                  <dt>Email</dt>
                  <dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd>
                </>
              )}
              <dt>Helpful to include</dt>
              <dd>
                <ul style={{ margin: "4px 0 0", fontSize: "0.93rem" }}>
                  <li>The product and where it fits the build</li>
                  <li>Product, cash, or both</li>
                  <li>Any timing tied to a build phase</li>
                </ul>
              </dd>
            </dl>
          </div>
          <div className="card">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
