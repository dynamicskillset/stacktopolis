import { Shield, Trophy } from 'lucide-react'
import Button from '../ui/Button'
import Attribution from '../shared/Attribution'

function HighScoreTable({ scores }) {
  if (!scores || scores.length === 0) return null

  return (
    <div className="w-full max-w-sm mt-8">
      <div className="flex items-center gap-2 mb-3 justify-center">
        <Trophy className="w-4 h-4 text-amber-glow" />
        <h2 className="font-mono text-xs uppercase tracking-widest text-amber-glow">
          High Scores
        </h2>
      </div>
      <div className="bg-terminal-surface border border-terminal-border rounded overflow-hidden">
        {scores.slice(0, 5).map((score, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-4 py-2 border-b border-terminal-border last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-terminal-muted w-4">{i + 1}.</span>
              <div>
                <span className="font-mono text-sm text-terminal-text">{score.title}</span>
                <span className="font-mono text-xs text-terminal-muted ml-2">
                  Q{score.quarters}
                </span>
              </div>
            </div>
            <span className="font-mono text-sm font-bold text-amber-glow">{score.totalScore}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TitleScreen({ onStartGame, highScores }) {
  return (
    <div className="min-h-screen bg-terminal-bg flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="flex flex-col items-center text-center flex-1 justify-center">
        <Shield className="w-20 h-20 text-amber-glow mb-8" />

        <h1 className="font-mono text-5xl font-bold text-amber-glow tracking-widest mb-4">
          STACKTOPOLIS
        </h1>

        <p className="font-serif text-lg text-terminal-muted italic mb-8">
          A satirical survival game about digital sovereignty
        </p>

        <div className="flex gap-6 justify-center text-sm font-mono uppercase tracking-wider mb-8">
          <span className="text-risk-jurisdiction">Jurisdiction</span>
          <span className="text-risk-continuity">Continuity</span>
          <span className="text-risk-surveillance">Surveillance</span>
        </div>

        <p className="font-serif text-terminal-text max-w-md text-center mb-10 leading-relaxed">
          You are the CTO of a small European charity. Build your tech stack.
          Survive the disasters. How many quarters can you last?
        </p>

        <Button
          onClick={onStartGame}
          className="px-8 py-3 text-base"
        >
          New Game
        </Button>

        <HighScoreTable scores={highScores} />
      </div>

      <Attribution />
    </div>
  )
}
