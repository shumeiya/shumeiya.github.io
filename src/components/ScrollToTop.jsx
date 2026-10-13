import { useLayoutEffect } from "react"
import { useLocation, useNavigationType } from "react-router-dom"

// A single-page app keeps one document, so following a link leaves the window
// scrolled exactly where the last page was — land on /project from the foot of
// /about and you arrive in the middle of it. This puts every navigation back at
// the top.
//
// Two things it deliberately leaves alone:
//
// POP — back and forward. The browser restores the position you left, and
// taking that away is the thing that makes an SPA feel broken: you go back and
// lose your place in a list you had scrolled halfway down.
//
// A hash. `/project/slow-food#process` is a request for a particular spot, so
// forcing the top would cancel the link the reader just clicked.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  // Before paint, not after: run this in an effect and the new page is painted
  // once at the old offset and then jumps, which reads as a flicker.
  //
  // `behavior: "instant"` is load-bearing. The stylesheet sets
  // `scroll-behavior: smooth` for in-page anchors, and that applies to
  // scrollTo as well — so the plain two-argument call animated, and you
  // watched the new page scroll up from wherever the old one had been left.
  // "instant" overrides the CSS; "auto" would defer back to it.
  useLayoutEffect(() => {
    if (navigationType === "POP" || hash) return
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname, hash, navigationType])

  return null
}
