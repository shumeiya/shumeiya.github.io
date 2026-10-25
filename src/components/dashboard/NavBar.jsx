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
  { to: "/my-world", label: ui.navMyWorld },
]

export default function NavBar() {
  const [isDark, setIsDark] = useDarkMode()
  const t = useT()

  // The bar itself stays transparent: an element with backdrop-filter opens a
  // backdrop root, so a blur here would leave the glass pills inside with
  // nothing of the page left to sample.
  return (
    <header className="sticky top-0 z-50">
      <nav className="relative mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-3 sm:flex-nowrap sm:px-8 lg:px-8">
        <Link
          to="/"
          aria-label={t(ui.navHome)}
          className="text-sm font-semibold tracking-tight text-ink transition-colors hover:text-cream sm:text-base"
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

        <ul className="glass order-3 flex w-full items-center gap-1 overflow-x-auto rounded-full p-1 sm:order-0 sm:w-auto sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:overflow-visible">
          {links.map((link) => (
            <li key={link.to} className="shrink-0">
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `block whitespace-nowrap rounded-full px-3 py-1 text-xs font-regular transition-colors sm:px-4 sm:text-sm ${
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
