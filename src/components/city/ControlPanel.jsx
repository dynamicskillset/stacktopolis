import { Coins, Heart } from 'lucide-react'
import GaugeDial from './GaugeDial'
import DigitalReadout from './DigitalReadout'

export default function ControlPanel({ jurisdiction, continuity, surveillance, budget, morale, quarter }) {
  const maxRisk = Math.max(jurisdiction, continuity, surveillance)

  return (
    <div
      role="status"
      aria-label="Game status panel"
      className="relative z-10 bg-terminal-surface border-t border-terminal-border"
      style={{ boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.4)' }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-3 gap-4">
        <div className="flex items-center justify-center gap-4 md:gap-6">
          <GaugeDial label="Jurisdiction" value={jurisdiction} colour="var(--color-risk-jurisdiction)" />
          <GaugeDial label="Continuity" value={continuity} colour="var(--color-risk-continuity)" />
          <GaugeDial label="Surveillance" value={surveillance} colour="var(--color-risk-surveillance)" />
        </div>

        <div className="hidden md:block self-stretch w-px bg-terminal-border my-1" aria-hidden="true" />
        <div className="block md:hidden h-px bg-terminal-border" aria-hidden="true" />

        <div className="flex items-center justify-center gap-4 md:gap-6">
          <DigitalReadout value={budget} label="Budget" colour="amber" icon={Coins} />
          <DigitalReadout value={morale} label="Morale" colour="green" icon={Heart} />

          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center px-3 py-2 rounded bg-terminal-bg border border-terminal-border"
              style={{ boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.5)' }}
            >
              <span
                className={`font-mono text-2xl font-bold tracking-wider transition-colors duration-500 ${maxRisk >= 75 ? 'text-danger' : 'text-amber-glow'}`}
                style={{ textShadow: `0 0 8px currentColor` }}
                aria-label={`Quarter ${quarter}`}
              >
                Q{String(quarter).padStart(2, '0')}
              </span>
              <span className="animate-cursor-blink ml-0.5 font-mono text-2xl font-bold text-amber-glow">_</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-terminal-muted" aria-hidden="true">
              Quarter
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
