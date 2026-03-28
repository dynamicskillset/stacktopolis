import DeltaIndicator from './DeltaIndicator'

const colourClasses = {
  amber: 'text-amber-glow',
  green: 'text-green-glow',
}

export default function ResourceBadge({ label, value, icon: Icon, colour = 'amber' }) {
  const isLow = value < 20
  const textClass = isLow ? 'text-danger' : colourClasses[colour]

  return (
    <div
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-terminal-surface border border-terminal-border font-mono text-sm ${textClass} ${isLow ? 'animate-pulse-glow-fast' : ''}`}
    >
      <DeltaIndicator value={value} label={label} />
      {Icon && <Icon className="w-4 h-4" />}
      <span className="font-bold tabular-nums">{value}</span>
      <span className="text-terminal-muted text-xs uppercase tracking-wider">{label}</span>
    </div>
  )
}
