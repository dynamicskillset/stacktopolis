import { Coins, Heart } from 'lucide-react'
import GaugeDial from './GaugeDial'
import DigitalReadout from './DigitalReadout'
import SpeedControl from '../ui/SpeedControl'

import { TUNING } from '../../state/initialState'

export default function ControlPanel({
  jurisdiction, continuity, surveillance, budget, morale, quarter, gameTime,
  speed, isPaused, onSetSpeed, onTogglePause, onClickMetric,
}) {
  const ticksIntoQuarter = gameTime % TUNING.ticksPerQuarter
  const quarterProgress = ticksIntoQuarter / TUNING.ticksPerQuarter // 0→1
  const maxRisk = Math.max(jurisdiction, continuity, surveillance)

  return (
    <div
      role="status"
      aria-label="Game status panel"
      className="relative z-10 bg-terminal-surface border-t border-terminal-border"
      style={{ boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.06)' }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-3 gap-4">
        <div className="flex items-center justify-center gap-4 md:gap-6">
          <GaugeDial label="Jurisdiction" value={jurisdiction} colour="var(--color-risk-jurisdiction)" onClick={() => onClickMetric('jurisdiction')} />
          <GaugeDial label="Continuity" value={continuity} colour="var(--color-risk-continuity)" onClick={() => onClickMetric('continuity')} />
          <GaugeDial label="Surveillance" value={surveillance} colour="var(--color-risk-surveillance)" onClick={() => onClickMetric('surveillance')} />
        </div>

        <div className="hidden md:block self-stretch w-px bg-terminal-border my-1" aria-hidden="true" />
        <div className="block md:hidden h-px bg-terminal-border" aria-hidden="true" />

        <div className="flex items-center justify-center gap-4 md:gap-6">
          <DigitalReadout value={budget} label="Budget" colour="amber" icon={Coins} onClick={() => onClickMetric('budget')} />
          <DigitalReadout value={morale} label="Morale" colour="green" icon={Heart} onClick={() => onClickMetric('morale')} />

          <div className="flex flex-col items-center gap-1">
            <div className="relative" style={{ width: 56, height: 56 }}>
              <svg width="56" height="56" viewBox="0 0 56 56" role="meter" aria-valuenow={Math.round((1 - quarterProgress) * 100)} aria-valuemin={0} aria-valuemax={100} aria-label={`Quarter ${quarter}, ${Math.round((1 - quarterProgress) * 100)}% remaining`}>
                {/* Track */}
                <circle cx="28" cy="28" r="24" fill="none" className="stroke-terminal-border" strokeWidth="3" />
                {/* Remaining arc — depletes clockwise */}
                <circle
                  cx="28" cy="28" r="24"
                  fill="none"
                  stroke={maxRisk >= 75 ? 'var(--color-danger)' : 'var(--color-amber-glow)'}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${(1 - quarterProgress) * 150.8} 150.8`}
                  transform="rotate(-90 28 28)"
                  style={{ transition: 'stroke-dasharray 0.3s ease' }}
                />
                {/* Quarter number */}
                <text x="28" y="32" textAnchor="middle" className="fill-terminal-text" fontFamily="'IBM Plex Mono', monospace" fontWeight="bold" fontSize="16">
                  {quarter}
                </text>
              </svg>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-terminal-muted" aria-hidden="true">
              Quarter
            </span>
          </div>

          <SpeedControl
            speed={speed}
            onSetSpeed={onSetSpeed}
            isPaused={isPaused}
            onTogglePause={onTogglePause}
          />
        </div>
      </div>
    </div>
  )
}
