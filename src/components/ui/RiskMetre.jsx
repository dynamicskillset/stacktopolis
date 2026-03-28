import DeltaIndicator from './DeltaIndicator'

const gradientMap = {
  jurisdiction: 'linear-gradient(90deg, #7f1d1d, #ef4444, #fca5a5)',
  continuity: 'linear-gradient(90deg, #78350f, #f59e0b, #fde68a)',
  surveillance: 'linear-gradient(90deg, #1e3a5f, #3b82f6, #93c5fd)',
}

const glowMap = {
  jurisdiction: 'var(--color-risk-jurisdiction)',
  continuity: 'var(--color-risk-continuity)',
  surveillance: 'var(--color-risk-surveillance)',
}

export default function RiskMetre({ label, value, colour, icon: Icon }) {
  const isHigh = value >= 75
  const isElevated = value >= 50
  const isCritical = value >= 90

  return (
    <div className="space-y-1.5 relative">
      <DeltaIndicator value={value} label={label} />
      <div className="flex items-center justify-between text-sm font-mono">
        <div className={`flex items-center gap-2 transition-colors duration-500 ${isCritical ? 'text-danger' : isElevated ? 'text-amber-glow' : 'text-terminal-text'}`}>
          {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
          <span className={`uppercase tracking-wider ${isCritical ? 'animate-pulse-glow-fast' : ''}`}>{label}</span>
        </div>
        <span className={`tabular-nums transition-colors duration-500 ${isCritical ? 'text-danger font-bold' : 'text-terminal-muted'}`}>
          {value}/100
        </span>
      </div>
      <div
        className="h-2.5 rounded bg-terminal-surface overflow-hidden"
        role="progressbar"
        aria-label={`${label} risk`}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded ${isHigh ? 'animate-pulse-glow' : ''}`}
          style={{
            transform: `scaleX(${value / 100})`,
            transformOrigin: 'left',
            transition: 'transform 500ms ease',
            background: gradientMap[colour],
            boxShadow: isHigh
              ? `0 0 ${isCritical ? '14' : '8'}px ${glowMap[colour]}, inset 0 0 4px rgba(255,255,255,0.15)`
              : 'none',
          }}
        />
      </div>
    </div>
  )
}
