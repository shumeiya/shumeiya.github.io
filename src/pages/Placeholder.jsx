import { useT } from "../i18n/lang"
import { ui } from "../i18n/ui"

export default function Placeholder({ title }) {
  const t = useT()

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5">
      <p className="font-mono-tight text-ink/50">
        <span className="text-ac-green">// {title}</span> — {t(ui.comingSoon)}
      </p>
    </main>
  )
}
