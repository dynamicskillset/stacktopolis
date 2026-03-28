import { AMBIENT_HEADLINES } from '../../data/headlines'

export default function NewsTicker({ headlines = [] }) {
  const allHeadlines = [...headlines, ...AMBIENT_HEADLINES]
  const content = allHeadlines.join(' \u00b7 ')

  return (
    <div className="w-full overflow-hidden bg-terminal-bg border-b border-terminal-border">
      <div className="animate-ticker-scroll inline-flex whitespace-nowrap">
        <span className="text-xs font-mono text-amber-glow/70 uppercase tracking-wider px-4 py-1.5">
          {content}
        </span>
        <span className="text-xs font-mono text-amber-glow/70 uppercase tracking-wider px-4 py-1.5">
          {content}
        </span>
      </div>
    </div>
  )
}
