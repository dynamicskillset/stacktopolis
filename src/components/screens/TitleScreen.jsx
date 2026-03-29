import { useState, useMemo } from 'react'
import { Shield, Trophy } from 'lucide-react'
import { DIFFICULTIES } from '../../state/initialState'
import Button from '../ui/Button'
import Attribution from '../shared/Attribution'
import AboutModal from '../ui/AboutModal'
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
  "You\u2019ve just been hired as CTO of a small European charity. Your predecessor left three months ago. This is what they left behind.",
  "Congratulations on your new role as CTO. The previous one left under mysterious circumstances. Something about a subpoena.",
  "Welcome aboard. The good news: you\u2019re the new CTO. The bad news: you\u2019re the new CTO. The worse news: look at this tech stack.",
  "Your predecessor\u2019s final email read: \u2018I\u2019m sorry. For everything.\u2019 You are about to find out what they meant.",
  "The board hired you because you once fixed a printer. You are now responsible for an entire digital infrastructure.",
  "Day one. The wifi password is the founder\u2019s cat\u2019s name. The root password is taped to the server. The server is under a desk.",
]

function HighScoreTable({ scores }) {
  if (!scores || scores.length === 0) return null

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3 justify-center">
        <Trophy className="w-4 h-4 text-amber-glow" />
        <h2 className="font-mono text-xs uppercase tracking-widest text-amber-glow">
          High Scores
        </h2>
      </div>
      <div className="bg-terminal-bg/80 border border-terminal-border rounded overflow-hidden">
        {scores.slice(0, 5).map((score, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-4 py-2 border-b border-terminal-border last:border-b-0 ${i === 0 ? 'bg-amber-glow/5' : ''}`}
          >
            <div className="flex items-center gap-3">
              <span className={`font-mono text-xs w-4 ${i === 0 ? 'text-amber-glow' : 'text-terminal-muted'}`}>{i + 1}.</span>
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
            <span className={`font-mono text-sm font-bold ${i === 0 ? 'text-amber-glow' : 'text-terminal-text'}`}>{score.totalScore}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Decorative mini city — 5 isometric buildings with drama */
function CityPreview() {
  return (
    <svg viewBox="0 0 420 110" width="420" height="110" className="mx-auto" aria-hidden="true">
      {/* Ground line */}
      <line x1="20" y1="95" x2="400" y2="95" stroke="#1e2a38" strokeWidth="1" opacity="0.5" />

      {/* Building 1 — Small EU brick, safe, gentle glow */}
      <ellipse cx="60" cy="92" rx="20" ry="5" fill="rgba(0,0,0,0.3)" />
      <polygon points="45,60 60,52 75,60 75,90 60,90 45,90" fill="#8b5e3c" />
      <polygon points="60,52 75,60 75,90 60,90" fill="#c17f4a" />
      <polygon points="45,60 60,52 75,60 60,68" fill="#e0a870" />
      <rect x="50" y="66" width="4" height="5" fill="#ffdd66" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.8;0.3;0.6;0.5" dur="5s" repeatCount="indefinite" />
      </rect>
      <rect x="65" y="70" width="4" height="5" fill="#ffdd66" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.7;0.3;0.5;0.4" dur="6s" begin="1s" repeatCount="indefinite" />
      </rect>

      {/* Building 2 — Tall US glass tower, ON FIRE */}
      <ellipse cx="150" cy="92" rx="22" ry="5" fill="rgba(0,0,0,0.3)" />
      <polygon points="132,35 150,25 168,35 168,90 150,90 132,90" fill="#2c5f8a" />
      <polygon points="150,25 168,35 168,90 150,90" fill="#4a90d9" />
      <polygon points="132,35 150,25 168,35 150,45" fill="#8ab4e8" />
      <rect x="138" y="45" width="5" height="6" fill="#ffdd66" opacity="0.3" />
      <rect x="155" y="50" width="5" height="6" fill="#ffdd66" opacity="0.4" />
      <rect x="138" y="60" width="5" height="6" fill="#ffdd66" opacity="0.5" />
      <rect x="155" y="65" width="5" height="6" fill="#ffdd66" opacity="0.3" />
      {/* Fire — visible 0-12s, fades out 12-14s, hidden 14-20s, loop 20s */}
      <g>
        <animate attributeName="opacity" values="0.8;0.8;0.8;0;0;0.8" keyTimes="0;0.5;0.6;0.7;0.85;1" dur="20s" repeatCount="indefinite" />
        <path d="M150,23 Q143,14 146,6 Q148,2 150,-2 Q152,2 154,6 Q157,14 150,23Z" fill="#ff6b00">
          <animate attributeName="d" values="M150,23 Q143,14 146,6 Q148,2 150,-2 Q152,2 154,6 Q157,14 150,23Z;M150,23 Q144,16 145,8 Q147,3 150,-1 Q153,3 155,8 Q156,16 150,23Z;M150,23 Q143,14 146,6 Q148,2 150,-2 Q152,2 154,6 Q157,14 150,23Z" dur="0.4s" repeatCount="indefinite" />
        </path>
        <path d="M150,23 Q145,16 147,10 Q149,6 150,2 Q151,6 153,10 Q155,16 150,23Z" fill="#ffcc00" opacity="0.9">
          <animate attributeName="d" values="M150,23 Q145,16 147,10 Q149,6 150,2 Q151,6 153,10 Q155,16 150,23Z;M150,23 Q146,17 148,11 Q149,7 150,3 Q151,7 152,11 Q154,17 150,23Z;M150,23 Q145,16 147,10 Q149,6 150,2 Q151,6 153,10 Q155,16 150,23Z" dur="0.35s" repeatCount="indefinite" />
        </path>
        <circle cx="148" cy="2" r="3" fill="#94a7bb" opacity="0.3">
          <animate attributeName="cy" values="2;-8;-16" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.15;0" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Building 3 — Wide self-hosted, calm, biggest */}
      <ellipse cx="250" cy="92" rx="28" ry="6" fill="rgba(0,0,0,0.3)" />
      <polygon points="222,45 250,33 278,45 278,90 250,90 222,90" fill="#3d5a3d" />
      <polygon points="250,33 278,45 278,90 250,90" fill="#5a7a5a" />
      <polygon points="222,45 250,33 278,45 250,57" fill="#7a9a7a" />
      <rect x="230" y="55" width="5" height="5" fill="#ffdd66" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.6;0.2;0.4;0.3" dur="7s" begin="2s" repeatCount="indefinite" />
      </rect>
      <rect x="240" y="65" width="5" height="5" fill="#ffdd66" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.2;0.5;0.3;0.4" dur="5.5s" repeatCount="indefinite" />
      </rect>
      <rect x="260" y="58" width="5" height="5" fill="#ffdd66" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.3;0.6;0.4;0.5" dur="6s" begin="1s" repeatCount="indefinite" />
      </rect>
      <rect x="265" y="72" width="5" height="5" fill="#ffdd66" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.5;0.2;0.6;0.3" dur="8s" begin="3s" repeatCount="indefinite" />
      </rect>

      {/* Building 4 — EU with camera (surveillance) */}
      <ellipse cx="340" cy="92" rx="18" ry="5" fill="rgba(0,0,0,0.3)" />
      <polygon points="325,55 340,47 355,55 355,90 340,90 325,90" fill="#8b5e3c" />
      <polygon points="340,47 355,55 355,90 340,90" fill="#c17f4a" />
      <polygon points="325,55 340,47 355,55 340,63" fill="#e0a870" />
      <rect x="330" y="62" width="4" height="5" fill="#ffdd66" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.7;0.3;0.5;0.4" dur="5s" begin="0.5s" repeatCount="indefinite" />
      </rect>
      {/* Surveillance camera */}
      <rect x="356" y="52" width="6" height="4" rx="1" fill="#555" />
      <circle cx="362" cy="54" r="1.5" fill="#333" />
      <circle cx="358" cy="53" r="0.8" fill="#ef4444">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Tiny police car between buildings */}
      <g>
        <polygon points="96,88 104,84 112,88 112,92 96,92" fill="#1a2848" />
        <circle cx="100" cy="85" r="1" fill="#3b82f6">
          <animate attributeName="opacity" values="1;0;1" dur="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="108" cy="85" r="1" fill="#ef4444">
          <animate attributeName="opacity" values="0;1;0" dur="0.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Tiny person running from right to left */}
      <g opacity="0.4">
        <circle cx="10" cy="84" r="1.5" fill="#1A2332" />
        <line x1="10" y1="86" x2="10" y2="90" stroke="#1A2332" strokeWidth="0.8" />
        <line x1="10" y1="90" x2="8" y2="93" stroke="#1A2332" strokeWidth="0.8">
          <animate attributeName="x2" values="8;12;8" dur="0.3s" repeatCount="indefinite" />
        </line>
        <line x1="10" y1="90" x2="12" y2="93" stroke="#1A2332" strokeWidth="0.8">
          <animate attributeName="x2" values="12;8;12" dur="0.3s" repeatCount="indefinite" />
        </line>
        <animateTransform attributeName="transform" type="translate" values="440,0;-20,0" dur="14s" repeatCount="indefinite" />
      </g>

      {/* Fire truck — sequenced: drive in (0-4s), spray (4-12s), drive off (12-16s), reset (16-20s) */}
      <g>
        {/* Truck movement: offscreen → park → park → drive off → offscreen. 20s loop */}
        <animateTransform attributeName="transform" type="translate"
          values="-40,0;100,0;100,0;100,0;460,0;-40,0"
          keyTimes="0;0.2;0.3;0.6;0.8;1"
          dur="20s" repeatCount="indefinite" />

        <polygon points="4,86 14,82 24,86 24,92 4,92" fill="#C62828" />
        <polygon points="4,86 4,84 14,80 14,82" fill="#991f1f" />
        <polygon points="14,80 24,84 24,86 14,82" fill="#C62828" />
        <rect x="8" y="81" width="10" height="1" rx="0.2" fill="#8B7A2F" />
        <circle cx="8" cy="81" r="1" fill="#B85400">
          <animate attributeName="opacity" values="1;0.2;1" dur="0.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="8" cy="92" r="1.5" fill="#2d3748" />
        <circle cx="20" cy="92" r="1.5" fill="#2d3748" />

        {/* Water spray — only visible during spray phase (4-12s = 20%-60%) */}
        <g>
          <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.2;0.25;0.6;0.65;1" dur="20s" repeatCount="indefinite" />
          <path d="M14,80 Q25,68 38,72" fill="none" stroke="#2B6AB0" strokeWidth="0.8" opacity="0.5">
            <animate attributeName="d" values="M14,80 Q25,68 38,72;M14,80 Q27,66 40,70;M14,80 Q25,68 38,72" dur="1.2s" repeatCount="indefinite" />
          </path>
          <circle cx="36" cy="73" r="0.6" fill="#2B6AB0" opacity="0.3">
            <animate attributeName="cy" values="73;78;84" dur="0.7s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.15;0" dur="0.7s" repeatCount="indefinite" />
          </circle>
          <circle cx="39" cy="71" r="0.5" fill="#2B6AB0" opacity="0.2">
            <animate attributeName="cy" values="71;77;83" dur="0.8s" begin="0.3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.1;0" dur="0.8s" begin="0.3s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>
    </svg>
  )
}

const DIFFICULTY_KEYS = ['easy', 'normal', 'hard']

export default function TitleScreen({ onStartGame, highScores }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('normal')
  const tagline = useMemo(() => TAGLINES[Math.floor(Math.random() * TAGLINES.length)], [])
  const intro = useMemo(() => INTROS[Math.floor(Math.random() * INTROS.length)], [])
  const [showAbout, setShowAbout] = useState(false)

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 animate-fade-in crt-scanlines bg-terminal-bg">
      <Skyline dangerLevel={0} />

      <div className="flex-1 flex items-center justify-center relative z-10 w-full">
        <div className="w-full max-w-2xl flex flex-col items-center text-center">

          {/* Header: shield + title + tagline */}
          <div className="mb-6">
            <Shield className="w-12 h-12 text-amber-glow mx-auto mb-4" />
            <h1 className="font-mono text-5xl font-bold text-amber-glow tracking-widest mb-1">
              STACKTOPOLIS
            </h1>
            <span className="font-mono text-xs text-terminal-muted tracking-wider">v3.1.0</span>
          </div>

          <p className="font-serif text-lg text-terminal-muted italic mb-4">
            {tagline}
          </p>

          <div className="flex gap-6 justify-center text-xs font-mono uppercase tracking-wider mb-5">
            <span className="text-risk-jurisdiction">Jurisdiction</span>
            <span className="text-risk-continuity">Continuity</span>
            <span className="text-risk-surveillance">Surveillance</span>
          </div>

          {/* City preview — wide, dramatic */}
          <div className="w-full mb-5">
            <CityPreview />
          </div>

          {/* Intro text */}
          <p className="font-serif text-terminal-text max-w-lg text-center mb-6 leading-relaxed">
            {intro}
          </p>

          {/* Difficulty selector — small inline toggle */}
          <div className="flex items-center gap-1 mb-2 bg-terminal-surface/60 rounded-full p-1 border border-terminal-border">
            {DIFFICULTY_KEYS.map((key) => {
              const diff = DIFFICULTIES[key]
              const isSelected = key === selectedDifficulty
              return (
                <button
                  key={key}
                  onClick={() => setSelectedDifficulty(key)}
                  className={`px-4 py-1.5 min-h-[36px] font-mono text-xs uppercase tracking-wider rounded-full transition-colors ${
                    isSelected
                      ? 'bg-terminal-border text-terminal-text'
                      : 'text-terminal-muted hover:text-terminal-text'
                  }`}
                >
                  {diff.label}
                </button>
              )
            })}
          </div>
          <p className="font-serif text-sm text-terminal-muted italic mb-5">
            {DIFFICULTIES[selectedDifficulty].description}
          </p>

          <Button
            onClick={() => onStartGame(selectedDifficulty)}
            className="px-10 py-3 text-base mb-8"
          >
            New Game
          </Button>

          {/* High scores — full width below button */}
          <div className="w-full max-w-md">
            <HighScoreTable scores={highScores} />
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full">
        <Attribution onAbout={() => setShowAbout(true)} />
      </div>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  )
}
