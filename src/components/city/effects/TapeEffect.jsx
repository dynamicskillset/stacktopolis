export default function TapeEffect() {
  return (
    <svg className="absolute inset-0 pointer-events-none w-full h-full" viewBox="0 0 80 100" aria-hidden="true">
      {/* Diagonal caution tape stripes */}
      <line x1="0" y1="25" x2="80" y2="75" stroke="#f59e0b" strokeWidth="3" opacity="0.5" />
      <line x1="0" y1="40" x2="80" y2="90" stroke="#f59e0b" strokeWidth="3" opacity="0.4" />
      <line x1="10" y1="10" x2="80" y2="60" stroke="#f59e0b" strokeWidth="3" opacity="0.3" />
    </svg>
  )
}
