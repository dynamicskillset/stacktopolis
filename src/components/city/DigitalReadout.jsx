const COLOUR_CLASSES = {
  amber: 'text-amber-glow',
  green: 'text-green-glow',
  red: 'text-danger',
}

function padValue(value, digits = 3) {
  return String(Math.max(0, Math.floor(value))).padStart(digits, '0')
}

export default function DigitalReadout({ value, label, colour, icon: Icon, onClick }) {
  const isLow = value < 20
  const activeColour = isLow ? 'red' : colour
  const textClass = COLOUR_CLASSES[activeColour] || COLOUR_CLASSES.amber

  return (
    <div
      className={`flex flex-col items-center gap-1 ${onClick ? 'cursor-pointer hover:scale-105 transition-transform focus-visible:outline-2 focus-visible:outline-terminal-text focus-visible:outline-offset-2 rounded' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } } : undefined}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 rounded bg-terminal-surface border border-terminal-border"
      >
        {Icon && (
          <Icon
            size={16}
            className={`${textClass}`}
            aria-hidden="true"
          />
        )}
        <span
          className={`font-mono text-2xl font-bold tracking-wider ${textClass} ${isLow ? 'animate-pulse-glow' : ''}`}
          style={{ transition: 'color 0.5s ease' }}
          aria-label={`${label}: ${value}`}
        >
          {padValue(value)}
        </span>
      </div>

      <span
        className="font-mono text-xs uppercase tracking-widest text-terminal-muted"
        aria-hidden="true"
      >
        {label}
      </span>
    </div>
  )
}
