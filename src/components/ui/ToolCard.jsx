import { getIcon } from '../../utils/iconMap'

const borderColours = {
  safe: 'border-l-green-glow',
  warning: 'border-l-amber-glow',
  danger: 'border-l-danger',
}

const regionStyles = {
  us: 'bg-red-900/40 text-risk-jurisdiction',
  eu: 'bg-green-900/40 text-green-glow',
  self: 'bg-blue-900/40 text-risk-surveillance',
}

export default function ToolCard({ tool, onClick, selected, riskLevel = 'safe' }) {
  const IconComponent = getIcon(tool.icon)

  return (
    <div
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } } : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`bg-terminal-surface border border-terminal-border ${borderColours[riskLevel]} border-l-4 rounded p-3 transition-all duration-200 hover:bg-terminal-border/30 focus-visible:outline-2 focus-visible:outline-amber-glow focus-visible:outline-offset-2 ${onClick ? 'cursor-pointer' : ''} ${selected ? 'ring-2 ring-amber-glow' : ''}`}
    >
      <div className="flex items-center gap-3">
        <IconComponent className="w-5 h-5 text-terminal-muted shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="font-mono text-sm font-semibold text-terminal-text truncate">
            {tool.name}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-terminal-muted truncate">{tool.provider}</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider ${regionStyles[tool.region] || regionStyles.us}`}>
              {tool.region}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
