import { useState, useCallback } from 'react'

const STORAGE_KEY = 'stacktopolis-scores'
const MAX_SCORES = 10

function loadScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const data = JSON.parse(raw)
    return Array.isArray(data.scores) ? data.scores : []
  } catch {
    return []
  }
}

function saveScores(scores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, scores }))
  } catch {
    // localStorage unavailable
  }
}

export function useLocalScores() {
  const [scores, setScores] = useState(loadScores)

  const addScore = useCallback((score) => {
    setScores((prev) => {
      const updated = [...prev, { ...score, date: new Date().toISOString() }]
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, MAX_SCORES)
      saveScores(updated)
      return updated
    })
  }, [])

  const clearScores = useCallback(() => {
    setScores([])
    saveScores([])
  }, [])

  return { scores, addScore, clearScores }
}
