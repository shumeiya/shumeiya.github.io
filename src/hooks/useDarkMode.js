import { useEffect, useState } from "react"

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"))

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    // Same key index.html reads before first paint.
    localStorage.setItem("theme-v2", isDark ? "dark" : "light")
  }, [isDark])

  return [isDark, setIsDark]
}
