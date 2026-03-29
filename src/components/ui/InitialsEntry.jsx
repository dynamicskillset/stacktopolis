import { useState, useEffect, useRef } from 'react'
import { playSound } from '../../utils/sounds'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_'

export default function InitialsEntry({ onSubmit }) {
  const [letters, setLetters] = useState([0, 0, 0]) // indices into CHARS
  const [cursor, setCursor] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    containerRef.current?.focus()
  }, [])

  function handleKey(e) {
    if (submitted) return
    e.preventDefault()

    if (e.key === 'ArrowUp' || e.key === 'w') {
      playSound('click')
      setLetters(prev => {
        const next = [...prev]
        next[cursor] = (next[cursor] + 1) % CHARS.length
        return next
      })
    } else if (e.key === 'ArrowDown' || e.key === 's') {
      playSound('click')
      setLetters(prev => {
        const next = [...prev]
        next[cursor] = (next[cursor] - 1 + CHARS.length) % CHARS.length
        return next
      })
    } else if (e.key === 'ArrowRight' || e.key === 'Tab') {
      playSound('click')
      if (cursor < 2) setCursor(cursor + 1)
      else submit()
    } else if (e.key === 'ArrowLeft') {
      playSound('click')
      if (cursor > 0) setCursor(cursor - 1)
    } else if (e.key === 'Enter') {
      submit()
    } else if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
      // Direct letter typing
      playSound('click')
      const charIndex = CHARS.indexOf(e.key.toUpperCase())
      if (charIndex >= 0) {
        setLetters(prev => {
          const next = [...prev]
          next[cursor] = charIndex
          return next
        })
        if (cursor < 2) setCursor(cursor + 1)
        else submit()
      }
    }
  }

  function submit() {
    if (submitted) return
    setSubmitted(true)
    playSound('positive')
    const initials = letters.map(i => CHARS[i]).join('').replace(/_/g, ' ')
    onSubmit(initials)
  }

  function cycleUp(pos) {
    playSound('click')
    setCursor(pos)
    setLetters(prev => {
      const next = [...prev]
      next[pos] = (next[pos] + 1) % CHARS.length
      return next
    })
  }

  function cycleDown(pos) {
    playSound('click')
    setCursor(pos)
    setLetters(prev => {
      const next = [...prev]
      next[pos] = (next[pos] - 1 + CHARS.length) % CHARS.length
      return next
    })
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKey}
      className="text-center outline-none"
    >
      <div className="font-mono text-xs uppercase tracking-widest text-terminal-muted mb-3">
        Enter your initials
      </div>

      <div className="flex items-center justify-center gap-4 mb-4">
        {letters.map((charIdx, pos) => (
          <div key={pos} className="flex flex-col items-center">
            <button
              onClick={() => cycleUp(pos)}
              className="text-terminal-muted hover:text-amber-glow transition-colors p-1 min-w-[36px] min-h-[36px]"
              aria-label={`Previous letter for position ${pos + 1}`}
            >
              <svg width="16" height="10" viewBox="0 0 16 10" className="mx-auto">
                <path d="M2 8 L8 2 L14 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div
              className={`w-14 h-16 flex items-center justify-center rounded border-2 font-mono text-3xl font-bold transition-all ${
                pos === cursor && !submitted
                  ? 'border-amber-glow text-amber-glow bg-amber-glow/10'
                  : submitted
                    ? 'border-green-glow text-green-glow bg-green-glow/10'
                    : 'border-terminal-border text-terminal-text bg-terminal-bg'
              }`}
              onClick={() => !submitted && setCursor(pos)}
            >
              {CHARS[charIdx] === '_' ? '\u00A0' : CHARS[charIdx]}
            </div>

            <button
              onClick={() => cycleDown(pos)}
              className="text-terminal-muted hover:text-amber-glow transition-colors p-1 min-w-[36px] min-h-[36px]"
              aria-label={`Next letter for position ${pos + 1}`}
            >
              <svg width="16" height="10" viewBox="0 0 16 10" className="mx-auto">
                <path d="M2 2 L8 8 L14 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {!submitted && (
        <div className="space-y-2 mb-6">
          <button
            onClick={submit}
            className="font-mono text-sm text-amber-glow hover:text-terminal-text transition-colors px-4 py-2 min-h-[44px] border border-amber-glow/40 rounded hover:bg-amber-glow/10"
          >
            CONFIRM
          </button>
          <div className="font-serif text-xs text-terminal-muted italic">
            Type letters, use arrows, or click
          </div>
        </div>
      )}
    </div>
  )
}
