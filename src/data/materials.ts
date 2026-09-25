import type { MaterialGroup, MaterialItem, OwnerSuppliedItem } from "@/lib/types";

/**
 * MATERIALS & BUDGET
 * ------------------------------------------------------------------
 * Every total on the site (base estimate, contingency, working budget,
 * sponsor-covered, remaining, per-group chart) is COMPUTED from `materials`
 * below — nothing is hard-coded elsewhere. Edit quantity / unitCost / status
 * here and everything updates.
 *
 * - subtotal = quantity × unitCost
 * - lines with `optional: true` are displayed but excluded from the base
 * - sponsor status is inherited from the linked sponsor category
 *   (src/data/sponsors.ts) unless a line sets `sponsorStatus` itself
 *
 * Basis: framing, posts, concrete, sheet goods, doors and windows use the
 * quantities and approximate costs from the project estimate. Lines marked
 * "Allowance" split each group's planning figure into line items; replace them
 * with the detailed estimate as products are priced. The lines currently
 * reconcile to the $18,735.60 base estimate.
 */

export const CONTINGENCY_RATE = 0.15;

export const PRICE_DISCLAIMER =
  "Material quantities and prices are planning estimates and may change as engineering, permitting, product selection and construction progress.";

export const materialGroups: MaterialGroup[] = [
  { id: "structure", label: "Structure & foundation" },
  { id: "sheathing", label: "Sheet goods" },
  { id: "openings", label: "Windows & doors" },
  { id: "roofing", label: "Metal roof", rangeNote: "Planning range $800–$1,200 depending on the roofing system" },
  { id: "insulation", label: "Insulation", rangeNote: "Planning range $1,750–$2,100 depending on final assemblies" },
  { id: "envelope", label: "Envelope & weatherproofing" },
  { id: "siding", label: "Exterior siding", rangeNote: "Planning range $900–$1,300 depending on product" },
  { id: "interior", label: "Interior finish" },
  { id: "fixtures", label: "Kitchen & bath fixtures" },
  { id: "plumbing", label: "Plumbing", rangeNote: "Rough plumbing planning range $1,000–$1,500 beyond fixtures; water tanks, pump, water heater and exhaust fan are separate lines" },
  { id: "electrical", label: "Electrical", rangeNote: "Distribution and devices $650–$850 (smoke/CO alarms listed separately); excludes inverters, batteries and charge controllers" },
  { id: "heating", label: "Heating" },
  { id: "hardware", label: "Hardware & consumables" },
];

