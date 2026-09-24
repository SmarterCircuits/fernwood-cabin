import type { MediaSlot } from "@/lib/types";

/**
 * PHOTO & VIDEO SLOTS
 * ------------------------------------------------------------------
 * Every image on the site comes from here. To add a real photo:
 *   1. Put the file in public/media/ (e.g. public/media/property-01.jpg)
 *   2. Set `src: "/media/property-01.jpg"` on the slot
 *   3. Write a specific `alt` describing what is in the photo
 *
 * Slots with src: null render as neutral labelled placeholders. Use real
 * project photos only — no stock imagery or renderings presented as photos.
 */

export const media: Record<string, MediaSlot> = {
  property: {
    id: "property",
    label: "Fernwood property",
    brief: "Wide shot of the property from the two-track, showing the mixed hardwood forest.",
    src: null,
    alt: "The Fernwood property: mixed northern Michigan hardwood forest",
    aspect: "4 / 3",
  },
  site: {
    id: "site",
    label: "Cabin site",
    brief: "The prepared cabin site, ideally with the 12×16 footprint staked out.",
    src: null,
    alt: "The cabin site at Fernwood",
    aspect: "4 / 3",
  },
  forest: {
    id: "forest",
    label: "Forest detail",
    brief: "Oaks, maples or understory close to the build site.",
    src: null,
    alt: "Oak and maple forest at Fernwood",
    aspect: "4 / 3",
  },
  drawings: {
    id: "drawings",
    label: "Cabin drawings",
    brief: "Photo or export of the working framing model / drawings.",
    src: null,
    alt: "Working drawings of Fernwood Cabin A",
    aspect: "16 / 10",
  },
  materials: {
    id: "materials",
    label: "Tools & materials",
    brief: "Lumber delivery, tools on site, or staged materials.",
    src: null,
    alt: "Building materials staged at the Fernwood site",
    aspect: "4 / 3",
  },
  progress: {
    id: "progress",
    label: "Construction progress",
    brief: "Most recent construction photo — update as the build advances.",
    src: null,
    alt: "Construction progress on Fernwood Cabin A",
    aspect: "4 / 3",
  },
  "thumb-1": {
    id: "thumb-1",
    label: "YouTube thumbnail",
    brief: "Thumbnail of a representative Smarter Circuits video.",
    src: null,
    alt: "Smarter Circuits video thumbnail",
    aspect: "16 / 9",
  },
  "thumb-2": {
    id: "thumb-2",
    label: "YouTube thumbnail",
    brief: "Thumbnail of a product installation or testing video.",
    src: null,
    alt: "Smarter Circuits video thumbnail",
    aspect: "16 / 9",
  },
  "thumb-3": {
    id: "thumb-3",
    label: "YouTube thumbnail",
    brief: "Thumbnail of the first Fernwood Cabin A video once published.",
    src: null,
    alt: "Fernwood Cabin A project video thumbnail",
    aspect: "16 / 9",
  },
};

/** Optional links for the thumbnails above (same ids). Leave empty until real. */
export const videoLinks: Record<string, string> = {};
