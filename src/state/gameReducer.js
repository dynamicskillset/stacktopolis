import { TOOL_NEEDS } from '../data/tools'
import { EVENTS } from '../data/events'
import { GAME_OVER_MESSAGES } from '../data/gameOverMessages'
import { createInitialState, TUNING, DIFFICULTIES } from './initialState'
import { checkGameOver, getProviderCounts } from './selectors'
import { clamp } from '../utils/clamp'
import { shuffle } from '../utils/shuffle'

function getNeedById(id) {
  return TOOL_NEEDS.find(n => n.id === id)
}

function getEventById(id) {
  return EVENTS.find(e => e.id === id)
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

function drawFromDeck(deck, index, allItems) {
  if (index >= deck.length) {
    const reshuffled = shuffle(allItems.map(i => i.id || i))
    return { deck: reshuffled, index: 1, item: reshuffled[0] }
  }
  return { deck, index: index + 1, item: deck[index] }
}

export function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME': {
      const difficulty = action.payload || 'normal'
      const fresh = createInitialState(difficulty)
      const needId = fresh.toolDeck[0]
      const need = getNeedById(needId)
      return {
        ...fresh,
        screen: 'playing',
        phase: 'build',
        currentNeed: need,
        toolDeckIndex: 1,
      }
    }

    case 'RESTART_GAME': {
      return createInitialState()
    }

    case 'SELECT_TOOL': {
      const option = action.payload
      const newTool = {
        id: option.id,
        needId: state.currentNeed.id,
        name: option.name,
        provider: option.provider,
        region: option.region,
        icon: state.currentNeed.icon,
        jurisdiction: option.jurisdiction,
        continuity: option.continuity,
        surveillance: option.surveillance,
      }

      // Vendor synergy / lock-in: cheaper to stay, but riskier
      const providerCounts = getProviderCounts(state.stack)
      const existingCount = providerCounts[option.provider] || 0
      const ecosystemDiscount = existingCount > 0 ? 3 : 0
      const lockInPenalty = existingCount > 0 ? existingCount * 5 : 0

      const effectiveBudgetCost = Math.max(0, option.budgetCost - ecosystemDiscount)

      let newState = {
        ...state,
        stack: [...state.stack, newTool],
        jurisdiction: clamp(state.jurisdiction + option.jurisdiction),
        continuity: clamp(state.continuity + option.continuity + lockInPenalty),
        surveillance: clamp(state.surveillance + option.surveillance),
        budget: clamp(state.budget - effectiveBudgetCost),
        morale: clamp(state.morale - option.moraleCost),
        currentNeed: null,
      }

      newState = applyGameOverCheck(newState)
      if (newState.screen === 'gameOver') return newState

      const { deck, index, item } = drawFromDeck(
        newState.eventDeck, newState.eventDeckIndex, EVENTS
      )
      const event = getEventById(item)
      return {
        ...newState,
        phase: 'event',
        eventDeck: deck,
        eventDeckIndex: index,
        currentEvent: event,
      }
    }

    case 'ACKNOWLEDGE_EVENT': {
      const event = state.currentEvent
      const delta = event.apply(state)
      const evtDiff = DIFFICULTIES[state.difficulty] || DIFFICULTIES.normal
      const mult = evtDiff.eventMultiplier

      let newState = {
        ...state,
        jurisdiction: clamp(state.jurisdiction + Math.round((delta.jurisdiction || 0) * mult)),
        continuity: clamp(state.continuity + Math.round((delta.continuity || 0) * mult)),
        surveillance: clamp(state.surveillance + Math.round((delta.surveillance || 0) * mult)),
        budget: clamp(state.budget + Math.round((delta.budget || 0) * mult)),
        morale: clamp(state.morale + Math.round((delta.morale || 0) * mult)),
        phase: 'manage',
        currentEvent: null,
        pastHeadlines: [...state.pastHeadlines, event.headline],
        shakeScreen: event.severity === 'critical',
        flashColour: event.severity === 'critical' ? 'red' : event.severity === 'major' ? 'amber' : null,
      }

      newState = applyGameOverCheck(newState)
      return newState
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

    case 'RUN_BACKUP': {
      const toolId = action.payload
      const tool = state.stack.find(t => t.id === toolId)
      if (!tool) return state

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

    case 'END_QUARTER': {
      const qDiff = DIFFICULTIES[state.difficulty] || DIFFICULTIES.normal
      let newState = {
        ...state,
        quarter: state.quarter + 1,
        budget: clamp(state.budget + TUNING.quarterBudgetRegen),
        morale: clamp(state.morale - qDiff.quarterMoralDecay),
      }

      newState = applyGameOverCheck(newState)
      if (newState.screen === 'gameOver') return newState

      const { deck, index, item } = drawFromDeck(
        newState.toolDeck, newState.toolDeckIndex, TOOL_NEEDS
      )
      const need = getNeedById(item)
      return {
        ...newState,
        phase: 'build',
        toolDeck: deck,
        toolDeckIndex: index,
        currentNeed: need,
      }
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
