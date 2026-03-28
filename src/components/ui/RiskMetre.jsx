const colourMap = {
  jurisdiction: 'bg-risk-jurisdiction',
  continuity: 'bg-risk-continuity',
  surveillance: 'bg-risk-surveillance',
}

const glowMap = {
  jurisdiction: 'var(--color-risk-jurisdiction)',
  continuity: 'var(--color-risk-continuity)',
  surveillance: 'var(--color-risk-surveillance)',
}

export default function RiskMetre({ label, value, colour, icon: Icon }) {
  const isHigh = value >= 75
  const isElevated = value >= 50

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm font-mono">
        <div className={`flex items-center gap-2 ${isElevated ? 'text-amber-glow' : 'text-terminal-text'}`}>
          {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
          <span className="uppercase tracking-wider">{label}</span>
        </div>
        <span className="text-terminal-muted tabular-nums">{value}/100</span>
      </div>
      <div
        className="h-2 rounded bg-terminal-surface overflow-hidden"
        role="progressbar"
        aria-label={`${label} risk`}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded ${colourMap[colour]} ${isHigh ? 'animate-pulse-glow' : ''}`}
          style={{
            transform: `scaleX(${value / 100})`,
            transformOrigin: 'left',
            transition: 'transform 500ms ease',
            boxShadow: isHigh ? `0 0 8px ${glowMap[colour]}` : 'none',
          }}
        />
      </div>
    </div>
  )
}
