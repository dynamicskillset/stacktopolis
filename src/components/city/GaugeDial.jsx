import DeltaIndicator from '../ui/DeltaIndicator'

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * Math.PI / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx, cy, r, startAngle, sweepDeg) {
  if (sweepDeg <= 0) return ''
  const endAngle = startAngle + sweepDeg
  const startPt = polarToCartesian(cx, cy, r, startAngle)
  const endPt = polarToCartesian(cx, cy, r, endAngle)
  const largeArc = sweepDeg > 180 ? 1 : 0
  return `M ${startPt.x} ${startPt.y} A ${r} ${r} 0 ${largeArc} 1 ${endPt.x} ${endPt.y}`
}

const ARC_START = 210
const FULL_SWEEP = 240

export default function GaugeDial({ label, value, colour, onClick }) {
  const cx = 45
  const cy = 45
  const r = 34

  const clampedValue = Math.max(0, Math.min(100, Math.round(value)))
  const valueSweep = (clampedValue / 100) * FULL_SWEEP

  let arcOpacity = 0.6
  let glowFilter = ''
  if (clampedValue >= 75) {
    arcOpacity = 1
    glowFilter = `drop-shadow(0 0 3px ${colour})`
  } else if (clampedValue >= 50) {
    arcOpacity = 1
  }

  const fullTrackPath = describeArc(cx, cy, r, ARC_START, FULL_SWEEP)
  const valuePath = describeArc(cx, cy, r, ARC_START, valueSweep)
  const hasValue = clampedValue > 0
  const isAlert = clampedValue >= 75

  return (
    <div
      className={`flex flex-col items-center gap-1 ${onClick ? 'cursor-pointer hover:scale-105 transition-transform focus-visible:outline-2 focus-visible:outline-terminal-text focus-visible:outline-offset-2 rounded' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } } : undefined}
      aria-label={onClick ? `${label} risk: ${clampedValue}. Click for advice.` : undefined}
    >
      <div className="relative" style={{ width: 90, height: 90 }}>
        <svg
          width="90"
          height="90"
          viewBox="0 0 90 90"
          role="meter"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label} risk: ${clampedValue} out of 100`}
        >
          <circle cx={cx} cy={cy} r={r + 4} className="fill-terminal-surface stroke-terminal-border" strokeWidth="1.5" />
          <path d={fullTrackPath} fill="none" className="stroke-terminal-border" strokeWidth="5" strokeLinecap="round" />

          {hasValue && (
            <path
              d={valuePath}
              fill="none"
              stroke={colour}
              strokeWidth="5"
              strokeLinecap="round"
              opacity={arcOpacity}
              style={{ filter: glowFilter, transition: 'all 0.5s ease' }}
            />
          )}

          <text x={cx} y={cy - 2} textAnchor="middle" dominantBaseline="central"
            className="fill-terminal-text" fontFamily="'IBM Plex Mono', monospace" fontWeight="bold" fontSize="16">
            {clampedValue}
          </text>
          <text x={cx} y={cy + 14} textAnchor="middle" dominantBaseline="central"
            className="fill-terminal-muted" fontFamily="'IBM Plex Mono', monospace" fontSize="8">
            /100
          </text>
        </svg>

        <DeltaIndicator value={value} label={label} />

        {isAlert && (
          <span
            className="absolute top-1 right-1 block w-2 h-2 rounded-full bg-danger animate-pulse-glow"
            style={{ boxShadow: '0 0 6px var(--color-danger)' }}
            aria-hidden="true"
          />
        )}
      </div>

      <span className="font-mono text-xs uppercase tracking-widest text-terminal-muted" aria-hidden="true">
        {label}
      </span>
    </div>
  )
}
