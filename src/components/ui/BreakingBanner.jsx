const severityStyles = {
  minor: 'bg-terminal-surface text-terminal-text',
  major: 'bg-amber-glow text-terminal-bg',
  critical: 'bg-danger text-terminal-bg',
}

export default function BreakingBanner({ visible, severity = 'major' }) {
  if (!visible) return null

  return (
    <div
      className={`relative w-full overflow-hidden origin-top animate-breaking-in ${severityStyles[severity]}`}
      role="status"
      aria-live="assertive"
    >
      <div className="font-mono font-bold text-center uppercase tracking-[0.3em] text-lg py-3">
        Breaking News
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
        }}
      />
    </div>
  )
}
