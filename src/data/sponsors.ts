import type { FeaturedOpportunity, SponsorCategory, SponsorGroupId } from "@/lib/types";

/**
 * SPONSOR CATEGORIES & STATUS — the single source of sponsor status.
 * ------------------------------------------------------------------
 * Change a category's `status` here and it updates everywhere: the category
 * grid, the materials table (lines linked via `sponsorCategory`), the
 * sponsor-covered budget total and the build-phase cards.
 *
 * Valid statuses: "seeking" | "in-discussion" | "sponsored" | "owner-supplied"
 *                 | "purchased" | "completed"
 *
 * Do not add company names here until an agreement actually exists.
 */

export const sponsorGroups: { id: SponsorGroupId; label: string }[] = [
  { id: "structure", label: "Structure & foundation" },
  { id: "roof-solar", label: "Roof & solar" },
  { id: "envelope", label: "Building envelope" },
  { id: "openings-exterior", label: "Windows, doors & exterior" },
  { id: "interior", label: "Interior finish" },
  { id: "plumbing-water", label: "Plumbing & water" },
  { id: "electrical-energy", label: "Electrical & energy" },
  { id: "heating-air", label: "Heating & ventilation" },
  { id: "tools-jobsite", label: "Tools & jobsite" },
];

export const sponsorCategories: SponsorCategory[] = [
  // Structure & foundation
  { id: "lumber", name: "Lumber", group: "structure", status: "seeking", fit: "≈ 808 lf of 2x12 and ≈ 1,400 lf of 2x4 framing stock.", phases: ["floor", "framing", "roof"] },
  { id: "treated-lumber", name: "Engineered / treated lumber", group: "structure", status: "seeking", fit: "Eight 4x6x16 pressure-treated posts raising the floor 4 ft, with a service platform between them.", phases: ["foundation"] },
  { id: "connectors", name: "Structural connectors", group: "structure", status: "seeking", fit: "Joist hangers, hurricane ties, post bases and connections along the load path.", phases: ["foundation", "floor", "framing", "roof"] },
  { id: "fasteners", name: "Fasteners", group: "structure", status: "seeking", fit: "Framing nails, structural screws, sheathing and exterior fasteners.", phases: ["floor", "framing", "roof", "exterior"] },
  { id: "concrete", name: "Concrete", group: "structure", status: "seeking", fit: "≈ 80 × 80-lb bags (≈ 48 cu ft) for post footings.", phases: ["foundation"] },
  { id: "concrete-tools", name: "Concrete tools", group: "structure", status: "seeking", fit: "Mixing, hole-digging and finishing tools for the footing work.", phases: ["foundation"] },

  // Roof & solar
  { id: "metal-roofing", name: "Metal roofing", group: "roof-solar", status: "seeking", fit: "≈ 223 sq ft single-slope roof, 3:12 pitch, ≈ 18 ft 7 in panel length. Standing seam of particular interest.", phases: ["roof"] },
  { id: "roofing-accessories", name: "Roofing accessories", group: "roof-solar", status: "seeking", fit: "Underlayment, ice-and-water membrane, high-side and eave flashing, rake trim, closures.", phases: ["roof"] },
  { id: "solar-mounting", name: "Solar roof mounting", group: "roof-solar", status: "seeking", fit: "Seam clamps or attachments for a future array on the metal roof, ideally non-penetrating.", phases: ["solar"] },
  { id: "solar-panels", name: "Solar panels", group: "roof-solar", status: "seeking", fit: "Roof-mounted array sized to the cabin’s modest, managed loads.", phases: ["solar"] },

  // Building envelope
  { id: "insulation", name: "Insulation", group: "envelope", status: "seeking", fit: "Wall cavities (≈ 484 sq ft net), R-30+ floor (192 sq ft), cathedral roof (≈ 198 sq ft).", phases: ["insulation"] },
  { id: "rigid-foam", name: "Rigid foam / exterior insulation", group: "envelope", status: "seeking", fit: "≈ 20 sheets of 1-in, ≈ R-5 continuous exterior insulation.", phases: ["exterior"] },
  { id: "weather-barriers", name: "Weather barriers", group: "envelope", status: "seeking", fit: "WRB over the exterior insulation, integrated with window and door flashing.", phases: ["weather-tight"] },
  { id: "flashing", name: "Flashing systems", group: "envelope", status: "seeking", fit: "Window/door flashing, drip caps, Z-flashing and roof-to-wall details.", phases: ["weather-tight", "openings"] },
  { id: "tapes", name: "Construction tapes", group: "envelope", status: "seeking", fit: "Sheathing, WRB and air-sealing tapes; butyl for roofing details.", phases: ["weather-tight", "insulation"] },
  { id: "sealants", name: "Sealants", group: "envelope", status: "seeking", fit: "Air-sealing, exterior and metal-compatible sealants.", phases: ["roof", "weather-tight", "interior"] },

  // Windows, doors & exterior
  { id: "windows", name: "Windows", group: "openings-exterior", status: "seeking", fit: "Three 4×3 ft and two 16×30 in windows.", phases: ["openings"] },
  { id: "doors", name: "Doors", group: "openings-exterior", status: "seeking", fit: "One 30×80 exterior door and one 30×80 interior door.", phases: ["openings"] },
  { id: "siding", name: "Siding", group: "openings-exterior", status: "seeking", fit: "≈ 500+ sq ft of wall cladding that suits a wooded setting.", phases: ["exterior"] },
  { id: "exterior-trim", name: "Exterior trim", group: "openings-exterior", status: "seeking", fit: "Corner, window, door and fascia trim.", phases: ["exterior"] },

  // Interior
  { id: "interior-walls", name: "Interior wall products", group: "interior", status: "seeking", fit: "≈ 22 sheets ½-in drywall plus moisture-resistant board for the bathroom.", phases: ["interior"] },
  { id: "flooring", name: "Flooring", group: "interior", status: "seeking", fit: "≈ 215 sq ft finished flooring including waste.", phases: ["interior"] },
  { id: "paint", name: "Paint & coatings", group: "interior", status: "seeking", fit: "Primer, interior paint, and exterior finishes.", phases: ["interior", "exterior"] },
  { id: "cabinets", name: "Cabinets", group: "interior", status: "seeking", fit: "A compact kitchenette sized to a 192 sq ft cabin.", phases: ["interior"] },
  { id: "countertops", name: "Countertops", group: "interior", status: "seeking", fit: "Kitchenette countertop.", phases: ["interior"] },
  { id: "storage", name: "Storage & organization", group: "interior", status: "seeking", fit: "Space-efficient storage for a small off-grid cabin and its tools.", phases: ["interior", "long-term"] },

  // Plumbing & water
  { id: "plumbing-fixtures", name: "Plumbing fixtures", group: "plumbing-water", status: "seeking", fit: "Kitchen sink, bathroom vanity, toilet, shower stall and faucets.", phases: ["plumbing", "interior"] },
  { id: "pex", name: "PEX / plumbing systems", group: "plumbing-water", status: "seeking", fit: "¾-in and ½-in PEX supply, fittings, shutoffs and DWV.", phases: ["plumbing"] },
  { id: "water-heating", name: "Water heating", group: "plumbing-water", status: "seeking", fit: "A small cabin water heater; fuel and type still open.", phases: ["plumbing"] },
  { id: "pumps", name: "Pumps / water systems", group: "plumbing-water", status: "seeking", fit: "Pressure and water-delivery equipment for a future water phase.", phases: ["plumbing", "commissioning"] },

  // Electrical & energy
  { id: "electrical-panels", name: "Electrical panels", group: "electrical-energy", status: "seeking", fit: "Two small load centers, breakers and disconnects for independent inverter systems.", phases: ["electrical"] },
  { id: "electrical-devices", name: "Electrical devices", group: "electrical-energy", status: "seeking", fit: "Receptacles, GFCI protection, switches, plates, boxes and cable.", phases: ["electrical"] },
  { id: "lighting", name: "Lighting", group: "electrical-energy", status: "seeking", fit: "Three efficient LED fixtures: living area, bathroom, exterior front wall.", phases: ["electrical"] },
  { id: "energy-monitoring", name: "Energy monitoring", group: "electrical-energy", status: "seeking", fit: "Per-system production, storage and load monitoring.", phases: ["commissioning", "long-term"] },
  { id: "smart-home", name: "Smart-home controls", group: "electrical-energy", status: "seeking", fit: "Local control and automation for heat, lights and loads.", phases: ["commissioning", "long-term"] },
  { id: "sensors", name: "Sensors", group: "electrical-energy", status: "seeking", fit: "Temperature, humidity and leak sensing so the cabin can be monitored remotely.", phases: ["commissioning", "long-term"] },
  { id: "off-grid", name: "Solar / off-grid equipment", group: "electrical-energy", status: "owner-supplied", statusNote: "Batteries, charge controllers and two 3,000 W inverters are owner supplied. Balance-of-system parts may still be open.", fit: "Wiring, protection and disconnect hardware around the owner-supplied core.", phases: ["solar", "commissioning"] },
  { id: "appliances", name: "Appliances", group: "electrical-energy", status: "seeking", fit: "Efficient, low-draw appliances matched to an inverter budget.", phases: ["interior", "long-term"] },
  { id: "refrigerator", name: "Compact refrigerators", group: "electrical-energy", status: "seeking", fit: "Runs on Inverter System A; efficiency is measured, not assumed.", phases: ["commissioning", "long-term"] },

  // Heating & ventilation
  { id: "heating", name: "Heating", group: "heating-air", status: "seeking", statusNote: "A wood stove is already owned (possible stretch phase).", fit: "Compact, efficient heat for a tight 192 sq ft envelope; diesel heater under consideration.", phases: ["commissioning"] },
  { id: "ventilation", name: "Ventilation", group: "heating-air", status: "seeking", fit: "Bathroom exhaust and whole-cabin fresh air for a well-sealed building.", phases: ["plumbing", "commissioning"] },

  // Tools & jobsite
  { id: "tools", name: "Tools", group: "tools-jobsite", status: "seeking", fit: "Layout, measuring and hand tools used through every phase.", phases: ["framing", "roof", "interior"] },
  { id: "cordless-tools", name: "Cordless tools", group: "tools-jobsite", status: "seeking", fit: "An off-grid jobsite with no utility power — batteries and charging matter.", phases: ["foundation", "framing", "roof", "interior"] },
  { id: "power-equipment", name: "Power equipment", group: "tools-jobsite", status: "seeking", fit: "Site preparation, hauling and charging on a remote site with no utility power.", phases: ["site-prep", "foundation"] },
  { id: "safety", name: "Safety equipment", group: "tools-jobsite", status: "seeking", fit: "Fall protection, PPE and first aid for roof and framing work.", phases: ["framing", "roof"] },
  { id: "workwear", name: "Workwear", group: "tools-jobsite", status: "seeking", fit: "Four-season work in northern Michigan woods.", phases: ["site-prep", "framing", "roof"] },
  { id: "building-supplies", name: "Hardware & building supplies", group: "tools-jobsite", status: "seeking", fit: "Adhesives, consumables and general supplies across the whole build.", phases: ["framing", "interior"] },
];

