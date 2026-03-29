import { useEffect, useRef } from 'react'
import { TUNING } from '../state/initialState'

export function useGameClock(dispatch, isPaused, speed) {
  const accumulatorRef = useRef(0)
  const lastTimeRef = useRef(null)

  useEffect(() => {
    if (isPaused) {
      lastTimeRef.current = null
      return
    }

    let rafId
    function loop(timestamp) {
      if (lastTimeRef.current !== null) {
        const delta = (timestamp - lastTimeRef.current) * speed
        accumulatorRef.current += delta
        while (accumulatorRef.current >= TUNING.tickIntervalMs) {
          dispatch({ type: 'TICK' })
          accumulatorRef.current -= TUNING.tickIntervalMs
        }
      }
      lastTimeRef.current = timestamp
      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(rafId)
      lastTimeRef.current = null
    }
  }, [isPaused, speed, dispatch])
}
