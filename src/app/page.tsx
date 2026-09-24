import { DevPanel } from "@/components/DevPanel";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Overview } from "@/components/sections/Overview";
import { Project } from "@/components/sections/Project";
import { Design } from "@/components/sections/Design";
import { Systems } from "@/components/sections/Systems";
import { Phases } from "@/components/sections/Phases";
import { Budget } from "@/components/sections/Budget";
import { Sponsors } from "@/components/sections/Sponsors";
import { Channel } from "@/components/sections/Channel";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { faq } from "@/data/faq";
import { property } from "@/data/project";
import { site } from "@/data/site";
import { findPlaceholders } from "@/lib/placeholders";

const isDev = process.env.NODE_ENV !== "production";

function structuredData() {
  const url = site.siteUrl ?? undefined;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", name: site.title, description: site.description, ...(url ? { url } : {}) },
      {
        "@type": "CreativeWork",
        name: "Fernwood Cabin A",
        description: site.description,
        creator: { "@type": "Organization", name: site.channelName },
        about: "Construction of a 12×16 ft off-grid cabin",
        locationCreated: {
          "@type": "Place",
          name: property.locationLine,
          address: { "@type": "PostalAddress", addressRegion: "MI", addressCountry: "US" },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") } })),
      },
    ],
  };
}

export default function Home() {
  const placeholders = findPlaceholders();

  // Build-time guard: warn on every production build, fail with STRICT_PLACEHOLDERS=1.
  if (!isDev && placeholders.length) {
    const list = placeholders.map((p) => `  - ${p.what}  [${p.where}]`).join("\n");
    console.warn(`\n⚠ Fernwood Cabin A: ${placeholders.length} placeholder(s) still need real content:\n${list}\n`);
    if (process.env.STRICT_PLACEHOLDERS) throw new Error("STRICT_PLACEHOLDERS is set and placeholders remain (see list above).");
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Overview />
        <Project />
        <Design />
        <Systems />
        <Phases />
        <Budget />
        <Sponsors />
        <Channel />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      {isDev && <DevPanel items={placeholders} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()).replace(/</g, "\\u003c") }} />
    </>
  );
}