/**
 * FEATURED OPPORTUNITIES — the "wishlist" cards near the top of the sponsor
 * section. Edit `status` / `statusLabel` as conversations progress.
 */
export const featuredOpportunities: FeaturedOpportunity[] = [
  {
    id: "metal-roof",
    title: "Metal Roofing",
    needed: "≈ 223 sq ft plus trim and accessories",
    detail: "Single-slope 3:12 roof that will later carry the solar array, so durability, waterproofing and attachment points matter. Standing seam is of particular interest for non-penetrating solar clamps.",
    status: "seeking",
    categories: ["metal-roofing", "roofing-accessories"],
    phases: ["roof"],
  },
  {
    id: "exterior-insulation",
    title: "Exterior Insulation",
    needed: "≈ 20 sheets of 1-in, ≈ R-5 board",
    detail: "Continuous insulation over structural sheathing to cut thermal bridging through the 2x4 walls.",
    status: "seeking",
    categories: ["rigid-foam"],
    phases: ["exterior"],
  },
  {
    id: "windows",
    title: "Windows",
    needed: "Three 4×3 ft and two 16×30 in",
    detail: "Flashed and air-sealed into an exterior-insulated wall — installation details will be shown on camera.",
    status: "seeking",
    categories: ["windows", "flashing"],
    phases: ["openings"],
  },
  {
    id: "electrical",
    title: "Electrical",
    needed: "Small dual-inverter branch distribution",
    detail: "Two independent load centers fed by owner-supplied 3,000 W inverters. Panels, breakers, devices, lighting and protection.",
    status: "seeking",
    statusLabel: "Seeking product partners",
    categories: ["electrical-panels", "electrical-devices", "lighting"],
    phases: ["electrical"],
  },
  {
    id: "plumbing",
    title: "Plumbing",
    needed: "Compact kitchen and bath plumbing system",
    detail: "PEX supply, DWV and four fixtures in a cabin that must survive northern Michigan winters.",
    status: "seeking",
    statusLabel: "Seeking product partners",
    categories: ["pex", "plumbing-fixtures", "water-heating"],
    phases: ["plumbing"],
  },
  {
    id: "siding",
    title: "Exterior Siding",
    needed: "≈ 500+ sq ft wall system plus waste and trim",
    detail: "A practical, natural-looking cladding over exterior insulation that fits the wooded setting.",
    status: "seeking",
    categories: ["siding", "exterior-trim"],
    phases: ["exterior"],
  },
];

