import { useMemo, useState, useCallback, useEffect } from 'react'
import NewsTicker from '../layout/NewsTicker'
import CityGrid from '../city/CityGrid'
import CityAmbience from '../city/CityAmbience'
import BuildingInspector from '../city/BuildingInspector'
import ToolPicker from '../city/ToolPicker'
import ColleagueQueue from '../colleagues/ColleagueQueue'
import ControlPanel from '../city/ControlPanel'
import Skyline from '../city/Skyline'
import Advisor from '../ui/Advisor'
import PauseOverlay from '../ui/PauseOverlay'
import GuidedTour from '../ui/GuidedTour'
import { useAdvisor } from '../../hooks/useAdvisor'
import { getAdvisorLine } from '../../data/advisor'

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

const METRIC_ADVICE_KEYS = {
  jurisdiction: 'adviceJurisdiction',
  continuity: 'adviceContinuity',
  surveillance: 'adviceSurveillance',
  budget: 'adviceBudget',
  morale: 'adviceMorale',
}

export default function GameScreen({ state, actions }) {
  const dangerLevel = getDangerLevel(state)
  const isGlitching = dangerLevel >= 70
  const vignetteStyle = useMemo(() => getVignetteStyle(dangerLevel), [dangerLevel])
  const advisorLine = useAdvisor(state)
  const [manualLine, setManualLine] = useState(null)
  const [showHelp, setShowHelp] = useState(false)
  const [inspectedTool, setInspectedTool] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const handleSelectTool = useCallback((tool) => {
    setSelectedCategory(null)
    setInspectedTool(prev => prev?.id === tool.id ? null : tool)
  }, [])
  const handleClickEmpty = useCallback((categoryId) => {
    setInspectedTool(null)
    setSelectedCategory(prev => prev === categoryId ? null : categoryId)
  }, [])
  const handleInstallTool = useCallback((needId, optionId) => {
    actions.installTool(needId, optionId)
    setSelectedCategory(null)
  }, [actions])
  const handleClickMetric = useCallback((metric) => {
    const key = METRIC_ADVICE_KEYS[metric]
    if (key) setManualLine(getAdvisorLine(key))
  }, [])

  // Guided tour — show on first play, auto-pause
  const [showTour, setShowTour] = useState(() => {
    try { return !localStorage.getItem('stacktopolis-toured') } catch { return true }
  })
  useEffect(() => {
    if (showTour && !state.isPaused) actions.togglePause()
  }, [showTour])
  const handleTourComplete = useCallback(() => {
    setShowTour(false)
    try { localStorage.setItem('stacktopolis-toured', '1') } catch {}
    if (state.isPaused) actions.togglePause()
  }, [state.isPaused, actions])

  // Manual line overrides auto advisor line
  const displayLine = manualLine || advisorLine
  // Clear manual line after it's been shown
  if (manualLine && manualLine !== advisorLine) {
    // Will clear after Advisor's linger timeout via the next advisorLine change
  }

  return (
    <div
      className={`min-h-screen flex flex-col relative crt-scanlines bg-terminal-bg ${state.shakeScreen ? 'animate-shake' : ''}`}
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
        {/* Left column: City + Inspector + Advisor */}
        <section className="lg:col-span-3 min-h-0 flex flex-col" aria-label="City grid and advisor">
          <h2 className={`font-mono text-xs uppercase tracking-widest text-terminal-muted mb-2 ${isGlitching ? 'animate-glitch' : ''}`}>
            {state.orgName}
          </h2>
          <div className="relative">
            <CityGrid
              stack={state.stack}
              onSelectTool={handleSelectTool}
              selectedToolId={inspectedTool?.id}
              onClickEmpty={handleClickEmpty}
            />
            <CityAmbience
              stack={state.stack}
              morale={state.morale}
              jurisdiction={state.jurisdiction}
              continuity={state.continuity}
              surveillance={state.surveillance}
            />
          </div>
          {inspectedTool && (
            <BuildingInspector
              tool={inspectedTool}
              onClose={() => setInspectedTool(null)}
              actions={actions}
              budget={state.budget}
              morale={state.morale}
            />
          )}
          {selectedCategory && (
            <ToolPicker
              categoryId={selectedCategory}
              onInstall={handleInstallTool}
              onClose={() => setSelectedCategory(null)}
            />
          )}
          <Advisor line={displayLine} />
        </section>

        {/* Right column: Colleague queue */}
        <section className="lg:col-span-2 min-h-0 flex flex-col gap-3 overflow-y-auto" aria-label="Colleague interactions">
          <ColleagueQueue
            queue={state.colleagueQueue}
            gameTime={state.gameTime}
            onResolve={actions.resolveScenario}
            isPaused={state.isPaused}
          />
        </section>
      </main>

      {/* Help popup */}
      {showHelp && (
        <div
          className="absolute inset-0 z-50 flex items-end justify-end p-4 pb-24"
          onClick={() => setShowHelp(false)}
          role="dialog"
          aria-label="Help and shortcuts"
        >
          <div
            className="bg-terminal-surface border border-terminal-border rounded-lg p-4 max-w-xs animate-fade-in"
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
          >
            <h3 className="font-mono text-xs font-bold text-terminal-text uppercase tracking-wider mb-3">Controls</h3>
            <div className="space-y-1.5 font-mono text-xs text-terminal-muted">
              <div><span className="text-terminal-text font-bold">Space</span> — pause / resume</div>
              <div><span className="text-terminal-text font-bold">Click building</span> — inspect and manage</div>
              <div><span className="text-terminal-text font-bold">Click empty plot</span> — install a tool</div>
              <div><span className="text-terminal-text font-bold">Click gauge</span> — get advice from Cassandra</div>
              <div><span className="text-terminal-text font-bold">1× 2× 3×</span> — game speed</div>
            </div>
          </div>
        </div>
      )}

      {/* Action bar */}
      <div className="relative z-10 px-4 py-2 flex items-center justify-center border-t border-terminal-border bg-terminal-bg/50">
        <button
          onClick={() => setShowHelp(prev => !prev)}
          className="absolute right-3 font-mono text-xs w-7 h-7 rounded-full border border-terminal-border text-terminal-muted hover:text-terminal-text hover:border-terminal-text transition-colors"
          aria-label="Show keyboard shortcuts"
          title="Keyboard shortcuts & help"
        >
          ?
        </button>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {(() => {
            const currentYear = Math.floor((state.quarter - 1) / 4) + 1
            const usedThisYear = state.lastFundraiserYear >= currentYear
            const canAfford = state.morale >= 8
            return (
              <button
                onClick={actions.runFundraiser}
                disabled={!canAfford || usedThisYear}
                className="font-mono text-xs px-3 py-1.5 rounded border border-green-glow/40 text-green-glow hover:bg-green-glow/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                title={usedThisYear ? 'Already used this year' : ''}
              >
                {usedThisYear ? 'Fundraiser used (1/yr)' : 'Fundraiser (−8 morale, +12 budget)'}
              </button>
            )
          })()}
          {(() => {
            const cooldown = state.quarter - (state.lastPizzaPartyQuarter || 0) < 2
            const canAfford = state.budget >= 8
            return (
              <button
                onClick={actions.pizzaParty}
                disabled={!canAfford || cooldown}
                className="font-mono text-xs px-3 py-1.5 rounded border border-amber-glow/40 text-amber-glow hover:bg-amber-glow/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                title={cooldown ? 'Available every other quarter' : ''}
              >
                {cooldown ? 'Pizza party (cooldown)' : 'Pizza Party (−8 budget, +10 morale)'}
              </button>
            )
          })()}
          <button
            onClick={() => actions.runBackup(null)}
            disabled={state.budget < 10}
            className="font-mono text-xs px-3 py-1.5 rounded border border-risk-continuity/40 text-risk-continuity hover:bg-risk-continuity/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Backup Drill (−10 budget, −8 continuity risk)
          </button>
        </div>
      </div>

      <ControlPanel
        jurisdiction={state.jurisdiction}
        continuity={state.continuity}
        surveillance={state.surveillance}
        budget={state.budget}
        morale={state.morale}
        quarter={state.quarter}
        gameTime={state.gameTime}
        speed={state.speed}
        isPaused={state.isPaused}
        onSetSpeed={actions.setSpeed}
        onTogglePause={actions.togglePause}
        onClickMetric={handleClickMetric}
      />

      {state.isPaused && !showTour && <PauseOverlay onResume={actions.togglePause} />}
      {showTour && <GuidedTour onComplete={handleTourComplete} />}
    </div>
  )
}
