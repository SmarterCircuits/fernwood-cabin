import type { FaqItem } from "@/lib/types";

/**
 * FAQ — edit freely. Each answer is an array of paragraphs.
 * Keep answers consistent with src/data/sponsors.ts `editorialStandards`.
 */
export const faq: FaqItem[] = [
  {
    q: "What is Fernwood?",
    a: [
      "Fernwood is a privately owned 10.3-acre wooded property in northern Michigan, and the name of the long-term project to develop it into a practical, low-impact, off-grid place. The first build, Fernwood Cabin A, is a small insulated off-grid cabin. The project is shown on two YouTube channels: Life at Fernwood, which follows the property and the wider project, and Smarter Circuits, which carries sponsor-related coverage by default.",
    ],
  },
  {
    q: "Where is the project?",
    a: [
      "Oscoda County, Michigan, between Lewiston and Mio. The land is reached by a private two-track off a public road.",
      "It is genuinely wild country. Wild turkey, deer, coyote and fox are regular visitors, black bear and elk turn up occasionally, and a cougar or bobcat is an ultra-rare sighting.",
    ],
  },
  {
    q: "How large is the cabin?",
    a: [
      "12 × 16 ft, about 192 sq ft of interior footprint, on eight pressure-treated 4x6 posts. The single-slope metal roof rises about 4 ft over the 16-ft length (≈ 3:12), from an ≈ 8-ft low wall to an ≈ 12-ft high wall, with ≈ 1-ft overhangs front and back. The floor framing sits 4 ft above grade, with a service platform between the posts at truck-tailgate height for the roll-out black tank, the diesel heater and electrical equipment.",
    ],
  },
  {
    q: "Is this an actual permanent project?",
    a: [
      "Yes. The property is privately owned and the cabin is being built to be used for years. It is insulated for northern Michigan winters, not built as a seasonal shed or a temporary set.",
    ],
  },
  {
    q: "Is the cabin off-grid?",
    a: [
      "Yes, fully. There will be no outside utility connections of any kind. Power will come from solar, batteries and two independent inverter systems. Water comes from two 65-gallon tanks and a pump on the service platform. A well (estimated 60–80 ft deep, and significantly more expensive) and septic are separate future phases, outside the cabin budget.",
    ],
  },
  {
    q: "What power system will it use?",
    a: [
      "Two independent 3,000 W inverters, each feeding its own small load center. System A is intended mainly for heating and the refrigerator; System B for lights, receptacles and small loads. At 120 V, each inverter delivers roughly 25 A.",
      "The two outputs are not paralleled unless the final inverter hardware explicitly supports synchronized parallel operation. Circuit layout, protection and bonding will follow the applicable electrical code.",
    ],
  },
  {
    q: "What products are already supplied?",
    a: [
      "Only a new wood stove, which the owner already owns and could install as a later stretch phase. It is not a sponsorship need and is not counted in the materials budget.",
      "The batteries, solar charge controllers and both 3,000 W inverters have not been sourced yet. They are open sponsorship needs, listed separately from the materials budget.",
    ],
  },
  {
    q: "What sponsorship categories are available?",
    a: [
      "Structure, roofing and solar mounting, insulation and envelope products, windows and doors, siding, interior finishes, plumbing, electrical, lighting, monitoring, heating, ventilation, tools and jobsite equipment. The Sponsor Opportunities section shows the current status of each category.",
    ],
  },
  {
    q: "Can a sponsor provide products instead of cash?",
    a: ["Yes. Product partnerships are the most natural fit, because the build needs the materials anyway. Cash and combined arrangements are also welcome."],
  },
  {
    q: "Can sponsors support an entire phase?",
    a: [
      "Yes. Partners can take part at the level of a single component, a whole category (such as the roof or windows), a full build phase, or the broader project, depending on the fit.",
    ],
  },
  {
    q: "Will products remain installed?",
    a: ["Yes. Products are installed because the cabin needs them and they stay in the building. Nothing is installed for a video and then removed."],
  },
  {
    q: "Will sponsored products receive honest coverage?",
    a: [
      "Yes. Coverage is technically accurate and based on real installation and use. Positive reviews are not promised, and editorial conclusions are not for sale. If something doesn’t work as expected, that becomes part of the documentation.",
    ],
  },
  {
    q: "Is raw footage available?",
    a: ["Raw footage is not made available."],
  },
  {
    q: "Can sponsors use project footage in paid advertisements?",
    a: [
      "Paid-advertising use and whitelisting are not offered as standard sponsorship deliverables. Any request of that kind would have to be discussed and agreed separately, and it may be declined.",
    ],
  },
  {
    q: "How can a company get involved?",
    a: [
      "Send an inquiry through the contact form with your product category and the kind of partnership you have in mind. Say where you think your product fits the build. That gets to a useful conversation fastest.",
    ],
  },
];
