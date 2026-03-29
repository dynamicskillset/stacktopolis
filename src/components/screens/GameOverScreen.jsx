import { calculateScore, awardTitle } from '../../utils/scoring'
import { GAME_OVER_MESSAGES } from '../../data/gameOverMessages'
import Button from '../ui/Button'
import Attribution from '../shared/Attribution'
import GaugeDial from '../city/GaugeDial'
import Skyline from '../city/Skyline'
import InitialsEntry from '../ui/InitialsEntry'

const MAX_HIGH_SCORES = 10

export default function GameOverScreen({ state, onPlayAgain, onSubmitScore, scoreSubmitted, existingScores = [] }) {
  const score = calculateScore(state)
  const title = awardTitle(score)
  const gameOverMessage = GAME_OVER_MESSAGES[state.gameOverCause] || GAME_OVER_MESSAGES.budget

  // Only prompt for initials if score qualifies for top 20
  const qualifiesForHighScore = existingScores.length < MAX_HIGH_SCORES ||
    score.totalScore > (existingScores[existingScores.length - 1]?.totalScore || 0)

  function handleInitials(initials) {
    onSubmitScore({
      initials,
      quarters: score.quarters,
      title: title.label,
      independence: score.independence,
      totalScore: score.totalScore,
      cause: state.gameOverCause,
      difficulty: state.difficulty,
    })
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 animate-fade-in crt-scanlines bg-terminal-bg">
      <Skyline dangerLevel={100} />

      {/* TechFreedom banner — top of page */}
      <div className="w-full max-w-2xl relative z-10 mb-4 px-4 py-3 rounded-lg bg-risk-surveillance/10 border border-risk-surveillance/30 text-center animate-fade-in">
        <p className="font-serif text-sm text-terminal-text mb-1">If any of this felt uncomfortably familiar, it was meant to.</p>
        <a
          href="https://techfreedom.eu"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm font-bold text-risk-surveillance underline hover:text-terminal-text transition-colors"
        >
          Assess your real tech stack at TechFreedom.eu
        </a>
      </div>

      <div className="w-full max-w-2xl bg-terminal-surface/95 border border-terminal-border rounded p-8 relative z-10 backdrop-blur-sm">
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
          className="mb-8 animate-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h3 className="font-mono text-xs uppercase tracking-wider text-terminal-muted mb-4 text-center">
            Risk Assessment
          </h3>
          <div className="flex justify-center gap-8">
            <GaugeDial label="Jurisdiction" value={state.jurisdiction} colour="var(--color-risk-jurisdiction)" />
            <GaugeDial label="Continuity" value={state.continuity} colour="var(--color-risk-continuity)" />
            <GaugeDial label="Surveillance" value={state.surveillance} colour="var(--color-risk-surveillance)" />
          </div>
        </div>

        <div className="border-t border-terminal-border mb-6" />

        {/* Initials entry or Play Again */}
        <div
          className="text-center animate-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          {qualifiesForHighScore && !scoreSubmitted ? (
            <>
              <p className="font-mono text-xs text-amber-glow uppercase tracking-wider mb-3">
                New high score!
              </p>
              <InitialsEntry onSubmit={handleInitials} />
            </>
          ) : (
            <div>
              {scoreSubmitted && (
                <p className="font-mono text-xs text-green-glow uppercase tracking-wider mb-4">
                  Score recorded
                </p>
              )}
              <Button onClick={onPlayAgain} className="px-8 py-3 text-base">
                Play Again
              </Button>
            </div>
          )}
        </div>

        <div style={{ animationDelay: '500ms' }} className="animate-slide-up">
          <Attribution />
        </div>
      </div>
    </div>
  )
}
