/**
 * PROJECT FACTS
 * ------------------------------------------------------------------
 * Property, cabin geometry, framing take-off and systems facts. Numbers here
 * feed the diagrams and spec tables directly — change them here, not in the
 * components.
 *
 * Nothing in this file claims permits, engineering approval or code
 * compliance. Keep it that way until those things are actually true, then
 * update `designStatus` below.
 */

export const property = {
  name: "Fernwood",
  county: "Oscoda County",
  state: "Michigan",
  locationLine: "Oscoda County, Michigan",
  acres: 10.3,
  ownership: "Privately owned",
  cover: "Forested northern Michigan woodland, previously select-cut",
  species: [
    "Red maple",
    "Red oak",
    "White oak",
    "Red pine",
    "Black cherry",
    "Bigtooth aspen",
    "Native understory species",
  ],
  /** Wildlife seen on the property, grouped by how often. */
  wildlife: [
    { frequency: "Regular", animals: ["Wild turkey", "Deer", "Coyote", "Fox"] },
    { frequency: "Occasional", animals: ["Black bear", "Elk"] },
    { frequency: "Ultra rare", animals: ["Cougar", "Bobcat"] },
  ],
  access: "Private two-track spur off a public road",
  approach:
    "The site is being developed gradually and deliberately, rather than cleared extensively, with the goal of keeping the woodland characteristics that make it worth building and filming on. For Smarter Circuits, the site provides an authentic backdrop for demonstrating smart, automated off-grid living. For Life in Fernwood, it is the setting for documenting everyday life in a northern Michigan woodland homestead.",
  objective: "A practical, low-impact, off-grid property that will remain in use indefinitely.",
};

/** All dimensions in feet unless noted. */
export const cabin = {
  width: 12,
  length: 16,
  floorArea: 192, // sq ft
  lowWall: 8,
  highWall: 12,
  posts: { count: 8, size: "4x6", treatment: "Pressure-treated", stockLength: 16 },
  /** Grade to the underside of the 2x12 floor framing, in feet. */
  postHeight: 4,
  /**
   * Secondary platform between the posts, below the cabin floor. Height is
   * described as truck-tailgate height. `drawnHeight` only positions it in the
   * diagrams; set it to the measured height (ft) if you want it exact.
   */
  servicePlatform: {
    name: "Under-floor service platform",
    heightLabel: "truck-tailgate height",
    drawnHeight: 2.75,
    uses: ["Roll-out black tank", "Diesel heater access", "Electrical equipment access"],
  },
  construction: [
    "Floor raised 4 ft on treated posts (grade to 2x12 floor framing)",
    "Service platform between the posts at truck-tailgate height",
    "Wood-framed 2x4 walls",
    "2x12 floor and roof framing",
    "Structural wood exterior sheathing",
    "Single-slope metal shed roof",
    "Fully insulated for year-round northern Michigan use",
  ],
};

export const roof = {
  type: "Single-slope shed roof, metal",
  rise: 4, // ft over cabin length
  pitch: "3:12",
  overhangFront: 1,
  overhangBack: 1,
  horizontalRun: 18, // ft incl. overhangs
  slopeLengthLabel: "18 ft 6⅝ in",
  width: 12,
  area: 223, // sq ft
  exposedFastenerLayout: {
    panels: 4,
    coverageWidthIn: 36,
    purchaseLength: "≈ 20 ft",
    trimLength: "≈ 18 ft 7 in",
  },
};

/** Openings used for wall-area and window/door opportunities. */
export const openings = [
  { item: "Exterior door", size: "30 × 80 in", qty: 1 },
  { item: "Interior door", size: "30 × 80 in", qty: 1 },
  { item: "Window", size: "4 × 3 ft", qty: 3 },
  { item: "Window", size: "16 × 30 in", qty: 2 },
];

export const envelope = {
  grossWallArea: 560, // sq ft (8 ft low wall, 12 ft high wall)
  openingArea: 76,
  netWallArea: 484,
  ceilingArea: 198, // sloped cathedral ceiling
  floorArea: 192,
  wallLayers: [
    { layer: "Interior drywall", detail: "½-in; moisture-resistant in bathroom" },
    { layer: "2x4 stud cavity", detail: "R-13 or R-15 batt insulation" },
    { layer: "Structural sheathing", detail: "Wood structural panel" },
    { layer: "Continuous exterior insulation", detail: "≈ 1-in rigid board, ≈ R-5" },
    { layer: "Weather-resistive barrier", detail: "Taped and lapped; flashed openings" },
    { layer: "Siding system", detail: "Product not yet selected" },
  ],
  floorTarget: "≈ R-30 or better",
  roofQuestions: [
    "Condensation control at the underside of the roof deck",
    "Vapor management through the assembly",
    "Ventilation — vented channel vs. unvented assembly",
    "Air sealing at the ceiling plane",
    "Achievable insulation value in 2x12 rafter depth",
    "Compatibility with the metal roofing and underlayment",
    "Northern Michigan winter conditions and snow load",
  ],
  roofOptions: [
    "Vented roof: ventilation channel above cavity insulation",
    "Unvented engineered assembly",
    "Cavity insulation plus continuous insulation",
  ],
};

