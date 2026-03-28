import { useRef, useEffect } from 'react'
import { useGame } from './hooks/useGame'
import { useLocalScores } from './hooks/useLocalScores'
import { calculateScore, awardTitle } from './utils/scoring'
import TitleScreen from './components/screens/TitleScreen'
import GameScreen from './components/screens/GameScreen'
import GameOverScreen from './components/screens/GameOverScreen'
import SoundToggle from './components/ui/SoundToggle'

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
        difficulty: state.difficulty,
      })
      scoreSaved.current = true
    }
    if (state.screen !== 'gameOver') {
      scoreSaved.current = false
    }
  }, [state.screen, state.gameOverCause, state.quarter, state.jurisdiction, state.continuity, state.surveillance, state.stack, state.difficulty, addScore])

  let screen
  switch (state.screen) {
    case 'title':
      screen = <TitleScreen onStartGame={actions.startGame} highScores={scores} />
      break
    case 'playing':
      screen = <GameScreen state={state} actions={actions} />
      break
    case 'gameOver':
      screen = <GameOverScreen state={state} onPlayAgain={actions.restartGame} />
      break
    default:
      screen = <TitleScreen onStartGame={actions.startGame} highScores={scores} />
  }

  return (
    <>
      <SoundToggle />
      {screen}
    </>
  )
}

export default App
