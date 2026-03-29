import { useState, useEffect, useRef } from 'react'
import { getAdvisorLine, ADVISOR_LINES } from '../data/advisor'

const MILESTONE_QUARTERS = [5, 10, 15, 20]
const HINT_DELAY_TICKS = 12 // ~6 seconds

export function useAdvisor(state) {
  const [line, setLine] = useState(null)
  const prevState = useRef(null)
  const shownHints = useRef(new Set())
  const welcomeFired = useRef(false)

  // Fire welcome line shortly after game starts
  useEffect(() => {
    if (state.screen === 'playing' && !welcomeFired.current) {
      welcomeFired.current = true
      const timer = setTimeout(() => {
        setLine(getAdvisorLine('welcome'))
      }, 1500)
      return () => clearTimeout(timer)
    }
    if (state.screen !== 'playing') {
      welcomeFired.current = false
      shownHints.current = new Set()
    }
  }, [state.screen])

  // Fire idle hints after a delay
  useEffect(() => {
    if (state.screen !== 'playing') return
    if (state.gameTime < HINT_DELAY_TICKS) return

    if (!shownHints.current.has('clickEmpty') && state.stack.length < 12) {
      shownHints.current.add('clickEmpty')
      const timer = setTimeout(() => {
        setLine(getAdvisorLine('hintClickEmpty'))
      }, 8000)
      return () => clearTimeout(timer)
    }

    if (!shownHints.current.has('clickBuilding') && state.stack.length > 0) {
      shownHints.current.add('clickBuilding')
      const timer = setTimeout(() => {
        setLine(getAdvisorLine('hintClickBuilding'))
      }, 14000)
      return () => clearTimeout(timer)
    }
  }, [state.screen, state.gameTime > HINT_DELAY_TICKS])

  // Event-driven lines
  useEffect(() => {
    const prev = prevState.current
    prevState.current = {
      stackLength: state.stack.length,
      quarter: state.quarter,
      jurisdiction: state.jurisdiction,
      continuity: state.continuity,
      surveillance: state.surveillance,
      budget: state.budget,
      morale: state.morale,
      colleagueCount: state.colleagueQueue?.length || 0,
      resolvedScenarios: state.resolvedScenarios || 0,
      ignoredScenarios: state.ignoredScenarios || 0,
    }

    if (!prev) return

    const maxRisk = Math.max(state.jurisdiction, state.continuity, state.surveillance)
    const prevMaxRisk = Math.max(prev.jurisdiction, prev.continuity, prev.surveillance)

    // 1. Risk crossed 90 (critical)
    if (maxRisk >= 90 && prevMaxRisk < 90) {
      setLine(getAdvisorLine('riskCritical'))
      return
    }

    // 2. Colleague ignored
    const currIgnored = state.ignoredScenarios || 0
    if (currIgnored > (prev.ignoredScenarios || 0)) {
      setLine(getAdvisorLine('colleagueIgnored'))
      return
    }

    // 3. Colleague resolved
    const currResolved = state.resolvedScenarios || 0
    if (currResolved > (prev.resolvedScenarios || 0)) {
      setLine(getAdvisorLine('colleagueResolved'))
      return
    }

    // 4. New colleague arrived
    const currColleagueCount = state.colleagueQueue?.length || 0
    if (currColleagueCount > (prev.colleagueCount || 0)) {
      // First-ever colleague gets a tutorial hint
      if (!shownHints.current.has('colleague')) {
        shownHints.current.add('colleague')
        setLine(getAdvisorLine('hintColleague'))
        return
      }
      const newest = state.colleagueQueue[state.colleagueQueue.length - 1]
      if (newest?.scenario?.priority >= 4) {
        setLine(getAdvisorLine('colleagueCrisis'))
        return
      }
      if (currColleagueCount >= 3) {
        setLine(getAdvisorLine('colleagueArrived'))
        return
      }
    }

    // 5. Quarter milestones
    if (state.quarter !== prev.quarter && MILESTONE_QUARTERS.includes(state.quarter)) {
      const index = MILESTONE_QUARTERS.indexOf(state.quarter)
      const milestoneLine = ADVISOR_LINES.quarterMilestone[index]
      if (milestoneLine) {
        setLine(milestoneLine)
        return
      }
    }

    // 6. Tool installed (stack grew)
    if (state.stack.length > prev.stackLength) {
      const newest = state.stack[state.stack.length - 1]
      if (newest.region === 'us' && newest.surveillance >= 10 && Math.random() < 0.6) {
        setLine(getAdvisorLine('revealBadSurveillance'))
      } else if (newest.region === 'us') {
        setLine(getAdvisorLine('toolSelectUs'))
      } else if (newest.region === 'eu') {
        setLine(getAdvisorLine('toolSelectEu'))
      } else if (newest.region === 'self') {
        setLine(getAdvisorLine('toolSelectSelf'))
      }
      return
    }

    // 7. Risk crossed 70 (high)
    if (maxRisk >= 70 && prevMaxRisk < 70) {
      setLine(getAdvisorLine('riskHigh'))
      return
    }

    // 8. Resource warnings
    if (state.budget < 20 && prev.budget >= 20) {
      setLine(getAdvisorLine('budgetLow'))
      return
    }

    if (state.morale < 20 && prev.morale >= 20) {
      setLine(getAdvisorLine('moraleLow'))
      return
    }
  }, [state.stack.length, state.quarter, state.jurisdiction, state.continuity, state.surveillance, state.budget, state.morale, state.colleagueQueue?.length, state.resolvedScenarios, state.ignoredScenarios])

  return line
}
