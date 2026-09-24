"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { BrandMark } from "./Icons";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="container">
        <a className="brand" href="#top" aria-label={`${site.projectName} — back to top`}>
          <BrandMark />
          <span>{site.projectName}</span>
          <small>{site.channelName}</small>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
            {open ? (
              <path d="M3 1l12 12M15 1L3 13" stroke="currentColor" strokeWidth="1.8" />
            ) : (
              <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.8" />
            )}
          </svg>
          Menu
        </button>

        <nav id="site-nav" className="site-nav" aria-label="Sections" data-open={open}>
          <ul className="nav-list">
            {nav.map((item) => (
              <li key={item.id} className={item.id === "contact" ? "nav-contact" : undefined}>
                <a href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined} onClick={() => setOpen(false)}>
                  <span className="nav-long">{item.label}</span>
                  <span className="nav-short">{item.short}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn--primary btn--small nav-cta" href="#contact">
          Partner with the project
        </a>
      </div>
    </header>
  );
}
