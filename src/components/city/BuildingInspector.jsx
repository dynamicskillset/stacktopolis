import { X } from 'lucide-react'
import { TUNING } from '../../state/initialState'
import { toolRiskLevel } from '../../utils/riskLevel'
import { getIcon } from '../../utils/iconMap'

const REGION_LABELS = { us: 'Offshore', eu: 'EU-Hosted', self: 'Self-Hosted' }
const REGION_STYLES = {
  us: 'text-risk-jurisdiction',
  eu: 'text-green-glow',
  self: 'text-risk-surveillance',
}

export default function BuildingInspector({ tool, onClose, actions, budget, morale }) {
  if (!tool) return null

  const risk = toolRiskLevel(tool)
  const Icon = getIcon(tool.icon)

  const canMigrate = budget >= TUNING.migrationBudgetCost && morale >= TUNING.migrationMoraleCost
  const canAudit = morale >= TUNING.auditMoraleCost

  return (
    <div className="bg-terminal-surface border border-terminal-border rounded-lg p-4 animate-fade-in">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-terminal-muted" />}
          <div>
            <div className="font-mono text-sm font-bold text-terminal-text">{tool.name}</div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-terminal-muted">{tool.provider}</span>
              <span className={`font-mono text-xs uppercase ${REGION_STYLES[tool.region]}`}>
                {REGION_LABELS[tool.region]}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center text-terminal-muted hover:text-terminal-text"
          aria-label="Close inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Risk contribution */}
      <div className="grid grid-cols-3 gap-2 mb-3 bg-terminal-bg/50 rounded p-2">
        <div className="text-center">
          <div className="font-mono text-xs uppercase text-terminal-muted">JUR</div>
          <div className="font-mono text-sm font-bold text-risk-jurisdiction">{Math.round(tool.jurisdiction)}</div>
        </div>
        <div className="text-center">
          <div className="font-mono text-xs uppercase text-terminal-muted">CON</div>
          <div className="font-mono text-sm font-bold text-risk-continuity">{Math.round(tool.continuity)}</div>
        </div>
        <div className="text-center">
          <div className="font-mono text-xs uppercase text-terminal-muted">SUR</div>
          <div className="font-mono text-sm font-bold text-risk-surveillance">{Math.round(tool.surveillance)}</div>
        </div>
      </div>

      {tool.degraded && (
        <div className="mb-3 px-2 py-1.5 rounded border border-danger/40 bg-red-950/30">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-danger">Degraded</span>
          <span className="font-mono text-xs text-danger/70 ml-2">Generating extra risk drift</span>
        </div>
      )}

      {/* 3 building-specific actions */}
      <div className="space-y-2">
        <button
          onClick={() => { actions.migrateTool(tool.id); onClose() }}
          disabled={!canMigrate}
          className="w-full text-left px-3 py-2 min-h-[44px] rounded border border-terminal-border bg-terminal-bg hover:border-amber-glow transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <div className="font-mono text-xs font-semibold text-terminal-text">Migrate to Safest</div>
          <div className="font-mono text-xs text-terminal-muted">
            Switches to lowest-risk provider. Cost: {TUNING.migrationBudgetCost} budget, {TUNING.migrationMoraleCost} morale.
          </div>
        </button>

        <button
          onClick={() => { actions.auditData(tool.id); onClose() }}
          disabled={!canAudit}
          className="w-full text-left px-3 py-2 min-h-[44px] rounded border border-terminal-border bg-terminal-bg hover:border-risk-surveillance transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <div className="font-mono text-xs font-semibold text-terminal-text">Audit Data Practices</div>
          <div className="font-mono text-xs text-terminal-muted">
            Reviews this tool's data handling. Cost: {TUNING.auditMoraleCost} morale. Reduces surveillance risk by {TUNING.auditReduction}.
          </div>
        </button>

        <button
          onClick={() => { actions.downgradeTool(tool.id); onClose() }}
          className="w-full text-left px-3 py-2 min-h-[44px] rounded border border-terminal-border bg-terminal-bg hover:border-danger transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <div className="font-mono text-xs font-semibold text-terminal-text">Downgrade to Cheapest</div>
          <div className="font-mono text-xs text-terminal-muted">
            Saves budget but increases risk. Switches to the cheapest provider.
          </div>
        </button>
      </div>
    </div>
  )
}
