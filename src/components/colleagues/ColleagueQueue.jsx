import React, { useState, useEffect } from 'react'
import ColleagueCard from './ColleagueCard'

function ColleagueQueue({ queue, gameTime, onResolve, isPaused }) {
  const [expandedId, setExpandedId] = useState(null)

  // Auto-expand the first card if nothing is expanded
  useEffect(() => {
    if (queue.length > 0 && !expandedId) {
      setExpandedId(queue[0].scenarioId)
    }
    if (queue.length === 0) {
      setExpandedId(null)
    }
  }, [queue.length])

  // Clean up expanded state if that scenario was resolved/expired
  useEffect(() => {
    if (expandedId && !queue.find(q => q.scenarioId === expandedId)) {
      setExpandedId(queue.length > 0 ? queue[0].scenarioId : null)
    }
  }, [queue, expandedId])

  if (queue.length === 0) {
    return (
      <div className="bg-terminal-surface/50 rounded-lg p-4 border border-terminal-border text-center">
        <p className="font-mono text-xs text-terminal-muted uppercase tracking-wider">
          No colleagues waiting
        </p>
        <p className="font-serif text-xs text-terminal-muted mt-1 italic">
          Enjoy the silence while it lasts.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2" aria-live="polite" aria-label="Colleague queue">
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-amber-glow mb-1 border-b-2 border-amber-glow pb-1 inline-block">
        Colleagues ({queue.length}/3)
      </div>
      {queue.map((entry) => {
        // Calculate remaining patience in ms from game ticks
        const elapsedTicks = gameTime - entry.arrivedAt
        const elapsedMs = elapsedTicks * 500 // tickIntervalMs
        const remaining = Math.max(0, entry.patienceMs - elapsedMs)

        return (
          <ColleagueCard
            key={entry.scenarioId}
            scenario={entry.scenario}
            patienceRemaining={remaining}
            patienceTotal={entry.patienceMs}
            onResolve={onResolve}
            isExpanded={expandedId === entry.scenarioId}
            onExpand={() => setExpandedId(entry.scenarioId)}
          />
        )
      })}
    </div>
  )
}

export default React.memo(ColleagueQueue)
