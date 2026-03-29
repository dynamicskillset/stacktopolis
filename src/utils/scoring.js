import { TITLES } from '../data/titles'

export function calculateScore(state) {
  const quarters = state.quarter - 1
  const riskSpread = Math.max(state.jurisdiction, state.continuity, state.surveillance) -
    Math.min(state.jurisdiction, state.continuity, state.surveillance)

  const usTools = state.stack.filter(t => t.region === 'us').length
  const independence = state.stack.length > 0
    ? (state.stack.length - usTools) / state.stack.length
    : 0

  const resolved = state.resolvedScenarios || 0
  const ignored = state.ignoredScenarios || 0

  const quarterScore = quarters * 10
  const balanceBonus = riskSpread <= 20 ? quarters * 3 : 0
  const independenceBonus = Math.round(independence * 50)
  const triageBonus = resolved * 5
  const negligenceDeduction = ignored * -3

  const totalScore = Math.max(0, quarterScore + balanceBonus + independenceBonus + triageBonus + negligenceDeduction)

  return {
    quarters,
    riskSpread,
    independence: Math.round(independence * 100),
    quarterScore,
    balanceBonus,
    independenceBonus,
    triageBonus,
    negligenceDeduction,
    totalScore,
  }
}

export function awardTitle(score) {
  for (const title of TITLES) {
    const quarterOk = score.quarters >= title.minQuarters
    const spreadOk = title.maxRiskSpread === null || score.riskSpread <= title.maxRiskSpread
    const indOk = title.minIndependence === null || score.independence / 100 >= title.minIndependence
    if (quarterOk && spreadOk && indOk) {
      return title
    }
  }
  return TITLES[TITLES.length - 1]
}