/** How sponsors can participate — shown as scope levels. */
export const participationLevels = [
  { title: "Component", body: "A single product where it genuinely fits — a fixture, a tool, a connector line." },
  { title: "Category", body: "A whole system category, such as the roof, the windows or the lighting." },
  { title: "Phase", body: "An entire build phase, from material selection through installation video." },
  { title: "Project", body: "A broader partnership across Fernwood, agreed case by case." },
];

/** Examples of collaboration formats. Examples only — not a rate card or contract. */
export const collaborationFormats = [
  "Product integration into the relevant project videos",
  "Installation demonstrations",
  "Practical, real-world testing",
  "Sponsor acknowledgement in videos",
  "Links in video descriptions",
  "Acknowledgement on this website",
  "Inclusion in project materials and resources",
  "Follow-up coverage after extended use",
  "Dedicated content where appropriate and separately agreed",
];

/** Editorial standards — quoted on the sponsor section and in the FAQ. */
export const editorialStandards = [
  "Coverage is technically accurate. Positive reviews are never promised, and editorial conclusions are not for sale.",
  "Products are installed because the build needs them, and they stay in the building.",
  "Raw footage is not made available.",
  "Paid-advertising whitelisting is not offered as a standard deliverable.",
];

/** Why the project is useful to sponsors. */
export const sponsorAdvantages = [
  { title: "Long project lifespan", body: "The cabin is built over many phases, so products show up again and again, not once." },
  { title: "Natural product context", body: "Every product on camera is there because the build genuinely needs it." },
  { title: "Long-term follow-up", body: "Installed products can be revisited months or years later, in real northern Michigan conditions." },
  { title: "Technical audience", body: "Smarter Circuits already serves viewers interested in DIY, electrical systems, automation and hands-on projects." },
  { title: "Evergreen content", body: "Construction and how-to videos keep earning views long after they are published." },
  { title: "Authenticity", body: "The property and cabin are real, privately owned and will stay in use." },
  { title: "Flexible integration", body: "Participation can be a component, a category, a full phase or the broader project." },
];

/** Where a product appears across its life in the build. */
export const productLifecycle = ["Selected", "Installed", "Tested", "Used", "Revisited"];

/** The 20-stage content arc used in the sponsor story. */
export const contentArc = [
  "Planning / design",
  "Site preparation",
  "Foundation / posts",
  "Floor system",
  "Wall framing",
  "Roof framing",
  "Metal roofing",
  "Weatherproofing",
  "Windows / doors",
  "Exterior insulation",
  "Siding",
  "Electrical",
  "Plumbing",
  "Heating",
  "Interior insulation",
  "Drywall / interior finish",
  "Kitchen / bath",
  "Solar installation",
  "Off-grid energy optimization",
  "Long-term use & follow-up",
];
