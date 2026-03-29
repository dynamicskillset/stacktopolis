import { useState, useMemo } from 'react'
import { Shield, Trophy } from 'lucide-react'
import { DIFFICULTIES } from '../../state/initialState'
import Button from '../ui/Button'
import Attribution from '../shared/Attribution'
import Skyline from '../city/Skyline'

const TAGLINES = [
  'A satirical survival game about digital sovereignty',
  'Where every free tool comes with a hidden invoice',
  'The GDPR compliance simulator nobody asked for',
  'Because "just use Google" is not a strategy',
  'Now with 40% more existential dread',
  'Your data. Their servers. Our problem.',
  'A game about reading terms of service (just kidding, nobody does that)',
  'Featuring the CLOUD Act as a gameplay mechanic',
  'Where self-hosting is a lifestyle choice',
  'The only game where a volunteer sysadmin is a power-up',
  'Inspired by true events. All of them.',
  'No actual charities were harmed in the making of this game',
  'Privacy Shield 5.0 not included',
  'Achievement unlocked: You opened a game about compliance',
]

const INTROS = [
  "You\u2019ve just been hired as CTO of a small European charity. Your predecessor left three months ago. This is what they left behind. How many quarters can you survive?",
  "Congratulations on your new role as CTO. The previous one left under mysterious circumstances. Something about a subpoena. Anyway, here\u2019s your tech stack.",
  "Welcome aboard. The good news: you\u2019re the new CTO. The bad news: you\u2019re the new CTO. The worse news: look at this tech stack.",
  "Your predecessor\u2019s final email read: 'I\u2019m sorry. For everything.' You are about to find out what they meant.",
  "The board hired you because you once fixed a printer. You are now responsible for an entire digital infrastructure. Good luck.",
  "Day one. The wifi password is the founder\u2019s cat\u2019s name. The root password is taped to the server. The server is under a desk. Welcome.",
]

