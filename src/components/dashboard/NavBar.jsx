import { Link, NavLink } from "react-router-dom"
import { Moon, Sun } from "lucide-react"
import { project } from "../../data/project"
import { useDarkMode } from "../../hooks/useDarkMode"
import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"
import LanguageToggle from "./LanguageToggle"

const links = [
  { to: "/", label: ui.navDashboard },
  { to: "/about", label: ui.navAbout },
  { to: "/project", label: ui.navProjects },
  // { to: "/case-study", label: ui.navStudies },
  // { to: "/my-world", label: ui.navMyWorld },
]

export default function NavBar() {
  const [isDark, setIsDark] = useDarkMode()
  const t = useT()

  // The bar itself stays transparent: an element with backdrop-filter opens a
  // backdrop root, so a blur here would leave the glass pills inside with
  // nothing of the page left to sample.
  return (
    <header className="sticky top-0 z-50">
      <nav className="relative mx-auto flex items-center justify-between gap-2 px-4 py-3 sm:px-8 lg:px-8">
        {/* A phone has room for one row of either the wordmark or the links, not
            both, so below sm the wordmark steps aside: "Dashboard" in the pill
            already goes to the same place. */}
        <Link
          to="/"
          aria-label={t(ui.navHome)}
          className="hidden text-base font-semibold tracking-tight text-ink transition-colors hover:text-cream sm:block"
        >
          {project.name.toUpperCase()}
        </Link>

        {/* Theme and language travel together — two switches for how the page is
            read, kept as one cluster rather than scattered along the bar. */}
        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle />

          <button
            onClick={() => setIsDark((v) => !v)}
            aria-label={t(ui.toggleTheme)}
            className="glass flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:text-ac-blue"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        {/* One row at every width. On a phone the pill leads from the left edge
            and the switches sit at the right; from sm the wordmark takes the
            left and the pill is lifted out to the centre of the bar. It comes
            first in the row (`-order-1`) only below sm, where it is in flow. The
            type steps down once more under 380px so the three links still fit
            beside the switches; past that the pill scrolls sideways rather than
            pushing them off the screen. */}
        <ul className="glass -order-1 flex min-w-0 items-center gap-0.5 overflow-x-auto rounded-full p-1 min-[380px]:gap-1 sm:order-0 sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:overflow-visible">
          {links.map((link) => (
            <li key={link.to} className="shrink-0">
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `block whitespace-nowrap rounded-full px-1.5 py-1 text-xs font-regular transition-colors min-[380px]:px-2.5 min-[380px]:text-[13px] sm:px-4 sm:text-sm ${
                    isActive
                      ? "glass-well text-cream"
                      : "text-ink/50 hover:text-ink"
                  }`
                }
              >
                {t(link.label)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
