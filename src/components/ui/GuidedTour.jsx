import { useState, useEffect } from 'react'

const STEPS = [
  {
    target: '[aria-label="City grid showing installed tools"]',
    title: 'Your Tech Stack',
    text: 'These buildings represent your organisation\'s tools. Click any building to inspect it, or click an empty plot to install something new.',
    position: 'right',
  },
  {
    target: '[aria-label="Colleague interactions"]',
    title: 'Colleagues',
    text: 'People will arrive with problems. Choose an option before their patience runs out, or they leave and things get worse.',
    position: 'left',
  },
  {
    target: '[aria-label="Game status panel"]',
    title: 'Risk & Resources',
    text: 'Keep Jurisdiction, Continuity, and Surveillance below 100. Keep Budget and Morale above 0. Click any gauge for advice.',
    position: 'top',
  },
  {
    target: '[aria-label="Game speed"]',
    title: 'Speed & Pause',
    text: 'Use 1x, 2x, 3x to control game speed. Hit spacebar or the pause button to freeze everything while you think.',
    position: 'top',
  },
]

export default function GuidedTour({ onComplete }) {
  const [step, setStep] = useState(0)
  const [highlight, setHighlight] = useState(null)

  useEffect(() => {
    const target = document.querySelector(STEPS[step].target)
    if (target) {
      const rect = target.getBoundingClientRect()
      setHighlight({
        top: rect.top - 8,
        left: rect.left - 8,
        width: rect.width + 16,
        height: rect.height + 16,
      })
    }
  }, [step])

  function next() {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  function skip() {
    onComplete()
  }

  const current = STEPS[step]
  if (!highlight) return null

  // Position the tooltip near the highlighted element
  let tooltipStyle = {}
  if (current.position === 'right') {
    tooltipStyle = { top: highlight.top + 20, left: highlight.left + highlight.width + 16 }
  } else if (current.position === 'left') {
    tooltipStyle = { top: highlight.top + 20, right: window.innerWidth - highlight.left + 16 }
  } else if (current.position === 'top') {
    tooltipStyle = { bottom: window.innerHeight - highlight.top + 16, left: highlight.left }
  }

  return (
    <div
      className="fixed inset-0"
      style={{ zIndex: 9999 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Tour step ${step + 1} of ${STEPS.length}: ${current.title}`}
      onKeyDown={(e) => { if (e.key === 'Escape') skip() }}
    >
      {/* Dark overlay with cutout */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <mask id="tour-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <rect
              x={highlight.left}
              y={highlight.top}
              width={highlight.width}
              height={highlight.height}
              rx="8"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          x="0" y="0" width="100%" height="100%"
          fill="rgba(0, 0, 0, 0.7)"
          mask="url(#tour-mask)"
        />
        {/* Highlight border */}
        <rect
          x={highlight.left}
          y={highlight.top}
          width={highlight.width}
          height={highlight.height}
          rx="8"
          fill="none"
          stroke="#8B7A2F"
          strokeWidth="2"
          strokeDasharray="6,4"
        >
          <animate attributeName="stroke-dashoffset" values="0;20" dur="1.5s" repeatCount="indefinite" />
        </rect>
      </svg>

      {/* Tooltip */}
      <div
        className="fixed bg-terminal-bg border border-amber-glow/60 rounded-lg p-5 max-w-xs animate-fade-in"
        style={{ ...tooltipStyle, boxShadow: '0 0 20px rgba(255, 176, 0, 0.2)' }}
      >
        <div className="font-mono text-xs text-amber-glow uppercase tracking-wider mb-1">
          {step + 1}/{STEPS.length}
        </div>
        <h3 className="font-mono text-sm font-bold text-terminal-text mb-2">
          {current.title}
        </h3>
        <p className="font-serif text-sm text-terminal-muted leading-relaxed mb-4">
          {current.text}
        </p>
        <div className="flex items-center justify-between">
          <button
            onClick={skip}
            className="font-mono text-xs text-terminal-muted hover:text-terminal-text transition-colors focus-visible:outline-2 focus-visible:outline-terminal-text focus-visible:outline-offset-2 rounded"
          >
            Skip tour
          </button>
          <button
            onClick={next}
            className="font-mono text-sm text-white bg-amber-glow px-4 py-2 min-h-[36px] rounded hover:bg-amber-glow/90 transition-colors focus-visible:outline-2 focus-visible:outline-terminal-text focus-visible:outline-offset-2"
          >
            {step < STEPS.length - 1 ? 'Next' : 'Start Playing'}
          </button>
        </div>
      </div>
    </div>
  )
}
