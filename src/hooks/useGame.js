import { useReducer, useCallback, useEffect } from 'react'
import { gameReducer } from '../state/gameReducer'
import { createInitialState } from '../state/initialState'

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, null, createInitialState)

  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), [])
  const restartGame = useCallback(() => dispatch({ type: 'RESTART_GAME' }), [])
  const selectTool = useCallback((option) => dispatch({ type: 'SELECT_TOOL', payload: option }), [])
  const acknowledgeEvent = useCallback(() => dispatch({ type: 'ACKNOWLEDGE_EVENT' }), [])
  const migrateTool = useCallback((toolId) => dispatch({ type: 'MIGRATE_TOOL', payload: toolId }), [])
  const runBackup = useCallback((toolId) => dispatch({ type: 'RUN_BACKUP', payload: toolId }), [])
  const auditData = useCallback((toolId) => dispatch({ type: 'AUDIT_DATA', payload: toolId }), [])
  const endQuarter = useCallback(() => dispatch({ type: 'END_QUARTER' }), [])
  const clearShake = useCallback(() => dispatch({ type: 'CLEAR_SHAKE' }), [])

  useEffect(() => {
    if (state.shakeScreen) {
      const timer = setTimeout(clearShake, 500)
      return () => clearTimeout(timer)
    }
  }, [state.shakeScreen, clearShake])

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
