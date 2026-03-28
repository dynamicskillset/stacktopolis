import { Shield, RefreshCw, Eye, Coins, Heart } from 'lucide-react'
import RiskMetre from '../ui/RiskMetre'
import ResourceBadge from '../ui/ResourceBadge'

export default function StatusBar({ jurisdiction, continuity, surveillance, budget, morale, quarter }) {
  return (
    <div className="bg-terminal-bg border-t border-terminal-border p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex-1 space-y-3">
          <RiskMetre label="Jurisdiction" value={jurisdiction} colour="jurisdiction" icon={Shield} />
          <RiskMetre label="Continuity" value={continuity} colour="continuity" icon={RefreshCw} />
          <RiskMetre label="Surveillance" value={surveillance} colour="surveillance" icon={Eye} />
        </div>

        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <ResourceBadge label="Budget" value={budget} icon={Coins} colour="amber" />
          <ResourceBadge label="Morale" value={morale} icon={Heart} colour="green" />
          <div className="font-mono text-amber-glow text-lg font-bold tracking-wider">
            Q{quarter}
          </div>
        </div>
      </div>
    </div>
  )
}
