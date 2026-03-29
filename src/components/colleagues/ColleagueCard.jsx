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
              {scenario.options.map((option, i) => (
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
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default React.memo(ColleagueCard)
