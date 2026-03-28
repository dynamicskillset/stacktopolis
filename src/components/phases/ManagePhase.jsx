import { useState } from 'react'
import { TUNING } from '../../state/initialState'
import Button from '../ui/Button'
import ToolCard from '../ui/ToolCard'
import { toolRiskLevel } from '../../utils/riskLevel'

const ACTIONS = [
  {
    key: 'migrate',
    label: 'Migrate Tool',
    description: 'Swap a tool for a safer provider.',
    detail: 'Reduces all three risk lenses for the migrated tool.',
    lens: null,
    budgetCost: TUNING.migrationBudgetCost,
    moraleCost: TUNING.migrationMoraleCost,
  },
  {
    key: 'backup',
    label: 'Run Backup Drill',
    description: 'Test your recovery plan.',
    detail: 'Reduces Continuity risk by 8 points.',
    lens: 'continuity',
    lensColour: 'text-risk-continuity',
    budgetCost: TUNING.backupDrillBudgetCost,
    moraleCost: 0,
  },
  {
    key: 'audit',
    label: 'Audit Data Practices',
    description: 'Conduct a privacy review.',
    detail: 'Reduces Surveillance debt by 8 points.',
    lens: 'surveillance',
    lensColour: 'text-risk-surveillance',
    budgetCost: 0,
    moraleCost: TUNING.auditMoraleCost,
  },
]

function RiskSummary({ jurisdiction, continuity, surveillance }) {
  const risks = [
    { label: 'Jurisdiction', value: jurisdiction, colour: 'bg-risk-jurisdiction' },
    { label: 'Continuity', value: continuity, colour: 'bg-risk-continuity' },
    { label: 'Surveillance', value: surveillance, colour: 'bg-risk-surveillance' },
  ].sort((a, b) => b.value - a.value)

  const highest = risks[0]

  return (
    <div className="bg-terminal-bg/50 rounded p-3 space-y-2">
      <div className="font-mono text-[10px] uppercase tracking-widest text-terminal-muted">
        Risk Assessment
      </div>
      {risks.map((r) => (
        <div key={r.label} className="flex items-center gap-2">
          <span className="font-mono text-xs text-terminal-muted w-24 truncate">{r.label}</span>
          <div className="flex-1 h-1.5 bg-terminal-surface rounded overflow-hidden">
            <div
              className={`h-full rounded ${r.colour}`}
              style={{ width: `${r.value}%`, transition: 'width 300ms ease' }}
            />
          </div>
          <span className={`font-mono text-xs font-bold tabular-nums w-6 text-right ${r.value >= 75 ? 'text-danger' : r.value >= 50 ? 'text-amber-glow' : 'text-terminal-muted'}`}>
            {r.value}
          </span>
        </div>
      ))}
      {highest.value >= 50 && (
        <p className="font-serif text-xs text-terminal-muted italic mt-1">
          {highest.label} is your highest risk.{' '}
          {highest.label === 'Continuity' && 'Consider a backup drill.'}
          {highest.label === 'Surveillance' && 'Consider a data audit.'}
          {highest.label === 'Jurisdiction' && 'Consider migrating a US tool.'}
        </p>
      )}
    </div>
  )
}

function CostLabel({ budgetCost, moraleCost }) {
  const parts = []
  if (budgetCost > 0) parts.push(`${budgetCost} budget`)
  if (moraleCost > 0) parts.push(`${moraleCost} morale`)
  if (parts.length === 0) return null
  return (
    <span className="text-xs font-mono text-terminal-muted">
      Cost: {parts.join(', ')}
    </span>
  )
}

export default function ManagePhase({ stack, budget, morale, jurisdiction, continuity, surveillance, actions }) {
  const [selectedAction, setSelectedAction] = useState(null)

  function canAfford(action) {
    return budget >= action.budgetCost && morale >= action.moraleCost
  }

  function handleToolPick(tool) {
    if (selectedAction === 'migrate') {
      actions.migrateTool(tool.id)
    } else if (selectedAction === 'backup') {
      actions.runBackup(tool.id)
    } else if (selectedAction === 'audit') {
      actions.auditData(tool.id)
    }
    setSelectedAction(null)
  }

  return (
    <div className="animate-fade-in space-y-4 bg-terminal-surface/50 rounded-lg p-4 border border-terminal-border">
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-amber-glow mb-1 border-b-2 border-amber-glow pb-1 inline-block">
          Work Order
        </div>
      </div>

      <RiskSummary
        jurisdiction={jurisdiction}
        continuity={continuity}
        surveillance={surveillance}
      />

      {!selectedAction && (
        <div className="space-y-2">
          {ACTIONS.map((action) => {
            const disabled = !canAfford(action) || stack.length === 0
            return (
              <div
                key={action.key}
                className="bg-terminal-surface border border-terminal-border border-l-4 border-l-amber-glow rounded p-3 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-mono text-sm font-semibold text-terminal-text">
                      {action.label}
                    </div>
                    <p className="text-xs text-terminal-muted">{action.description}</p>
                    <p className={`text-xs font-mono ${action.lensColour || 'text-amber-glow'}`}>
                      {action.detail}
                    </p>
                  </div>
                  <Button
                    onClick={() => setSelectedAction(action.key)}
                    disabled={disabled}
                    variant="primary"
                    className="shrink-0"
                  >
                    Select
                  </Button>
                </div>
                <CostLabel budgetCost={action.budgetCost} moraleCost={action.moraleCost} />
              </div>
            )
          })}
        </div>
      )}

      {selectedAction && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-mono text-sm text-terminal-text uppercase tracking-wider">
              Choose a tool
            </div>
            <Button onClick={() => setSelectedAction(null)} variant="secondary">
              Back
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {stack.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                riskLevel={toolRiskLevel(tool)}
                onClick={() => handleToolPick(tool)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="pt-3 border-t border-terminal-border">
        <Button onClick={actions.endQuarter} variant="primary" className="w-full">
          End Quarter
        </Button>
      </div>
    </div>
  )
}
