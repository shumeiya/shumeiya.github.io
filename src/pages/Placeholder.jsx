export default function Placeholder({ title }) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5">
      <p className="font-mono-tight text-ink/50">
        <span className="text-mint">// {title}</span> — coming soon
      </p>
    </main>
  )
}