export const interior = {
  zones: ["Living area", "Kitchenette", "Bathroom", "Sleeping / living, per final layout"],
  fixtures: ["Kitchen sink", "Bathroom sink / vanity", "Toilet", "Shower stall"],
  note: "The final floor plan has not been published. The zones above describe the program, not a layout.",
};

/**
 * Honest status of the design. Update as things change — the site quotes these
 * lines verbatim.
 */
export const designStatus = {
  structural:
    "Final pier/footing dimensions, bearing, uplift resistance, frost protection, connections and load paths will be verified as part of permitting and final design. Northern Michigan snow load and the future roof-mounted solar array are both design considerations.",
  roofAssembly:
    "The final roof insulation assembly has not been selected. It will not be described as code-approved until it has been.",
  electrical:
    "Receptacle count, circuit layout, AFCI/GFCI protection, neutral-ground bonding and disconnecting means will follow the applicable electrical code and the final inverter equipment.",
};

/* ------------------------------------------------------------------ */
/* FRAMING TAKE-OFF (lengths in inches)                               */
/* ------------------------------------------------------------------ */

export const cutList2x12 = [
  { lengthIn: 240, qty: 11 },
  { lengthIn: 143.5, qty: 4 },
  { lengthIn: 56.875, qty: 10 },
  { lengthIn: 192, qty: 10 },
  { lengthIn: 65.5, qty: 2 },
  { lengthIn: 147.5, qty: 18 },
  { lengthIn: 125, qty: 2 },
  { lengthIn: 46.5, qty: 14 },
];

/** Low-waste stock purchase for the 2x12 cut list. */
export const stock2x12 = [
  { lengthFt: 8, qty: 2 },
  { lengthFt: 12, qty: 4 },
  { lengthFt: 16, qty: 10 },
  { lengthFt: 18, qty: 18 },
  { lengthFt: 20, qty: 13 },
];

export const framing2x4 = {
  pieces: 301,
  netLinearFt: 1383.6,
  stock: [
    { lengthFt: 8, qty: 159 },
    { lengthFt: 10, qty: 2 },
    { lengthFt: 12, qty: 4 },
    { lengthFt: 14, qty: 2 },
    { lengthFt: 18, qty: 2 },
  ],
  spares: "5–8 additional 2x4x8 as jobsite spares",
};

export const framingNote =
  "Lumber prices vary significantly by stock length and region, so a cost-optimized purchase may differ from the waste-minimized purchase shown here.";

/* ------------------------------------------------------------------ */
/* ENERGY & SYSTEMS                                                   */
/* ------------------------------------------------------------------ */

export const power = {
  summary:
    "Primarily off-grid. No conventional 100 A utility service. Two independent 3,000 W inverter systems, each feeding its own small load center.",
  inverterWatts: 3000,
  volts: 120,
  systems: [
    {
      id: "A",
      name: "Inverter System A",
      role: "Heating & refrigeration",
      loads: ["Heating load", "Refrigerator"],
    },
    {
      id: "B",
      name: "Inverter System B",
      role: "General cabin use",
      loads: ["Lighting", "≈ 4 general-use receptacles", "Miscellaneous small loads"],
    },
  ],
  lighting: ["Living area light", "Bathroom light", "Exterior front-wall light"],
  paralleling:
    "The two inverter outputs are treated as independent electrical systems. They are not paralleled; that would only be considered if the final inverter hardware explicitly supports synchronized parallel operation.",
  efficiencyChain: [
    "Good insulation",
    "Air sealing",
    "Efficient appliances",
    "Efficient heating",
    "Modest electrical loads",
    "Solar generation",
    "Battery storage",
    "Intelligent energy use",
  ],
};

export const heating = {
  current:
    "Heating is still being evaluated. A compact diesel heater has been considered, with an initial allowance of about $200 plus fuel tank and components. The under-floor service platform gives it a serviceable location outside the living space.",
  woodStove:
    "A new wood stove is already owned and could be installed as a later stretch phase. A safe, compliant installation would still need a chimney system, roof penetration and flashing, hearth, heat shielding, noncombustible materials and correct clearances.",
  woodStoveCommitted: false,
};

export const plumbing = {
  fixtures: ["Kitchen sink", "Bathroom vanity / sink", "Toilet", "Shower stall"],
  rough: [
    "¾-in PEX supply",
    "½-in PEX hot and cold",
    "Fittings, rings/clamps, shutoffs, supports",
    "3-in DWV (toilet / main drain)",
    "2-in drain and vent",
    "1½-in sink drains and traps",
    "Toilet flange and fixture connections",
    "Bathroom exhaust fan",
  ],
  waterHeater: "A small water heater is needed; fuel and type have not been selected.",
  blackTank: "Waste drains to a black tank on the under-floor service platform, which rolls out at tailgate height for emptying.",
  excluded: [
    "Well",
    "Cistern / water storage (if used)",
    "Septic system",
    "Major trenching",
    "Site utility infrastructure",
  ],
};
