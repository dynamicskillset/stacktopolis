import { useRef, useEffect } from 'react'
import { useGame } from './hooks/useGame'
import { useLocalScores } from './hooks/useLocalScores'
import { calculateScore, awardTitle } from './utils/scoring'
import TitleScreen from './components/screens/TitleScreen'
import GameScreen from './components/screens/GameScreen'
import GameOverScreen from './components/screens/GameOverScreen'

function App() {
  const { state, actions } = useGame()
  const { scores, addScore } = useLocalScores()
  const scoreSaved = useRef(false)

  useEffect(() => {
    if (state.screen === 'gameOver' && !scoreSaved.current) {
      const score = calculateScore(state)
      const title = awardTitle(score)
      addScore({
        quarters: score.quarters,
        title: title.label,
        independence: score.independence,
        totalScore: score.totalScore,
        cause: state.gameOverCause,
      })
      scoreSaved.current = true
    }
    if (state.screen !== 'gameOver') {
      scoreSaved.current = false
    }
  }, [state.screen, state.gameOverCause, state.quarter, state.jurisdiction, state.continuity, state.surveillance, state.stack, addScore])

  switch (state.screen) {
    case 'title':
      return <TitleScreen onStartGame={actions.startGame} highScores={scores} />
    case 'playing':
      return <GameScreen state={state} actions={actions} />
    case 'gameOver':
      return <GameOverScreen state={state} onPlayAgain={actions.restartGame} />
    default:
      return <TitleScreen onStartGame={actions.startGame} highScores={scores} />
  }
}

export default App
