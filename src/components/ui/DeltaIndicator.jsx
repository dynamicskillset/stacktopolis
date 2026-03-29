import { useEffect, useRef, useState } from 'react'

export default function DeltaIndicator({ value, label }) {
  const prevValue = useRef(value)
  const [delta, setDelta] = useState(null)
  const [key, setKey] = useState(0)

  useEffect(() => {
    const diff = Math.round(value) - Math.round(prevValue.current)
    if (diff !== 0) {
      setDelta(diff)
      setKey(k => k + 1)
    }
    prevValue.current = value
  }, [value])

  if (delta === null) return null

  const isPositive = delta > 0
  const colour = label === 'Budget' || label === 'Morale'
    ? (isPositive ? 'text-green-glow' : 'text-danger')
    : (isPositive ? 'text-danger' : 'text-green-glow')

  return (
    <span
      key={key}
      className={`absolute -top-1 right-0 font-mono text-xs font-bold animate-delta-float pointer-events-none ${colour}`}
    >
      {isPositive ? '+' : ''}{delta}
    </span>
  )
}
