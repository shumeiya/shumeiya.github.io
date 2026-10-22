// The deck's "#06 用户流程图" board, rebuilt in the page.
//
// The original is a wide left-to-right graph on a 1920 slide: one trunk that forks
// twice, with the two courseware kinds running as parallel lanes and rejoining at
// "save". Replayed at reading-column width it would be a 3000px-wide picture nobody
// can read, so the graph is re-laid rather than re-drawn — the trunk wraps, and the
// two lanes become two labelled rows. The branching, which is the actual content of
// the diagram, survives; only the direction of the ink changes.

function Chip({ children, strong }) {
  return (
    <span
      className={`inline-block rounded-lg border px-3.5 py-2 text-note leading-snug ${
        strong ? "border-transparent bg-box-2 font-medium text-ink" : "border-line text-fog"
      }`}
    >
      {children}
    </span>
  )
}

function Arrow() {
  return (
    <span aria-hidden="true" className="select-none text-note text-fog/70">
      →
    </span>
  )
}

// A point where the path splits: the alternatives stack, tied together by a rule down
// their left edge so the stack reads as "either of these" and not as "then this".
function Fork({ items }) {
  return (
    <span className="inline-flex flex-col gap-1.5 border-l-2 border-line pl-2.5">
      {items.map((item) => (
        <Chip key={item}>{item}</Chip>
      ))}
    </span>
  )
}

// `as` is load-bearing in one place only: a row nested inside a fork sits inside an
// inline element, and a <div> there is a block box inside an inline box.
function Row({ children, as: As = "div" }) {
  return <As className="flex flex-wrap items-center gap-x-2 gap-y-2">{children}</As>
}

export default function CodemaoFlow({ board }) {
  return (
    <figure className="mt-6 rounded-xl border border-line bg-box p-5 sm:p-6">
      <Row>
        {board.trunk.map((step, i) => (
          <span key={i} className="flex items-center gap-2">
            {step.fork ? <Fork items={step.fork} /> : <Chip strong={step.strong}>{step.label}</Chip>}
            {i < board.trunk.length - 1 && <Arrow />}
          </span>
        ))}
      </Row>

      {/* The two lanes. Indented under the trunk and keyed by a tag, the way the deck
          labels its two branches on the connector itself. */}
      <div className="mt-5 space-y-5 border-l-2 border-line pl-4 sm:pl-5">
        {board.branches.map((branch) => (
          <div key={branch.tag}>
            <p className="font-mono-tight text-note uppercase tracking-wide text-ink">{branch.tag}</p>
            <div className="mt-2.5">
              <Row>
                {branch.steps.map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    <Chip>{step}</Chip>
                    {(i < branch.steps.length - 1 || branch.fork) && <Arrow />}
                  </span>
                ))}
                {branch.fork && (
                  <span className="inline-flex flex-col gap-1.5 border-l-2 border-line pl-2.5">
                    {branch.fork.map((lane, i) => (
                      <Row key={i} as="span">
                        {lane.map((step, j) => (
                          <span key={step} className="flex items-center gap-2">
                            <Chip>{step}</Chip>
                            {j < lane.length - 1 && <Arrow />}
                          </span>
                        ))}
                      </Row>
                    ))}
                  </span>
                )}
              </Row>
            </div>
          </div>
        ))}
      </div>

      {/* Both lanes end in the same place, so the join sits under them both rather
          than at the end of either one. */}
      <div className="mt-5 flex items-center gap-2">
        <span aria-hidden="true" className="select-none text-note text-fog/70">
          ↓
        </span>
        <Chip strong>{board.join}</Chip>
      </div>
    </figure>
  )
}
