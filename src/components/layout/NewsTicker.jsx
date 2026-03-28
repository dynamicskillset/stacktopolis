import { useMemo } from 'react'
import { AMBIENT_HEADLINES } from '../../data/headlines'

export default function NewsTicker({ headlines = [] }) {
  const content = useMemo(
    () => [...headlines, ...AMBIENT_HEADLINES].join(' \u00b7 '),
    [headlines]
  )

  return (
    <div className="w-full bg-terminal-bg border-b border-terminal-border relative z-10 flex items-center">
      {/* Fixed game title */}
      <div className="shrink-0 font-mono text-xs sm:text-sm font-bold text-amber-glow tracking-widest px-3 sm:px-4 py-1.5 border-r border-terminal-border">
        STACKTOPOLIS
      </div>
      {/* Scrolling ticker */}
      <div className="flex-1 overflow-hidden" aria-hidden="true">
        <div className="animate-ticker-scroll inline-flex whitespace-nowrap">
          <span className="text-xs font-mono text-amber-glow/70 uppercase tracking-wider px-4 py-1.5">
            {content}
          </span>
          <span className="text-xs font-mono text-amber-glow/70 uppercase tracking-wider px-4 py-1.5">
            {content}
          </span>
        </div>
      </div>
    </div>
  )
}
