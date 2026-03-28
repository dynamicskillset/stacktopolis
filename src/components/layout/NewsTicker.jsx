import { useMemo } from 'react'
import { AMBIENT_HEADLINES } from '../../data/headlines'

export default function NewsTicker({ headlines = [] }) {
  const content = useMemo(
    () => [...headlines, ...AMBIENT_HEADLINES].join(' \u00b7 '),
    [headlines]
  )

  return (
    <div className="w-full overflow-hidden bg-terminal-bg border-b border-terminal-border" aria-hidden="true">
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
