import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

// In light mode the Dashboard keeps the warm cream canvas; every other page is
// painted plain white. The switch lives on <html> as a data attribute so the
// `--color-page` token (body background, `bg-page`, the My World overlay) flips
// in one place — see the `:root[data-page-white]` rule in index.css. Dark mode
// is untouched: the override only applies when `.dark` is absent.
export default function PageTone() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const root = document.documentElement
    if (pathname === "/") root.removeAttribute("data-page-white")
    else root.setAttribute("data-page-white", "")
    return () => root.removeAttribute("data-page-white")
  }, [pathname])

  return null
}
