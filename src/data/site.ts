/**
 * SITE / SEO CONFIGURATION
 * ------------------------------------------------------------------
 * The production domain has NOT been decided. Set NEXT_PUBLIC_SITE_URL
 * (see .env.example) or fill `siteUrl` below once it is. Until then the site
 * builds without canonical URLs and with relative Open Graph image paths.
 */
export const site = {
  /** e.g. "https://fernwood.example" — PLACEHOLDER until a domain is chosen. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || (null as string | null),

  title: "Fernwood Cabin A | Smarter Circuits",
  shortTitle: "Fernwood Cabin A",
  description:
    "Follow the construction of a compact off-grid cabin on 10 acres of northern Michigan woodland, combining DIY construction, solar power, energy efficiency and smart-home technology.",
  projectName: "Fernwood Cabin A",
  umbrella: "Life at Fernwood",
  channelName: "Smarter Circuits",
  locale: "en_US",
  /**
   * Social preview image in /public (1200×630). The current file is a text-only
   * placeholder; replace it with a real project photo when available.
   * Only emitted once siteUrl is set, because crawlers need an absolute URL.
   */
  ogImage: { path: "/og-image.png", width: 1200, height: 630, alt: "Fernwood Cabin A: a 12×16 off-grid cabin in northern Michigan" },
  keywords: [
    "off-grid cabin",
    "northern Michigan",
    "DIY cabin build",
    "solar cabin",
    "metal roof",
    "building science",
    "smart home",
    "Smarter Circuits",
    "Fernwood",
    "Fernwood Cabin A",
  ],
};

/** Top navigation — ids must match section ids on the page. `short` is used in the desktop bar. */
export const nav = [
  { id: "overview", label: "Overview", short: "Overview" },
  { id: "project", label: "The Project", short: "Project" },
  { id: "design", label: "Cabin Design", short: "Design" },
  { id: "systems", label: "Off-Grid Systems", short: "Systems" },
  { id: "phases", label: "Build Phases", short: "Phases" },
  { id: "budget", label: "Materials & Budget", short: "Budget" },
  { id: "sponsors", label: "Sponsor Opportunities", short: "Sponsors" },
  { id: "channel", label: "Channel", short: "Channel" },
  { id: "faq", label: "FAQ", short: "FAQ" },
  { id: "contact", label: "Contact", short: "Contact" },
];
