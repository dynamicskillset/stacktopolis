import { Shield, RefreshCw, Eye, Coins, Heart } from 'lucide-react'
import RiskMetre from '../ui/RiskMetre'
import ResourceBadge from '../ui/ResourceBadge'

export default function StatusBar({ jurisdiction, continuity, surveillance, budget, morale, quarter }) {
  const maxRisk = Math.max(jurisdiction, continuity, surveillance)

  return (
    <div className="bg-terminal-bg/80 backdrop-blur-sm border-t border-terminal-border p-4 relative z-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex-1 space-y-3">
          <RiskMetre label="Jurisdiction" value={jurisdiction} colour="jurisdiction" icon={Shield} />
          <RiskMetre label="Continuity" value={continuity} colour="continuity" icon={RefreshCw} />
          <RiskMetre label="Surveillance" value={surveillance} colour="surveillance" icon={Eye} />
        </div>

        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <ResourceBadge label="Budget" value={budget} icon={Coins} colour="amber" />
          <ResourceBadge label="Morale" value={morale} icon={Heart} colour="green" />
          <div className="font-mono text-lg font-bold tracking-wider">
            <span className={`${maxRisk >= 75 ? 'text-danger' : 'text-amber-glow'} transition-colors duration-500`}>
              Q{quarter}
            </span>
            <span className="animate-cursor-blink text-amber-glow ml-0.5">_</span>
          </div>
        </div>
      </div>
    </div>
  )
}
