import { calculateScore, awardTitle } from '../../utils/scoring'
import { GAME_OVER_MESSAGES } from '../../data/gameOverMessages'
import Button from '../ui/Button'
import Attribution from '../shared/Attribution'
import RiskMetre from '../ui/RiskMetre'
import { Shield, RefreshCw, Eye } from 'lucide-react'

export default function GameOverScreen({ state, onPlayAgain }) {
  const score = calculateScore(state)
  const title = awardTitle(score)
  const gameOverMessage = GAME_OVER_MESSAGES[state.gameOverCause] || GAME_OVER_MESSAGES.budget

  return (
    <div className="min-h-screen bg-terminal-bg flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl bg-terminal-surface border border-terminal-border rounded p-8">
        {/* Newspaper masthead */}
        <div
          className="flex items-baseline justify-between mb-2 animate-slide-up"
          style={{ animationDelay: '0ms' }}
        >
          <h1 className="font-mono text-2xl font-bold text-amber-glow uppercase tracking-widest">
            The Digital Times
          </h1>
          <span className="font-mono text-xs text-terminal-muted uppercase tracking-wider">
            Final Edition
          </span>
        </div>

        <div className="border-t-2 border-b border-terminal-border mb-6" />

        {/* Headline */}
        <div style={{ animationDelay: '100ms' }} className="animate-slide-up">
          <h2 className="font-serif text-3xl font-bold text-terminal-text leading-tight mb-2">
            {gameOverMessage.headline}
          </h2>
          <p className="font-serif italic text-terminal-muted mb-4">
            {gameOverMessage.subheading}
          </p>
          <p className="font-serif text-sm text-terminal-muted leading-relaxed mb-6">
            {gameOverMessage.body}
          </p>
        </div>

        <div className="border-t border-terminal-border mb-6" />

        {/* Score section */}
        <div
          className="grid grid-cols-2 gap-4 mb-6 animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-terminal-muted">
              Survived
            </span>
            <p className="font-mono text-lg text-terminal-text">
              {score.quarters} quarter{score.quarters !== 1 ? 's' : ''}
            </p>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-terminal-muted">
              Independence
            </span>
            <p className="font-mono text-lg text-terminal-text">{score.independence}%</p>
          </div>

          <div className="col-span-2">
            <span className="font-mono text-xs uppercase tracking-wider text-terminal-muted">
              Title
            </span>
            <p className="font-mono text-lg text-amber-glow">{title.label}</p>
            <p className="font-serif text-xs text-terminal-muted mt-1 leading-relaxed">
              {title.description}
            </p>
          </div>

          <div className="col-span-2">
            <span className="font-mono text-xs uppercase tracking-wider text-terminal-muted">
              Final Score
            </span>
            <p className="font-mono text-2xl font-bold text-amber-glow">{score.totalScore}</p>
          </div>
        </div>

        <div className="border-t border-terminal-border mb-6" />

        {/* Risk breakdown */}
        <div
          className="space-y-3 mb-8 animate-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h3 className="font-mono text-xs uppercase tracking-wider text-terminal-muted mb-2">
            Risk Assessment
          </h3>
          <RiskMetre
            label="Jurisdiction"
            value={state.jurisdiction}
            colour="jurisdiction"
            icon={Shield}
          />
          <RiskMetre
            label="Continuity"
            value={state.continuity}
            colour="continuity"
            icon={RefreshCw}
          />
          <RiskMetre
            label="Surveillance"
            value={state.surveillance}
            colour="surveillance"
            icon={Eye}
          />
        </div>

        {/* Play again */}
        <div
          className="text-center animate-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <Button
            onClick={onPlayAgain}
            className="px-8 py-3 text-base"
          >
            Play Again
          </Button>
        </div>

        <div style={{ animationDelay: '500ms' }} className="animate-slide-up">
          <Attribution />
        </div>
      </div>
    </div>
  )
}
