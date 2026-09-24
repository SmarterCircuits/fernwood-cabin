import type { BuildPhase } from "@/lib/types";

/**
 * BUILD PHASES
 * ------------------------------------------------------------------
 * Update `status` as work progresses:
 *   "complete" | "in-progress" | "next" | "planned" | "stretch"
 *
 * Add `completedOn: "YYYY-MM-DD"` ONLY when a phase is actually finished.
 * Add `photos: ["media-slot-id"]` (ids from src/data/media.ts) and
 * `videos: [{ label, url }]` as content is published.
 * `sponsorCategories` are ids from src/data/sponsors.ts.
 *
 * VERIFY BEFORE PUBLISHING: only "Property acquired" is marked complete and
 * "Site assessment" in progress. Adjust to the real state of the build.
 */

export const phases: BuildPhase[] = [
  {
    id: "acquired",
    title: "Property acquired",
    status: "complete",
    summary: "10.3 privately owned acres of previously select-cut northern Michigan woodland, reached by a private two-track.",
    materials: [],
    sponsorCategories: [],
    photos: ["property"],
  },
  {
    id: "site-assessment",
    title: "Site assessment",
    status: "in-progress",
    summary: "Choosing the cabin location for access, drainage, tree retention and future solar exposure.",
    materials: [],
    sponsorCategories: ["tools"],
  },
  {
    id: "site-prep",
    title: "Site clearing & preparation",
    status: "planned",
    summary: "Selective clearing only where the cabin, access and solar exposure require it.",
    materials: ["Site layout supplies", "Hauling and clearing equipment"],
    sponsorCategories: ["power-equipment", "cordless-tools", "safety", "workwear"],
    photos: ["site"],
  },
  {
    id: "foundation",
    title: "Foundation & posts",
    status: "planned",
    summary: "Eight pressure-treated 4x6 posts set in concrete footings. Final footing design is verified during permitting.",
    materials: ["8 × PT 4x6x16 posts", "≈ 80 × 80-lb bags concrete", "Post bases / connectors"],
    sponsorCategories: ["treated-lumber", "concrete", "concrete-tools", "connectors"],
  },
  {
    id: "floor",
    title: "Floor & platform",
    status: "planned",
    summary: "2x12 floor framing 4 ft above grade, OSB subfloor, and the under-floor service platform at truck-tailgate height.",
    materials: ["2x12 joists and rims", "12 × 4x8 subfloor panels", "Joist hangers, adhesive, fasteners"],
    sponsorCategories: ["lumber", "connectors", "fasteners"],
  },
  {
    id: "framing",
    title: "Wall framing",
    status: "planned",
    summary: "≈ 301 pieces of 2x4 framing: 8-ft low wall rising to a 12-ft high wall.",
    materials: ["≈ 169 × 2x4 stock boards", "20 × 4x8 wall sheathing", "Framing fasteners"],
    sponsorCategories: ["lumber", "fasteners", "cordless-tools", "tools", "safety"],
  },
  {
    id: "roof",
    title: "Roof framing & metal roof",
    status: "planned",
    summary: "2x12 rafters, roof sheathing and a 3:12 metal roof designed to carry solar later.",
    materials: ["2x12 rafters", "10 × 4x8 roof sheathing", "4 metal panels ≈ 20 ft", "Underlayment, ice-and-water, trim, closures"],
    sponsorCategories: ["metal-roofing", "roofing-accessories", "lumber", "connectors", "safety"],
  },
  {
    id: "weather-tight",
    title: "Weather-tight shell",
    status: "planned",
    summary: "Water-resistive barrier, tapes and flashing to close in the structure.",
    materials: ["WRB", "Flashing tape", "Sealants", "Flashing"],
    sponsorCategories: ["weather-barriers", "tapes", "flashing", "sealants"],
  },
  {
    id: "openings",
    title: "Windows & doors",
    status: "planned",
    summary: "Five windows and two doors, flashed and air-sealed.",
    materials: ["3 × 4×3 windows", "2 × 16×30 windows", "30×80 exterior door", "30×80 interior door"],
    sponsorCategories: ["windows", "doors", "flashing"],
  },
  {
    id: "insulation",
    title: "Insulation & air sealing",
    status: "planned",
    summary: "Wall cavities, R-30+ floor, and a cathedral roof assembly where building science matters most.",
    materials: ["R-13/R-15 wall insulation", "Floor insulation", "Roof insulation (assembly TBD)", "Air-sealing tapes and sealants"],
    sponsorCategories: ["insulation", "tapes", "sealants"],
  },
  {
    id: "exterior",
    title: "Exterior insulation & siding",
    status: "planned",
    summary: "Continuous R-5 exterior insulation, siding and trim suited to the wooded site.",
    materials: ["≈ 20 × 1-in R-5 rigid board", "Siding ≈ 500+ sq ft", "Exterior trim", "Exterior fasteners"],
    sponsorCategories: ["rigid-foam", "siding", "exterior-trim", "fasteners", "paint"],
  },
  {
    id: "electrical",
    title: "Electrical",
    status: "planned",
    summary: "Two independent inverter systems, two small load centers, modest lighting and receptacles.",
    materials: ["2 load centers + breakers", "12/2 and 14/2 cable", "Devices, GFCI, boxes", "3 LED fixtures", "Disconnects, grounding", "Smoke / CO alarms"],
    sponsorCategories: ["electrical-panels", "electrical-devices", "lighting"],
  },
  {
    id: "plumbing",
    title: "Plumbing",
    status: "planned",
    summary: "PEX supply and DWV for a kitchenette and small bathroom. Well and septic are separate phases.",
    materials: ["PEX + fittings", "3-in / 2-in / 1½-in DWV", "Water heater", "Exhaust fan"],
    sponsorCategories: ["pex", "plumbing-fixtures", "water-heating", "ventilation"],
  },
  {
    id: "interior",
    title: "Interior finish",
    status: "planned",
    summary: "Drywall, flooring, trim, paint, and a modest kitchenette and bath.",
    materials: ["≈ 24 sheets drywall", "≈ 215 sq ft flooring", "Trim and paint", "Cabinets + countertop", "Fixtures"],
    sponsorCategories: ["interior-walls", "flooring", "paint", "cabinets", "countertops", "plumbing-fixtures"],
  },
  {
    id: "solar",
    title: "Solar",
    status: "planned",
    summary: "A roof-mounted array feeding the owner-supplied charge controllers and batteries.",
    materials: ["Roof attachments / seam clamps", "Solar modules", "PV wiring, disconnects, protection"],
    sponsorCategories: ["solar-mounting", "solar-panels", "off-grid"],
  },
  {
    id: "commissioning",
    title: "Systems commissioning",
    status: "planned",
    summary: "Bring heat, power, water and monitoring online, then measure what the cabin actually uses.",
    materials: ["Heating appliance", "Monitoring and sensors", "Controls"],
    sponsorCategories: ["heating", "energy-monitoring", "sensors", "smart-home", "refrigerator"],
  },
  {
    id: "long-term",
    title: "Long-term testing & use",
    status: "planned",
    summary: "Living with the cabin through the seasons and revisiting installed products honestly.",
    materials: [],
    sponsorCategories: ["energy-monitoring", "sensors", "appliances"],
  },
  {
    id: "wood-stove",
    title: "Wood stove installation",
    status: "stretch",
    summary: "The stove is already owned. A compliant install needs chimney, roof flashing, hearth, shielding and clearances. Not committed.",
    materials: ["Chimney system", "Roof penetration flashing", "Hearth / noncombustible materials", "Heat shielding"],
    sponsorCategories: ["heating"],
  },
];
