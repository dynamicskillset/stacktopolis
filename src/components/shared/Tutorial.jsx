import { useEffect, useRef } from 'react'

const STEPS = [
  {
    title: 'Welcome to Stacktopolis',
    body: "You're the CTO of a small European charity. Each quarter, you'll choose tools, face events, and manage risk. Your goal: survive as long as possible.",
    button: 'Got it',
  },
  {
    title: 'Choose Your Tools',
    body: 'Each quarter starts with a tool request. Choose wisely: US tools are cheap but risky. Self-hosted is safe but expensive. Every choice shifts your risk metres.',
    button: 'Next',
  },
  {
    title: 'Breaking News',
    body: "After choosing, a random event strikes. Some are disasters, some are lucky breaks. Your tool choices determine how badly you're hit.",
    button: 'Next',
  },
  {
    title: 'Manage Your Stack',
    body: 'After each event, you can spend resources to migrate tools, run backups, or audit data practices. Or skip ahead to the next quarter.',
    button: 'Next',
  },
  {
    title: 'Watch Your Metres',
    body: 'Three risk metres (Jurisdiction, Continuity, Surveillance) and two resources (Budget, Morale). If any risk hits 100 or resources run out, it\u2019s game over.',
    button: "Let's go!",
  },
]

export default function Tutorial({ step, onNext, onDismiss }) {
  const current = STEPS[step]
  const nextRef = useRef(null)

  useEffect(() => {
    nextRef.current?.focus()
  }, [step])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onDismiss()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onDismiss])

  if (!current) return null

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Tutorial"
      onClick={onDismiss}
    >
      <div
        className="bg-terminal-surface border border-terminal-border rounded-lg p-8 max-w-md w-full mx-4 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-terminal-muted text-xs font-mono">
          {step + 1}/{STEPS.length}
        </p>

        <h2 className="font-mono text-amber-glow uppercase tracking-widest text-lg">
          {current.title}
        </h2>

        <p className="font-serif text-terminal-text leading-relaxed">
          {current.body}
        </p>

        <button
          ref={nextRef}
          onClick={onNext}
          className="mt-2 w-full py-3 px-4 bg-amber-glow/20 border border-amber-glow text-amber-glow font-mono uppercase tracking-wider text-sm rounded hover:bg-amber-glow/30 transition-colors cursor-pointer"
        >
          {current.button}
        </button>

        <button
          onClick={onDismiss}
          className="text-terminal-muted text-xs hover:text-terminal-text transition-colors cursor-pointer py-2"
        >
          Skip Tutorial
        </button>
      </div>
    </div>
  )
}
