import { TOOL_NEEDS } from '../data/tools'
import { EVENTS } from '../data/events'
import { shuffle } from '../utils/shuffle'

export const DIFFICULTIES = {
  easy: {
    label: 'Easy',
    description: 'For those new to digital sovereignty.',
    startBudget: 65,
    startMorale: 80,
    quarterMoralDecay: 1,
    eventMultiplier: 0.7,
  },
  normal: {
    label: 'Normal',
    description: 'The authentic charity CTO experience.',
    startBudget: 50,
    startMorale: 70,
    quarterMoralDecay: 2,
    eventMultiplier: 1.0,
  },
  hard: {
    label: 'Hard',
    description: 'For masochists and policy wonks.',
    startBudget: 40,
    startMorale: 60,
    quarterMoralDecay: 3,
    eventMultiplier: 1.3,
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
  riskWarningThreshold: 50,
  riskDangerThreshold: 75,
}

export function createInitialState(difficulty = 'normal') {
  const diff = DIFFICULTIES[difficulty] || DIFFICULTIES.normal
  const toolDeck = shuffle(TOOL_NEEDS.map(n => n.id))
  const eventDeck = shuffle(EVENTS.map(e => e.id))

  return {
    screen: 'title',

    difficulty,
    budget: diff.startBudget,
    morale: diff.startMorale,

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
    flashColour: null,
  }
}
