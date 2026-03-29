import { Pause } from 'lucide-react'

export default function PauseOverlay({ onResume }) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-terminal-bg/80 backdrop-blur-sm"
      onClick={onResume}
      onKeyDown={(e) => { if (e.key === 'Escape' || e.key === ' ') { e.preventDefault(); onResume() } }}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label="Game paused. Click or press space to resume."
    >
      <div className="text-center">
        <Pause className="w-16 h-16 text-amber-glow mx-auto mb-4 opacity-80" />
        <div className="font-mono text-2xl text-amber-glow tracking-widest uppercase mb-2">
          Paused
        </div>
        <div className="font-serif text-sm text-terminal-muted italic">
          Press space or click to resume
        </div>
      </div>
    </div>
  )
}
