import { useState, useEffect, useRef } from 'react'
import { getAdvisorLine, ADVISOR_LINES } from '../data/advisor'

const MILESTONE_QUARTERS = [5, 10, 15, 20]

export function useAdvisor(state) {
  const [line, setLine] = useState(null)
  const prevState = useRef(null)

  useEffect(() => {
    const prev = prevState.current
    prevState.current = {
      phase: state.phase,
      stackLength: state.stack.length,
      quarter: state.quarter,
      jurisdiction: state.jurisdiction,
      continuity: state.continuity,
      surveillance: state.surveillance,
      budget: state.budget,
      morale: state.morale,
    }

    if (!prev) return

    const maxRisk = Math.max(state.jurisdiction, state.continuity, state.surveillance)
    const prevMaxRisk = Math.max(prev.jurisdiction, prev.continuity, prev.surveillance)

    // Priority: critical risk > milestone > tool select > event reaction > resource warnings

    // 1. Risk crossed 90 (critical)
    if (maxRisk >= 90 && prevMaxRisk < 90) {
      setLine(getAdvisorLine('riskCritical'))
      return
    }

    // 2. Quarter milestones
    if (state.quarter !== prev.quarter && MILESTONE_QUARTERS.includes(state.quarter)) {
      const index = MILESTONE_QUARTERS.indexOf(state.quarter)
      // Use the specific milestone line for this quarter
      const milestoneLine = ADVISOR_LINES.quarterMilestone[index]
      if (milestoneLine) {
        setLine(milestoneLine)
        return
      }
    }

    // 3. Tool was just selected (stack grew)
    if (state.stack.length > prev.stackLength) {
      const newest = state.stack[state.stack.length - 1]
      if (newest.region === 'us') {
        setLine(getAdvisorLine('toolSelectUs'))
      } else if (newest.region === 'eu') {
        setLine(getAdvisorLine('toolSelectEu'))
      } else if (newest.region === 'self') {
        setLine(getAdvisorLine('toolSelectSelf'))
      }
      return
    }

    // 4. Event just acknowledged (phase changed to 'manage')
    if (state.phase === 'manage' && prev.phase === 'event') {
      // Check if things got better or worse
      const gotBetter = (
        state.budget > prev.budget + 5 ||
        state.morale > prev.morale + 5 ||
        maxRisk < prevMaxRisk - 3
      )
      if (gotBetter) {
        setLine(getAdvisorLine('positiveEvent'))
        return
      }

      // Give contextual manage advice based on highest risk
      if (maxRisk >= 40) {
        const risks = [
          { lens: 'Jurisdiction', value: state.jurisdiction, category: 'manageJurisdiction' },
          { lens: 'Continuity', value: state.continuity, category: 'manageContinuity' },
          { lens: 'Surveillance', value: state.surveillance, category: 'manageSurveillance' },
        ]
        const highest = risks.sort((a, b) => b.value - a.value)[0]
        setLine(getAdvisorLine(highest.category))
      } else {
        setLine(getAdvisorLine('manageBalanced'))
      }
      return
    }

    // 5. Risk crossed 70 (high)
    if (maxRisk >= 70 && prevMaxRisk < 70) {
      setLine(getAdvisorLine('riskHigh'))
      return
    }

    // 6. Resource warnings
    if (state.budget < 20 && prev.budget >= 20) {
      setLine(getAdvisorLine('budgetLow'))
      return
    }

    if (state.morale < 20 && prev.morale >= 20) {
      setLine(getAdvisorLine('moraleLow'))
      return
    }
  }, [state.phase, state.stack.length, state.quarter, state.jurisdiction, state.continuity, state.surveillance, state.budget, state.morale])

  return line
}
