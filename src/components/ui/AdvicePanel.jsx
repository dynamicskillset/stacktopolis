import { X } from 'lucide-react'

const ADVICE = {
  jurisdiction: {
    title: 'Reduce Jurisdiction Risk',
    colour: 'text-risk-jurisdiction',
    border: 'border-l-risk-jurisdiction',
    tips: [
      { action: 'Migrate a US tool', detail: 'Click a US-hosted building and choose "Migrate to Safest". Moves to the lowest-risk provider.', cost: '15 budget, 10 morale' },
      { action: 'Avoid US tools', detail: 'When filling an empty plot, choose EU or self-hosted options. Higher cost, lower jurisdiction.' },
      { action: 'Wait for EU regulation', detail: 'Nkechi occasionally brings EU regulation scenarios that reduce jurisdiction on EU tools.' },
    ],
  },
  continuity: {
    title: 'Reduce Continuity Risk',
    colour: 'text-risk-continuity',
    border: 'border-l-risk-continuity',
    tips: [
      { action: 'Run a Backup Drill', detail: 'Click any building and choose "Backup Drill". Reduces continuity by 8 points.', cost: '10 budget' },
      { action: 'Diversify providers', detail: 'Having multiple tools from the same provider increases lock-in. Spread across different vendors.' },
      { action: 'Migrate away from lock-in', detail: 'Click a building with high continuity risk and migrate to a safer option.' },
    ],
  },
  surveillance: {
    title: 'Reduce Surveillance Risk',
    colour: 'text-risk-surveillance',
    border: 'border-l-risk-surveillance',
    tips: [
      { action: 'Audit Data Practices', detail: 'Click any building and choose "Audit Data Practices". Reduces surveillance by 8 points.', cost: '8 morale' },
      { action: 'Replace US tools', detail: 'US tools generate passive surveillance drift. Self-hosted tools have zero surveillance.' },
      { action: 'Respond to Priya', detail: 'Priya (Security Analyst) brings scenarios that can reduce surveillance if you choose wisely.' },
    ],
  },
  budget: {
    title: 'Increase Budget',
    colour: 'text-amber-glow',
    border: 'border-l-amber-glow',
    tips: [
      { action: 'Quarterly regen', detail: 'Budget increases by 5 each quarter automatically. Survive and it recovers.' },
      { action: 'Accept grants', detail: 'Nkechi (Funder) sometimes brings grant opportunities worth +15 to +20 budget.' },
      { action: 'Choose cheaper tools', detail: 'US tools are often free or cheap (negative budget cost). The trade-off is higher risk.' },
    ],
  },
  morale: {
    title: 'Increase Morale',
    colour: 'text-green-glow',
    border: 'border-l-green-glow',
    tips: [
      { action: 'Respond to Sam', detail: 'Sam (Staff Rep) brings morale scenarios. Choosing supportive options boosts morale.' },
      { action: 'Do not ignore colleagues', detail: 'Every ignored colleague costs 5 morale on top of their scenario penalty.' },
      { action: 'Choose popular tools', detail: 'US tools often have positive morale impact (staff already know them). Self-hosted tools cost morale.' },
    ],
  },
}

export default function AdvicePanel({ metric, onClose }) {
  const advice = ADVICE[metric]
  if (!advice) return null

  return (
    <div className="fixed bottom-24 left-0 right-0 z-[200] px-4 pb-2 animate-slide-up pointer-events-none">
      <div className="bg-terminal-surface border border-terminal-border rounded-lg p-4 shadow-xl max-w-2xl mx-auto pointer-events-auto" style={{ boxShadow: '0 -4px 24px rgba(0,0,0,0.6)' }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`font-mono text-sm font-bold uppercase tracking-wider ${advice.colour}`}>
            {advice.title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 min-w-[32px] min-h-[32px] flex items-center justify-center text-terminal-muted hover:text-terminal-text"
            aria-label="Close advice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {advice.tips.map((tip, i) => (
            <div key={i} className={`border-l-2 ${advice.border} pl-3 py-1`}>
              <div className="font-mono text-xs font-semibold text-terminal-text">{tip.action}</div>
              <div className="font-serif text-xs text-terminal-muted">{tip.detail}</div>
              {tip.cost && (
                <div className="font-mono text-xs text-terminal-muted mt-0.5">Cost: {tip.cost}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
