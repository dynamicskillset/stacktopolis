import { TOOL_NEEDS } from '../data/tools'
import { EVENTS } from '../data/events'
import { GAME_OVER_MESSAGES } from '../data/gameOverMessages'
import { createInitialState, TUNING } from './initialState'
import { checkGameOver } from './selectors'
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
      const fresh = createInitialState()
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

      let newState = {
        ...state,
        stack: [...state.stack, newTool],
        jurisdiction: clamp(state.jurisdiction + option.jurisdiction),
        continuity: clamp(state.continuity + option.continuity),
        surveillance: clamp(state.surveillance + option.surveillance),
        budget: clamp(state.budget - option.budgetCost),
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

      let newState = {
        ...state,
        jurisdiction: clamp(state.jurisdiction + (delta.jurisdiction || 0)),
        continuity: clamp(state.continuity + (delta.continuity || 0)),
        surveillance: clamp(state.surveillance + (delta.surveillance || 0)),
        budget: clamp(state.budget + (delta.budget || 0)),
        morale: clamp(state.morale + (delta.morale || 0)),
        phase: 'manage',
        currentEvent: null,
        pastHeadlines: [...state.pastHeadlines, event.headline],
        shakeScreen: event.severity === 'critical',
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
      let newState = {
        ...state,
        quarter: state.quarter + 1,
        budget: clamp(state.budget + TUNING.quarterBudgetRegen),
        morale: clamp(state.morale - TUNING.quarterMoralDecay),
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

    default:
      return state
  }
}
