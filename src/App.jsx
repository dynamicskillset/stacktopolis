import { useGame } from './hooks/useGame'
import TitleScreen from './components/screens/TitleScreen'
import GameScreen from './components/screens/GameScreen'
import GameOverScreen from './components/screens/GameOverScreen'

function App() {
  const { state, actions } = useGame()

  switch (state.screen) {
    case 'title':
      return <TitleScreen onStartGame={actions.startGame} />
    case 'playing':
      return <GameScreen state={state} actions={actions} />
    case 'gameOver':
      return <GameOverScreen state={state} onPlayAgain={actions.restartGame} />
    default:
      return <TitleScreen onStartGame={actions.startGame} />
  }
}

export default App
