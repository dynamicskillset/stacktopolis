import { useReducer, useCallback, useEffect, useRef } from 'react'
import { gameReducer } from '../state/gameReducer'
import { createInitialState } from '../state/initialState'
import { useGameClock } from './useGameClock'
import { playSound, isMuted } from '../utils/sounds'
import { startMusic, stopMusic, updateDanger } from '../utils/music'

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, null, createInitialState)
  const prevScreen = useRef(state.screen)

  useGameClock(dispatch, state.isPaused || state.screen !== 'playing', state.speed)

  const startGame = useCallback((difficulty) => dispatch({ type: 'START_GAME', payload: difficulty }), [])
  const restartGame = useCallback(() => dispatch({ type: 'RESTART_GAME' }), [])
  const migrateTool = useCallback((toolId) => { playSound('click'); dispatch({ type: 'MIGRATE_TOOL', payload: toolId }) }, [])
  const runBackup = useCallback((toolId) => { playSound('click'); dispatch({ type: 'RUN_BACKUP', payload: toolId }) }, [])
  const auditData = useCallback((toolId) => { playSound('click'); dispatch({ type: 'AUDIT_DATA', payload: toolId }) }, [])
  const runFundraiser = useCallback(() => { playSound('positive'); dispatch({ type: 'RUN_FUNDRAISER' }) }, [])
  const pizzaParty = useCallback(() => { playSound('positive'); dispatch({ type: 'PIZZA_PARTY' }) }, [])
  const downgradeTool = useCallback((toolId) => { playSound('click'); dispatch({ type: 'DOWNGRADE_TOOL', payload: toolId }) }, [])
  const installTool = useCallback((needId, optionId) => { playSound('toolSelect'); dispatch({ type: 'INSTALL_TOOL', payload: { needId, optionId } }) }, [])
  const resolveScenario = useCallback((scenarioId, optionIndex) => { playSound('click'); dispatch({ type: 'RESOLVE_SCENARIO', payload: { scenarioId, optionIndex } }) }, [])
  const togglePause = useCallback(() => dispatch({ type: 'TOGGLE_PAUSE' }), [])
  const setSpeed = useCallback((s) => dispatch({ type: 'SET_SPEED', payload: s }), [])
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

  useEffect(() => {
    if (state.screen === 'playing' && prevScreen.current !== 'playing') {
      if (!isMuted()) startMusic()
    }
    if (state.screen === 'gameOver' && prevScreen.current !== 'gameOver') {
      stopMusic()
      playSound('gameOver')
    }
    if (state.screen === 'title' && prevScreen.current !== 'title') {
      stopMusic()
    }
    prevScreen.current = state.screen
  }, [state.screen])

  // Update ambient music based on danger level
  useEffect(() => {
    if (state.screen === 'playing') {
      const maxRisk = Math.max(state.jurisdiction, state.continuity, state.surveillance)
      updateDanger(maxRisk)
    }
  }, [state.jurisdiction, state.continuity, state.surveillance, state.screen])

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

  // Colleague arrival/expiry sounds
  const prevColleagueCount = useRef(state.colleagueQueue?.length || 0)
  const prevIgnored = useRef(state.ignoredScenarios || 0)
  useEffect(() => {
    const count = state.colleagueQueue?.length || 0
    if (count > prevColleagueCount.current) {
      playSound('colleagueArrive')
    }
    prevColleagueCount.current = count
  }, [state.colleagueQueue?.length])

  useEffect(() => {
    const ignored = state.ignoredScenarios || 0
    if (ignored > prevIgnored.current) {
      playSound('colleagueExpire')
    }
    prevIgnored.current = ignored
  }, [state.ignoredScenarios])

  // Spacebar to toggle pause
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Space' && state.screen === 'playing' && e.target === document.body) {
        e.preventDefault()
        togglePause()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [state.screen, togglePause])

  return {
    state,
    actions: {
      startGame,
      restartGame,
      migrateTool,
      runBackup,
      auditData,
      runFundraiser,
      pizzaParty,
      downgradeTool,
      installTool,
      resolveScenario,
      togglePause,
      setSpeed,
      clearShake,
    },
  }
}
