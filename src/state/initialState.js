import { TOOL_NEEDS } from '../data/tools'
import { randomOrgName } from '../data/organisations'
import { shuffle } from '../utils/shuffle'
import { clamp } from '../utils/clamp'

export const DIFFICULTIES = {
  easy: {
    label: 'Easy',
    description: 'A gentle inheritance. Mostly sensible choices.',
    startBudget: 65,
    startMorale: 80,
    quarterMoralDecay: 1,
    eventMultiplier: 0.7,
    startingTools: 5,
    usWeight: 0.3,
    degradedCount: 0,
  },
  normal: {
    label: 'Normal',
    description: 'The authentic charity CTO experience.',
    startBudget: 50,
    startMorale: 70,
    quarterMoralDecay: 2,
    eventMultiplier: 1.0,
    startingTools: 6,
    usWeight: 0.5,
    degradedCount: 1,
  },
  hard: {
    label: 'Hard',
    description: 'Your predecessor made questionable choices.',
    startBudget: 40,
    startMorale: 60,
    quarterMoralDecay: 3,
    eventMultiplier: 1.3,
    startingTools: 8,
    usWeight: 0.7,
    degradedCount: 2,
  },
}

export const TUNING = {
  maxResource: 100,
  maxRisk: 100,
  quarterBudgetRegen: 5,
  migrationBudgetCost: 15,
  migrationMoraleCost: 10,
  backupDrillBudgetCost: 10,
  backupDrillReduction: 8,
  auditMoraleCost: 8,
  auditReduction: 8,
  fundraiserMoraleCost: 8,
  fundraiserBudgetGain: 12,
  pizzaPartyBudgetCost: 8,
  pizzaPartyMoraleGain: 10,
  riskWarningThreshold: 50,
  riskDangerThreshold: 75,
  // Game clock
  tickIntervalMs: 500,
  ticksPerQuarter: 90, // ~45 real seconds per quarter at 1×
  // Passive risk drift per tick per tool (by region)
  driftUs: { jurisdiction: 0.04, surveillance: 0.02 },
  driftEu: { jurisdiction: 0.01 },
  driftSelf: { continuity: 0.03 },
  degradedMultiplier: 2,
  // Colleague spawning
  firstColleagueDelay: 30, // ticks (~15s)
  colleagueIntervalMin: 60, // ticks (~30s)
  colleagueIntervalMax: 120, // ticks (~60s)
  maxColleagueQueue: 3,
  patienceMoralePenalty: 5,
}

function pickWeightedOption(options, usWeight) {
  const euWeight = (1 - usWeight) * 0.6
  const selfWeight = (1 - usWeight) * 0.4

  const weighted = options.map(opt => {
    let weight = selfWeight
    if (opt.region === 'us') weight = usWeight
    else if (opt.region === 'eu') weight = euWeight
    return { option: opt, weight }
  })

  const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0)
  let roll = Math.random() * totalWeight
  for (const { option, weight } of weighted) {
    roll -= weight
    if (roll <= 0) return option
  }
  return weighted[weighted.length - 1].option
}

function generateStartingStack(diff) {
  const categoryIds = shuffle(TOOL_NEEDS.map(n => n.id)).slice(0, diff.startingTools)

  const stack = categoryIds.map(catId => {
    const need = TOOL_NEEDS.find(n => n.id === catId)
    const option = pickWeightedOption(need.options, diff.usWeight)
    return {
      id: option.id,
      needId: catId,
      name: option.name,
      provider: option.provider,
      region: option.region,
      icon: need.icon,
      jurisdiction: option.jurisdiction,
      continuity: option.continuity,
      surveillance: option.surveillance,
      degraded: false,
      installedAt: 0,
      lastAuditedAt: null,
    }
  })

  // Mark random tools as degraded
  if (diff.degradedCount > 0) {
    const degradeIndices = shuffle([...Array(stack.length).keys()]).slice(0, diff.degradedCount)
    for (const i of degradeIndices) {
      stack[i].degraded = true
    }
  }

  return stack
}

function calculateStartingRisks(stack) {
  let jurisdiction = 0
  let continuity = 0
  let surveillance = 0

  for (const tool of stack) {
    jurisdiction += tool.jurisdiction
    continuity += tool.continuity
    surveillance += tool.surveillance
    if (tool.degraded) {
      // Degraded tools contribute extra risk
      jurisdiction += Math.round(tool.jurisdiction * 0.5)
      continuity += Math.round(tool.continuity * 0.5)
      surveillance += Math.round(tool.surveillance * 0.5)
    }
  }

  // Cap starting risks at 80 so the game isn't instantly over
  return {
    jurisdiction: clamp(jurisdiction, 0, 80),
    continuity: clamp(continuity, 0, 80),
    surveillance: clamp(surveillance, 0, 80),
  }
}

export function createInitialState(difficulty = 'normal') {
  const diff = DIFFICULTIES[difficulty] || DIFFICULTIES.normal

  const stack = generateStartingStack(diff)
  const risks = calculateStartingRisks(stack)

  return {
    screen: 'title',

    orgName: randomOrgName(),
    difficulty,
    budget: diff.startBudget,
    morale: diff.startMorale,

    jurisdiction: risks.jurisdiction,
    continuity: risks.continuity,
    surveillance: risks.surveillance,

    // Game clock
    gameTime: 0,
    isPaused: false,
    speed: 1,

    quarter: 1,

    // Colleague system
    lastFundraiserYear: 0,
    lastPizzaPartyQuarter: 0,
    colleagueQueue: [],
    nextColleagueAt: TUNING.firstColleagueDelay,
    scenarioHistory: [],
    resolvedScenarios: 0,
    ignoredScenarios: 0,

    stack,
    pastHeadlines: [],

    gameOverCause: null,

    shakeScreen: false,
    flashColour: null,
  }
}
