import { TOOL_NEEDS } from '../data/tools'
import { SCENARIOS } from '../data/scenarios'
import { COLLEAGUES } from '../data/colleagues'
import { GAME_OVER_MESSAGES } from '../data/gameOverMessages'
import { createInitialState, TUNING, DIFFICULTIES } from './initialState'
import { checkGameOver, getProviderCounts } from './selectors'
import { clamp } from '../utils/clamp'

function getNeedById(id) {
  return TOOL_NEEDS.find(n => n.id === id)
}

function pickScenario(state) {
  const activeIds = new Set(state.colleagueQueue.map(q => q.scenarioId))
  const recentIds = new Set(state.scenarioHistory.slice(-10))

  const eligible = SCENARIOS.filter(s =>
    !activeIds.has(s.id) &&
    !recentIds.has(s.id) &&
    s.triggerCondition(state)
  )

  if (eligible.length === 0) return null

  const totalWeight = eligible.reduce((sum, s) => sum + s.priority, 0)
  let roll = Math.random() * totalWeight
  for (const s of eligible) {
    roll -= s.priority
    if (roll <= 0) return s
  }
  return eligible[eligible.length - 1]
}

function nextColleagueDelay() {
  const range = TUNING.colleagueIntervalMax - TUNING.colleagueIntervalMin
  return TUNING.colleagueIntervalMin + Math.floor(Math.random() * range)
}

function applyEffect(effect, state) {
  const delta = typeof effect === 'function' ? effect(state) : effect
  return {
    jurisdiction: clamp(state.jurisdiction + (delta.jurisdiction || 0)),
    continuity: clamp(state.continuity + (delta.continuity || 0)),
    surveillance: clamp(state.surveillance + (delta.surveillance || 0)),
    budget: clamp(state.budget + (delta.budget || 0)),
    morale: clamp(state.morale + (delta.morale || 0)),
  }
}

function applyGameOverCheck(state) {
  const cause = checkGameOver(state)
  if (cause) {
    const msg = GAME_OVER_MESSAGES[cause]
    return {
      ...state,
      screen: 'gameOver',
      gameOverCause: cause,
      gameOverMessage: msg,
    }
  }
  return state
}

function installTool(state, toolInstall) {
  const need = getNeedById(toolInstall.needId)
  if (!need) return state

  const option = need.options.find(o => o.id === toolInstall.optionId)
  if (!option) return state

  const existingTool = state.stack.find(t => t.needId === toolInstall.needId)

  const newTool = {
    id: option.id,
    needId: toolInstall.needId,
    name: option.name,
    provider: option.provider,
    region: option.region,
    icon: need.icon,
    jurisdiction: option.jurisdiction,
    continuity: option.continuity,
    surveillance: option.surveillance,
    degraded: false,
    installedAt: state.quarter,
    lastAuditedAt: null,
  }

  const providerCounts = getProviderCounts(state.stack)
  const existingCount = providerCounts[option.provider] || 0
  const ecosystemDiscount = existingCount > 0 ? 3 : 0
  const lockInPenalty = existingCount > 0 ? existingCount * 5 : 0
  const effectiveBudgetCost = Math.max(0, (option.budgetCost || 0) - ecosystemDiscount)

  let jDelta = option.jurisdiction
  let cDelta = option.continuity
  let sDelta = option.surveillance
  if (existingTool) {
    jDelta -= existingTool.jurisdiction
    cDelta -= existingTool.continuity
    sDelta -= existingTool.surveillance
  }

  const newStack = existingTool
    ? state.stack.map(t => t.needId === toolInstall.needId ? newTool : t)
    : [...state.stack, newTool]

  return {
    ...state,
    stack: newStack,
    jurisdiction: clamp(state.jurisdiction + jDelta),
    continuity: clamp(state.continuity + cDelta + lockInPenalty),
    surveillance: clamp(state.surveillance + sDelta),
    budget: clamp(state.budget - effectiveBudgetCost),
    morale: clamp(state.morale - (option.moraleCost || 0)),
  }
}

