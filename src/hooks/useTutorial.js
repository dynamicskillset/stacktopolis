import { useState, useCallback } from 'react'

const STORAGE_KEY = 'stacktopolis-tutorial-done'

export function useTutorial() {
  const [step, setStep] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) ? null : 0
    } catch {
      return 0
    }
  })

  const isActive = step !== null

  const nextStep = useCallback(() => {
    setStep(prev => {
      if (prev === null) return null
      if (prev >= 4) {
        // Tutorial complete
        try { localStorage.setItem(STORAGE_KEY, '1') } catch {}
        return null
      }
      return prev + 1
    })
  }, [])

  const dismiss = useCallback(() => {
    setStep(null)
    try { localStorage.setItem(STORAGE_KEY, '1') } catch {}
  }, [])

  return { step, isActive, nextStep, dismiss }
}
