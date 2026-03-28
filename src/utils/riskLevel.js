import { TUNING } from '../state/initialState'

export function riskLevel(value) {
  if (value >= TUNING.riskDangerThreshold) return 'danger'
  if (value >= TUNING.riskWarningThreshold) return 'warning'
  return 'safe'
}

export function toolRiskLevel(tool) {
  const combined = (tool.jurisdictionCost || 0) + (tool.continuityCost || 0) + (tool.surveillanceCost || 0)
  if (combined > 35) return 'danger'
  if (combined > 15) return 'warning'
  return 'safe'
}
