const regionStyles = {
  us: 'bg-red-900/40 text-risk-jurisdiction',
  eu: 'bg-green-900/40 text-green-glow',
  self: 'bg-blue-900/40 text-risk-surveillance',
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

export default function ToolOption({ option, onSelect, needIcon: Icon }) {
  return (
    <div
      onClick={() => onSelect(option)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(option) } }}
      role="button"
      tabIndex={0}
      className="bg-terminal-surface border border-terminal-border rounded p-4 cursor-pointer transition-all duration-200 hover:border-amber-glow hover:shadow-[0_0_8px_var(--color-amber-dim)] focus-visible:outline-2 focus-visible:outline-amber-glow focus-visible:outline-offset-2"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-terminal-muted shrink-0" />}
          <div>
            <div className="font-mono text-sm font-semibold text-terminal-text">{option.name}</div>
            <span className="text-xs text-terminal-muted">{option.provider}</span>
          </div>
        </div>
        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${regionStyles[option.region] || regionStyles.us}`}>
          {option.region}
        </span>
      </div>

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
    </div>
  )
}
