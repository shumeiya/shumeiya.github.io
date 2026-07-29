import { NavLink } from "react-router-dom"
import { profile } from "../../data/profile"

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/project", label: "Projects" },
  { to: "/case-study", label: "Studies" },
  { to: "/my-world", label: "My world" },
]

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-page/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-9xl flex-col gap-2 px-4 py-3 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-0 sm:px-8 lg:px-8">
        <span className="text-sm font-semibold tracking-tight text-ink sm:text-base">
          {profile.name.toUpperCase()}
        </span>

        <ul className="flex items-center gap-1 overflow-x-auto rounded-full border border-page-line bg-white/70 p-1 shadow-sm sm:justify-self-center sm:overflow-visible">
          {links.map((link) => (
            <li key={link.to} className="shrink-0">
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `block whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
                    isActive
                      ? "bg-ink text-cream"
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
