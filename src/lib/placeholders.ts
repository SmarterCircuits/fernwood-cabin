import { channel, channelMetrics, secondChannel } from "@/data/channel";
import { contact } from "@/data/contact";
import { media } from "@/data/media";
import { site } from "@/data/site";

export interface Placeholder {
  what: string;
  where: string;
}

/**
 * Everything that still needs real data before production. Used by the
 * development panel and by the build-time check in src/app/page.tsx.
 */
export function findPlaceholders(): Placeholder[] {
  const out: Placeholder[] = [];
  if (!site.siteUrl) out.push({ what: "Production site URL (canonical / Open Graph)", where: "NEXT_PUBLIC_SITE_URL or src/data/site.ts" });
  if (!channel.youtubeUrl) out.push({ what: "YouTube channel URL", where: "src/data/channel.ts → channel.youtubeUrl" });
  if (!secondChannel.youtubeUrl) out.push({ what: `${secondChannel.name} YouTube URL`, where: "src/data/channel.ts → secondChannel.youtubeUrl" });
  for (const m of channelMetrics) {
    if (m.value === null) out.push({ what: `Channel metric: ${m.label}`, where: "src/data/channel.ts → channelMetrics" });
    else if (!m.asOf) out.push({ what: `Channel metric "${m.label}" has no as-of date`, where: "src/data/channel.ts → channelMetrics" });
  }
  if (!contact.email) out.push({ what: "Sponsorship contact email", where: "src/data/contact.ts → contact.email" });
  if (contact.provider === "none") out.push({ what: "Contact form delivery (no provider configured)", where: "src/data/contact.ts or NEXT_PUBLIC_CONTACT_PROVIDER" });
  if ((contact.provider === "formspree" || contact.provider === "endpoint") && !contact.endpoint)
    out.push({ what: `Contact endpoint for provider "${contact.provider}"`, where: "NEXT_PUBLIC_CONTACT_ENDPOINT" });
  if (contact.provider === "web3forms" && !contact.web3formsKey) out.push({ what: "Web3Forms access key", where: "src/data/contact.ts → web3formsKey" });
  if (contact.provider === "mailto" && !contact.email) out.push({ what: "mailto provider needs contact.email", where: "src/data/contact.ts" });
  const emptyMedia = Object.values(media).filter((m) => !m.src);
  if (emptyMedia.length) out.push({ what: `${emptyMedia.length} photo slot(s) without images: ${emptyMedia.map((m) => m.id).join(", ")}`, where: "src/data/media.ts + public/media/" });
  return out;
}

/** Channel metrics that are real, verified values (safe to present as fact). */
export const hasPlaceholderMetrics = () => channelMetrics.some((m) => m.value === null);
