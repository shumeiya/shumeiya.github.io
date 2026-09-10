import { NavLink } from "react-router-dom"
import { Moon, Sun } from "lucide-react"
import { project } from "../../data/project"
import { useDarkMode } from "../../hooks/useDarkMode"

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/project", label: "Projects" },
  { to: "/case-study", label: "Studies" },
  { to: "/my-world", label: "My world" },
]

export default function NavBar() {
  const [isDark, setIsDark] = useDarkMode()

  // The bar itself stays transparent: an element with backdrop-filter opens a
  // backdrop root, so a blur here would leave the glass pills inside with
  // nothing of the page left to sample.
  return (
    <header className="sticky top-0 z-50">
      <nav className="relative mx-auto flex max-w-9xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:flex-nowrap sm:px-8 lg:px-8">
        <span className="text-sm font-semibold tracking-tight text-ink sm:text-base">
          {project.name.toUpperCase()}
        </span>

        <button
          onClick={() => setIsDark((v) => !v)}
          aria-label="Toggle dark mode"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line/60 bg-box/50 text-ink shadow-sm backdrop-blur-xl backdrop-saturate-150 transition-colors hover:text-ac-blue"
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <ul className="order-3 flex w-full items-center gap-1 overflow-x-auto rounded-full border border-line/60 bg-box-2/55 p-1 shadow-sm backdrop-blur-xl backdrop-saturate-150 sm:order-0 sm:w-auto sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:overflow-visible">
          {links.map((link) => (
            <li key={link.to} className="shrink-0">
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `block whitespace-nowrap rounded-full px-3 py-1 text-xs font-regular transition-colors sm:px-4 sm:text-sm ${
                    isActive
                      ? "bg-box/85 text-cream shadow-sm"
                      : "text-ink/50 hover:text-ink"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