export function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME': {
      const difficulty = action.payload || 'normal'
      const fresh = createInitialState(difficulty)
      return { ...fresh, screen: 'playing' }
    }

    case 'RESTART_GAME': {
      return createInitialState()
    }

    case 'MIGRATE_TOOL': {
      const toolId = action.payload
      const tool = state.stack.find(t => t.id === toolId)
      if (!tool) return state

      const need = getNeedById(tool.needId)
      if (!need) return state

      const safest = [...need.options]
        .sort((a, b) =>
          (a.jurisdiction + a.continuity + a.surveillance) -
          (b.jurisdiction + b.continuity + b.surveillance)
        )[0]

      if (safest.id === tool.id) return state

      const riskReduction = {
        jurisdiction: tool.jurisdiction - safest.jurisdiction,
        continuity: tool.continuity - safest.continuity,
        surveillance: tool.surveillance - safest.surveillance,
      }

      const newTool = {
        ...tool,
        id: safest.id,
        name: safest.name,
        provider: safest.provider,
        region: safest.region,
        jurisdiction: safest.jurisdiction,
        continuity: safest.continuity,
        surveillance: safest.surveillance,
        degraded: false,
        installedAt: state.quarter,
      }

      return {
        ...state,
        stack: state.stack.map(t => t.id === toolId ? newTool : t),
        jurisdiction: clamp(state.jurisdiction - riskReduction.jurisdiction),
        continuity: clamp(state.continuity - riskReduction.continuity),
        surveillance: clamp(state.surveillance - riskReduction.surveillance),
        budget: clamp(state.budget - TUNING.migrationBudgetCost),
        morale: clamp(state.morale - TUNING.migrationMoraleCost),
      }
    }

    case 'RUN_FUNDRAISER': {
      const currentYear = Math.floor((state.quarter - 1) / 4) + 1
      if (state.morale < TUNING.fundraiserMoraleCost) return state
      if (state.lastFundraiserYear >= currentYear) return state
      return {
        ...state,
        budget: clamp(state.budget + TUNING.fundraiserBudgetGain),
        morale: clamp(state.morale - TUNING.fundraiserMoraleCost),
        lastFundraiserYear: currentYear,
      }
    }

    case 'PIZZA_PARTY': {
      if (state.budget < TUNING.pizzaPartyBudgetCost) return state
      if (state.quarter - state.lastPizzaPartyQuarter < 2) return state
      return {
        ...state,
        morale: clamp(state.morale + TUNING.pizzaPartyMoraleGain),
        budget: clamp(state.budget - TUNING.pizzaPartyBudgetCost),
        lastPizzaPartyQuarter: state.quarter,
      }
    }

    case 'DOWNGRADE_TOOL': {
      const toolId = action.payload
      const tool = state.stack.find(t => t.id === toolId)
      if (!tool) return state

      const need = getNeedById(tool.needId)
      if (!need) return state

      // Find cheapest option (lowest budgetCost, likely US/free)
      const cheapest = [...need.options]
        .sort((a, b) => (a.budgetCost || 0) - (b.budgetCost || 0))[0]

      if (cheapest.id === tool.id) return state

      const riskIncrease = {
        jurisdiction: cheapest.jurisdiction - tool.jurisdiction,
        continuity: cheapest.continuity - tool.continuity,
        surveillance: cheapest.surveillance - tool.surveillance,
      }

      const budgetSaved = Math.abs(cheapest.budgetCost || 0) + 5

      const newTool = {
        ...tool,
        id: cheapest.id,
        name: cheapest.name,
        provider: cheapest.provider,
        region: cheapest.region,
        jurisdiction: cheapest.jurisdiction,
        continuity: cheapest.continuity,
        surveillance: cheapest.surveillance,
        degraded: false,
        installedAt: state.quarter,
      }

      return {
        ...state,
        stack: state.stack.map(t => t.id === toolId ? newTool : t),
        jurisdiction: clamp(state.jurisdiction + riskIncrease.jurisdiction),
        continuity: clamp(state.continuity + riskIncrease.continuity),
        surveillance: clamp(state.surveillance + riskIncrease.surveillance),
        budget: clamp(state.budget + budgetSaved),
      }
    }

    case 'RUN_BACKUP': {
      if (state.budget < TUNING.backupDrillBudgetCost) return state
      return {
        ...state,
        continuity: clamp(state.continuity - TUNING.backupDrillReduction),
        budget: clamp(state.budget - TUNING.backupDrillBudgetCost),
      }
    }

    case 'AUDIT_DATA': {
      const toolId = action.payload
      const tool = state.stack.find(t => t.id === toolId)
      if (!tool) return state

      return {
        ...state,
        surveillance: clamp(state.surveillance - TUNING.auditReduction),
        morale: clamp(state.morale - TUNING.auditMoraleCost),
      }
    }

    case 'TICK': {
      if (state.screen !== 'playing') return state

      const newGameTime = state.gameTime + 1

      let jDrift = 0
      let cDrift = 0
      let sDrift = 0
      for (const tool of state.stack) {
        const combined = (tool.jurisdiction || 0) + (tool.continuity || 0) + (tool.surveillance || 0)
        // Fire spreading: tools on fire (combined > 35) generate 50% more drift
        const fireMult = combined > 35 ? 1.5 : 1
        const mult = (tool.degraded ? TUNING.degradedMultiplier : 1) * fireMult
        if (tool.region === 'us') {
          jDrift += (TUNING.driftUs.jurisdiction || 0) * mult
          sDrift += (TUNING.driftUs.surveillance || 0) * mult
        } else if (tool.region === 'eu') {
          jDrift += (TUNING.driftEu.jurisdiction || 0) * mult
        } else {
          cDrift += (TUNING.driftSelf.continuity || 0) * mult
        }
      }

      const rawJ = state.jurisdiction + jDrift
      const rawC = state.continuity + cDrift
      const rawS = state.surveillance + sDrift

      let newState = {
        ...state,
        gameTime: newGameTime,
        jurisdiction: clamp(Math.round(rawJ * 100) / 100),
        continuity: clamp(Math.round(rawC * 100) / 100),
        surveillance: clamp(Math.round(rawS * 100) / 100),
      }

      // Quarter boundary
      const prevQuarter = Math.floor(state.gameTime / TUNING.ticksPerQuarter) + 1
      const newQuarter = Math.floor(newGameTime / TUNING.ticksPerQuarter) + 1
      if (newQuarter > prevQuarter) {
        const qDiff = DIFFICULTIES[state.difficulty] || DIFFICULTIES.normal
        newState = {
          ...newState,
          quarter: newQuarter,
          budget: clamp(newState.budget + TUNING.quarterBudgetRegen),
          morale: clamp(newState.morale - qDiff.quarterMoralDecay),
        }
      }

      // Expire colleagues
      let expiredQueue = []
      let activeQueue = []
      for (const entry of newState.colleagueQueue) {
        const elapsedTicks = newGameTime - entry.arrivedAt
        const elapsedMs = elapsedTicks * TUNING.tickIntervalMs
        if (elapsedMs >= entry.patienceMs) {
          expiredQueue.push(entry)
        } else {
          activeQueue.push(entry)
        }
      }

      if (expiredQueue.length > 0) {
        let j = newState.jurisdiction
        let c = newState.continuity
        let s = newState.surveillance
        let b = newState.budget
        let m = newState.morale
        const headlines = [...newState.pastHeadlines]

        for (const entry of expiredQueue) {
          const delta = typeof entry.scenario.ignoreEffect === 'function'
            ? entry.scenario.ignoreEffect(newState)
            : entry.scenario.ignoreEffect
          j = clamp(j + (delta.jurisdiction || 0))
          c = clamp(c + (delta.continuity || 0))
          s = clamp(s + (delta.surveillance || 0))
          b = clamp(b + (delta.budget || 0))
          m = clamp(m + (delta.morale || 0) - TUNING.patienceMoralePenalty)
          headlines.push(entry.scenario.headline)
        }

        newState = {
          ...newState,
          colleagueQueue: activeQueue,
          jurisdiction: j,
          continuity: c,
          surveillance: s,
          budget: b,
          morale: m,
          pastHeadlines: headlines,
          ignoredScenarios: newState.ignoredScenarios + expiredQueue.length,
          flashColour: expiredQueue.some(e => e.scenario.priority >= 4) ? 'amber' : null,
        }
      }

      // Spawn colleague
      if (newGameTime >= newState.nextColleagueAt && newState.colleagueQueue.length < TUNING.maxColleagueQueue) {
        const scenario = pickScenario(newState)
        if (scenario) {
          const colleague = COLLEAGUES[scenario.colleagueId]
          const entry = {
            scenarioId: scenario.id,
            colleagueId: scenario.colleagueId,
            scenario,
            arrivedAt: newGameTime,
            patienceMs: colleague.patience,
          }
          newState = {
            ...newState,
            colleagueQueue: [...newState.colleagueQueue, entry],
            nextColleagueAt: newGameTime + nextColleagueDelay(),
            scenarioHistory: [...newState.scenarioHistory, scenario.id].slice(-20),
          }
        } else {
          newState = { ...newState, nextColleagueAt: newGameTime + 20 }
        }
      }

      return applyGameOverCheck(newState)
    }

    case 'INSTALL_TOOL': {
      const { needId, optionId } = action.payload
      let newState = installTool(state, { needId, optionId })
      return applyGameOverCheck(newState)
    }

    case 'RESOLVE_SCENARIO': {
      const { scenarioId, optionIndex } = action.payload
      const entry = state.colleagueQueue.find(q => q.scenarioId === scenarioId)
      if (!entry) return state

      const option = entry.scenario.options[optionIndex]
      if (!option) return state

      let newState = state

      // Handle tool installation if the option includes it
      if (option.toolInstall) {
        newState = installTool(newState, option.toolInstall)
      }

      // Apply resource effects
      const resources = applyEffect(option.effect, newState)
      newState = {
        ...newState,
        ...resources,
        colleagueQueue: newState.colleagueQueue.filter(q => q.scenarioId !== scenarioId),
        resolvedScenarios: newState.resolvedScenarios + 1,
        pastHeadlines: [...newState.pastHeadlines, entry.scenario.headline],
      }

      return applyGameOverCheck(newState)
    }

    case 'TOGGLE_PAUSE': {
      if (state.screen !== 'playing') return state
      return { ...state, isPaused: !state.isPaused }
    }

    case 'SET_SPEED': {
      return { ...state, speed: action.payload }
    }

    case 'CLEAR_SHAKE': {
      return { ...state, shakeScreen: false }
    }

    case 'CLEAR_FLASH': {
      return { ...state, flashColour: null }
    }

    default:
      return state
  }
}
