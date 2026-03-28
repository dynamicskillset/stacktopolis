export function checkGameOver(state) {
  if (state.jurisdiction >= 100) return 'jurisdiction'
  if (state.continuity >= 100) return 'continuity'
  if (state.surveillance >= 100) return 'surveillance'
  if (state.morale <= 0) return 'morale'
  if (state.budget <= 0) return 'budget'
  return null
}

export function getProviderCounts(stack) {
  const counts = {}
  for (const tool of stack) {
    counts[tool.provider] = (counts[tool.provider] || 0) + 1
  }
  return counts
}

export function hasProviderOverlap(stack) {
  const counts = getProviderCounts(stack)
  return Object.values(counts).some(c => c >= 2)
}
