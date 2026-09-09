// Case-study content for each project detail page, keyed by slug (see projectList in project.js).
// Sourced from the original case-study decks and product shots where available — kept close to
// what those documents actually said rather than invented after the fact.
export const projectDetails = {
  kyrall: {
    role: "Sole Product Designer",
    sections: [
      {
        id: "overview",
        label: "Overview",
        eyebrow: "Context",
        body: [
          "Kyrall is an AI-powered 3D modeling startup in Munich, building a tool that carries an idea from concept to a manufacturable model in minutes. I was the sole product designer on it \u2014 product and UI design, the design system, brand execution, and the front-end implementation in React and Tailwind.",
          "Designing and building the same screens meant a decision didn't stop at handoff. The person who drew it also shipped it, which shortened the distance between proposing a change and seeing what it did to the numbers.",
        ],
      },
      {
        id: "system",
        label: "Building the system from zero",
        eyebrow: "Design system",
        body: [
          "The brand was delivered in collaboration with the Koto agency. From that foundation I built the complete Figma design system: a clip-corner shape language, Kyrall Lime Yellow (#C4FF35), and the Ufficio and Ufficio Mono typefaces.",
          "To keep the system from decaying into documentation nobody opens, I authored a kyrall-layout Skill file that generates on-brand slide and deck pages directly inside Figma through the Figma MCP connector. The design system stops being a rulebook someone has to check every file against and becomes a tool the team \u2014 or an external agency \u2014 can simply run.",
        ],
      },
      {
        id: "launch",
        label: "Launch and the first signals",
        eyebrow: "Launch",
        body: [
          "Kyrall went public with a Hacker News post on July 6. The traffic spike gave the team its first real dataset, and the first read was mixed: onboarding ran 192 starts to 91 completions, a 47.4% completion rate, while week-1 retention settled at 5.4\u20136.1% once the launch noise cleared.",
          "That retention number became the question the next stretch of work was built around \u2014 not as a metric to move, but as something that had to be explained before anything was redesigned.",
        ],
      },
      {
        id: "research",
        label: "The retention investigation",
        eyebrow: "Research",
        body: [
          "Before any conclusion could be drawn from the dashboards, four methodology errors had to be corrected \u2014 each one would have pointed at a different, wrong culprit. Web Analytics path ratios were being read as funnel conversion rates; they measure different things, and conflating them distorts where users appear to drop off. Rage Click attribution needed correcting before it could be trusted as a friction signal.",
          "Retention-cohort contamination was identified and controlled for, so cohort comparisons reflected real behavior rather than an artifact of how the cohorts were assembled. And PostHog's empty Dead Click and Error Tracking panels were confirmed as expected rather than a broken pipeline \u2014 Kyrall runs Sentry for front-end error tracking, not PostHog.",
          "With those corrections in place, the friction point resolved to /signup \u2014 not the parts of the product that had been suspected first.",
          "One early hypothesis did not survive the data. The theory was that retention was capped by users hitting the generation quota; in the analysis window the quota ceiling was triggered four times, nowhere near enough to account for the numbers. The bet was specific enough to be falsifiable, so it was dropped rather than defended.",
        ],
      },
      {
        id: "gallery",
        label: "Gallery",
        images: [
          "/project/kyrall/121.png",
          "/project/kyrall/62.png",
          "/project/kyrall/122.png",
          "/project/kyrall/123.png",
        ],
      },
    ],
  },

  "abc-mouse": {
    role: "UX/UI Designer",
    sections: [
      {
        id: "background",
        label: "Background",
        eyebrow: "Context",
        body: [
          "ABC Mouse (开心鼠) is Tencent's ToC English-learning app for young children. The project ran with a cross-border team spanning design, product, and the internal content/curriculum group.",
          "Work started from a stakeholder map — parents, children, and the teaching-content team each pull the product in different directions, and the design had to hold all three at once.",
        ],
      },
      {
        id: "research",
        label: "Research",
        eyebrow: "Process",
        body: [
          "A research framework combined usage-behavior analysis with direct feedback, feeding into personas built from real parent and child user types rather than assumptions.",
          "That research turned into a working set of pain points, each one paired one-to-one with a corresponding interface change — the throughline from the workflow diagram to the final screens.",
        ],
      },
      {
        id: "gallery",
        label: "Gallery",
        images: ["/gallery/abcmouse.jpg"],
      },
    ],
  },

  "weather-pets": {
    role: "UX/UI Designer",
    sections: [
      {
        id: "overview",
        label: "Overview",
        eyebrow: "Context",
        body: [
          "A concept explored at wetter.com: pairing daily forecasts with an animated companion pet whose mood and behavior react to the weather, to make checking the forecast something people actually want to do.",
        ],
      },
      {
        id: "gallery",
        label: "Gallery",
        images: ["/gallery/weatherpets.jpg"],
      },
    ],
  },

  "slow-food": {
    role: "UX/UI Designer",
    sections: [
      {
        id: "overview",
        label: "Overview",
        eyebrow: "Context",
        body: [
          "Brand and web design for Slow Food, built around a playful, ingredient-led visual identity — illustrated produce characters (eggplant, onion, pepper, tomato) carry the brand across the site.",
        ],
      },
      {
        id: "gallery",
        label: "Gallery",
        images: ["/gallery/slowfood.jpg", "/gallery/detail/slowfood-mockup.jpg"],
      },
    ],
  },

  hmi: {
    role: "UX/UI Designer",
    sections: [
      {
        id: "overview",
        label: "Overview",
        eyebrow: "Context",
        body: [
          "Automotive HMI interaction design at Granstudio, working inside an international design team on the in-car interface — navigation, vehicle status, and media control laid out across the instrument cluster and center display.",
        ],
      },
      {
        id: "gallery",
        label: "Gallery",
        images: ["/gallery/hmi.jpg", "/gallery/detail/hmi-mockup.jpg"],
      },
    ],
  },

  tide: {
    role: "UX/UI Designer",
    sections: [
      {
        id: "overview",
        label: "Overview",
        eyebrow: "Context",
        body: [
          "A design system for TIDE, a lifestyle app — built component-by-component so the library and the shipped screens stayed in lockstep instead of drifting apart.",
        ],
      },
      {
        id: "gallery",
        label: "Gallery",
        images: ["/gallery/tide.jpg", "/gallery/detail/tide-mockup.jpg"],
      },
    ],
  },

  codemao: {
    role: "UX/UI Designer",
    sections: [
      {
        id: "overview",
        label: "Overview",
        eyebrow: "Context",
        body: [
          "Platform design for CodeMao at Dianmao Technology — a ToB course-management product used to run and administer classes, built out from a 1.0 baseline into a more structured 2.0 design.",
        ],
      },
      {
        id: "gallery",
        label: "Gallery",
        images: ["/gallery/codemao.jpg", "/gallery/detail/codemao-mockup.jpg"],
      },
    ],
  },

  "puzzle-game": {
    role: "UX/UI Designer",
    sections: [
      {
        id: "overview",
        label: "Overview",
        eyebrow: "Context",
        body: [
          "A jigsaw puzzle app focused on tactile, satisfying interaction — piece snapping, drag feedback, and completion moments designed to feel good, not just function.",
        ],
      },
      {
        id: "gallery",
        label: "Gallery",
        images: ["/gallery/puzzle.jpg", "/gallery/detail/puzzle-mockup.jpg"],
      },
    ],
  },

  "fire-rescue-drone": {
    role: "Industrial Designer",
    sections: [
      {
        id: "scenario",
        label: "Scenario",
        eyebrow: "Problem",
        body: [
          "Concept for a paired ground-and-air rescue system: when a building's fire sensors trigger an alert, a ground rover and a drone are dispatched ahead of the firefighters, reaching the scene first.",
          "Their cameras scout the fire and use on-device framing to pinpoint where people are trapped, streaming that back before any human has entered the building. Anyone trapped is guided to self-rescue tools while they wait, and firefighters arrive already knowing exactly where to go for a precise rescue.",
        ],
        images: ["/gallery/detail/drone-scenario.png"],
      },
      {
        id: "engineering",
        label: "Engineering",
        eyebrow: "Process",
        body: [
          "Form development took the concept down to component level: camera system, solar panel, swappable battery, indicator and control panels, and a goods-clamp payload bay on the drone, with a matching camera-and-drive layout on the ground rover.",
        ],
        images: ["/gallery/detail/drone-exploded.png"],
      },
      {
        id: "gallery",
        label: "Gallery",
        images: ["/gallery/detail/drone-hero.png"],
      },
    ],
  },
}
