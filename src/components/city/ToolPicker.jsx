import { X } from 'lucide-react'
import { TOOL_NEEDS } from '../../data/tools'
import { getIcon } from '../../utils/iconMap'
import { isFieldObscured, getObscuredDisplay } from '../../utils/obscured'

const REGION_STYLES = {
  us: 'border-l-risk-jurisdiction',
  eu: 'border-l-green-500',
  self: 'border-l-risk-surveillance',
}

const REGION_LABELS = { us: 'OFFSHORE', eu: 'EU', self: 'SELF' }
const REGION_COLOURS = {
  us: 'bg-red-900/40 text-risk-jurisdiction',
  eu: 'bg-green-900/40 text-green-glow',
  self: 'bg-blue-900/40 text-risk-surveillance',
}

export default function ToolPicker({ categoryId, onInstall, onClose }) {
  const need = TOOL_NEEDS.find(n => n.id === categoryId)
  if (!need) return null

  const Icon = getIcon(need.icon)

  return (
    <div className="bg-terminal-surface border border-terminal-border rounded-lg p-4 animate-fade-in">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-amber-glow" />}
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-amber-glow border-b-2 border-amber-glow pb-0.5">
              Install Tool
            </div>
            <div className="font-mono text-sm font-bold text-terminal-text mt-1">{need.label}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center text-terminal-muted hover:text-terminal-text"
          aria-label="Close tool picker"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="font-serif text-sm text-terminal-muted italic mb-4">{need.description}</p>

      <div className="space-y-2">
        {need.options.map((option) => {
          const surHidden = isFieldObscured(option.region, 'surveillance')
          const budgetHidden = isFieldObscured(option.region, 'budgetCost')
          const moraleHidden = isFieldObscured(option.region, 'moraleCost')

          return (
            <button
              key={option.id}
              onClick={() => onInstall(categoryId, option.id)}
              className={`w-full text-left px-3 py-3 min-h-[44px] rounded border border-terminal-border border-l-4 bg-terminal-bg hover:border-amber-glow hover:bg-terminal-surface transition-colors focus-visible:outline-2 focus-visible:outline-amber-glow focus-visible:outline-offset-2 ${REGION_STYLES[option.region]}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-sm font-semibold text-terminal-text">{option.name}</span>
                <span className={`text-xs font-mono px-1.5 py-0.5 rounded uppercase tracking-wider ${REGION_COLOURS[option.region]}`}>
                  {REGION_LABELS[option.region]}
                </span>
              </div>
              <div className="font-mono text-xs text-terminal-muted mb-1">{option.provider}</div>

              <div className="flex items-center gap-3 mt-2">
                <span className="font-mono text-xs">
                  <span className="text-terminal-muted">JUR </span>
                  <span className="text-risk-jurisdiction font-bold">{option.jurisdiction}</span>
                </span>
                <span className="font-mono text-xs">
                  <span className="text-terminal-muted">CON </span>
                  <span className="text-risk-continuity font-bold">{option.continuity}</span>
                </span>
                <span className="font-mono text-xs">
                  <span className="text-terminal-muted">SUR </span>
                  {surHidden
                    ? <span className="text-amber-glow font-bold">???</span>
                    : <span className="text-risk-surveillance font-bold">{option.surveillance}</span>
                  }
                </span>
              </div>

              <div className="flex items-center gap-3 mt-1 text-xs font-mono text-terminal-muted">
                {budgetHidden
                  ? <span>{getObscuredDisplay(option.region, 'budgetCost', option.budgetCost)} budget</span>
                  : option.budgetCost !== 0 && <span className={option.budgetCost < 0 ? 'text-green-glow' : 'text-danger'}>{option.budgetCost < 0 ? `+${Math.abs(option.budgetCost)}` : `-${option.budgetCost}`} budget</span>
                }
                {moraleHidden
                  ? <span>{getObscuredDisplay(option.region, 'moraleCost', option.moraleCost)} morale</span>
                  : option.moraleCost !== 0 && <span className={option.moraleCost < 0 ? 'text-green-glow' : 'text-danger'}>{option.moraleCost < 0 ? `+${Math.abs(option.moraleCost)}` : `-${option.moraleCost}`} morale</span>
                }
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
