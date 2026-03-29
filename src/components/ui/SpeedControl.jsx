const SPEEDS = [1, 2, 3]

export default function SpeedControl({ speed, onSetSpeed, isPaused, onTogglePause }) {
  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Game speed">
      <button
        onClick={onTogglePause}
        className={`min-w-[36px] min-h-[36px] flex items-center justify-center rounded font-mono text-xs transition-colors ${
          isPaused
            ? 'bg-amber-glow text-terminal-bg'
            : 'bg-terminal-surface text-terminal-muted border border-terminal-border hover:text-terminal-text'
        }`}
        aria-label={isPaused ? 'Resume game' : 'Pause game'}
        aria-pressed={isPaused}
      >
        {isPaused ? '▶' : '❚❚'}
      </button>
      {SPEEDS.map((s) => (
        <button
          key={s}
          onClick={() => onSetSpeed(s)}
          className={`min-w-[36px] min-h-[36px] flex items-center justify-center rounded font-mono text-xs transition-colors ${
            s === speed
              ? 'bg-amber-glow/20 text-amber-glow border border-amber-glow/40'
              : 'bg-terminal-surface text-terminal-muted border border-terminal-border hover:text-terminal-text'
          }`}
          aria-label={`Speed ${s}x`}
          aria-pressed={s === speed}
        >
          {s}×
        </button>
      ))}
    </div>
  )
}
