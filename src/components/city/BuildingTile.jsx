import { getBuilding } from './buildings'
import { toolRiskLevel } from '../../utils/riskLevel'

const CATEGORY_LABELS = {
  email: 'Email',
  video: 'Video',
  storage: 'Storage',
  project: 'Projects',
  crm: 'CRM',
  hosting: 'Hosting',
  messaging: 'Chat',
  office: 'Office',
  analytics: 'Analytics',
  passwords: 'Passwords',
  social: 'Social',
  ai: 'AI',
}

const LED_COLOURS = {
  safe: 'bg-green-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
}

function SmokeEffect() {
  return (
    <svg className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none" width="40" height="30" viewBox="0 0 40 30" aria-hidden="true">
      <circle cx="12" cy="20" r="5" fill="#7a8fa6" opacity="0.3">
        <animate attributeName="cy" values="20;8;0" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.15;0" dur="3s" repeatCount="indefinite" />
        <animate attributeName="r" values="5;8;10" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="24" cy="22" r="4" fill="#7a8fa6" opacity="0.25">
        <animate attributeName="cy" values="22;10;2" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
        <animate attributeName="opacity" values="0.25;0.12;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
        <animate attributeName="r" values="4;7;9" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      <circle cx="18" cy="18" r="3" fill="#7a8fa6" opacity="0.2">
        <animate attributeName="cy" values="18;6;-2" dur="3.5s" repeatCount="indefinite" begin="1s" />
        <animate attributeName="opacity" values="0.2;0.1;0" dur="3.5s" repeatCount="indefinite" begin="1s" />
        <animate attributeName="r" values="3;6;8" dur="3.5s" repeatCount="indefinite" begin="1s" />
      </circle>
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg className="absolute -top-2 -right-1 pointer-events-none animate-pulse-glow-fast" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <polygon points="7,1 13,12 1,12" fill="#f59e0b" stroke="#0a0e14" strokeWidth="0.5" />
      <text x="7" y="10.5" textAnchor="middle" fill="#0a0e14" fontSize="7" fontWeight="bold">!</text>
    </svg>
  )
}

export default function BuildingTile({ tool, categoryId }) {
  if (!tool) {
    return (
      <div
        className="flex flex-col items-center justify-end"
        aria-label={`Empty plot: ${CATEGORY_LABELS[categoryId]}`}
      >
        <svg viewBox="0 0 80 40" width="80" height="40" role="img" aria-hidden="true">
          <polygon
            points="40,0 80,20 40,40 0,20"
            fill="#111820"
            stroke="#1e2a38"
            strokeWidth="1"
          />
        </svg>
        <span className="text-[8px] font-mono text-terminal-muted uppercase tracking-wider mt-0.5 select-none">
          {CATEGORY_LABELS[categoryId]}
        </span>
      </div>
    )
  }

  const risk = toolRiskLevel(tool)
  const buildingSvg = getBuilding(categoryId, tool.region)

  return (
    <div
      className={`flex flex-col items-center justify-end relative animate-slide-up ${risk === 'danger' ? 'animate-glitch' : ''}`}
      aria-label={`${tool.name} (${(tool.region || '').toUpperCase()}) — ${CATEGORY_LABELS[categoryId]}, risk: ${risk}`}
    >
      {risk === 'danger' && <SmokeEffect />}
      {risk === 'warning' && <WarningIcon />}

      <div role="img" aria-hidden="true" className={risk === 'danger' ? 'opacity-80' : ''}>
        {buildingSvg}
      </div>

      {/* Risk LED indicator */}
      <div
        className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full ${LED_COLOURS[risk]} ${risk !== 'safe' ? 'animate-pulse-glow-fast' : ''}`}
        style={risk !== 'safe' ? { boxShadow: `0 0 6px ${risk === 'danger' ? '#ef4444' : '#f59e0b'}` } : {}}
        aria-hidden="true"
      />

      <span className="text-[9px] font-mono text-terminal-muted text-center truncate w-full mt-0.5 select-none">
        {tool.name}
      </span>
    </div>
  )
}
