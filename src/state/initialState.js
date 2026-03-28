import { TOOL_NEEDS } from '../data/tools'
import { EVENTS } from '../data/events'
import { shuffle } from '../utils/shuffle'

export const TUNING = {
  startBudget: 50,
  startMorale: 70,
  maxResource: 100,
  maxRisk: 100,
  quarterBudgetRegen: 5,
  quarterMoralDecay: 2,
  migrationBudgetCost: 15,
  migrationMoraleCost: 10,
  backupDrillBudgetCost: 10,
  backupDrillReduction: 8,
  auditMoraleCost: 8,
  auditReduction: 8,
  riskWarningThreshold: 50,
  riskDangerThreshold: 75,
}

export function createInitialState() {
  const toolDeck = shuffle(TOOL_NEEDS.map(n => n.id))
  const eventDeck = shuffle(EVENTS.map(e => e.id))

  return {
    screen: 'title',

    budget: TUNING.startBudget,
    morale: TUNING.startMorale,

    jurisdiction: 0,
    continuity: 0,
    surveillance: 0,

    quarter: 1,
    phase: 'build',

    toolDeck,
    toolDeckIndex: 0,
    eventDeck,
    eventDeckIndex: 0,

    currentNeed: null,
    currentEvent: null,

    stack: [],
    pastHeadlines: [],

    gameOverCause: null,

    shakeScreen: false,
  }
}
