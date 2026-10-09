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
    role: "UX · Interaction & Game Design",
    summary:
      "ABC Mouse (开心鼠) is Tencent's online education app for children aged 3–8. The work covered research, interaction and game design — raising completion rates and lowering cost through a design language consistent across the Chinese and American teams.",
    tags: ["UX design", "Interaction design", "Children design", "Game design"],
    sections: [
      {
        id: "overview",
        eyebrow: "00 · Overview",
        label: "Overview",
        lead: "Tencent · ABC Mouse online education app design.",
        blocks: [
          { type: "image", src: "/project/abc-mouse/hero.jpg", caption: "ABC Mouse — learning games for children aged 3–8." },
        ],
      },
      {
        id: "background",
        eyebrow: "01 · Background",
        label: "Background",
        lead: "An American product, rebuilt for Chinese children.",
        blocks: [
          { type: "image", src: "/project/abc-mouse/1.jpg", size: "md", caption: "Before — ABCmouse, the original US product." },
          {
            type: "defs",
            items: [
              { term: "Before · 2–8 year olds", text: "Created by the American educational technology company Age of Learning, Inc. The application primarily covers English, reading and language arts, math, science, health, social studies, music, and art." },
            ],
          },
          { type: "image", src: "/project/abc-mouse/2.jpg", size: "md", caption: "Now — 开心鼠, the Chinese edition." },
          {
            type: "defs",
            items: [
              { term: "Now · 3–8 year olds", text: "China’s top-ranked online education application (2021). It introduces English and adds content tailored to the thinking, language, and coding needs of Chinese users." },
            ],
          },
        ],
      },
      {
        id: "issues",
        eyebrow: "02 · Existing issues",
        label: "Existing issues",
        lead: "Two teams, two visual languages, one app.",
        blocks: [
          { type: "image", src: "/project/abc-mouse/3.jpg", caption: "The same product, drawn twice — Tencent team screens above, American team screens beside them." },
          {
            type: "bullets",
            title: "Design inconsistencies",
            items: [
              "Overall style is not uniform.",
              "Discrepancies between the app and the content.",
              "Cross-country collaboration: high communication costs, slow progress.",
            ],
          },
          { type: "image", src: "/project/abc-mouse/4.jpg", size: "md", caption: "User usability testing." },
          {
            type: "bullets",
            title: "User “discomfort”",
            items: [
              "In usability testing, users have low completion rates and easily experience frustration and avoidance.",
              "Usability test results are not ideal.",
            ],
          },
          { type: "note", text: "Design goal — enhance user experience and completion rates through consistent design, and lower costs. Worth noticing that consistency is doing double duty here: it is both the user-facing fix for a confusing app and the internal fix for an expensive cross-border handoff. One decision, two different payoffs." },
        ],
      },
      {
        id: "workflow",
        eyebrow: "03 · Work flow",
        label: "Work flow",
        lead: "Update versions · data collection · iteration optimization.",
        blocks: [
          { type: "steps", items: ["Identify requirements", "Interaction design", "Visual design", "Development", "Testing"] },
          { type: "image", src: "/project/abc-mouse/5.jpg", caption: "Five stages, and what the designer owns in each — decision, design, follow up, follow up, user testing." },
        ],
      },
      {
        id: "stakeholder",
        eyebrow: "04 · Stakeholder",
        label: "Stakeholder",
        lead: "Four parties pulling the product in four directions.",
        blocks: [
          {
            type: "defs",
            items: [
              { term: "Children", text: "Enjoy playing and learning." },
              { term: "Parents", text: "Ensure their children learn knowledge." },
              { term: "Teaching team", text: "Transmit knowledge." },
              { term: "Product team", text: "Achieve low cost and high returns." },
            ],
          },
          { type: "image", src: "/project/abc-mouse/6.jpg", caption: "Balancing user experience and cost — and ABC Mouse’s learning modules mapped onto Bloom’s Taxonomy, from Remembering up to Creating." },
        ],
      },
      {
        id: "framework",
        eyebrow: "05 · Research framework",
        label: "Research framework",
        lead: "User and object, joined by action and feedback.",
        blocks: [
          { type: "image", src: "/project/abc-mouse/7.jpg", size: "lg", caption: "The user side brings child psychology and Bartle’s player types; the object side brings gamification mechanisms, scene construction and design principles." },
        ],
      },
      {
        id: "users",
        eyebrow: "06 · User analysis",
        label: "User analysis",
        lead: "Who a 3–8 year old actually is, according to two models.",
        blocks: [
          { text: "Our users are aged 3–8 years, aligning with Piaget’s Preoperational Stage. They exhibit traits associated with Explorers and Achievers in Bartle’s player type model." },
          { type: "image", src: "/project/abc-mouse/users.jpg", caption: "Piaget’s cognitive development stages above, Bartle’s player types below — resolving into curiosity, a sense of achievement, and self-guidance." },
          { type: "note", text: "This is the move that makes the rest of the project defensible. “Children get frustrated” is an observation; “our users sit in the Preoperational Stage and split into Explorers and Achievers” is a model you can design different game rules against — and it is exactly what the next two sections do." },
        ],
      },
      {
        id: "action",
        eyebrow: "07 · Action analysis",
        label: "Action analysis",
        lead: "Why they play, and how the rules should answer.",
        blocks: [
          {
            type: "defs",
            items: [
              { term: "Explorers", text: "“I want to see what’s here.” Interact freely with elements, diverse scenes, explore and trigger more feedback, curious stories." },
              { term: "Achievers", text: "“I want to get more points and rewards.” Role play, collect and exchange, victory and praise, small challenges." },
            ],
          },
          { type: "image", src: "/project/abc-mouse/8.jpg", caption: "Why and how — game rules plus young players’ intrinsic behaviours, resolving into simple operation with room for trial and error." },
          {
            type: "bullets",
            items: [
              "For users aged 3–5 explorers, design more exploratory games with more engaging effects and feedback.",
              "For users aged 6–8 achievers, incorporate goals, scores, and rewards for more challenging games.",
              "Game rules should be simple and clear, matching the user’s cognitive level, and providing ample room for trial and error.",
            ],
          },
        ],
      },
      {
        id: "feedback",
        eyebrow: "08 · Feedback",
        label: "Feedback",
        lead: "Praise, correction, and when each should arrive.",
        blocks: [
          {
            type: "defs",
            items: [
              { term: "Positive feedback", text: "Not simple, emotionless praise such as “Wow” or “Great” — emotion-rich praise such as “You did it! You’re amazing!”" },
              { term: "Negative feedback", text: "Not strong negative feedback with warning sounds — gentle feedback with prompts and encouragement." },
              { term: "Immediate feedback", text: "Suitable for activities requiring high focus and prolonged engagement. Continuous motivation maintains user attention." },
              { term: "Delayed feedback", text: "Suitable for high-reward scenarios, extending the overall game lifecycle. Encourages sustained user engagement through periodic rewards." },
            ],
          },
          { type: "image", src: "/project/abc-mouse/9.jpg", caption: "Feedback design — what to say, how firmly to say it, and when." },
        ],
      },
      {
        id: "persona",
        eyebrow: "09 · Persona",
        label: "Persona",
        lead: "An explorer, an achiever, and the mother paying for both.",
        blocks: [
          { type: "image", src: "/project/abc-mouse/13.jpg", caption: "Frey (4, explorer), Amy (7, achiever) and Sofia (36, working mother) — each with goals, characteristics and frustrations." },
          { type: "note", text: "Sofia is the persona that keeps the gamification honest. Her frustration — “do not over-gamify and make children addicted” — sits directly against Amy’s need for points and rewards. The product has to motivate the child without alarming the parent, and that tension is the real constraint on how far the reward loops can go." },
        ],
      },
      {
        id: "solutions",
        eyebrow: "10 · Painpoints and solutions",
        label: "Painpoints and solutions",
        lead: "Three problem areas, each paired with its fix.",
        blocks: [
          {
            type: "defs",
            items: [
              { term: "01 Process · eliminate complexity, maintain simplicity", text: "Lengthy, slow process; unclear guidance; untimely feedback → simplify processes and enhance interaction efficiency; flexible product usage timing for parents; choose appropriate language, video, or interactive guides based on complexity; optimize positive feedback and reduce negative feedback." },
              { term: "02 Interface · standardize hierarchical structure", text: "Unclear UI hierarchy with mixed priorities, and inconsistent visual style → standardize element hierarchy, distinguish operable areas, and unify visual style." },
              { term: "03 Gamification · redefine gamification for educational and enjoyable experiences", text: "Lack of story in gameplay → integrate real-life scenarios to enhance user understanding and engagement." },
            ],
          },
          { type: "image", src: "/project/abc-mouse/10.jpg", caption: "Each painpoint against its solution, with before-and-after screens underneath." },
        ],
      },
      {
        id: "case",
        eyebrow: "11 · Case demonstration",
        label: "Case demonstration",
        lead: "One activity, carried from objective to interaction flow.",
        blocks: [
          { text: "Objective: users should learn to add and subtract within ten. The needs analysis turns that into groups of 9 objects and a grid of 10, so a child practises moving two types of object into the grid until it is full, using different quantities of each." },
          {
            type: "bullets",
            title: "Process",
            items: [
              "Drag/drop or click items into the 10-grid from 9 options.",
              "Once the grid is full, proceed to the next activity.",
              "Select the correct total count of objects placed in the grid.",
            ],
          },
          { type: "image", src: "/project/abc-mouse/11.jpg", caption: "Objective, needs analysis, process, interaction logic, interface and interaction flow — a supermarket shopping scenario keeps the interface simple and clear, with a standardized hierarchy of elements." },
          { type: "note", text: "The interaction flow is where the user research cashes out. Long periods of inactivity, scenario changes, positive and negative feedback, and the overall error mechanism each get a branch — the frustration and avoidance seen in usability testing is designed for explicitly, rather than assumed away." },
        ],
      },
      {
        id: "visual",
        eyebrow: "12 · Visual output",
        label: "Visual output",
        lead: "The same system, across other cases.",
        blocks: [
          { type: "image", src: "/project/abc-mouse/12.jpg", caption: "Creative design, game design, for children, math and thinking — consistent treatment across activities." },
        ],
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
    role: "UX/UI · Service & System Design",
    summary:
      "In the post-pandemic era, this project aims to revive a Slow Food-themed restaurant through innovative design and interactive experiences. It includes an app for virtual planting and offline activities.",
    tags: ["Service design", "System design", "UX/UI", "Brand identity"],
    sections: [
      {
        id: "overview",
        eyebrow: "00 · Overview",
        label: "Overview",
        lead: "“Grow” — a Slow Food experience for Bra.",
        blocks: [
          { text: "GROW connects an app to a restaurant. Users grow vegetables virtually, earn a Harvest Card, and redeem it for real ingredients they pick themselves before the meal is cooked in front of them — so “Slow Food” is something they take part in rather than only eat." },
          { type: "image", src: "/project/slow-food/1.jpg", caption: "Key visual — the GROW app, “Plant your slow dishes”." },
        ],
      },
      {
        id: "background",
        eyebrow: "01 · Background",
        label: "Background",
        lead: "Bra, Piedmont — where the Slow Food movement began.",
        blocks: [
          { type: "image", src: "/project/slow-food/2.jpg", caption: "Bra in context — Slow Food, the University of Gastronomic Sciences and the Salsiccia di Bra all originate here." },
          {
            type: "defs",
            items: [
              { term: "Gastronomic Cultural Center", text: "Bra, birthplace of Slow Food, is renowned for its cheese, wine, sausages, and home to Italy’s University of Gastronomic Sciences." },
              { term: "Tourist Place", text: "Bra, with its historic Baroque churches, town hall, and medieval streets, is a popular tourist destination near the Alps, offering beautiful natural landscapes." },
              { term: "Art and Cultural Center", text: "Bra, birthplace of the Slow Food movement, is renowned for its Italian culinary culture, cheese, wine, sausages, and the University of Gastronomic Sciences." },
              { term: "Global Organization", text: "Founded in 1989, Slow Food aims to oppose fast food culture and promote a food production and consumption approach that is “good, clean, and fair.”" },
            ],
          },
          { type: "image", src: "/project/slow-food/3.jpg", size: "lg", caption: "The Slow Food organization — philosophy, reach and partners." },
          {
            type: "defs",
            items: [
              { term: "Organizational Philosophy", text: "It promotes local culinary traditions, sustainable sourcing, and fair, healthy food practices." },
              { term: "Global Organization", text: "Slow Food, now in 122 countries with over 83,000 members, collaborates with governments and international organizations to advocate for food safety, agricultural policy, and biodiversity." },
            ],
          },
          { type: "image", src: "/project/slow-food/4.jpg", size: "md", caption: "Osteria del Boccondivino — the site of the intervention, and the research findings behind it." },
          {
            type: "defs",
            items: [
              { term: "Slowfood", text: "Slow Food collaborates with many Italian restaurants, but Osteria del Boccondivino is the only official Slow Food restaurant." },
              { term: "Visitor Traffic", text: "Interviews and on-site recordings revealed that the restaurant’s weekday and Saturday visitor traffic exceeds typical levels by more than double, making it one of Italy’s top-performing establishments." },
              { term: "Research Summary", text: "The restaurant only accepts phone reservations, with 1 in 5 visitors turned away due to limits. Poor information synchronization results in unlisted random closures on Google Maps, occurring three times in seven surveys." },
            ],
          },
          { type: "note", text: "The constraint that shaped everything after this: demand was never the problem. A restaurant turning away one in five visitors doesn’t need more awareness — it needs a way to hold onto the people it cannot seat today." },
        ],
      },
      {
        id: "design-task",
        eyebrow: "02 · Design task",
        label: "Design task",
        lead: "Three outcomes the design had to serve at once.",
        blocks: [
          { type: "image", src: "/project/slow-food/31.jpg", caption: "The design task, framed across the restaurant, the organization and the town." },
          {
            type: "defs",
            items: [
              { term: "Innovative Experience", text: "By combining online and offline innovative methods, we aim to enhance the “Slow Food” experience and service at the restaurant. We hope that users can feel the presence of “Slow Food” not only while tasting the cuisine but also through the production of ingredients and the preparation of food." },
              { term: "Expand Slow Food’s Influence", text: "We believe that user sharing is one of the most effective ways of spreading our message. Therefore, we hope that users will share their stories after their experience, becoming our advocates. This will enhance the influence of the Slow Food organization on social media, allowing more people to learn about Slow Food." },
              { term: "Boost Bra’s Tourism Economy", text: "We hope that through this project, more people will be encouraged to travel to Bra, further boosting the local tourism industry." },
            ],
          },
        ],
      },
      {
        id: "case-study",
        eyebrow: "03 · Case study",
        label: "Case study",
        lead: "Four farm-to-table references, scored on the same five axes.",
        blocks: [
          { text: "Stedsans, Segev Kitchen Garden and Blue Hill were each rated on Innovative, Experience, Emotion, Comfortable and Sustainable, so the benchmark produced a comparable profile rather than a mood board." },
          { type: "image", src: "/project/slow-food/5.jpg", caption: "Benchmark — each reference scored on the same five criteria." },
        ],
      },
      {
        id: "persona",
        eyebrow: "04 · Persona",
        label: "Persona",
        lead: "Three visitors, three different reasons to slow down.",
        blocks: [
          { text: "Emma Petit (41, lawyer) wants to escape the hustle and follow the natural order. Giulia Ferrari (25, student) travels to understand how other people live. Leonardo Rossi (33, doctor) wants unique cuisine without giving up a healthy diet." },
          { type: "image", src: "/project/slow-food/6.jpg", caption: "Personas — hobbies, life goals and the line each one lives by." },
        ],
      },
      {
        id: "project-overview",
        eyebrow: "05 · Project overview",
        label: "Project overview",
        lead: "One loop that runs from the app into the restaurant and back out again.",
        blocks: [
          { type: "steps", items: ["Seed card", "Online planting", "Harvest card", "Restaurant", "Community"] },
          { text: "A seed card — ordinary or special edition — starts the online planting. Completing it earns a Harvest Card, which is redeemed at the restaurant for a planting experience, harvesting, and kitchen preparation using local ingredients. The visit then feeds the community, which sparks interest in Bra and returns as the next reservation." },
          { type: "image", src: "/project/slow-food/7.jpg", caption: "Service system — how the app, the card, the restaurant and the community close the loop." },
        ],
      },
      {
        id: "storyboard",
        eyebrow: "06 · Storyboard",
        label: "Storyboard",
        lead: "The same loop, told as one visitor’s day.",
        blocks: [
          { text: "Sofia hears about Slow Food from a friend, plants online, travels to Bra, books a table, harvests her own ingredients, watches the meal being prepared, and leaves with a story to share." },
          { type: "image", src: "/project/slow-food/8.jpg", caption: "Storyboard — from the first conversation to the shared story." },
        ],
      },
      {
        id: "app-design",
        eyebrow: "07 · App design",
        label: "App design",
        lead: "GROW — Slow Food Experience.",
        blocks: [
          { type: "image", src: "/project/slow-food/9.jpg", caption: "GROW — launch screen and onboarding, “Plant your slow dishes”." },
          {
            type: "defs",
            items: [
              { term: "1 · Online Planting", text: "Online planting allows users to experience the growth process of vegetables and fruits from planting to maturity. Successful online planting can earn a Harvest Card, which can be exchanged for ingredients during a meal." },
              { term: "2 · Story Community", text: "Here, users can share planting stories, dining experiences, and their insights on “Slow Food.” They can also read stories from others. We will feature interesting stories to attract more users through this method." },
              { term: "3 · Restaurant Reservation", text: "Users can book a restaurant reservation online and view the menu for the day. They can also learn about some activities the Slow Food organization is currently conducting." },
            ],
          },
          { type: "image", src: "/project/slow-food/10.jpg", caption: "Get online seed card → experience online planting → obtain harvest card. Planting simulates seasonal change, weather and real growth; watering, pest control and fertilization run the full cycle." },
          { type: "image", src: "/project/slow-food/11.jpg", caption: "Planting home page and planting screens — planting-area temperature, plant status data, time to maturity, and the harvest operation once the plant is mature." },
          {
            type: "bullets",
            title: "Share community",
            items: [
              "Users can view photos and stories shared by other users.",
              "Users can find check-in points during their journey in Bra, take photos to check in for more information, and receive random rewards.",
            ],
          },
          { type: "image", src: "/project/slow-food/12.jpg", caption: "Story community — the shared feed, check-in points mapped across Bra, photo authentication and the seed-card reward." },
          {
            type: "bullets",
            title: "Restaurant booking",
            items: [
              "Users can see the latest activities of the restaurant, such as the release of a new season’s seed cards.",
              "Users can directly book a dinner reservation at the restaurant here.",
            ],
          },
          { type: "image", src: "/project/slow-food/13.jpg", caption: "Today’s menu and the booking calendar — the fix for a phone-only reservation system." },
        ],
      },
      {
        id: "space-design",
        eyebrow: "08 · Space design",
        label: "Space design",
        lead: "Based on site surveys, the outdoor space of the restaurant has been redesigned — three main areas and one corridor.",
        blocks: [
          {
            type: "defs",
            items: [
              { term: "Planting Experience Area", text: "Using special online seed cards or harvest cards, users will have the opportunity to plant or harvest ingredients in the restaurant’s planting area. Harvested vegetables are included in the diner’s meal for free, and the hands-on experience helps deepen their understanding of the “Slow Food” philosophy." },
              { term: "Open Kitchen", text: "The area has two parts. The reception service area moved to the entrance/exit to streamline restaurant flow — the original reception sat in an inside corner and was hard to find. The kitchen itself is transparent and open, so users can watch food being prepared while they eat." },
              { term: "Exhibition Corridor", text: "There is a corridor at the restaurant entrance, with posters promoting programs and events on both sides." },
              { term: "Eating Area", text: "In the outdoor dining area, users can comfortably enjoy their meals while watching the food preparation process, adding more enjoyment to their dining experience." },
            ],
          },
          { type: "image", src: "/project/slow-food/16.jpg", caption: "Plan — indoor dining, exhibition corridor, outdoor dining, open kitchen and planting area." },
          { type: "image", src: "/project/slow-food/17.jpg", caption: "Exhibition corridor at the entrance." },
          { type: "image", src: "/project/slow-food/18.jpg", caption: "Open kitchen — a front reception area moved to the entrance to streamline flow, and the kitchen itself opened up to the dining area." },
          { type: "image", src: "/project/slow-food/19.jpg", caption: "Planting area — seed cards plant a crop here, harvest cards pick one, and what is harvested goes into the diner’s meal for free." },
          { type: "image", src: "/project/slow-food/20.jpg", caption: "Eating area — the outdoor dining space." },
        ],
      },
      {
        id: "user-journey",
        eyebrow: "09 · User journey",
        label: "User journey",
        lead: "Sixteen steps, from a friend’s seed card back to a friend’s seed card.",
        blocks: [
          { text: "Friend sharing → get the online seed card → start online planting → harvest → book a restaurant → explore city → take photos → obtain rewards → exhibition viewing → reception service → ingredient harvesting → ingredient delivery → dining → checkout → share stories → friend sharing." },
          { type: "image", src: "/project/slow-food/21.jpg", caption: "User journey — the loop closes when the checkout hands over the next seed card." },
          { type: "note", text: "The checkout is the hinge. Handing over a new seed card at the moment of payment is what turns a single visit into the start of the next one — the journey map is a circle rather than a line because of that one step." },
        ],
      },
      {
        id: "design-visivo",
        eyebrow: "10 · Design visivo",
        label: "Design visivo",
        lead: "Plant elements, unconstrained spacing, natural growth.",
        blocks: [
          { type: "image", src: "/project/slow-food/22.jpg", caption: "Logo — the G built from two sprouting leaves, on a construction grid." },
          { type: "image", src: "/project/slow-food/23.jpg", caption: "Typefaces — PP Eiko for display, Sofia Pro for text." },
          { type: "image", src: "/project/slow-food/24.jpg", caption: "Palette — #249A48, #66B447, #4B80B8 and #231815." },
          { type: "image", src: "/project/slow-food/25.jpg", caption: "Applications — seed card packaging, menus, posters, aprons, tableware and the social campaign." },
        ],
      },
      {
        id: "business",
        eyebrow: "11 · Discounted cash flow",
        label: "Business case",
        lead: "According to the DCF neutral evaluation, the project can break even by the 10th quarter.",
        blocks: [
          { type: "image", src: "/project/slow-food/26.jpg", caption: "Cost structure — fixed costs across space, development, human resources and marketing; variable costs in ingredients." },
          { type: "image", src: "/project/slow-food/27.jpg", caption: "Twelve-quarter model, across the development phase and the launch phase." },
          {
            type: "stats",
            items: [
              { value: "9th quarter", label: "Optimistic", note: "NPV 341,761.62 · TIR 19.38%" },
              { value: "10th quarter", label: "Neutral", note: "NPV 159,615.85 · TIR 11.55%" },
              { value: "12th quarter", label: "Pessimistic", note: "NPV 100,068.14 · TIR 8.17%" },
            ],
          },
          { text: "All three scenarios return a positive NPV, so the question the model answers is not whether the project pays back but how long the restaurant has to carry it — between nine and twelve quarters." },
        ],
      },
    ],
  },

  hmi: {
    role: "UX/UI · HMI Design",
    summary:
      "This project designs the transition from Manual to Autonomous Driving mode in self-driving cars. It includes creating interactive elements for a seamless and intuitive handover from driver to vehicle control.",
    tags: ["HMI design", "Automotive UX", "Interaction design", "ProtoPie"],
    sections: [
      {
        id: "overview",
        eyebrow: "00 · Overview",
        label: "Overview",
        lead: "HMI design for autonomous driving mode switching.",
        blocks: [
          { type: "image", src: "/project/hmi/1.jpg", caption: "Instrument cluster and central console, across manual and autonomous states." },
        ],
      },
      {
        id: "brief",
        eyebrow: "01 · Design task brief",
        label: "Design brief",
        lead: "The handover moment is the design problem.",
        blocks: [
          { text: "Introduction of fully autonomous cars is no longer a distant reality. As we prepare to design for vehicles capable of self-driving, the moment of handover of control from human (driver) to computer (vehicle) will be of great importance. This exercise is going to design this transition moment from Manual Driving mode to Autonomous Driving mode in a car." },
        ],
      },
      {
        id: "background",
        eyebrow: "02 · Background",
        label: "Background",
        lead: "Mode switching is now a core vehicle control function.",
        blocks: [
          { text: "With the popularization of assisted driving functions such as L2 and L3, the mode switch between driver-controlled and vehicle-controlled driving has become an important vehicle control function." },
          { type: "image", src: "/project/hmi/2.jpg", size: "lg", caption: "SAE levels 0–5, from no driving automation to full driving automation." },
        ],
      },
      {
        id: "interview",
        eyebrow: "03 · User interview",
        label: "User interview",
        lead: "Three drivers already living with L2/L3 systems.",
        blocks: [
          { text: "Yang (35, Guangzhou, Avatr 11 with Huawei ADS 2.0), Hu (29, Shenzhen, AITO M5 with Huawei ADS 2.0) and Gao (24, Shenzhen, BMW 325Li M) described where the current systems lose them." },
          { type: "image", src: "/project/hmi/3.jpg", caption: "Interview output — what each driver actually said about autonomous driving." },
          {
            type: "bullets",
            title: "Output",
            items: [
              "1 / Safety issues",
              "2 / Trust issues",
              "3 / Insufficient alerts",
            ],
          },
          { type: "note", text: "The quotes split cleanly into two different problems. Yang and Hu describe a capability gap — the system is “dumb” in complex conditions. Gao describes a liability gap — “if an accident happens in autonomous driving mode, who will be responsible?” Interface design can only answer the first. That boundary is worth naming rather than designing past." },
        ],
      },
      {
        id: "scenario",
        eyebrow: "04 · Scenario analysis",
        label: "Scenario analysis",
        lead: "Three ways a driver arrives in autonomous mode.",
        blocks: [
          {
            type: "bullets",
            items: [
              "Directly enter autonomous driving mode — user starts the car, sets navigation, enters autonomous driving mode.",
              "Manual mode transitioning to autonomous driving mode — the scenario this project designs for.",
              "Re-enter after exiting — autonomous driving failure warning, driver takes control, system indicates autonomous driving is available again.",
            ],
          },
          { type: "image", src: "/project/hmi/4.jpg", caption: "Scenario analysis — the middle path, manual into autonomous, is the one taken forward." },
        ],
      },
      {
        id: "journey",
        eyebrow: "05 · User journey map",
        label: "User journey map",
        lead: "Five stages, from getting in the car to driving it again.",
        blocks: [
          { type: "steps", items: ["Ready to depart", "Manual driving", "Preparing to enter", "Autonomous mode", "Exiting"] },
          { type: "image", src: "/project/hmi/13.jpg", caption: "Journey map — entry and exit are mirrored sequences, each with its own confirmation and notification." },
        ],
      },
      {
        id: "summary",
        eyebrow: "06 · Analysed summary",
        label: "Analysed summary",
        lead: "Three problems the design has to solve.",
        blocks: [
          {
            type: "defs",
            items: [
              { term: "1 · Safety", text: "Continuous monitoring and timely warnings under static/dynamic scenarios." },
              { term: "2 · Trust issues", text: "Drivers’ trust issues with the autonomous driving system." },
              { term: "3 · Operational efficiency", text: "Simplify operational pathways through multiple channels, while preventing accidental entry into autonomous driving mode. Different scenarios can use different interaction methods." },
            ],
          },
          { type: "note", text: "Efficiency and error prevention pull in opposite directions here: every channel added to make entry easier is another way to enter the mode by accident. The voice flow’s confirmation step is where that tension gets resolved explicitly." },
        ],
      },
      {
        id: "plan",
        eyebrow: "07 · Design plan",
        label: "Design plan",
        lead: "Tell the driver what the car is doing, before it needs them back.",
        blocks: [
          { type: "image", src: "/project/hmi/6.jpg", size: "md", caption: "Status breathing light — green for normal, orange for possible takeover, red for manual takeover required." },
          {
            type: "defs",
            items: [
              { term: "Status Breathing Light", text: "The complexity of the situation is displayed through the status light, informing the driver of the driving status." },
              { term: "Seat Vibration Takeover Alert", text: "When the driver needs to take over the steering wheel, pre-alert through seat vibration to warn the driver." },
            ],
          },
          { type: "image", src: "/project/hmi/7.jpg", size: "sm", caption: "Seat vibration — a haptic pre-alert that does not compete for the driver’s eyes." },
          { type: "note", text: "The light and the vibration are deliberately different channels. The breathing light is ambient and continuous — it answers “how is it going?” without being asked. The seat is interruptive and only fires once attention is actually required. Putting both on screen would have meant the driver has to look at a display to learn they need to look at the road." },
        ],
      },
      {
        id: "switching",
        eyebrow: "08 · Switching methods",
        label: "Three switching methods",
        lead: "One mode, three ways in — matched to what the driver’s hands and eyes are already doing.",
        blocks: [
          {
            type: "defs",
            items: [
              { term: "Voice interaction", text: "Enter voice command to switch to autonomous driving mode." },
              { term: "Mechanical interaction", text: "Pull the lever twice to enter autonomous driving mode." },
              { term: "Interface interaction", text: "Select “Autonomous Driving” on the central control panel." },
            ],
          },
        ],
      },
      {
        id: "voice",
        eyebrow: "09 · Voice interaction",
        label: "Voice interaction",
        lead: "Evoke → command → confirm → enter.",
        blocks: [
          { type: "image", src: "/project/hmi/11.jpg", caption: "G-Va — the voice assistant dialogue, and the four-step flow behind it." },
          {
            type: "defs",
            items: [
              { term: "Convenience", text: "Activate autonomous driving through simple voice commands without manual operation." },
              { term: "Safety", text: "Allows the driver to activate autonomous driving while keeping both hands on the wheel, reducing distractions." },
              { term: "Error Prevention", text: "Voice confirmation commands prevent accidental entry into autonomous driving mode." },
            ],
          },
        ],
      },
      {
        id: "mechanical",
        eyebrow: "10 · Mechanical interaction",
        label: "Mechanical interaction",
        lead: "Toggle the levers twice to enter autonomous driving mode.",
        blocks: [
          { type: "image", src: "/project/hmi/before13.jpg", caption: "Lever toggle — a deliberate double action, so the mode cannot be entered by a single accidental knock." },
          {
            type: "defs",
            items: [
              { term: "Precision", text: "Mechanical controls typically provide accurate input, reducing the possibility of errors." },
              { term: "Intuitiveness", text: "Physical buttons and switches offer more intuitive and easily understandable operations." },
              { term: "Immediate Feedback", text: "Immediate physical feedback confirms the user’s actions." },
            ],
          },
        ],
      },
      {
        id: "interface",
        eyebrow: "11 · Interface design",
        label: "Interface design",
        lead: "Where the driver can actually see and reach.",
        blocks: [
          { text: "The dashboard has a visible area and two blind-spot corners behind the wheel rim; the central console splits into optimal, easy-to-touch and hard-to-touch zones. Both constrain where mode-critical information and controls can live." },
          { type: "image", src: "/project/hmi/5.jpg", caption: "Visible area and blind spots on the dashboard; reach zones on the central console display." },
          { type: "image", src: "/project/hmi/14.jpg", caption: "Dashboard design — wireframe, then manual and autonomous states. The background colour changes and an icon prompt is added to indicate the road supports autonomous driving." },
          { type: "image", src: "/project/hmi/15.jpg", caption: "Central console design — in manual mode, a 3D navigation map suits drivers attending to route and road; in autonomous mode the map drops to 2D and minimises, giving room to entertainment and other content." },
          { type: "note", text: "This is the clearest expression of the whole project: the same screen carries different information density depending on who is driving. The interface doesn’t just report the mode change — it behaves as though the mode changed." },
        ],
      },
      {
        id: "transition",
        eyebrow: "12 · Mode transition",
        label: "Mode transition",
        lead: "What changes, all at once, at the moment of handover.",
        blocks: [
          { type: "steps", items: ["Prompt voice", "Breathing light on", "Dashboard change", "Console change"] },
          { type: "image", src: "/project/hmi/16.jpg", caption: "Manual to autonomous — prompt voice, the breathing light coming on, and the two displays changing together." },
        ],
      },
      {
        id: "prototype",
        eyebrow: "13 · Prototype",
        label: "Prototype",
        lead: "Built and testable in ProtoPie.",
        blocks: [
          { type: "image", src: "/project/hmi/17.jpg", size: "sm", caption: "G-Va, the in-car voice assistant." },
          {
            type: "links",
            items: [
              {
                label: "Open the ProtoPie prototype",
                href: "https://cloud.protopie.io/p/9e757d1212756acd5da5a625",
                note: "The interactive mode-switching prototype, running in the browser.",
              },
            ],
          },
          {
            type: "bullets",
            title: "Before you try it",
            items: [
              "ProtoPie cannot activate voice recognition through a voice command, so when G-Va appears you need to click G-Va first. After clicking, normal voice interaction can proceed.",
              "The keyword to activate the autonomous driving mode is “autonomous driving mode”.",
            ],
          },
          {
            type: "video",
            src: "https://www.youtube.com/embed/DHkhgsyEwds",
            title: "HMI Design for Autonomous Driving Mode Switching",
            caption: "Walkthrough of the full mode-switching interaction.",
          },
        ],
      },
    ],
  },

  tide: {
    role: "UX/UI Designer",
    summary:
      "Tide is an Italian digital consulting and design studio. This project involves designing the website for the studio.",
    tags: ["UX/UI design", "Website design", "Mobile design"],
    sections: [
      {
        id: "overview",
        eyebrow: "00 · Overview",
        label: "Overview",
        lead: "TIDE — studio website design.",
        blocks: [
          { type: "image", src: "/project/tide/1.jpg", caption: "The finished site — an underwater world for a studio named after the tide." },
        ],
      },
      {
        id: "introduction",
        eyebrow: "01 · Introduction",
        label: "Introduction",
        lead: "“Put us to the test.”",
        blocks: [
          { type: "image", src: "/project/tide/2.jpg", size: "md", caption: "The TIDE wordmark." },
          { type: "note", text: "Mission — to spread digital culture, be your daily source of inspiration, and even help your grandmother understand what you do. This is our mission: put us to the test." },
          { text: "That last line is the brief in disguise. A studio whose mission is to be understood by anyone cannot have a website that reads as industry jargon, which is what pushes the design toward an illustrated, explorable world rather than a conventional agency page." },
        ],
      },
      {
        id: "moodboard",
        eyebrow: "02 · Moodboard",
        label: "Moodboard",
        lead: "Sea, sun and shoreline, in flat blues and yellow.",
        blocks: [
          { type: "image", src: "/project/tide/3.jpg", caption: "Moodboard — waves, dunes, horizons and halftone textures in a blue and yellow palette." },
        ],
      },
      {
        id: "sitemap",
        eyebrow: "03 · Site map",
        label: "Site map",
        lead: "Five top-level sections.",
        blocks: [
          { type: "steps", items: ["Who we are", "What we do", "On wave", "Community", "Contact"] },
          { type: "image", src: "/project/tide/4.jpg", caption: "Site map — What we do and On wave each open into single-project pages, with a 404 page planned from the start." },
        ],
      },
      {
        id: "wireframe",
        eyebrow: "04 · Wireframe",
        label: "Wireframe",
        lead: "Structure first, on both breakpoints.",
        blocks: [
          { type: "image", src: "/project/tide/5.jpg", caption: "Website wireframes — every page laid out end to end." },
          { type: "image", src: "/project/tide/6.jpg", caption: "Mobile wireframes — the same structure reflowed to one column." },
        ],
      },
      {
        id: "draft-one",
        eyebrow: "05 · Draft one",
        label: "Draft one",
        lead: "Yellow and blue, cut by wave-shaped edges.",
        blocks: [
          { type: "image", src: "/project/tide/7.jpg", caption: "Draft one — desktop and mobile side by side." },
          { type: "image", src: "/project/tide/8.jpg", caption: "The full draft-one flow." },
        ],
      },
      {
        id: "draft-two",
        eyebrow: "06 · Draft two",
        label: "Draft two",
        lead: "A second pass at the same structure.",
        blocks: [
          { type: "image", src: "/project/tide/9.jpg", caption: "Draft two — desktop and mobile." },
          { type: "image", src: "/project/tide/10.jpg", caption: "The full draft-two flow." },
        ],
      },
      {
        id: "final",
        eyebrow: "07 · Final concept",
        label: "Final concept",
        lead: "Go under the surface.",
        blocks: [
          { text: "The final direction drops the shoreline and puts the visitor below the waterline — deep navy, seahorses, coral and pearl-lit shelves, with yellow kept as the accent that marks every action." },
          { type: "image", src: "/project/tide/11.jpg", caption: "Homepage — navigation, studio introduction, Our Work, Community and Contact, stacked down one continuous seabed." },
          { type: "image", src: "/project/tide/12.jpg", caption: "Interior pages carrying the same illustrated world." },
          { type: "image", src: "/project/tide/13.jpg", caption: "Further pages from the final concept." },
          { type: "image", src: "/project/tide/14.jpg", caption: "404 — “Mi hai ritrovato!” The error page is part of the world rather than an exception to it." },
          { type: "note", text: "The 404 is the detail that proves the concept. It was in the site map from the beginning and it keeps the illustration and the voice intact, so the one page a visitor reaches by accident still sounds like the studio." },
        ],
      },
      {
        id: "prototyping",
        eyebrow: "08 · Prototyping",
        label: "Prototyping",
        lead: "Clickable, on both breakpoints.",
        blocks: [
          { type: "image", src: "/project/tide/15.jpg", caption: "Desktop prototype." },
          { type: "image", src: "/project/tide/16.jpg", caption: "Mobile prototype — “Cosa facciamo”." },
          {
            type: "links",
            items: [
              {
                label: "Figma prototype — website",
                href: "https://www.figma.com/proto/eDGeo82EfFAId4IMVqHtWq/Wireframe---redesign?page-id=164%3A2180&node-id=695-5880&viewport=1996%2C-7389%2C0.14&t=tmlbfG0q5vuygwqL-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=695%3A6450",
                note: "The desktop site, clickable in Figma.",
              },
              {
                label: "Figma prototype — mobile",
                href: "https://www.figma.com/proto/eDGeo82EfFAId4IMVqHtWq/Wireframe---redesign?page-id=44%3A6640&node-id=914-22478&viewport=472%2C-4392%2C0.25&t=05eNX3ysNf4cawCZ-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=914%3A22478",
                note: "The mobile site, clickable in Figma.",
              },
            ],
          },
        ],
      },
    ],
  },

  codemao: {
    role: "UX/UI Designer",
    summary:
      "Codemao Programming Online Education provides a specialized CMS platform designed as a digital management backend for schools, educational institutions, and online education providers. This platform streamlines the management and organization of educational content, offering tools for content creation, user management, data analysis, and course administration, all in one integrated system.",
    tags: ["ToB design", "CMS platform", "UX/UI", "Design system"],
    sections: [
      {
        id: "overview",
        eyebrow: "00 · Overview",
        label: "Overview",
        lead: "A B-side platform upgrade, shipped in three weeks.",
        blocks: [
          { type: "image", src: "/project/codemao/1.jpg", caption: "The Codemao CMS platform — course management for schools and training institutions." },
        ],
      },
      {
        id: "background",
        eyebrow: "01 · Background",
        label: "Background",
        lead: "A company moving from consumer to business.",
        blocks: [
          { type: "image", src: "/project/codemao/company.jpg", size: "sm", caption: "Codemao — the top programming education company in China." },
          { text: "Codemao: the top programming education companies in China. With a mission to “let children enjoy the fun of creative coding,” Codemao focuses on independently developing programming tools for young learners. It provides online and offline coding education for children aged 7–16." },
          { type: "image", src: "/project/codemao/market.jpg", size: "lg", caption: "The B-end business — partnerships with schools and external training institutions." },
          {
            type: "defs",
            items: [
              { term: "Shift from C-end to B-end business", text: "Under the national educational policy of reducing double pressures, the company is shifting its main focus from C-end (consumer) to B-end (business). The B-end business primarily involves partnerships with schools and external training institutions." },
            ],
          },
        ],
      },
      {
        id: "demand",
        eyebrow: "02 · Demand",
        label: "The brief",
        lead: "B-side business platform upgrade 2.0.",
        blocks: [
          {
            type: "defs",
            items: [
              { term: "Users", text: "School teachers and students." },
              { term: "Goal", text: "Enable more teachers and students to use the Codemao platform to complete programming courses." },
              { term: "Task content", text: "Analyze issues based on user interviews and backend data. Perform demand analysis by combining user needs and journey. Collaborate with the PM to prioritize requirements. Complete P0-level requirements. Coordinate demand alignment with developers." },
              { term: "Demand timeline", text: "Three weeks, with a one-week turnaround for each interaction." },
            ],
          },
        ],
      },
      {
        id: "reason",
        eyebrow: "03 · Reason for upgrade",
        label: "Why now",
        lead: "Two reasons to rebuild, and two reasons it could not be a rebuild.",
        blocks: [
          { text: "Because…" },
          {
            type: "defs",
            items: [
              { term: "Unable to meet current user needs", text: "Due to previous focus on C-end business, the B-end business platform has not been updated for a long time and can no longer meet current user needs." },
              { term: "Seeking more partnerships", text: "The goal is to use the upgraded product to secure more campus partnerships." },
            ],
          },
          { text: "However…" },
          {
            type: "defs",
            items: [
              { term: "Framework confusion and feature redundancy", text: "Previous “quick fixes” have led to a confusing structure with some redundant features." },
              { term: "Inability to conduct a complete overhaul", text: "With the need to enter campuses before September, time is limited, making a large-scale overhaul unfeasible. The focus will be on meeting prioritized needs." },
            ],
          },
          { type: "note", text: "This is the constraint that defines the whole project. The structural problem and the deadline point in opposite directions, so the work could not be “fix the framework” — it had to be a prioritised set of P0 changes that leave the broken structure standing. Worth being honest that this is triage, not a redesign." },
        ],
      },
      {
        id: "data",
        eyebrow: "04 · Data analysis",
        label: "Data analysis",
        lead: "Teachers visit the platform. They do not teach from it.",
        blocks: [
          { type: "image", src: "/project/codemao/4.jpg", caption: "Weekly teaching-related data for teachers’ activity — visit rate, teaching rate and weekly average teaching sessions." },
          {
            type: "stats",
            items: [
              { value: "75%", label: "Platform visits", note: "Teachers do come to the platform." },
              { value: "55%", label: "Using platform courseware for teaching", note: "Only — platform courseware do not fully meet teaching needs." },
              { value: "80%+", label: "Course video playback", note: "Videos get opened." },
              { value: "7.69%", label: "Effective video playback rate", note: "Only — platform courseware serve as reference and supplementary teaching aids, not the lesson itself." },
            ],
          },
          { type: "note", text: "The gap between 80% playback and 7.69% effective playback is the entire finding. The courseware isn’t being rejected — it’s being opened, sampled, and abandoned, which points at the format of the material rather than its existence." },
        ],
      },
      {
        id: "interview",
        eyebrow: "05 · User interview",
        label: "User interview",
        lead: "What teachers actually do instead.",
        blocks: [
          {
            type: "bullets",
            items: [
              "Many teachers directly use self-created PPT lessons instead of the Codemao platform.",
              "The courseware are primarily video-based, but the video resolution is relatively low — single videos contain multiple teaching segments/tasks.",
              "Teachers expect their teaching content to be integrated into the platform, but they are unable to edit courseware.",
              "During teaching, teachers need to switch between course videos, documents, and creation tools.",
            ],
          },
          {
            type: "defs",
            items: [
              { term: "Flexibility and compatibility", text: "Platform courseware lack flexibility and compatibility." },
              { term: "Format and experience", text: "Demand for multiple course formats; the teaching experience needs improvement." },
            ],
          },
        ],
      },
      {
        id: "problem",
        eyebrow: "06 · Problem identification",
        label: "Problem identification",
        lead: "Four problems, scoped to what three weeks could reach.",
        blocks: [
          {
            type: "defs",
            items: [
              { term: "Switching wastes teaching time", text: "Course materials are mainly video-based, and teachers must switch between multiple files during teaching. The video quality is relatively low — one video contains multiple teaching segments/tasks — so during the lesson teachers move constantly between course videos, documents, and creation tools." },
              { term: "Courseware cannot be edited", text: "Teachers request the ability to edit course content, but currently course materials do not support editing." },
              { term: "Live data cannot be accurately captured", text: "Teachers repeatedly send materials, lesson documents, and course resources in the same way — open package, display course resources — leading to a chaotic and redundant workflow." },
              { term: "No support for external tools", text: "Currently, only kitten3 web pages and Haige web pages (wood) are supported." },
            ],
          },
        ],
      },
      {
        id: "analysis",
        eyebrow: "07 · Demand analysis",
        label: "Demand analysis",
        lead: "What has to be true before the lesson, and during it.",
        blocks: [
          {
            type: "bullets",
            title: "Before class",
            items: [
              "Teachers can edit and enhance course materials to align with their own teaching plans.",
            ],
          },
          {
            type: "bullets",
            title: "During class — do not waste teaching time",
            items: [
              "Once class begins, teachers and students can quickly enter the teaching state. Teachers can start teaching with one simple operation without having to navigate through multiple course packages.",
              "Teachers can follow the teaching flow to give lessons without needing to switch between multiple course files to display content.",
              "Teachers can directly assist students in starting their creations, eliminating the need for on-site guidance and monitoring of student actions.",
            ],
          },
          {
            type: "bullets",
            title: "During class — a better teaching experience",
            items: [
              "Courses are better suited for different age groups, with more robust tools. For younger students, support for the “kids” creation tool is available, while higher elementary grades have tools like “kitten4” for support.",
            ],
          },
        ],
      },
      {
        id: "solution",
        eyebrow: "08 · Design solution",
        label: "Design solution",
        lead: "Super Courseware.",
        blocks: [
          { type: "image", src: "/project/codemao/5.jpg", size: "lg", caption: "Super Courseware — editable templates, compatibility with multiple courseware types, a simplified teaching process and an enhanced teaching experience." },
          { type: "note", text: "The solution answers the 7.69% directly: if teachers abandon the video because it bundles several tasks into one file, then the unit of courseware has to become the teaching step, not the video. Everything downstream — step configuration, multiple segment types, import — follows from that one reframing." },
        ],
      },
      {
        id: "userflow",
        eyebrow: "09 · User flow",
        label: "User flow",
        lead: "Regular courseware stays. Super Courseware branches off it.",
        blocks: [
          { type: "image", src: "/project/codemao/userflow.jpg", caption: "User flow — the Super Courseware path adds editing, teaching-step creation, step configuration and local import alongside the existing upload flow." },
        ],
      },
      {
        id: "code",
        eyebrow: "10 · Design code",
        label: "Design code",
        lead: "Functions restructured into three levels.",
        blocks: [
          { text: "Based on product features, functions are restructured into three levels: background, content, and global control. Global control serves as the core functionality area, with top navigation and side navigation modules." },
          { type: "image", src: "/project/codemao/7.jpg", caption: "Top navigation bar, left navigation bar, content area and background area — and what each is responsible for." },
        ],
      },
      {
        id: "system",
        eyebrow: "11 · Design system",
        label: "Design system",
        lead: "Colour standards and a 12-column grid.",
        blocks: [
          { type: "image", src: "/project/codemao/8.jpg", caption: "Primary #3490FF with secondary and text-emphasis scales; a 1440px page with a 1168px content area on 12 equal columns." },
        ],
      },
      {
        id: "interface",
        eyebrow: "12 · Interface design",
        label: "Interface design",
        lead: "Old against new, one key result at a time.",
        blocks: [
          { type: "image", src: "/project/codemao/9.jpg", caption: "KR1 · Improve user experience — refine structure and organize feature access. Hierarchy lines added, the course package entry moved under Course Package List, entry points streamlined." },
          { type: "image", src: "/project/codemao/10.jpg", caption: "KR1 · Optimize interaction flow — Courses → Course List → Course Editing Page, with default and editing modes and an empty state for no advanced courseware." },
          { type: "image", src: "/project/codemao/11.jpg", caption: "Advanced Courseware Editing Page, empty state — add a step, import from an external source, and choose a teaching step type." },
          { type: "image", src: "/project/codemao/ui-a.jpg", caption: "Supports various courseware types — teaching segment as image, and as slideshow with a thumbnail list." },
          { type: "image", src: "/project/codemao/ui-b.jpg", caption: "And as video with a built-in player, as a built-in creation tool, and as attachment/file download." },
        ],
      },
    ],
  },

  "puzzle-game": {
    role: "UX/UI · Game Design",
    summary:
      "This project focuses on enhancing the interactive experience of a mobile puzzle game by designing a process for a limited-time event where players collect puzzle pieces to complete storybooks. The goal is to improve player engagement and completion rates by introducing a tutorial that helps new users quickly understand the gameplay.",
    tags: ["UX/UI design", "Game design", "Mobile design"],
    sections: [
      {
        id: "overview",
        eyebrow: "00 · Overview",
        label: "Overview",
        lead: "Collect nine puzzle pages to complete a storybook.",
        blocks: [
          { type: "image", src: "/project/puzzle-game/hero.jpg", caption: "Jigsaw Puzzle — a limited-time collection event inside a mobile puzzle game." },
          { text: "Players enter the activity interface and complete the puzzle pages of the puzzle set (storybook) through the puzzle game. Collect 9 puzzle pages to create a puzzle set, and the newly created storybook is added to the bookshelf interface. Books on the bookshelf can be opened during or after the activity to play the puzzle pages again." },
          { type: "image", src: "/project/puzzle-game/1.jpg", caption: "The event in one screen — a storybook cover, its puzzle pages, and Play." },
        ],
      },
      {
        id: "journey",
        eyebrow: "01 · User journey map",
        label: "User journey map",
        lead: "Analyze pain points and product opportunities to summarize design strategies.",
        blocks: [
          { type: "steps", items: ["Enter page", "Select puzzle set", "Beginner guide", "Puzzle in progress", "Complete puzzle"] },
          { type: "image", src: "/project/puzzle-game/2.jpg", caption: "Stage, touchpoint, mood curve, pain points and opportunities across the five stages." },
          {
            type: "defs",
            items: [
              { term: "Unaware of puzzle activities", text: "Resulting in low completion rates → promote puzzle set activities." },
              { term: "Overwhelming content", text: "Difficult to decide, uncertain about the number of puzzles → categorize mainline and activities, display puzzle progress." },
              { term: "Static guidance fails", text: "Users do not understand quickly → interactive guidance, reducing user learning effort." },
              { term: "Game ends without reward feedback", text: "→ emotional engagement mechanism, coin reward mechanism." },
            ],
          },
          { type: "note", text: "The mood curve is doing the real work here. It dips twice — once at selection, once after completion — and both dips become features: categorisation fixes the first, the reward moment fixes the second. The design strategy is readable straight off the curve." },
        ],
      },
      {
        id: "motivation",
        eyebrow: "02 · User motivation",
        label: "User motivation",
        lead: "A teenage audience, driven by attraction.",
        blocks: [
          { text: "Pay attention to user experience, analyze user motivation to stimulate behavior, meet the demands of different roles, improve participation and completion rates, and enable users to reach multiple points of participation and achievement." },
          { type: "image", src: "/project/puzzle-game/3.jpg", caption: "User traits — a teenage group looking for engagement, belonging, identification; drive to use — excitement, accomplishment, emotional bond, enjoyment." },
        ],
      },
      {
        id: "strategy",
        eyebrow: "03 · Design strategy",
        label: "Design strategy",
        lead: "Three strategies, from the experience report and motivation analysis.",
        blocks: [
          {
            type: "defs",
            items: [
              { term: "Interaction experience", text: "Swipe interaction method; pop-ups to reduce navigation; user action guidance." },
              { term: "Content navigation", text: "Puzzle set status visualization; puzzle set waterfall layout; categorized tags for faster search." },
              { term: "Visual effects", text: "Playful typography; youthful and vibrant colors; unified components." },
            ],
          },
          { type: "image", src: "/project/puzzle-game/4.jpg", caption: "The three strategy pillars." },
        ],
      },
      {
        id: "emotional",
        eyebrow: "04 · Emotional edition",
        label: "Emotional edition",
        lead: "Young · immersion · interesting.",
        blocks: [
          { text: "Based on preliminary product research and analysis of the brand’s target user group, keywords for the ideal product have been derived, with children being the main group. The design style is youthful and lively, with soft and comfortable colors." },
          {
            type: "defs",
            items: [
              { term: "Young", text: "Target audience mainly consists of teenagers." },
              { term: "Immersion", text: "Purple ambiance enhances immersion." },
              { term: "Interesting", text: "Enjoyable experiences enhance user loyalty." },
            ],
          },
          { type: "image", src: "/project/puzzle-game/5.jpg", caption: "The three keywords and the imagery behind each." },
        ],
      },
      {
        id: "color",
        eyebrow: "05 · Color standard",
        label: "Color standard",
        lead: "Childlike purple, with blue as the auxiliary.",
        blocks: [
          { text: "The color selection is full of childlike purple as the main color, unifying the brand tone, and the accent color is blue from adjacent color series as the auxiliary color." },
          { type: "image", src: "/project/puzzle-game/6.jpg", caption: "Primary #9F7FFF–#8055FE, secondary #7C90FA, with #4460ED, #ED6FF7 and #E86124." },
        ],
      },
      {
        id: "homepage",
        eyebrow: "06 · Home page",
        label: "Home page",
        lead: "Two tags, a waterfall of puzzle sets, and the player’s balance.",
        blocks: [
          { text: "The homepage is divided into two tags, each containing a category bar, coin information, and diamond information." },
          { type: "image", src: "/project/puzzle-game/7.jpg", caption: "Category section (mainline + event), content section (puzzle set waterfall with upcoming, in-progress and completed states), and the account data section." },
        ],
      },
      {
        id: "process",
        eyebrow: "07 · Process display",
        label: "Process display",
        lead: "Simple, intuitive interaction that lowers the difficulty of operation.",
        blocks: [
          { type: "image", src: "/project/puzzle-game/8.jpg", caption: "Landing page through to the completed puzzle — including the Play/Reserve state before an event begins, and the transition animation back to the puzzle set page on completion." },
        ],
      },
      {
        id: "guidance",
        eyebrow: "08 · Operation guidance",
        label: "Operation guidance",
        lead: "Dynamic beginner guidance, not a static tutorial.",
        blocks: [
          { text: "Adopting dynamic beginner guidance to guide users, further reducing the threshold for operation and improving usability." },
          {
            type: "defs",
            items: [
              { term: "Swipe piece placement area", text: "Guide the user to the next step upon following the swipe instructions." },
              { term: "Puzzle play mechanics", text: "As the user moves a piece, show the matching position. The piece will automatically snap into place when positioned correctly." },
              { term: "Zoom in/out puzzle", text: "Pinch with two fingers to zoom in or out on the puzzle." },
            ],
          },
          { type: "image", src: "/project/puzzle-game/9.jpg", caption: "Each gesture taught in place, at the moment it is needed." },
          { type: "note", text: "This is the answer to the brief. “Static guidance fails to help users understand quickly” was the journey map’s third pain point, and the fix is that the tutorial stops being a screen the player dismisses and becomes a prompt attached to the action itself." },
        ],
      },
      {
        id: "display",
        eyebrow: "09 · Page display",
        label: "Page display",
        lead: "The finished screens.",
        blocks: [
          { type: "image", src: "/project/puzzle-game/10.jpg", caption: "Page display — the event list, puzzle sets and in-game puzzle screens." },
        ],
      },
    ],
  },

  "fire-rescue-drone": {
    role: "Product · System & UAV Design",
    summary:
      "Urban villages exist in every fast-growing city in China. These villages have always been at the heart of the fire problem due to dense housing and narrow roads. Against the backdrop of future intelligent cities, this project creates an intelligent fire-fighting system for urban villages that intelligently responds to fires, helps residents fight fires, and assists firefighters.",
    tags: ["Product design", "System design", "UAV design"],
    sections: [
      {
        id: "overview",
        eyebrow: "00 · Overview",
        label: "Overview",
        lead: "Fire protection system design for urban villages.",
        blocks: [
          { type: "image", src: "/project/fire-rescue-drone/hero.jpg", caption: "A paired drone and ground vehicle, dispatched ahead of the firefighters." },
        ],
      },
      {
        id: "background",
        eyebrow: "01 · Background",
        label: "Background",
        lead: "Residential fire is where people actually die.",
        blocks: [
          { type: "image", src: "/project/fire-rescue-drone/bg1.jpg", caption: "Residential fires are 44.8% of occurrences but 78.3% of the death toll; electrical appliances are the single biggest cause at 32.1%." },
          { type: "image", src: "/project/fire-rescue-drone/bg2.jpg", caption: "Why urban villages burn — dense housing and narrow roads." },
          { type: "image", src: "/project/fire-rescue-drone/bg3.jpg", caption: "Conditions on the ground." },
          { type: "image", src: "/project/fire-rescue-drone/bg4.jpg", caption: "The existing response, and where it loses time." },
          { type: "image", src: "/project/fire-rescue-drone/bg5.jpg", caption: "Background research summary." },
          { type: "note", text: "The 44.8% / 78.3% split is the whole argument for the project. Residential fire is not the most common kind of fire — it is the most lethal kind, and in an urban village the reason is access. That points the design at the minutes before the firefighters arrive rather than at firefighting itself." },
        ],
      },
      {
        id: "architecture",
        eyebrow: "02 · System architecture",
        label: "System architecture",
        lead: "Scene, cloud, network, terminal.",
        blocks: [
          {
            type: "defs",
            items: [
              { term: "Scene", text: "Urban village, fire fighting, fire station." },
              { term: "Cloud system center", text: "Cloud platform, big data, AI middleground and video platform on a SaaS cloud + IoT platform, running the risk perception system, intelligent decision system and fire safety system." },
              { term: "Multi-network", text: "Service providers’ network, Alpha IOT private network, e-government network." },
              { term: "System products", text: "Smoke detector, video monitoring, fire fighting UAV, fire car." },
            ],
          },
          { type: "image", src: "/project/fire-rescue-drone/arch.jpg", caption: "The four layers, from scene down to terminal hardware." },
        ],
      },
      {
        id: "diagram",
        eyebrow: "03 · System diagram",
        label: "System diagram",
        lead: "Baishizhou, Nanshan District, Shenzhen — taken as the example.",
        blocks: [
          {
            type: "bullets",
            items: [
              "The whole urban village will be divided according to the main road and the density of houses.",
              "Each partition is equipped with an intelligent fire sub-system according to the public space and number of houses.",
              "Digitize and code each building and floor.",
              "Install smoke sensors and alarms on each floor.",
              "Plan the route of fire trucks and fire drones to each building.",
            ],
          },
          { type: "image", src: "/project/fire-rescue-drone/sys1.jpg", caption: "Baishizhou divided into partitions A–L, each with its own sub-system, and every building and floor coded." },
          { type: "image", src: "/project/fire-rescue-drone/sys2.jpg", caption: "A fire in C-06-09 — detection, alert, dispatch, the vehicles arriving ahead of the firefighters, residents self-rescuing with delivered tools, and a precise rescue on arrival." },
        ],
      },
      {
        id: "product-design",
        eyebrow: "04 · Product design",
        label: "Product design",
        lead: "Geometry · rounded · affiliative.",
        blocks: [
          { type: "image", src: "/project/fire-rescue-drone/mood.jpg", caption: "Moodboard — soft geometry and rounded housings, approachable rather than industrial." },
          { type: "image", src: "/project/fire-rescue-drone/sketch.jpg", caption: "Product sketches." },
        ],
      },
      {
        id: "drone",
        eyebrow: "05 · Fire fighting drone",
        label: "Fire fighting drone",
        lead: "Eyes above the fire.",
        blocks: [
          { text: "The Fire Fighting Drone is designed to transmit video information of the fire scene, assist firefighters in locating trapped persons, and throw fire extinguisher balls. When a fire breaks out, the drone quickly arrives at the scene, providing firefighters with real-time images. Simultaneously, firefighters can control the drone to release fire-extinguishing bombs, enhancing their ability to combat the fire effectively." },
          { type: "image", src: "/project/fire-rescue-drone/drone.jpg", caption: "The fire fighting drone." },
        ],
      },
      {
        id: "car",
        eyebrow: "06 · Fire fighting small car",
        label: "Fire fighting small car",
        lead: "Hoses delivered up the stairs, before anyone arrives.",
        blocks: [
          { text: "The fire fighting vehicle is equipped to transmit video information of the fire scene, assist firefighters in locating trapped persons, and provide fire hoses to residents. When a fire occurs, the vehicle delivers fire hoses to residents by climbing stairs, enabling them to save themselves. Simultaneously, it transmits real-time information on the fire situation to the firefighters, aiding in their response efforts." },
          { type: "image", src: "/project/fire-rescue-drone/car.jpg", caption: "The stair-climbing ground vehicle." },
        ],
      },
      {
        id: "exploded",
        eyebrow: "07 · Product exploded view",
        label: "Exploded view",
        lead: "Three systems — PCB, body and battery.",
        blocks: [
          { text: "The main structure logic is to divide this machine into three main systems: PCB system, body system and battery system. The drone covers are metal (aluminium) made by die casting and CNC with anodic oxidation finishing, considering that this machine works in a high temperature environment. Components are connected using screws and nuts to make sure they stick tightly." },
          { type: "image", src: "/project/fire-rescue-drone/exp1.jpg", caption: "Drone exploded view — indicator and control panels, solar panel, PCB, motors, body covers, battery housing and the goods clamp." },
          { text: "Fire car structure is considered to use metal (aluminium) as the main material because of high temperature working. The metal covers are made by die casting and CNC with anodic oxidation finishing with laser-marking logo. All parts are connected with screws and nuts to make sure it is convenient to assemble or disassemble. Also component repairing is possible." },
          { type: "image", src: "/project/fire-rescue-drone/exp2.jpg", caption: "Ground vehicle exploded view." },
        ],
      },
      {
        id: "renders",
        eyebrow: "08 · Renders",
        label: "Renders",
        lead: "The finished pair.",
        blocks: [
          { type: "image", src: "/project/fire-rescue-drone/r1.jpg", caption: "Drone render." },
          { type: "image", src: "/project/fire-rescue-drone/r2.jpg", caption: "Drone, alternate view." },
          { type: "image", src: "/project/fire-rescue-drone/r3.jpg", caption: "Ground vehicle render." },
          { type: "image", src: "/project/fire-rescue-drone/r4.jpg", caption: "Ground vehicle, alternate view." },
          { type: "image", src: "/project/fire-rescue-drone/r5.jpg", caption: "The system in context." },
        ],
      },
    ],
  },
  stationery: {
    role: "Product Designer",
    summary:
      "This project uses the Four Treasures of the Study and traditional Chinese mortise and tenon joints, combined with ancient garden design, to explore Eastern art design. It seeks to promote a slow-paced lifestyle and harmony between humans and nature, highlighting traditional Chinese aesthetics.",
    tags: ["Product design", "Prototyping", "Mortise and tenon joint", "Traditional Chinese culture"],
    sections: [
      {
        id: "overview",
        eyebrow: "00 · Overview",
        label: "Overview",
        lead: "“Place Life” series stationery product design.",
        blocks: [
          { type: "image", src: "/project/stationery/hero.jpg", caption: "A desk set built from the Four Treasures of the Study — brush, ink, paper and inkstone." },
        ],
      },
      {
        id: "description",
        eyebrow: "01 · Design description",
        label: "Design description",
        lead: "A courtyard house, shrunk to the size of a desk.",
        blocks: [
          {
            type: "defs",
            items: [
              { term: "Four-sided box", text: "The overall exterior shape draws inspiration from traditional Chinese courtyard buildings. The design is modeled after the four-sided courtyard layout." },
              { term: "Frame art technique", text: "Frame art is a traditional garden landscape technique. In the design, window frames are mimicked, placing selected landscape elements within the box. From the outside, it appears as a framed picture." },
              { term: "Garden landscape design", text: "The garden design imitates natural landscapes with artificial mountains and waterscapes. Three mountains and a waterscape are created within the box’s interior." },
              { term: "Mountain and water curves", text: "The edges of the bottom lid are cut to mimic mountain and water curves, allowing for the placement of brushes." },
              { term: "Ancient roof design", text: "The four sides of the box extract the curved lines from the roofs of ancient buildings, incorporating them into the design." },
            ],
          },
          { type: "image", src: "/project/stationery/desc.jpg", caption: "Each architectural reference and where it lands on the object." },
          { type: "note", text: "The borrowing works because it is structural rather than decorative. 框景 (frame art) is not applied as a pattern on the surface — it decides what you can see of the inkstone from outside, so the garden technique is doing the same job on the box that it does in a garden." },
        ],
      },
      {
        id: "details",
        eyebrow: "02 · Design details",
        label: "Design details",
        lead: "Held together by dovetail joints, not glue.",
        blocks: [
          {
            type: "bullets",
            items: [
              "The left and right sides are longer than the top and bottom sides. In the closed state, the left and right sides clamp onto the top and bottom sides.",
              "The left and right sides of the box use dovetail joints.",
              "The top and bottom lids share the dovetail joints, which complete the connection when closed.",
              "The overall box’s four sides have beveled dovetail cuts, making it easier to connect the rectangular box sides.",
            ],
          },
          { type: "image", src: "/project/stationery/details.jpg", caption: "The joinery — how the four sides and two lids lock together." },
        ],
      },
      {
        id: "product",
        eyebrow: "03 · Product",
        label: "Product",
        lead: "The finished object.",
        blocks: [
          { type: "image", src: "/project/stationery/product.jpg", caption: "The complete “Place Life” set." },
          { type: "image", src: "/project/stationery/p1.jpg", caption: "Closed — the framed landscape read through the lid." },
          { type: "image", src: "/project/stationery/p2.jpg", caption: "The box from above." },
          { type: "image", src: "/project/stationery/p3.jpg", caption: "Open — the inkstone basin as mountain and water, with the brush resting in the cut edge." },
          { type: "image", src: "/project/stationery/p4.jpg", caption: "Detail of the carved landscape." },
          { type: "image", src: "/project/stationery/p5.jpg", caption: "The set in use." },
        ],
      },
    ],
  },
  "e-pack": {
    role: "Systemic Design · Master's thesis",
    summary:
      "The thesis explores innovative smart packaging solutions in the Italian fashion industry, focusing on enhancing product sustainability and user engagement through systemic design. It aims to address critical issues within the fashion system by identifying trends and latent needs for smart packaging. The research proposes three integrable solutions: technologies for product traceability and authenticity, a system for collecting and reusing clothing, and a return and reuse system for e-commerce packaging. These strategies promote sustainability and encourage socially responsible consumer behavior.",
    tags: ["Systemic design", "System design", "Smart packaging", "Thesis"],
    sections: [
      {
        id: "overview",
        eyebrow: "00 · Overview",
        label: "Overview",
        lead: "Smart packaging: a way to enhance Made in Italy fashion.",
        blocks: [
          { type: "image", src: "/project/e-pack/cover.jpg", size: "lg", caption: "E-PACK — a master’s thesis in systemic design." },
          {
            type: "links",
            items: [
              {
                label: "Presentation — Figma prototype",
                href: "https://www.figma.com/proto/HC5WLsU4l2CVraHYpdUHbD/E-PACK-THESIS?page-id=3978%3A8666&node-id=3978-18781&viewport=947%2C5573%2C0.17&t=cHCRdfqYCdlyzdL6-1&scaling=contain&content-scaling=fixed&starting-point-node-id=3978%3A18781",
                note: "The full thesis presentation.",
              },
              {
                label: "Thesis — full document",
                href: "https://drive.google.com/file/d/1b8AiW3tEfVoflgYm7ez3DLw2qAl1oCdy/view?usp=sharing",
                note: "The written thesis as a PDF.",
              },
            ],
          },
        ],
      },
      {
        id: "case-study",
        eyebrow: "01 · Smart case study",
        label: "Smart case study",
        lead: "What smart packaging already does, elsewhere.",
        blocks: [
          { type: "image", src: "/project/e-pack/case1.jpg", caption: "Case analysis — 65 intelligent-packaging cases and 51 active-packaging cases, mapped by packaging level, reference sector and country." },
          { type: "image", src: "/project/e-pack/case2.jpg", caption: "Case analysis, continued." },
          { type: "image", src: "/project/e-pack/case3.jpg", caption: "The technologies behind the cases." },
          { type: "note", text: "The survey is what keeps the proposal grounded. Most of the 116 cases sit in food, beverage and pharmaceuticals rather than fashion — so the thesis is not inventing a technology, it is moving a proven one into a sector that has not adopted it." },
        ],
      },
      {
        id: "history",
        eyebrow: "02 · History of Made in Italy",
        label: "History of Made in Italy",
        lead: "Where the label came from, and what it now has to defend.",
        blocks: [
          { type: "image", src: "/project/e-pack/hist1.jpg", caption: "The history of Made in Italy." },
          { type: "image", src: "/project/e-pack/hist2.jpg", caption: "How the label is defined and certified." },
          { type: "image", src: "/project/e-pack/hist3.jpg", caption: "The value and the vulnerability of the label." },
        ],
      },
      {
        id: "fashion-system",
        eyebrow: "03 · Fashion system",
        label: "Fashion system",
        lead: "The supply chain, drawn end to end.",
        blocks: [
          { type: "image", src: "/project/e-pack/sys1.jpg", caption: "Supply chain of “Made in Italy” fashion — raw material through textile manufacture, garment manufacture, brand and retail." },
          { type: "image", src: "/project/e-pack/sys2.jpg", caption: "The system’s actors and flows." },
          { type: "image", src: "/project/e-pack/sys3.jpg", caption: "Where waste and value leak out of the chain." },
        ],
      },
      {
        id: "challenges",
        eyebrow: "04 · Challenges and opportunities",
        label: "Challenges and opportunities",
        lead: "Every challenge, matched to the opportunities that answer it.",
        blocks: [
          { type: "image", src: "/project/e-pack/chal.jpg", caption: "Challenges on the left, opportunities in the middle, and the case studies that evidence each one on the right — grouped as waste in Italy, product, and packaging." },
        ],
      },
      {
        id: "new-system",
        eyebrow: "05 · New system",
        label: "New system",
        lead: "Three integrable solutions, in one flow.",
        blocks: [
          {
            type: "defs",
            items: [
              { term: "Traceability and authenticity", text: "A QR code on the label opens certification, traceability information and authentication — technologies for product traceability and authenticity." },
              { term: "Collecting and reusing clothing", text: "A system for collecting and reusing clothing, routed through repair points, transformers and second-hand e-commerce." },
              { term: "Return and reuse of packaging", text: "A return and reuse system for e-commerce packaging, carried back through logistics partners, pickup points and the collection company." },
            ],
          },
          { type: "image", src: "/project/e-pack/hero.jpg", caption: "The new system — packaging, material and process layers, with the old flows in orange and the new ones overlaid." },
        ],
      },
      {
        id: "evaluation",
        eyebrow: "06 · Evaluation",
        label: "Evaluation",
        lead: "Outcomes and impacts, over three horizons.",
        blocks: [
          { type: "image", src: "/project/e-pack/eval.jpg", caption: "Short, medium and long term outcomes at micro, meso and macro scale — from efficient resource use and reduced waste through to a regenerated ecosystem and an enhanced Made in Italy." },
        ],
      },
    ],
  },
  gobino: {
    role: "Systemic Design · Team project",
    summary:
      "A systemic design study of Guido Gobino, the Turin chocolate maker — diagnosing the territory and the company, then proposing a new system of projects that closes its material flows and strengthens its link to Piedmont.",
    tags: ["Systemic design", "System design", "Food system", "Team project"],
    sections: [
      {
        id: "territory",
        eyebrow: "01 · Territory",
        label: "Holistic diagnosis — territory",
        lead: "Piedmont, with a focus on the Metropolitan City of Turin.",
        blocks: [
          { type: "image", src: "/project/gobino/1.jpg", caption: "The territory — primary, secondary and tertiary sectors, population, waste, tourism and the history of chocolate in Turin." },
          { type: "image", src: "/project/gobino/2.jpg", caption: "The same diagnosis with the territory’s challenges marked on it." },
        ],
      },
      {
        id: "company",
        eyebrow: "02 · Company",
        label: "Holistic diagnosis — company",
        lead: "Guido Gobino, chocolate maker in Turin since 1964.",
        blocks: [
          { text: "The history of Guido Gobino’s chocolate shop dates back to 1964. Careful selection of raw materials, complete control of the production chain, constant research into new flavours and accurate packaging design make Guido Gobino’s chocolate one of the best in Turin. Quality is credibility." },
          { type: "image", src: "/project/gobino/3.jpg", caption: "Supply chain, competitors, company history and the calendar of production and arrival of raw materials." },
          { type: "image", src: "/project/gobino/4.jpg", caption: "The same diagnosis with the company’s challenges marked on it." },
        ],
      },
      {
        id: "maps",
        eyebrow: "03 · System maps",
        label: "System maps",
        lead: "The flows as they run today.",
        blocks: [
          { type: "image", src: "/project/gobino/8.jpg", caption: "Linear map — cocoa and hazelnut in, chocolate out, with the outputs leaving the system." },
          { type: "image", src: "/project/gobino/7.jpg", caption: "Systemic map — the same chain with its outputs routed back into local actors at town, regional and national scale." },
          { type: "note", text: "The pair is the argument. The two maps carry the same production chain, so the only difference is what happens to cocoa bean shells, hazelnut cuticles, jute and used packaging — waste in the first map, inputs to someone else in the second." },
        ],
      },
      {
        id: "opportunities",
        eyebrow: "04 · Challenges and opportunities",
        label: "Challenges and opportunities",
        lead: "Company and territory challenges, against what could answer them.",
        blocks: [
          { type: "image", src: "/project/gobino/5.jpg", caption: "Every company and territory challenge linked to the opportunities that address it, evidenced by case studies." },
          { type: "image", src: "/project/gobino/6.jpg", caption: "Opportunities scored on innovation, financial return, social interest, networking and sustainability — selecting nine projects to take forward." },
        ],
      },
      {
        id: "roadmap",
        eyebrow: "05 · Roadmap",
        label: "Roadmap",
        lead: "Nine projects, across short, medium and long term.",
        blocks: [
          { type: "image", src: "/project/gobino/9.jpg", caption: "Roadmap — new products for the line-up, jute and paper packaging, cocoa certification, a communication strategy and the promotion of the chocolate district." },
        ],
      },
      {
        id: "evaluation",
        eyebrow: "06 · Evaluation",
        label: "Evaluate the system",
        lead: "Outcomes and impacts at micro, meso and macro scale.",
        blocks: [
          { type: "image", src: "/project/gobino/10.jpg", caption: "Each project traced to its outcomes and impacts — from reduced environmental load and recycled waste through to increased territorial value and a stronger Made in Turin." },
          {
            type: "video",
            src: "https://www.youtube.com/embed/TqOcN8r7qaE",
            title: "Systemic Design for Guido Gobino",
            caption: "Project walkthrough.",
          },
          { type: "note", text: "Credit where it is due: this was a team project for the Open Systems module of the Master’s in Systemic Design, with eight authors credited on every board." },
        ],
      },
    ],
  },
}
