import React, { useState } from 'react'
import ColleagueAvatar from './ColleagueAvatar'
import PatienceBar from './PatienceBar'
import { COLLEAGUES } from '../../data/colleagues'

function ColleagueCard({ scenario, patienceRemaining, patienceTotal, onResolve, isExpanded, onExpand }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const colleague = COLLEAGUES[scenario.colleagueId]
  if (!colleague) return null

  const isUrgent = patienceRemaining / patienceTotal < 0.25

  return (
    <div
      className={`bg-terminal-surface border rounded-lg overflow-hidden transition-all duration-300 ${
        isExpanded ? 'border-amber-glow/60' : 'border-terminal-border hover:border-terminal-muted'
      } ${isUrgent && !isExpanded ? 'animate-pulse-glow-fast' : ''}`}
    >
      {/* Header — always visible */}
      <button
        onClick={onExpand}
        className="w-full flex items-center gap-3 px-3 py-2.5 text-left min-h-[44px]"
        aria-expanded={isExpanded}
        aria-label={`${colleague.name}, ${colleague.role}. ${scenario.headline}`}
      >
        <div className="shrink-0">
          <ColleagueAvatar colleagueId={scenario.colleagueId} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: colleague.colour }}>
              {colleague.name}
            </span>
            <span className="font-mono text-xs text-terminal-muted">{colleague.role}</span>
          </div>
          {!isExpanded && (
            <p className="font-serif text-xs text-terminal-muted truncate mt-0.5">
              {scenario.headline}
            </p>
          )}
        </div>
        {scenario.type === 'crisis' && (
          <span className="shrink-0 px-1.5 py-0.5 rounded font-mono text-xs uppercase tracking-wider bg-red-900/40 text-danger">
            Urgent
          </span>
        )}
      </button>

      <div className="px-3 pb-1">
        <PatienceBar remaining={patienceRemaining} total={patienceTotal} colour={colleague.colour} />
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-3 pb-3 pt-2 animate-fade-in">
          <p className="font-serif text-sm text-terminal-text leading-relaxed mb-4">
            {scenario.dialogue}
          </p>

          {selectedOption !== null ? (
            <div className="bg-terminal-bg rounded p-3 border border-terminal-border animate-fade-in">
              <p className="font-serif text-sm text-terminal-muted italic">
                {scenario.options[selectedOption].responseText}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {scenario.options.map((option, i) => {
                // Try to extract static effect values for display
                let impacts = null
                if (option.effect) {
                  try {
                    const result = typeof option.effect === 'function' ? option.effect({}) : option.effect
                    if (result && typeof result === 'object') {
                      impacts = result
                    }
                  } catch {
                    // Dynamic effect that needs state — show as unknown
                    impacts = null
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedOption(i)
                      setTimeout(() => onResolve(scenario.id, i), 1200)
                    }}
                    className="w-full text-left px-3 py-2.5 min-h-[44px] rounded border border-terminal-border bg-terminal-bg hover:border-amber-glow hover:bg-terminal-surface transition-colors focus-visible:outline-2 focus-visible:outline-amber-glow focus-visible:outline-offset-2"
                  >
                    <div className="font-mono text-sm text-terminal-text">{option.label}</div>
                    <div className="font-serif text-xs text-terminal-muted">{option.description}</div>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      {impacts ? (
                        <>
                          {/* Risk: increase = bad (red), decrease = good (green) */}
                          {impacts.jurisdiction != null && impacts.jurisdiction !== 0 && (
                            <span className={`font-mono text-xs ${impacts.jurisdiction > 0 ? 'text-danger' : 'text-green-glow'}`}>
                              {impacts.jurisdiction > 0 ? '+' : ''}{impacts.jurisdiction} jurisdiction risk
                            </span>
                          )}
                          {impacts.continuity != null && impacts.continuity !== 0 && (
                            <span className={`font-mono text-xs ${impacts.continuity > 0 ? 'text-danger' : 'text-green-glow'}`}>
                              {impacts.continuity > 0 ? '+' : ''}{impacts.continuity} continuity risk
                            </span>
                          )}
                          {impacts.surveillance != null && impacts.surveillance !== 0 && (
                            <span className={`font-mono text-xs ${impacts.surveillance > 0 ? 'text-danger' : 'text-green-glow'}`}>
                              {impacts.surveillance > 0 ? '+' : ''}{impacts.surveillance} surveillance risk
                            </span>
                          )}
                          {/* Budget/morale: increase = good (green), decrease = bad (red) */}
                          {impacts.budget != null && impacts.budget !== 0 && (
                            <span className={`font-mono text-xs ${impacts.budget > 0 ? 'text-green-glow' : 'text-danger'}`}>
                              {impacts.budget > 0 ? '+' : ''}{impacts.budget} budget
                            </span>
                          )}
                          {impacts.morale != null && impacts.morale !== 0 && (
                            <span className={`font-mono text-xs ${impacts.morale > 0 ? 'text-green-glow' : 'text-danger'}`}>
                              {impacts.morale > 0 ? '+' : ''}{impacts.morale} morale
                            </span>
                          )}
                          {Object.values(impacts).every(v => v === 0 || v == null) && (
                            <span className="font-mono text-xs text-terminal-muted">No immediate impact</span>
                          )}
                        </>
                      ) : (
                        <span className="font-mono text-xs text-terminal-muted">Impact: ???</span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default React.memo(ColleagueCard)
