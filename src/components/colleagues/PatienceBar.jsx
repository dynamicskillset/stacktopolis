export default function PatienceBar({ remaining, total, colour }) {
  const pct = Math.max(0, Math.min(100, (remaining / total) * 100))
  const isUrgent = pct < 25
  const isWarning = pct < 50

  return (
    <div
      className="w-full h-1.5 rounded-full bg-terminal-border overflow-hidden"
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Time remaining"
    >
      <div
        className={`h-full rounded-full transition-all duration-300 ${isUrgent ? 'animate-pulse-glow-fast' : ''}`}
        style={{
          width: `${pct}%`,
          backgroundColor: isUrgent ? '#ff2244' : isWarning ? '#f59e0b' : colour || '#00ff88',
        }}
      />
    </div>
  )
}
