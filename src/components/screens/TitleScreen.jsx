import { useState } from 'react'
import { Shield, Trophy } from 'lucide-react'
import { DIFFICULTIES } from '../../state/initialState'
import Button from '../ui/Button'
import Attribution from '../shared/Attribution'
import Skyline from '../city/Skyline'

function HighScoreTable({ scores }) {
  if (!scores || scores.length === 0) return null

  return (
    <div className="w-full max-w-sm mt-8">
      <div className="flex items-center gap-2 mb-3 justify-center">
        <Trophy className="w-4 h-4 text-amber-glow" />
        <h2 className="font-mono text-xs uppercase tracking-widest text-amber-glow">
          High Scores
        </h2>
      </div>
      <div className="bg-terminal-surface/90 border border-terminal-border rounded overflow-hidden backdrop-blur-sm">
        {scores.slice(0, 5).map((score, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-4 py-2 border-b border-terminal-border last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-terminal-muted w-4">{i + 1}.</span>
              <span className="font-mono text-sm font-bold text-amber-glow w-10 tracking-widest">
                {score.initials || '---'}
              </span>
              <div>
                <span className="font-mono text-sm text-terminal-text">{score.title}</span>
                <span className="font-mono text-xs text-terminal-muted ml-2">
                  Q{score.quarters}
                </span>
              </div>
            </div>
            <span className="font-mono text-sm font-bold text-amber-glow">{score.totalScore}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Decorative isometric diamond plots — a small preview of the city grid */
function IsometricPreview() {
  const diamonds = [
    { cx: 60, cy: 40 },
    { cx: 120, cy: 40 },
    { cx: 90, cy: 58 },
    { cx: 150, cy: 58 },
  ]
  const halfW = 28
  const halfH = 16

  return (
    <svg
      viewBox="0 0 210 100"
      width="210"
      height="100"
      className="mx-auto mb-6 opacity-30"
      aria-hidden="true"
    >
      {diamonds.map(({ cx, cy }, i) => (
        <polygon
          key={i}
          points={`${cx},${cy - halfH} ${cx + halfW},${cy} ${cx},${cy + halfH} ${cx - halfW},${cy}`}
          fill="none"
          stroke="var(--color-amber-glow, #ffb000)"
          strokeWidth="1"
          opacity={0.5 + i * 0.1}
        />
      ))}
    </svg>
  )
}

const DIFFICULTY_KEYS = ['easy', 'normal', 'hard']

export default function TitleScreen({ onStartGame, highScores }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('normal')

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-8 animate-fade-in crt-scanlines"
      style={{ backgroundColor: '#0a0e14' }}
    >
      <Skyline dangerLevel={0} />

      <div className="flex flex-col items-center text-center flex-1 justify-center relative z-10">
        <Shield className="w-20 h-20 text-amber-glow mb-8" />

        <h1 className="font-mono text-5xl font-bold text-amber-glow tracking-widest mb-4">
          STACKTOPOLIS
        </h1>

        <p className="font-serif text-lg text-terminal-muted italic mb-8">
          A satirical survival game about digital sovereignty
        </p>

        <div className="flex gap-6 justify-center text-sm font-mono uppercase tracking-wider mb-8">
          <span className="text-risk-jurisdiction">Jurisdiction</span>
          <span className="text-risk-continuity">Continuity</span>
          <span className="text-risk-surveillance">Surveillance</span>
        </div>

        <IsometricPreview />

        <p className="font-serif text-terminal-text max-w-md text-center mb-10 leading-relaxed">
          You&rsquo;ve just been hired as CTO of a small European charity.
          Your predecessor left three months ago. This is what they left behind.
          How many quarters can you survive?
        </p>

        <div className="flex gap-2 mb-3">
          {DIFFICULTY_KEYS.map((key) => {
            const diff = DIFFICULTIES[key]
            const isSelected = key === selectedDifficulty
            return (
              <button
                key={key}
                onClick={() => setSelectedDifficulty(key)}
                className={`px-4 py-2 min-h-[44px] font-mono text-sm uppercase tracking-wider rounded transition-colors ${
                  isSelected
                    ? 'bg-amber-glow text-terminal-bg'
                    : 'bg-terminal-surface text-terminal-muted border border-terminal-border hover:text-terminal-text'
                }`}
              >
                {diff.label}
              </button>
            )
          })}
        </div>

        <p className="font-serif text-sm text-terminal-muted italic mb-8">
          {DIFFICULTIES[selectedDifficulty].description}
        </p>

        <Button
          onClick={() => onStartGame(selectedDifficulty)}
          className="px-8 py-3 text-base"
        >
          New Game
        </Button>

        <HighScoreTable scores={highScores} />
      </div>

      <div className="relative z-10">
        <Attribution />
      </div>
    </div>
  )
}
