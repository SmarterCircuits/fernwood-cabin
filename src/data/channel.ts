import type { ChannelMetric } from "@/lib/types";

/**
 * CHANNEL METRICS — the only place channel numbers live.
 * ------------------------------------------------------------------
 * Every metric starts as a placeholder (value: null). Placeholders render as
 * "Available on request" in production and trigger a visible warning in
 * development, plus a build-time warning (a build failure with
 * `npm run build:strict`).
 *
 * To publish a metric: set `value` to the verified figure as it should read,
 * set `asOf` to when you pulled it (YYYY-MM), and ideally set `note` to the
 * source (e.g. "YouTube Studio, last 28 days").
 *
 * Historical reference only (NOT current, do not publish without re-verifying):
 * ≈ 5,250 subscribers as of June 2026.
 */

export const channel = {
  name: "Smarter Circuits",
  /** PLACEHOLDER — the channel URL, e.g. "https://www.youtube.com/@..." */
  youtubeUrl: null as string | null,
  positioning:
    "A smart home, electronics, technology and DIY YouTube channel focused on practical projects, testing, installation, repair, automation, home technology and hands-on problem solving.",
  fernwoodExpansion: [
    "Construction",
    "Off-grid systems",
    "Solar",
    "Energy management",
    "Building science",
    "Smart-home technology",
    "Practical homestead infrastructure",
  ],
};

export const channelMetrics: ChannelMetric[] = [
  { id: "subscribers", label: "YouTube subscribers", value: null, asOf: null },
  { id: "monthly-views", label: "Recent monthly views", value: null, asOf: null },
  { id: "avg-views", label: "Average views per video", value: null, asOf: null },
  { id: "growth", label: "Annual channel growth", value: null, asOf: null },
  { id: "geography", label: "Audience geography", value: null, asOf: null },
  { id: "sponsor-performance", label: "Sponsor / project video performance", value: null, asOf: null },
];
