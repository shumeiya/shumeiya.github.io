// Case-study content for each project detail page, keyed by slug (see projectList in project.js).
// Sourced from the original case-study decks and product shots where available — kept close to
// what those documents actually said rather than invented after the fact.
export const projectDetails = {
  kyrall: {
    role: "Sole Product Designer",
    summary: "Designing Kyrall from zero as its sole product designer.",
    tags: ["0→1 product design", "AI + CAD", "Design system", "Product analytics"],
    sections: [
      {
        id: "context",
        eyebrow: "00 · Context",
        label: "Context",
        lead: "Mechanical design is still slow and fragmented.",
        blocks: [
          { text: "Turning an engineering idea into a manufacturable product often means moving through disconnected stages — CAD, simulation, prototyping, testing and manufacturing. The company thesis was that too much engineering time is still spent translating requirements, rebuilding geometry and repeating manual design work instead of making new design decisions." },
          { type: "note", text: "Opportunity — reduce the manual translation between engineering intent and geometry." },
          { text: "Specs, requirements and legacy designs go in; a manufacturable 3D parametric model comes out. Under the hood an orchestration layer coordinates simulation, editing and manufacturability checks before export. Kyrall sits inside the existing CAD → CAE → CAM pipeline rather than replacing it." },
          {
            type: "stats",
            items: [
              { value: "1 day", label: "Down from 6–8 weeks", note: "Time previously spent on manual modeling." },
              { value: "0%", label: "Down from 40% of budget", note: "Project budget previously lost to rework." },
            ],
          },
          { type: "note", text: "This is the product thesis I was designing for. Everything from here on is my own work as sole product designer — my job was to turn this promise into an interface engineers would trust enough to actually adopt." },
        ],
      },
      {
        id: "vision",
        eyebrow: "01 · Vision & mission",
        label: "Vision",
        lead: "Design and manufacture hardware at the speed of thought.",
        blocks: [
          { text: "Engineering is undergoing its most profound shift since the internet. For decades, certain processes were treated as immovable. Kyrall challenges that." },
          { type: "image", src: "/project/kyrall/121.png", caption: "Brand key visual — automating design for the physical world." },
          {
            type: "defs",
            items: [
              { term: "Ownership", text: "Keep your data yours." },
              { term: "Control", text: "Runs on your infrastructure." },
              { term: "Precision", text: "Built for engineering problems." },
              { term: "Security", text: "Removes cloud dependency." },
              { term: "Sovereignty", text: "Developed entirely independently." },
            ],
          },
        ],
      },
      {
        id: "role",
        eyebrow: "03 · Project",
        label: "Role",
        lead: "Describe what you need. Kyrall generates the 3D model.",
        blocks: [
          { text: "The design challenge was turning that promise into a product engineers could actually continue working in. The scope grew with the product — from a generation interface into a broader engineering workspace." },
          {
            type: "bullets",
            title: "Sole product designer",
            items: [
              "Defined the first information architecture and core generation flow.",
              "Built the visual language and reusable design system.",
              "Designed the Editor interaction model and feature states.",
              "Used product analytics to find friction and guide later iteration.",
            ],
          },
          { text: "The design problem changed as the product matured. Instead of treating every new feature as a separate screen, I used a growing set of product questions to guide the system." },
          {
            type: "defs",
            items: [
              { term: "Generate", text: "How should a user express intent?" },
              { term: "Control", text: "How should a user refine AI output?" },
              { term: "Understand", text: "How should the system expose what AI is doing?" },
              { term: "Recover", text: "How should users diagnose and reverse unwanted changes?" },
              { term: "Manage", text: "How does one generation become an ongoing workflow?" },
            ],
          },
        ],
      },
      {
        id: "system",
        eyebrow: "05 · Foundation",
        label: "System",
        lead: "Build the system before the product gets complex.",
        blocks: [
          { text: "The design system was not a separate branding exercise. It became the rule set that let the product add tools without fragmenting the experience." },
          { text: "The brand was delivered in collaboration with the Koto agency. From that foundation I built the complete Figma design system: a clip-corner shape language, Kyrall Lime Yellow, and the Ufficio and Ufficio Mono typefaces." },
          {
            type: "bullets",
            title: "A system that had to scale",
            items: [
              "Light and dark themes use semantic color tokens rather than simple inversion.",
              "Typography separates product communication from technical and system information.",
              "Domain-specific icons make CAD actions recognizable without permanent text labels.",
              "Buttons, dialogs, fields, sidebars, toolbars and panels share controlled state rules.",
            ],
          },
          { type: "note", text: "A detail easy to miss: the brand yellow isn’t the same hex in dark and light mode (#C4FF35 dark, #C2F000 light). The token wasn’t copied over — it was re-tuned for legibility against each background, which is where a token system becomes a real design decision rather than a naming exercise." },
          { text: "To keep the system from decaying into documentation nobody opens, I authored a kyrall-layout Skill file that generates on-brand slide and deck pages directly inside Figma through the Figma MCP connector. The design system stops being a rulebook someone has to check every file against and becomes a tool the team — or an external agency — can simply run." },
          { text: "The strongest proof of the system is not the library itself — it is how later Editor features reuse the same interaction grammar." },
        ],
      },
      {
        id: "loop",
        eyebrow: "06 · Core loop",
        label: "Core loop",
        lead: "Generation was the entry point — not the whole workflow.",
        blocks: [
          { text: "I structured the product around a loop that could continue after the first AI result." },
          { type: "steps", items: ["Describe intent", "Generate", "Inspect", "Refine", "Export"] },
          { text: "The Dashboard uses three adjacent regions to maintain continuity: previous models, the current generation entry, and active generation tasks." },
          { type: "image", src: "/project/kyrall/122.png", caption: "Dashboard, dark theme — recent work, generation input and generation tasks share one working surface." },
          { type: "image", src: "/project/kyrall/123.png", caption: "The same surface in light theme. Semantic tokens, not an inversion." },
          { text: "One editor, many different engineering tasks. The canvas, left toolbar, contextual panel and generation entry stay stable. What changes is the information required by the current task." },
          {
            type: "defs",
            items: [
              { term: "Stable", text: "Canvas and navigation preserve orientation." },
              { term: "Contextual", text: "Panels and controls expose only task-relevant detail." },
              { term: "Extensible", text: "New tools reuse the same shell, avoiding feature-by-feature UI drift." },
            ],
          },
        ],
      },
      {
        id: "control",
        eyebrow: "08 · Interaction principle",
        label: "Control",
        lead: "Use AI for intent. Use direct manipulation for precision.",
        blocks: [
          { text: "Natural language is powerful for high-level goals, but engineering work also needs deterministic controls users can inspect and change directly." },
          {
            type: "defs",
            items: [
              { term: "AI / conversational", text: "“Change the frame to make it lighter.” Useful when the user knows the outcome they want but not every modeling operation required to get there." },
              { term: "Direct / precise", text: "12 mm · hide this part · measure this span. Parameters, part hierarchy and measurement make the model inspectable rather than leaving every refinement inside the prompt." },
            ],
          },
          { type: "image", src: "/project/kyrall/62.png", caption: "Model editor — an edit expressed in one sentence, with the suggestion surfaced in model context rather than a detached list." },
          { text: "Suggestions turn the agent from a command executor into a collaborator, while explicit Accept / Ignore actions preserve user authority." },
          {
            type: "bullets",
            title: "Design choice",
            items: [
              "Suggestions are grouped by intent — Structural, Fit, Aesthetic and Functional.",
              "The recommendation appears in model context rather than in a detached list.",
              "Accept / Ignore keeps the state change explicit and reversible in the broader workflow.",
            ],
          },
          {
            type: "stats",
            items: [
              { value: "72.1%", label: "of explicit Accept / Ignore responses were accepts", note: "Jul 22 – Aug 19 analytics window." },
            ],
          },
          { type: "note", text: "Open item: the panel documents the Accept / Ignore decision, but not yet the before/after model change once a suggestion is accepted. That comparison is the next artifact worth capturing — it’s what would make the 72.1% accept rate legible as trust, not just compliance." },
        ],
      },
      {
        id: "states",
        eyebrow: "10 · Precision interaction",
        label: "States",
        lead: "A CAD feature is not a button. It is a state machine.",
        blocks: [
          { text: "Fillet and chamfer exposed the interaction detail hidden behind “simple” modeling operations: selection, multi-selection, applying, partial failure, invalid geometry and recovery." },
          {
            type: "defs",
            items: [
              { term: "Select", text: "Single and multi-edge selection must remain legible on the model." },
              { term: "Apply", text: "Visible in-progress state; prevent ambiguous repeated actions." },
              { term: "Fail", text: "Edge-specific feedback explains what failed and where." },
              { term: "Recover", text: "Keep the user in context; do not collapse the workflow into a generic error." },
            ],
          },
          { type: "note", text: "This is the most rigorous state design in the product, and deliberately so: for an engineer-facing parametric tool, an unhandled edge case erodes trust faster than a missing feature. The tension worth naming out loud is that this state-machine rigor sits right next to a conversational, one-sentence generation flow — the same product has to hold both registers at once." },
          { text: "A mature product exists between the happy paths. Empty states, loading, limits, subscriptions and tool-specific failures define whether the experience still feels coherent when the ideal flow breaks." },
          {
            type: "bullets",
            title: "State design",
            items: [
              "Dashboard and project views preserve the same structure when there is no content yet.",
              "Skeleton loading keeps spatial expectations stable while data arrives.",
              "Usage limits appear in the exact workflow where value is blocked, then connect to subscription.",
              "Light and dark themes and component states remain consistent across feature growth.",
            ],
          },
          { type: "note", text: "Honest reflection: the limit appears as a locked card inside the panel rather than a full-screen block, so the model stays visible even when editing is denied — the intent was to soften the moment of being blocked. The risk is the same choice: a user might read “still partly visible” as “still partly usable.” I’m keeping this direction for now but watching upgrade-conversion data closely." },
        ],
      },
      {
        id: "transparency",
        eyebrow: "11 · AI transparency",
        label: "Transparency",
        lead: "Replace the spinner with a mental model of progress.",
        blocks: [
          { text: "Long-running generation needs more than “loading”. I separated the process into understandable stages and let the active stage reveal deeper modeling steps." },
          {
            type: "bullets",
            title: "Visible stages",
            items: [
              "Generating Design Specification",
              "Planning Generation Steps",
              "Building the Model",
              "Validating the Model",
            ],
          },
          { text: "Progressive disclosure keeps the default view calm while still giving users detail when the process is long or uncertain. The goal is not to expose every backend event — it is to expose enough structure for users to understand where the system is and whether it is still moving." },
          { type: "note", text: "A question worth being ready for: are the sub-step labels (e.g. “Fix hook_base sketch and add features”) pulled directly from real backend generation events, or authored copy layered on top for legibility? The honest answer shapes how this section should be framed — as transparency into a real process, or as a deliberate simplification of one." },
          { text: "When AI does something unexpected, users need a way back. Execution status explains what is happening now; local errors explain what failed; History provides a route to restore a previous model state." },
          {
            type: "defs",
            items: [
              { term: "Diagnose", text: "Error feedback stays close to the geometry or operation that caused it instead of relying only on generic notifications." },
              { term: "Recover", text: "History is intentionally a low-frequency, high-value action; it should not be judged by the same conversion target as Export." },
            ],
          },
        ],
      },
      {
        id: "evidence",
        eyebrow: "13 · Real usage",
        label: "Evidence",
        lead: "Once the product was live, I stopped relying only on design assumptions.",
        blocks: [
          { text: "Kyrall went public with a Hacker News post on July 6. The traffic spike gave the team its first real dataset, and PostHog product events and web analytics showed that the Editor — the core product surface — was also the clearest friction area." },
          {
            type: "stats",
            items: [
              { value: "36.1%", label: "Editor bounce rate", note: "Highest in-product bounce among major product pages." },
              { value: "57.5", label: "Rage clicks per 100 visitors", note: "Highest observed friction signal." },
              { value: "47.39%", label: "No tracked Editor action", note: "After generation, a large share did not continue in the Editor." },
              { value: "56.2%", label: "Export open → action", note: "Export appeared as a strong value-realisation signal." },
            ],
          },
          {
            type: "bullets",
            title: "What the data changed",
            items: [
              "Prioritize Editor diagnosis over cosmetic homepage optimization.",
              "Treat Export and Parameter as meaningful post-generation behaviors.",
              "Separate low adoption from low value: discoverability, comprehension and actual need are different hypotheses.",
            ],
          },
          { text: "Data window: Jul 1 – Aug 19, 2026. Some product events cover Jul 22 – Aug 19." },
          { text: "The analytics could not distinguish whether users stopped because of model quality, generation failure, waiting, unclear next steps, or Editor interaction friction. So the next step was better evidence, not an immediate redesign." },
          { type: "steps", items: ["Signal", "Gap", "Track", "Observe", "Explain"] },
          { text: "Two corrections came out of that loop. Front-end errors were confirmed as expected rather than a broken pipeline — Kyrall runs Sentry for error tracking, not PostHog — and with those corrections in place the friction point resolved to /signup, not the parts of the product that had been suspected first." },
          { text: "One early hypothesis did not survive the data. The theory was that retention was capped by users hitting the generation quota; in the analysis window the quota ceiling was triggered four times, nowhere near enough to account for the numbers. The bet was specific enough to be falsifiable, so it was dropped rather than defended." },
          { type: "note", text: "Evidence-informed, not metric-driven. A number can identify a suspicious part of the journey. It cannot automatically tell me what to redesign." },
        ],
      },
      {
        id: "expansion",
        eyebrow: "15 · Product expansion",
        label: "Expansion",
        lead: "The product expanded beyond a single generation.",
        blocks: [
          { text: "As users needed to return to work, reuse information and discover examples, the information architecture expanded from a generation tool into a more persistent workspace." },
          {
            type: "defs",
            items: [
              { term: "Projects + Objects", text: "Organize generated assets into projects and objects so work can continue over time." },
              { term: "Context Manager", text: "Turn uploaded knowledge into a visible product resource rather than hiding all context inside a prompt. A Knowledge Base Level and progress bar encourage users to keep contributing, and the knowledge-graph view sits behind the paywall once free quota runs out — the monetization boundary lands exactly where the payoff is highest." },
              { term: "Community", text: "Connect content discovery to action by letting users reuse prompts and generated models as starting points." },
            ],
          },
          { type: "note", text: "Open item: clicking “Copy and editing” on a Community prompt is designed to drop the user straight into the Editor with that prompt pre-filled — but the actual transition screen isn’t captured yet. It’s the missing link between reading a case study and doing the thing yourself." },
        ],
      },
      {
        id: "open",
        eyebrow: "17 · Open questions",
        label: "Open questions",
        lead: "A project isn’t finished being honest until it can survive being questioned.",
        blocks: [
          { text: "Before treating any of the above as settled, these are the questions I’d expect a sharp interviewer or a senior designer to ask — and the ones I’m still actively working through." },
          {
            type: "bullets",
            items: [
              "Interviewer lens — Is the Execution Log’s step granularity grounded in real backend events, or authored for legibility? I need a clear, specific answer either way.",
              "Senior designer lens — Was the shared Editor shell a decision made upfront, or something I converged on after the third or fourth panel started to diverge?",
              "Product partner lens — Does the partial-lock paywall measurably reduce upgrade conversion because users misread it as partially usable, rather than clearly gated?",
              "End-user lens — When a Suggestion is accepted, what does the user actually see change on the model, today? If the answer is “not much visibly,” that’s the next thing to fix, not just document.",
            ],
          },
        ],
      },
      {
        id: "outcome",
        eyebrow: "18 · Outcome",
        label: "Outcome",
        lead: "From AI generation to an engineering workflow.",
        blocks: [
          { text: "Kyrall became a continuous 0→1 design problem: define the product, build the system, add control, expose AI behavior, learn from real usage, and keep the experience coherent as the product expanded." },
          {
            type: "defs",
            items: [
              { term: "Product structure", text: "Information architecture, generation flow, Editor shell and workspace expansion." },
              { term: "System", text: "Visual language, components, light/dark behavior, toolbar and panel patterns." },
              { term: "Interaction", text: "AI suggestions, direct CAD controls, detailed states, errors and recovery." },
              { term: "Evidence", text: "PostHog analysis, friction prioritization, tracking gaps and next-step research plan." },
            ],
          },
          { type: "note", text: "I designed Kyrall from zero as its sole product designer, evolving it from an AI generation interface into a controllable, understandable and scalable CAD workflow." },
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
