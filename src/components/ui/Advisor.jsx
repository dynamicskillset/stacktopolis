import { useState, useEffect, useRef } from 'react'

const CHAR_DELAY = 12
const LINGER_MS = 6000

function CassandraAvatar() {
  return (
    <svg viewBox="-4 -4 56 64" width="72" height="84" className="shrink-0" aria-hidden="true">
      {/* Background circle for visibility */}
      <circle cx="24" cy="26" r="28" fill="#E8E5DD" stroke="#8B7A2F" strokeWidth="0.5" opacity="0.9" />
      {/* Curly/coily hair — bigger, more textured */}
      <ellipse cx="24" cy="14" rx="15" ry="13" fill="#3a2a1a" />
      <circle cx="11" cy="12" r="5" fill="#3a2a1a" />
      <circle cx="37" cy="12" r="5" fill="#3a2a1a" />
      <circle cx="13" cy="20" r="4" fill="#3a2a1a" />
      <circle cx="35" cy="20" r="4" fill="#3a2a1a" />
      <circle cx="10" cy="8" r="3" fill="#3a2a1a" />
      <circle cx="38" cy="8" r="3" fill="#3a2a1a" />
      {/* Face */}
      <ellipse cx="24" cy="18" rx="11" ry="13" fill="#c88a50" />
      {/* Eyes — expressive, one slightly narrowed (sardonic) */}
      <ellipse cx="19.5" cy="16.5" rx="2.2" ry="1.5" fill="#1a1008">
        <animate attributeName="ry" values="1.5;1.5;0.2;1.5" dur="5s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="28.5" cy="16" rx="2.2" ry="1.3" fill="#1a1008">
        <animate attributeName="ry" values="1.3;1.3;0.2;1.3" dur="5s" repeatCount="indefinite" />
      </ellipse>
      {/* Eye highlights */}
      <circle cx="20.3" cy="15.8" r="0.6" fill="#fff" opacity="0.7" />
      <circle cx="29.3" cy="15.3" r="0.6" fill="#fff" opacity="0.7" />
      {/* Eyebrows — one raised, one flat (skeptical) */}
      <path d="M16 13 Q19.5 11.5 22 13" fill="none" stroke="#1a1008" strokeWidth="1" strokeLinecap="round" />
      <path d="M26 11.5 Q29.5 12 33 13.5" fill="none" stroke="#1a1008" strokeWidth="1" strokeLinecap="round" />
      {/* Nose */}
      <path d="M23 19 Q24 21.5 25 19" fill="none" stroke="#8a5a28" strokeWidth="0.7" />
      {/* Mouth — wry half-smile */}
      <path d="M19 24 Q22 26 24 25.5 Q27 24.5 29 25.5" fill="none" stroke="#6a3a18" strokeWidth="1" strokeLinecap="round" />
      {/* Earrings */}
      <circle cx="13" cy="22" r="1.2" fill="#ffb000" />
      <circle cx="35" cy="22" r="1.2" fill="#ffb000" />
      {/* Neck */}
      <rect x="20" y="30" width="8" height="4" fill="#c88a50" />
      {/* Blazer — dark, professional */}
      <path d="M12 34 L18 31 L24 35 L30 31 L36 34 L38 48 L10 48 Z" fill="#1a2030" />
      {/* Lapels */}
      <path d="M18 31 L22 36 L24 35" fill="#141a28" />
      <path d="M30 31 L26 36 L24 35" fill="#141a28" />
      {/* Top / shirt collar */}
      <path d="M20 32 L24 35 L28 32" fill="none" stroke="#dce3eb" strokeWidth="0.6" />
      {/* Subtle lanyard */}
      <line x1="24" y1="35" x2="24" y2="44" stroke="#ffb000" strokeWidth="0.6" />
      <rect x="21.5" y="44" width="5" height="4" rx="0.8" fill="#111820" stroke="#ffb000" strokeWidth="0.4" />
      <text x="24" y="46.8" textAnchor="middle" fill="#ffb000" fontSize="2.8" fontFamily="monospace">DPO</text>
    </svg>
  )
}

export default function Advisor({ line }) {
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState('hidden') // 'hidden' | 'entering' | 'showing' | 'exiting'
  const [currentLine, setCurrentLine] = useState(null)
  const intervalRef = useRef(null)
  const lingerRef = useRef(null)
  const indexRef = useRef(0)

  useEffect(() => {
    if (!line || line === currentLine) return

    // Clear any running timers
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
    if (lingerRef.current) { clearTimeout(lingerRef.current); lingerRef.current = null }

    setCurrentLine(line)
    setDisplayed('')
    indexRef.current = 0
    setPhase('entering')

    // Start typewriter after enter animation
    const enterTimer = setTimeout(() => {
      setPhase('showing')
      intervalRef.current = setInterval(() => {
        indexRef.current += 1
        if (indexRef.current >= line.length) {
          setDisplayed(line)
          clearInterval(intervalRef.current)
          intervalRef.current = null

          // Linger then exit
          lingerRef.current = setTimeout(() => {
            setPhase('exiting')
            setTimeout(() => {
              setPhase('hidden')
              setCurrentLine(null)
            }, 300)
          }, LINGER_MS)
        } else {
          setDisplayed(line.slice(0, indexRef.current))
        }
      }, CHAR_DELAY)
    }, 300)

    return () => {
      clearTimeout(enterTimer)
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
      if (lingerRef.current) { clearTimeout(lingerRef.current); lingerRef.current = null }
    }
  }, [line])

  if (phase === 'hidden') return null

  const animClass = phase === 'entering' ? 'animate-slide-up'
    : phase === 'exiting' ? 'animate-slide-out-down'
    : ''

  return (
    <div className={`w-full bg-terminal-surface border border-terminal-border rounded-lg px-5 py-4 mt-10 flex items-start gap-5 backdrop-blur-sm ${animClass}`} style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}>
      <div className="shrink-0 flex flex-col items-center gap-1.5">
        <CassandraAvatar />
        <span className="font-mono text-xs font-bold tracking-wider text-amber-glow">
          CASSANDRA
        </span>
      </div>
      <div className="flex-1 min-w-0 pt-2">
        <p
          className="font-serif text-lg text-terminal-text leading-relaxed min-h-[1.5em]"
          aria-live="polite"
          aria-atomic="true"
        >
          {displayed}
          {phase === 'showing' && displayed.length < (currentLine?.length ?? 0) && (
            <span className="inline-block w-1.5 h-3.5 bg-amber-glow/60 animate-cursor-blink ml-0.5 align-text-bottom" aria-hidden="true" />
          )}
        </p>
        <span className="sr-only">{currentLine}</span>
      </div>
    </div>
  )
}
