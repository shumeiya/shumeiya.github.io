// Case-study content for each project detail page, keyed by slug (see projectList in project.js).
// Sourced from the original case-study decks and product shots where available — kept close to
// what those documents actually said rather than invented after the fact.
export const projectDetails = {
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
