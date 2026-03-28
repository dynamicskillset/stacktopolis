import NewsTicker from '../layout/NewsTicker'
import TechStack from '../layout/TechStack'
import DecisionPanel from '../layout/DecisionPanel'
import StatusBar from '../layout/StatusBar'

export default function GameScreen({ state, actions }) {
  return (
    <div
      className={`min-h-screen bg-terminal-bg flex flex-col ${state.shakeScreen ? 'animate-shake' : ''}`}
    >
      <NewsTicker headlines={state.pastHeadlines} />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-y-auto">
        <section className="min-h-0">
          <h2 className="font-mono text-xs uppercase tracking-widest text-terminal-muted mb-3">
            Your Stack
          </h2>
          <TechStack stack={state.stack} />
        </section>

        <section className="min-h-0">
          <DecisionPanel
            phase={state.phase}
            currentNeed={state.currentNeed}
            currentEvent={state.currentEvent}
            actions={actions}
            state={state}
          />
        </section>
      </main>

      <StatusBar
        jurisdiction={state.jurisdiction}
        continuity={state.continuity}
        surveillance={state.surveillance}
        budget={state.budget}
        morale={state.morale}
        quarter={state.quarter}
      />
    </div>
  )
}
