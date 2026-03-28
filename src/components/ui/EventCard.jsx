import Button from './Button'

const severityBorders = {
  minor: 'border-terminal-muted',
  major: 'border-amber-glow',
  critical: 'border-danger',
}

const severityAccents = {
  minor: 'text-terminal-muted',
  major: 'text-amber-glow',
  critical: 'text-danger',
}

export default function EventCard({ event, onAcknowledge }) {
  const { headline, flavourText, effectSummary, severity = 'minor' } = event

  return (
    <div className={`animate-slide-up bg-terminal-surface border-2 ${severityBorders[severity]} rounded-lg p-6 max-w-lg w-full`}>
      <div className={`border-t-[3px] border-double ${severityBorders[severity]} pt-3 mb-3`}>
        <div className={`font-mono text-xs uppercase tracking-widest mb-3 ${severityAccents[severity]}`}>
          {severity} event
        </div>
      </div>

      <h2 className="font-mono uppercase font-bold text-2xl text-terminal-text tracking-wide mb-3">
        {headline}
      </h2>

      {flavourText && (
        <p className="font-serif italic text-terminal-muted mb-4">{flavourText}</p>
      )}

      <div className={`font-mono text-sm p-3 rounded border ${severityBorders[severity]} bg-terminal-bg mb-5`}>
        {effectSummary}
      </div>

      <Button onClick={onAcknowledge} variant={severity === 'critical' ? 'danger' : 'primary'}>
        Continue
      </Button>
    </div>
  )
}
