import { useReducer, useCallback, useEffect, useRef } from 'react'
import { gameReducer } from '../state/gameReducer'
import { createInitialState } from '../state/initialState'
import { playSound } from '../utils/sounds'

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, null, createInitialState)
  const prevScreen = useRef(state.screen)
  const prevPhase = useRef(state.phase)
  const prevStack = useRef(state.stack.length)

  const startGame = useCallback((difficulty) => dispatch({ type: 'START_GAME', payload: difficulty }), [])
  const restartGame = useCallback(() => dispatch({ type: 'RESTART_GAME' }), [])
  const selectTool = useCallback((option) => { playSound('toolSelect'); dispatch({ type: 'SELECT_TOOL', payload: option }) }, [])
  const acknowledgeEvent = useCallback(() => dispatch({ type: 'ACKNOWLEDGE_EVENT' }), [])
  const migrateTool = useCallback((toolId) => { playSound('click'); dispatch({ type: 'MIGRATE_TOOL', payload: toolId }) }, [])
  const runBackup = useCallback((toolId) => { playSound('click'); dispatch({ type: 'RUN_BACKUP', payload: toolId }) }, [])
  const auditData = useCallback((toolId) => { playSound('click'); dispatch({ type: 'AUDIT_DATA', payload: toolId }) }, [])
  const endQuarter = useCallback(() => { playSound('endQuarter'); dispatch({ type: 'END_QUARTER' }) }, [])
  const clearShake = useCallback(() => dispatch({ type: 'CLEAR_SHAKE' }), [])
  const clearFlash = useCallback(() => dispatch({ type: 'CLEAR_FLASH' }), [])

  useEffect(() => {
    if (state.shakeScreen) {
      const timer = setTimeout(clearShake, 500)
      return () => clearTimeout(timer)
    }
  }, [state.shakeScreen, clearShake])

  useEffect(() => {
    if (state.flashColour) {
      const timer = setTimeout(clearFlash, 400)
      return () => clearTimeout(timer)
    }
  }, [state.flashColour, clearFlash])

  // Sound effects for state transitions
  useEffect(() => {
    if (state.screen === 'gameOver' && prevScreen.current !== 'gameOver') {
      playSound('gameOver')
    }
    prevScreen.current = state.screen
  }, [state.screen])

  useEffect(() => {
    if (state.phase === 'event' && prevPhase.current !== 'event' && state.currentEvent) {
      const severity = state.currentEvent.severity
      if (severity === 'critical') playSound('eventCritical')
      else if (severity === 'major') playSound('eventMajor')
      else playSound('eventMinor')
    }
    prevPhase.current = state.phase
  }, [state.phase, state.currentEvent])

  // Risk warning sound
  useEffect(() => {
    const maxRisk = Math.max(state.jurisdiction, state.continuity, state.surveillance)
    if (maxRisk >= 75 && state.screen === 'playing') {
      playSound('riskWarning')
    }
  }, [
    state.jurisdiction >= 75,
    state.continuity >= 75,
    state.surveillance >= 75,
  ])

  return {
    state,
    actions: {
      startGame,
      restartGame,
      selectTool,
      acknowledgeEvent,
      migrateTool,
      runBackup,
      auditData,
      endQuarter,
      clearShake,
    },
  }
}
