const regionStyles = {
  us: 'bg-red-900/40 text-risk-jurisdiction',
  eu: 'bg-green-900/40 text-green-glow',
  self: 'bg-blue-900/40 text-risk-surveillance',
}

const regionBorderStyles = {
  us: 'border-t-4 border-t-risk-jurisdiction',
  eu: 'border-t-4 border-t-green-500',
  self: 'border-t-4 border-t-risk-surveillance',
}

const riskLabels = [
  { key: 'jurisdiction', label: 'JUR', colour: 'text-risk-jurisdiction' },
  { key: 'continuity', label: 'CON', colour: 'text-risk-continuity' },
  { key: 'surveillance', label: 'SUR', colour: 'text-risk-surveillance' },
]

function CostValue({ value, label }) {
  if (value === 0) return null
  const isGain = value < 0
  const absVal = Math.abs(value)
  return (
    <span className={`font-mono text-xs ${isGain ? 'text-green-glow' : 'text-danger'}`}>
      {isGain ? `+${absVal}` : `-${absVal}`} {label}
    </span>
  )
}

export default function ToolOption({ option, onSelect, needIcon: Icon, stack = [] }) {
  const existingCount = stack.filter(t => t.provider === option.provider).length
  const hasSynergy = existingCount > 0
  const lockInContinuity = existingCount * 5

  return (
    <button
      onClick={() => onSelect(option)}
      className={`w-full text-left bg-terminal-surface border border-terminal-border rounded p-4 cursor-pointer transition-all duration-200 hover:border-amber-glow hover:shadow-[0_0_8px_var(--color-amber-dim)] focus-visible:outline-2 focus-visible:outline-amber-glow focus-visible:outline-offset-2 ${regionBorderStyles[option.region] || regionBorderStyles.us}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-terminal-muted shrink-0" aria-hidden="true" />}
          <div>
            <div className="font-mono text-sm font-semibold text-terminal-text">{option.name}</div>
            <span className="text-xs text-terminal-muted">{option.provider}</span>
          </div>
        </div>
        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${regionStyles[option.region] || regionStyles.us}`}>
          {option.region}
        </span>
      </div>

      {hasSynergy && (
        <div className="flex items-center gap-2 mb-2 px-2 py-1.5 rounded border border-amber-500/40 bg-amber-950/30">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400">Lock-in</span>
          <span className="font-mono text-[10px] text-amber-300/80">&minus;3 budget, +{lockInContinuity} continuity</span>
        </div>
      )}

      {option.tagline && (
        <p className="font-serif italic text-sm text-terminal-muted mb-3">{option.tagline}</p>
      )}

      <div className="flex items-center gap-3 mb-2">
        {riskLabels.map(({ key, label, colour }) => (
          <div key={key} className="flex items-center gap-1">
            <span className="font-mono text-[10px] text-terminal-muted uppercase">{label}</span>
            <span className={`font-mono text-xs font-bold ${colour}`}>{option[key]}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 pt-2 border-t border-terminal-border">
        <CostValue value={option.budgetCost} label="budget" />
        <CostValue value={option.moraleCost} label="morale" />
      </div>
    </button>
  )
}