function HighScoreTable({ scores }) {
  if (!scores || scores.length === 0) return null

  return (
    <div className="w-full max-w-sm">
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

/* Decorative mini city — isometric buildings, one on fire */
function IsometricPreview() {
  return (
    <svg viewBox="0 0 280 100" width="280" height="100" className="mx-auto mb-6" aria-hidden="true">
      {/* Ground shadows */}
      <ellipse cx="60" cy="85" rx="22" ry="6" fill="rgba(0,0,0,0.3)" />
      <ellipse cx="140" cy="85" rx="22" ry="6" fill="rgba(0,0,0,0.3)" />
      <ellipse cx="220" cy="85" rx="22" ry="6" fill="rgba(0,0,0,0.3)" />

      {/* Building 1 — EU brick, safe */}
      <polygon points="45,55 60,47 75,55 75,82 60,82 45,82" fill="#8b5e3c" />
      <polygon points="60,47 75,55 75,82 60,82" fill="#c17f4a" />
      <polygon points="45,55 60,47 75,55 60,63" fill="#e0a870" />
      <rect x="50" y="60" width="4" height="4" fill="#ffdd66" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.8;0.3;0.6;0.5" dur="5s" repeatCount="indefinite" />
      </rect>
      <rect x="55" y="68" width="4" height="4" fill="#ffdd66" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.7;0.3;0.5;0.4" dur="6s" begin="1s" repeatCount="indefinite" />
      </rect>

      {/* Building 2 — US glass, ON FIRE */}
      <polygon points="125,40 140,32 155,40 155,82 140,82 125,82" fill="#2c5f8a" />
      <polygon points="140,32 155,40 155,82 140,82" fill="#4a90d9" />
      <polygon points="125,40 140,32 155,40 140,48" fill="#8ab4e8" />
      {/* Fire */}
      <path d="M140,30 Q134,22 137,14 Q139,10 140,6 Q141,10 143,14 Q146,22 140,30Z" fill="#ff6b00" opacity="0.8">
        <animate attributeName="d" values="M140,30 Q134,22 137,14 Q139,10 140,6 Q141,10 143,14 Q146,22 140,30Z;M140,30 Q135,24 136,16 Q138,11 140,5 Q142,11 144,16 Q145,24 140,30Z;M140,30 Q134,22 137,14 Q139,10 140,6 Q141,10 143,14 Q146,22 140,30Z" dur="0.4s" repeatCount="indefinite" />
      </path>
      <path d="M140,30 Q136,24 138,18 Q139,14 140,10 Q141,14 142,18 Q144,24 140,30Z" fill="#ffcc00" opacity="0.9">
        <animate attributeName="d" values="M140,30 Q136,24 138,18 Q139,14 140,10 Q141,14 142,18 Q144,24 140,30Z;M140,30 Q137,25 139,19 Q140,15 140,11 Q140,15 141,19 Q143,25 140,30Z;M140,30 Q136,24 138,18 Q139,14 140,10 Q141,14 142,18 Q144,24 140,30Z" dur="0.35s" repeatCount="indefinite" />
      </path>
      {/* Smoke */}
      <circle cx="138" cy="10" r="3" fill="#94a7bb" opacity="0.3">
        <animate attributeName="cy" values="10;0;-8" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.15;0" dur="2.5s" repeatCount="indefinite" />
      </circle>

      {/* Building 3 — Self-hosted green, calm */}
      <polygon points="205,50 220,42 235,50 235,82 220,82 205,82" fill="#3d5a3d" />
      <polygon points="220,42 235,50 235,82 220,82" fill="#5a7a5a" />
      <polygon points="205,50 220,42 235,50 220,58" fill="#7a9a7a" />
      <rect x="210" y="58" width="4" height="4" fill="#ffdd66" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.6;0.2;0.4;0.3" dur="7s" begin="2s" repeatCount="indefinite" />
      </rect>
      <rect x="225" y="62" width="4" height="4" fill="#ffdd66" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.2;0.5;0.3;0.4" dur="5.5s" repeatCount="indefinite" />
      </rect>
    </svg>
  )
}

const DIFFICULTY_KEYS = ['easy', 'normal', 'hard']

export default function TitleScreen({ onStartGame, highScores }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('normal')
  const tagline = useMemo(() => TAGLINES[Math.floor(Math.random() * TAGLINES.length)], [])
  const intro = useMemo(() => INTROS[Math.floor(Math.random() * INTROS.length)], [])

  const hasScores = highScores && highScores.length > 0

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-8 animate-fade-in crt-scanlines"
      style={{ backgroundColor: '#0a0e14' }}
    >
      <Skyline dangerLevel={0} />

      <div className="flex-1 flex items-center justify-center relative z-10 w-full max-w-5xl">
        <div className={`flex ${hasScores ? 'gap-12 items-start' : 'flex-col items-center'}`}>
          {/* Left: Game info + New Game */}
          <div className="flex flex-col items-center text-center">
            <Shield className="w-16 h-16 text-amber-glow mb-6" />

            <h1 className="font-mono text-5xl font-bold text-amber-glow tracking-widest mb-3">
              STACKTOPOLIS
            </h1>

            <p className="font-serif text-lg text-terminal-muted italic mb-6">
              {tagline}
            </p>

            <div className="flex gap-6 justify-center text-sm font-mono uppercase tracking-wider mb-6">
              <span className="text-risk-jurisdiction">Jurisdiction</span>
              <span className="text-risk-continuity">Continuity</span>
              <span className="text-risk-surveillance">Surveillance</span>
            </div>

            <IsometricPreview />

            <p className="font-serif text-terminal-text max-w-md text-center mb-8 leading-relaxed">
              {intro}
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

            <p className="font-serif text-sm text-terminal-muted italic mb-6">
              {DIFFICULTIES[selectedDifficulty].description}
            </p>

            <Button
              onClick={() => onStartGame(selectedDifficulty)}
              className="px-8 py-3 text-base"
            >
              New Game
            </Button>
          </div>

          {/* Right: High Scores (only if scores exist) */}
          {hasScores && <HighScoreTable scores={highScores} />}
        </div>
      </div>

      <div className="relative z-10">
        <Attribution />
      </div>
    </div>
  )
}
