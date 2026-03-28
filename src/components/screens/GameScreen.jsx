import { useMemo } from 'react'
import NewsTicker from '../layout/NewsTicker'
import CityGrid from '../city/CityGrid'
import DecisionPanel from '../layout/DecisionPanel'
import ControlPanel from '../city/ControlPanel'
import Skyline from '../city/Skyline'
import Advisor from '../ui/Advisor'
import Tutorial from '../shared/Tutorial'
import { useAdvisor } from '../../hooks/useAdvisor'
import { useTutorial } from '../../hooks/useTutorial'

function getDangerLevel(state) {
  return Math.max(state.jurisdiction, state.continuity, state.surveillance)
}

function getVignetteStyle(dangerLevel) {
  if (dangerLevel < 30) return { '--vignette-colour': 'rgba(10, 14, 20, 0)' }
  if (dangerLevel < 60) {
    const intensity = (dangerLevel - 30) / 30
    return { '--vignette-colour': `rgba(60, 20, 0, ${0.15 * intensity})` }
  }
  if (dangerLevel < 80) {
    const intensity = (dangerLevel - 60) / 20
    return { '--vignette-colour': `rgba(100, 15, 0, ${0.15 + 0.15 * intensity})` }
  }
  return { '--vignette-colour': 'rgba(120, 10, 0, 0.35)' }
}

const PHASE_LABELS = {
  build: { step: '1', label: 'Choose a Tool', description: 'Pick a tool for your organisation.' },
  event: { step: '2', label: 'Breaking News', description: 'A random event strikes your stack.' },
  manage: { step: '3', label: 'Manage Risk', description: 'Spend resources or move on.' },
}

export default function GameScreen({ state, actions }) {
  const dangerLevel = getDangerLevel(state)
  const isGlitching = dangerLevel >= 70
  const vignetteStyle = useMemo(() => getVignetteStyle(dangerLevel), [dangerLevel])
  const advisorLine = useAdvisor(state)
  const tutorial = useTutorial()
  const phaseInfo = PHASE_LABELS[state.phase]

  return (
    <div
      className={`min-h-screen flex flex-col relative crt-scanlines ${state.shakeScreen ? 'animate-shake' : ''}`}
      style={{ backgroundColor: '#0a0e14' }}
    >
      <Skyline dangerLevel={dangerLevel} />

      <div
        className={`vignette-overlay ${dangerLevel >= 60 ? 'animate-vignette-pulse' : ''}`}
        style={vignetteStyle}
      />

      {state.flashColour && (
        <div
          className="absolute inset-0 z-50 pointer-events-none animate-flash"
          style={{
            backgroundColor: state.flashColour === 'red'
              ? 'rgba(239, 68, 68, 0.35)'
              : 'rgba(245, 158, 11, 0.25)',
          }}
        />
      )}

      <NewsTicker headlines={state.pastHeadlines} />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-3 p-3 sm:p-4 overflow-y-auto relative z-10">
        {/* Left column: City + Advisor (3/5 on desktop) */}
        <section className="lg:col-span-3 min-h-0 flex flex-col">
          <h2 className={`font-mono text-xs uppercase tracking-widest text-terminal-muted mb-2 ${isGlitching ? 'animate-glitch' : ''}`}>
            Your Organisation
          </h2>
          <CityGrid stack={state.stack} />
          <Advisor line={advisorLine} />
        </section>

        {/* Right column: Phase indicator + Decision panel (2/5 on desktop) */}
        <section className="lg:col-span-2 min-h-0 flex flex-col gap-3">
          {/* Phase step indicator */}
          {phaseInfo && (
            <div className="flex items-center gap-3 bg-terminal-surface/60 rounded-lg px-4 py-3 border border-terminal-border" role="status" aria-live="polite">
              <div className="flex items-center gap-1.5">
                {['1', '2', '3'].map((step) => (
                  <div
                    key={step}
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${
                      step === phaseInfo.step
                        ? 'bg-amber-glow text-terminal-bg scale-110'
                        : step < phaseInfo.step
                          ? 'bg-terminal-border text-terminal-muted'
                          : 'bg-terminal-surface text-terminal-muted border border-terminal-border'
                    }`}
                    aria-current={step === phaseInfo.step ? 'step' : undefined}
                  >
                    {step}
                  </div>
                ))}
              </div>
              <div className="min-w-0">
                <div className="font-mono text-sm font-bold text-amber-glow uppercase tracking-wider">
                  {phaseInfo.label}
                </div>
                <div className="font-serif text-xs text-terminal-muted">
                  {phaseInfo.description}
                </div>
              </div>
            </div>
          )}

          <DecisionPanel
            phase={state.phase}
            currentNeed={state.currentNeed}
            currentEvent={state.currentEvent}
            actions={actions}
            state={state}
          />
        </section>
      </main>

      <ControlPanel
        jurisdiction={state.jurisdiction}
        continuity={state.continuity}
        surveillance={state.surveillance}
        budget={state.budget}
        morale={state.morale}
        quarter={state.quarter}
      />

      {tutorial.isActive && (
        <Tutorial step={tutorial.step} onNext={tutorial.nextStep} onDismiss={tutorial.dismiss} />
      )}
    </div>
  )
}