export const materials: MaterialItem[] = [
  /* ---------------- Structure & foundation ---------------- */
  { id: "2x12-8", group: "structure", category: "Structural lumber", item: "2x12 × 8 ft", spec: "Floor/roof framing, low-waste stock plan", quantity: 2, unit: "pc", unitCost: 13.5, status: "estimated", sponsorCategory: "lumber" },
  { id: "2x12-12", group: "structure", category: "Structural lumber", item: "2x12 × 12 ft", spec: "Floor/roof framing", quantity: 4, unit: "pc", unitCost: 21, status: "estimated", sponsorCategory: "lumber" },
  { id: "2x12-16", group: "structure", category: "Structural lumber", item: "2x12 × 16 ft", spec: "Floor/roof framing", quantity: 10, unit: "pc", unitCost: 30, status: "estimated", sponsorCategory: "lumber" },
  { id: "2x12-18", group: "structure", category: "Structural lumber", item: "2x12 × 18 ft", spec: "Floor/roof framing", quantity: 18, unit: "pc", unitCost: 35, status: "estimated", sponsorCategory: "lumber" },
  { id: "2x12-20", group: "structure", category: "Structural lumber", item: "2x12 × 20 ft", spec: "Floor/roof framing", quantity: 13, unit: "pc", unitCost: 43, status: "estimated", sponsorCategory: "lumber" },
  { id: "2x4-8", group: "structure", category: "Structural lumber", item: "2x4 × 8 ft", spec: "Wall framing", quantity: 159, unit: "pc", unitCost: 3.8, status: "estimated", sponsorCategory: "lumber" },
  { id: "2x4-10", group: "structure", category: "Structural lumber", item: "2x4 × 10 ft", spec: "Wall framing", quantity: 2, unit: "pc", unitCost: 5.2, status: "estimated", sponsorCategory: "lumber" },
  { id: "2x4-12", group: "structure", category: "Structural lumber", item: "2x4 × 12 ft", spec: "Wall framing", quantity: 4, unit: "pc", unitCost: 6.4, status: "estimated", sponsorCategory: "lumber" },
  { id: "2x4-14", group: "structure", category: "Structural lumber", item: "2x4 × 14 ft", spec: "Wall framing", quantity: 2, unit: "pc", unitCost: 8.2, status: "estimated", sponsorCategory: "lumber" },
  { id: "2x4-18", group: "structure", category: "Structural lumber", item: "2x4 × 18 ft", spec: "Wall framing", quantity: 2, unit: "pc", unitCost: 11.5, status: "estimated", sponsorCategory: "lumber" },
  { id: "2x4-spares", group: "structure", category: "Structural lumber", item: "2x4 × 8 ft jobsite spares", spec: "For damaged, twisted or mis-cut boards (5–8 recommended)", quantity: 6, unit: "pc", unitCost: 3.8, status: "estimated", sponsorCategory: "lumber", optional: true },
  { id: "posts", group: "structure", category: "Treated posts", item: "Pressure-treated 4x6 × 16 ft", spec: "Primary cabin support posts", quantity: 8, unit: "pc", unitCost: 41.25, status: "estimated", sponsorCategory: "treated-lumber" },
  { id: "concrete", group: "structure", category: "Concrete", item: "Concrete mix, 80 lb", spec: "≈ 48 cu ft total; footing design verified in permitting", quantity: 80, unit: "bag", unitCost: 7, status: "estimated", sponsorCategory: "concrete" },
  { id: "connectors", group: "structure", category: "Structural hardware", item: "Structural connectors", spec: "Joist hangers, hurricane ties, post bases — per final design", quantity: 1, unit: "allowance", unitCost: 380, status: "estimated", sponsorCategory: "connectors", note: "Allowance" },

  /* ---------------- Sheet goods ---------------- */
  { id: "subfloor", group: "sheathing", category: "Subfloor", item: "OSB subfloor panel 4x8", spec: "Cabin floor plus under-floor service platform", quantity: 12, unit: "sheet", unitCost: 25, status: "estimated", sponsorCategory: "lumber", note: "Includes the service platform; not a larger cabin." },
  { id: "wall-sheathing", group: "sheathing", category: "Wall sheathing", item: "Exterior wall sheathing 4x8", spec: "Structural wood panel", quantity: 20, unit: "sheet", unitCost: 13.5, status: "estimated", sponsorCategory: "lumber" },
  { id: "roof-sheathing", group: "sheathing", category: "Roof sheathing", item: "Roof sheathing 4x8", spec: "≈ 7 by area, ≈ 8 after cuts; 10 includes spares", quantity: 10, unit: "sheet", unitCost: 13.5, status: "estimated", sponsorCategory: "lumber" },

  /* ---------------- Windows & doors ---------------- */
  { id: "door-ext", group: "openings", category: "Doors", item: "Exterior door", spec: "30 × 80 in, prehung", quantity: 1, unit: "ea", unitCost: 300, status: "estimated", sponsorCategory: "doors" },
  { id: "door-int", group: "openings", category: "Doors", item: "Interior door", spec: "30 × 80 in, prehung", quantity: 1, unit: "ea", unitCost: 235, status: "estimated", sponsorCategory: "doors" },
  { id: "win-4x3", group: "openings", category: "Windows", item: "Window 4 × 3 ft", spec: "Brand/model not selected", quantity: 3, unit: "ea", unitCost: 300, status: "estimated", sponsorCategory: "windows" },
  { id: "win-16x30", group: "openings", category: "Windows", item: "Window 16 × 30 in", spec: "Brand/model not selected", quantity: 2, unit: "ea", unitCost: 175, status: "estimated", sponsorCategory: "windows" },

  /* ---------------- Metal roof ---------------- */
  { id: "roof-panels", group: "roofing", category: "Metal roofing", item: "Metal roof panels ≈ 20 ft", spec: "≈ 36 in coverage, trimmed to ≈ 18 ft 7 in; system not selected", quantity: 4, unit: "panel", unitCost: 140, status: "estimated", sponsorCategory: "metal-roofing" },
  { id: "roof-trim", group: "roofing", category: "Roof trim", item: "Roof trim set", spec: "High-side flashing, low-eave/drip, rake/side trim", quantity: 1, unit: "set", unitCost: 180, status: "estimated", sponsorCategory: "roofing-accessories", note: "Allowance" },
  { id: "underlayment", group: "roofing", category: "Roof membrane", item: "Synthetic / high-temp underlayment", spec: "Full roof deck", quantity: 1, unit: "roll", unitCost: 95, status: "estimated", sponsorCategory: "roofing-accessories" },
  { id: "ice-water", group: "roofing", category: "Roof membrane", item: "Ice-and-water membrane", spec: "Eaves and vulnerable areas", quantity: 1, unit: "roll", unitCost: 85, status: "estimated", sponsorCategory: "roofing-accessories" },
  { id: "roof-accessories", group: "roofing", category: "Roof trim", item: "Roofing screws, closures, butyl, sealant", spec: "Metal-compatible sealant; screws if exposed-fastener", quantity: 1, unit: "allowance", unitCost: 120, status: "estimated", sponsorCategory: "roofing-accessories", note: "Allowance" },

  /* ---------------- Insulation ---------------- */
  { id: "wall-batts", group: "insulation", category: "Cavity insulation", item: "R-13 / R-15 wall insulation", spec: "2x4 cavities, ≈ 484 sq ft net wall", quantity: 4, unit: "bag", unitCost: 65, status: "estimated", sponsorCategory: "insulation" },
  { id: "rigid-foam", group: "insulation", category: "Exterior rigid insulation", item: "1-in rigid board, ≈ R-5", spec: "Continuous exterior insulation", quantity: 20, unit: "sheet", unitCost: 32, status: "estimated", sponsorCategory: "rigid-foam" },
  { id: "floor-insulation", group: "insulation", category: "Floor insulation", item: "Floor insulation, R-30+", spec: "192 sq ft elevated floor", quantity: 192, unit: "sq ft", unitCost: 1.98, status: "estimated", sponsorCategory: "insulation", note: "Allowance" },
  { id: "roof-insulation", group: "insulation", category: "Roof insulation", item: "Roof insulation", spec: "≈ 198 sq ft; assembly not yet selected", quantity: 198, unit: "sq ft", unitCost: 2.63, status: "estimated", sponsorCategory: "insulation", note: "Allowance — assembly TBD" },

  /* ---------------- Envelope ---------------- */
  { id: "wrb", group: "envelope", category: "Weather barrier", item: "Weather-resistive barrier", spec: "Over exterior insulation", quantity: 1, unit: "roll", unitCost: 175, status: "estimated", sponsorCategory: "weather-barriers" },
  { id: "flashing-tape", group: "envelope", category: "Flashing", item: "Flashing / sheathing tape", spec: "Openings and seams", quantity: 3, unit: "roll", unitCost: 28, status: "estimated", sponsorCategory: "tapes" },
  { id: "flashing", group: "envelope", category: "Flashing", item: "Drip cap and Z-flashing", spec: "Window/door heads, transitions", quantity: 1, unit: "allowance", unitCost: 90, status: "estimated", sponsorCategory: "flashing", note: "Allowance" },
  { id: "ext-sealant", group: "envelope", category: "Sealants", item: "Exterior / air-sealing sealant", spec: "Tubes", quantity: 12, unit: "tube", unitCost: 9, status: "estimated", sponsorCategory: "sealants" },
  { id: "ext-trim", group: "envelope", category: "Exterior trim", item: "Exterior trim", spec: "Corners, openings, fascia", quantity: 1, unit: "allowance", unitCost: 280, status: "estimated", sponsorCategory: "exterior-trim", note: "Allowance" },

  /* ---------------- Siding ---------------- */
  { id: "siding", group: "siding", category: "Siding", item: "Exterior siding", spec: "Net wall ≈ 484 sq ft + waste; product not selected", quantity: 535, unit: "sq ft", unitCost: 2.05, status: "estimated", sponsorCategory: "siding" },

  /* ---------------- Interior ---------------- */
  { id: "drywall", group: "interior", category: "Drywall", item: "Drywall ½-in 4x8", spec: "Standard", quantity: 22, unit: "sheet", unitCost: 16, status: "estimated", sponsorCategory: "interior-walls" },
  { id: "drywall-mr", group: "interior", category: "Drywall", item: "Moisture-resistant drywall 4x8", spec: "Bathroom", quantity: 2, unit: "sheet", unitCost: 22, status: "estimated", sponsorCategory: "interior-walls" },
  { id: "drywall-finish", group: "interior", category: "Drywall", item: "Drywall screws, compound, tape, corner bead", spec: "Finishing supplies", quantity: 1, unit: "allowance", unitCost: 120, status: "estimated", sponsorCategory: "interior-walls", note: "Allowance" },
  { id: "flooring", group: "interior", category: "Flooring", item: "Finished flooring", spec: "Includes waste", quantity: 215, unit: "sq ft", unitCost: 3.2, status: "estimated", sponsorCategory: "flooring" },
  { id: "int-trim", group: "interior", category: "Interior trim", item: "Baseboard and door/window casing", spec: "", quantity: 1, unit: "allowance", unitCost: 260, status: "estimated", sponsorCategory: "building-supplies", note: "Allowance" },
  { id: "paint", group: "interior", category: "Paint", item: "Primer, paint and caulk", spec: "Interior", quantity: 1, unit: "allowance", unitCost: 210, status: "estimated", sponsorCategory: "paint", note: "Allowance" },
  { id: "cabinets", group: "interior", category: "Kitchen cabinetry", item: "Kitchenette cabinets", spec: "Compact, sized to a 192 sq ft cabin", quantity: 1, unit: "set", unitCost: 900, status: "estimated", sponsorCategory: "cabinets" },
  { id: "countertop", group: "interior", category: "Countertop", item: "Kitchenette countertop", spec: "", quantity: 1, unit: "ea", unitCost: 350, status: "estimated", sponsorCategory: "countertops" },

  /* ---------------- Fixtures ---------------- */
  { id: "kitchen-sink", group: "fixtures", category: "Kitchen sink", item: "Kitchen sink", spec: "", quantity: 1, unit: "ea", unitCost: 220, status: "estimated", sponsorCategory: "plumbing-fixtures" },
  { id: "kitchen-faucet", group: "fixtures", category: "Faucets", item: "Kitchen faucet", spec: "", quantity: 1, unit: "ea", unitCost: 150, status: "estimated", sponsorCategory: "plumbing-fixtures" },
  { id: "vanity", group: "fixtures", category: "Bathroom vanity", item: "Bathroom vanity with sink", spec: "", quantity: 1, unit: "ea", unitCost: 350, status: "estimated", sponsorCategory: "plumbing-fixtures" },
  { id: "bath-faucet", group: "fixtures", category: "Faucets", item: "Bathroom faucet", spec: "", quantity: 1, unit: "ea", unitCost: 90, status: "estimated", sponsorCategory: "plumbing-fixtures" },
  { id: "toilet", group: "fixtures", category: "Toilet", item: "Toilet", spec: "", quantity: 1, unit: "ea", unitCost: 280, status: "estimated", sponsorCategory: "plumbing-fixtures" },
  { id: "shower", group: "fixtures", category: "Shower", item: "Shower stall", spec: "", quantity: 1, unit: "ea", unitCost: 650, status: "estimated", sponsorCategory: "plumbing-fixtures" },
  { id: "shower-valve", group: "fixtures", category: "Faucets", item: "Shower valve and trim", spec: "", quantity: 1, unit: "ea", unitCost: 180, status: "estimated", sponsorCategory: "plumbing-fixtures" },

  /* ---------------- Plumbing ---------------- */
  { id: "pex-34", group: "plumbing", category: "PEX", item: "¾-in PEX", spec: "Main supply", quantity: 1, unit: "roll", unitCost: 85, status: "estimated", sponsorCategory: "pex" },
  { id: "pex-12-hot", group: "plumbing", category: "PEX", item: "½-in PEX, hot", spec: "", quantity: 1, unit: "roll", unitCost: 45, status: "estimated", sponsorCategory: "pex" },
  { id: "pex-12-cold", group: "plumbing", category: "PEX", item: "½-in PEX, cold", spec: "", quantity: 1, unit: "roll", unitCost: 45, status: "estimated", sponsorCategory: "pex" },
  { id: "pex-fittings", group: "plumbing", category: "PEX", item: "Fittings, rings / clamps", spec: "", quantity: 1, unit: "allowance", unitCost: 220, status: "estimated", sponsorCategory: "pex", note: "Allowance" },
  { id: "shutoffs", group: "plumbing", category: "PEX", item: "Shutoffs and supports", spec: "", quantity: 1, unit: "allowance", unitCost: 130, status: "estimated", sponsorCategory: "pex", note: "Allowance" },
  { id: "dwv-3", group: "plumbing", category: "DWV plumbing", item: "3-in DWV pipe and fittings", spec: "Toilet / main drain", quantity: 1, unit: "allowance", unitCost: 180, status: "estimated", sponsorCategory: "pex", note: "Allowance" },
  { id: "dwv-2", group: "plumbing", category: "DWV plumbing", item: "2-in drain / vent", spec: "", quantity: 1, unit: "allowance", unitCost: 120, status: "estimated", sponsorCategory: "pex", note: "Allowance" },
  { id: "dwv-15", group: "plumbing", category: "DWV plumbing", item: "1½-in sink drainage", spec: "", quantity: 1, unit: "allowance", unitCost: 90, status: "estimated", sponsorCategory: "pex", note: "Allowance" },
  { id: "traps", group: "plumbing", category: "DWV plumbing", item: "Traps, toilet flange, fixture connections", spec: "", quantity: 1, unit: "allowance", unitCost: 110, status: "estimated", sponsorCategory: "pex", note: "Allowance" },
  { id: "water-tanks", group: "plumbing", category: "Water storage", item: "65-gallon water tank", spec: "On the under-floor service platform", quantity: 2, unit: "ea", unitCost: 160, status: "estimated", sponsorCategory: "pumps" },
  { id: "water-pump", group: "plumbing", category: "Water storage", item: "Water pump", spec: "Pressurizes supply from the tanks; type not selected", quantity: 1, unit: "ea", unitCost: 150, status: "estimated", sponsorCategory: "pumps", note: "Allowance" },
  { id: "water-heater", group: "plumbing", category: "Water heater", item: "Small cabin water heater", spec: "Fuel and type not selected", quantity: 1, unit: "ea", unitCost: 500, status: "estimated", sponsorCategory: "water-heating", note: "Allowance" },
  { id: "exhaust-fan", group: "plumbing", category: "Ventilation", item: "Bathroom exhaust fan", spec: "Ducted to exterior", quantity: 1, unit: "ea", unitCost: 140, status: "estimated", sponsorCategory: "ventilation" },

  /* ---------------- Electrical ---------------- */
  { id: "load-centers", group: "electrical", category: "Small electrical load centers", item: "Small load center", spec: "One per independent inverter system", quantity: 2, unit: "ea", unitCost: 55, status: "estimated", sponsorCategory: "electrical-panels" },
  { id: "breakers", group: "electrical", category: "Breakers", item: "Branch breakers", spec: "AFCI/GFCI types as code requires", quantity: 1, unit: "allowance", unitCost: 90, status: "estimated", sponsorCategory: "electrical-panels", note: "Allowance" },
  { id: "wire-12", group: "electrical", category: "Wire", item: "12/2 NM cable", spec: "Receptacle and appliance circuits", quantity: 1, unit: "roll", unitCost: 110, status: "estimated", sponsorCategory: "electrical-devices" },
  { id: "wire-14", group: "electrical", category: "Wire", item: "14/2 NM cable", spec: "Lighting circuits where appropriate", quantity: 1, unit: "roll", unitCost: 55, status: "estimated", sponsorCategory: "electrical-devices" },
  { id: "boxes", group: "electrical", category: "Receptacles", item: "Electrical boxes", spec: "", quantity: 1, unit: "allowance", unitCost: 35, status: "estimated", sponsorCategory: "electrical-devices", note: "Allowance" },
  { id: "receptacles", group: "electrical", category: "Receptacles", item: "Receptacles", spec: "≈ 4 general-use; final count per code", quantity: 4, unit: "ea", unitCost: 3, status: "estimated", sponsorCategory: "electrical-devices" },
  { id: "gfci", group: "electrical", category: "GFCI devices", item: "GFCI receptacle", spec: "Where required", quantity: 2, unit: "ea", unitCost: 22, status: "estimated", sponsorCategory: "electrical-devices" },
  { id: "switches", group: "electrical", category: "Switches", item: "Switches", spec: "", quantity: 3, unit: "ea", unitCost: 4, status: "estimated", sponsorCategory: "electrical-devices" },
  { id: "plates", group: "electrical", category: "Switches", item: "Wall plates", spec: "", quantity: 1, unit: "allowance", unitCost: 15, status: "estimated", sponsorCategory: "electrical-devices", note: "Allowance" },
  { id: "lights", group: "electrical", category: "Lighting", item: "LED light fixture", spec: "Living area, bathroom, exterior front wall", quantity: 3, unit: "ea", unitCost: 35, status: "estimated", sponsorCategory: "lighting" },
  { id: "inv-conductors", group: "electrical", category: "Grounding / disconnect hardware", item: "Inverter-to-panel conductors", spec: "Sized to final inverter equipment", quantity: 1, unit: "allowance", unitCost: 60, status: "estimated", sponsorCategory: "electrical-panels", note: "Allowance" },
  { id: "disconnects", group: "electrical", category: "Grounding / disconnect hardware", item: "Disconnects", spec: "Per final equipment and code", quantity: 2, unit: "ea", unitCost: 45, status: "estimated", sponsorCategory: "electrical-panels" },
  { id: "grounding", group: "electrical", category: "Grounding / disconnect hardware", item: "Grounding hardware", spec: "", quantity: 1, unit: "allowance", unitCost: 45, status: "estimated", sponsorCategory: "electrical-panels", note: "Allowance" },
  { id: "alarms", group: "electrical", category: "Smoke / CO alarms", item: "Combination smoke / CO alarm", spec: "", quantity: 2, unit: "ea", unitCost: 45, status: "estimated", sponsorCategory: "sensors" },

  /* ---------------- Heating ---------------- */
  { id: "diesel-heater", group: "heating", category: "Heating", item: "Compact diesel heater", spec: "Under consideration; heating still being evaluated", quantity: 1, unit: "ea", unitCost: 200, status: "estimated", sponsorCategory: "heating", note: "Initial allowance" },
  { id: "heater-fuel", group: "heating", category: "Heating", item: "Fuel tank and components", spec: "", quantity: 1, unit: "allowance", unitCost: 120, status: "estimated", sponsorCategory: "heating", note: "Allowance" },

  /* ---------------- Hardware & consumables ---------------- */
  { id: "fasteners", group: "hardware", category: "Miscellaneous fasteners / consumables", item: "Nails, structural screws, adhesives, misc. hardware", spec: "Framing, sheathing, exterior and interior", quantity: 1, unit: "allowance", unitCost: 319.35, status: "estimated", sponsorCategory: "fasteners", note: "Allowance" },
];

/**
 * Owner-supplied equipment — shown for transparency, excluded from every
 * budget total and NOT a sponsorship need.
 */
export const ownerSupplied: OwnerSuppliedItem[] = [
  { item: "Wood stove (new)", note: "Possible stretch phase; install materials not in budget" },
];

/** Items explicitly outside the cabin materials budget. */
export const budgetExclusions = [
  "Batteries, charge controllers and inverters (open sponsorship needs)",
  "Septic system",
  "Well (estimated 60–80 ft deep)",
  "Driveway and site development",
  "Major excavation and trenching",
  "Labor, where work is DIY",
  "Permit fees",
  "Major appliances, unless listed",
  "Optional wood-stove chimney / masonry installation",
  "Some future solar equipment",
];

/**
 * Rounded public-facing figure. Keep it consistent with the computed working
 * budget shown beside it (currently base + 15% ≈ $22.1k).
 */
export const PUBLIC_BUDGET_SUMMARY = "$20,000–$23,000";
