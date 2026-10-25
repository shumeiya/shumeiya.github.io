import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"

// The full-width sign-off link that closes a page: one line of display-size
// copy against a hairline, with an arrow pinned to the far edge. Shared by the
// About page ("Go to see my project") and the Projects reel ("See the other
// projects") so the two endings read as the same gesture.
//
// Deliberately a plain element with no entrance animation of its own: on
// /project it sits inside DrumStage, whose lip copies the page and only syncs
// a known set of live nodes — a framer-motion wrapper here would leave a stale
// `opacity: 0` pose in the curl. Pages that want the fade wrap it themselves.
export default function CtaLink({ to, children, className = "" }) {
  return (
    <div className={`border-t border-line ${className}`}>
      <Link to={to} className="group flex items-center justify-between gap-6 py-8">
        <p className="text-2xl font-medium text-cream sm:text-3xl lg:text-8xl">
          {/* The underline is positioned rather than in flow, so sweeping it in
              never changes this line's height or shifts the arrow beside it.
              It wipes out to the right and back in from the left — the same
              idiom the résumé links use — and the text leans after the arrow.
              Both rule and offset grow with the type, or a hairline under
              96px copy reads as a stray scratch. */}
          <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">
            {children}
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-0.5 w-full origin-right scale-x-0 bg-cream transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100 lg:-bottom-3 lg:h-1"
            />
          </span>
        </p>
        <ArrowUpRight
          strokeWidth={1.5}
          className="size-20 shrink-0 text-fog transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cream sm:size-32"
        />
      </Link>
    </div>
  )
}
