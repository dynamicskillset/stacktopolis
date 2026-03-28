import { useState } from 'react'
import { TUNING } from '../../state/initialState'
import Button from '../ui/Button'
import ToolCard from '../ui/ToolCard'
import { toolRiskLevel } from '../../utils/riskLevel'

const ACTIONS = [
  {
    key: 'migrate',
    label: 'Migrate Tool',
    description: 'Move a tool to a lower-risk provider.',
    budgetCost: TUNING.migrationBudgetCost,
    moraleCost: TUNING.migrationMoraleCost,
  },
  {
    key: 'backup',
    label: 'Run Backup Drill',
    description: 'Reduce continuity risk by testing your recovery plan.',
    budgetCost: TUNING.backupDrillBudgetCost,
    moraleCost: 0,
  },
  {
    key: 'audit',
    label: 'Audit Data Practices',
    description: 'Reduce surveillance debt through a privacy review.',
    budgetCost: 0,
    moraleCost: TUNING.auditMoraleCost,
  },
]

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

export default function ManagePhase({ stack, budget, morale, actions }) {
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
    <div className="animate-fade-in space-y-5">
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-amber-glow mb-1">
          Manage Your Stack
        </div>
        <p className="font-serif italic text-terminal-muted">
          Spend resources to reduce risk, or skip to the next quarter.
        </p>
      </div>

      {!selectedAction && (
        <div className="space-y-3">
          {ACTIONS.map((action) => {
            const disabled = !canAfford(action) || stack.length === 0
            return (
              <div
                key={action.key}
                className="bg-terminal-surface border border-terminal-border rounded p-4 space-y-2"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-mono text-sm font-semibold text-terminal-text">
                      {action.label}
                    </div>
                    <p className="text-xs text-terminal-muted">{action.description}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
        <Button onClick={actions.endQuarter} variant="secondary">
          End Quarter
        </Button>
      </div>
    </div>
  )
}
