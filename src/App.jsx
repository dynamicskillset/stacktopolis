import { useState, useCallback } from 'react'
import { useGame } from './hooks/useGame'
import { useLocalScores } from './hooks/useLocalScores'
import TitleScreen from './components/screens/TitleScreen'
import GameScreen from './components/screens/GameScreen'
import GameOverScreen from './components/screens/GameOverScreen'
import SoundToggle from './components/ui/SoundToggle'
import MobileGate from './components/ui/MobileGate'

function App() {
  const { state, actions } = useGame()
  const { scores, addScore } = useLocalScores()
  const [scoreSubmitted, setScoreSubmitted] = useState(false)

  const handleSubmitScore = useCallback((scoreData) => {
    addScore(scoreData)
    setScoreSubmitted(true)
  }, [addScore])

  // Reset submitted flag when leaving game over
  if (state.screen !== 'gameOver' && scoreSubmitted) {
    setScoreSubmitted(false)
  }

  let screen
  switch (state.screen) {
    case 'title':
      screen = <TitleScreen onStartGame={actions.startGame} highScores={scores} />
      break
    case 'playing':
      screen = <GameScreen state={state} actions={actions} />
      break
    case 'gameOver':
      screen = (
        <GameOverScreen
          state={state}
          onPlayAgain={actions.restartGame}
          onSubmitScore={handleSubmitScore}
          scoreSubmitted={scoreSubmitted}
          existingScores={scores}
        />
      )
      break
    default:
      screen = <TitleScreen onStartGame={actions.startGame} highScores={scores} />
  }

  return (
    <>
      <MobileGate />
      <div className="hidden lg:block">
        <SoundToggle />
        {screen}
      </div>
    </>
  )
}

export default App
