import { getBuilding } from './buildings'
import { toolRiskLevel } from '../../utils/riskLevel'
import FireEffect from './effects/FireEffect'
import PoliceEffect from './effects/PoliceEffect'
import CameraEffect from './effects/CameraEffect'
import TapeEffect from './effects/TapeEffect'
import RunningPeople from './effects/RunningPeople'
import SwatVan from './effects/SwatVan'

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
      <circle cx="12" cy="20" r="5" fill="#94a7bb" opacity="0.5">
        <animate attributeName="cy" values="20;8;0" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0.25;0" dur="3s" repeatCount="indefinite" />
        <animate attributeName="r" values="5;8;10" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="24" cy="22" r="4" fill="#94a7bb" opacity="0.45">
        <animate attributeName="cy" values="22;10;2" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
        <animate attributeName="opacity" values="0.45;0.2;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
        <animate attributeName="r" values="4;7;9" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      <circle cx="18" cy="18" r="3" fill="#94a7bb" opacity="0.4">
        <animate attributeName="cy" values="18;6;-2" dur="3.5s" repeatCount="indefinite" begin="1s" />
        <animate attributeName="opacity" values="0.4;0.2;0" dur="3.5s" repeatCount="indefinite" begin="1s" />
      </circle>
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg className="absolute -top-2 -left-1 pointer-events-none animate-pulse-glow-fast" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <polygon points="7,1 13,12 1,12" fill="#f59e0b" stroke="#0a0e14" strokeWidth="0.5" />
      <text x="7" y="10.5" textAnchor="middle" fill="#0a0e14" fontSize="7" fontWeight="bold">!</text>
    </svg>
  )
}

import React from 'react'

function BuildingTile({ tool, categoryId, onClick, isSelected, onClickEmpty }) {
  if (!tool) {
    const Wrapper = onClickEmpty ? 'button' : 'div'
    const interactiveClass = onClickEmpty
      ? 'cursor-pointer transition-all hover:opacity-100 hover:scale-105 focus-visible:outline-2 focus-visible:outline-amber-glow focus-visible:outline-offset-2 animate-empty-plot-pulse'
      : ''

    return (
      <Wrapper
        onClick={onClickEmpty ? () => onClickEmpty(categoryId) : undefined}
        className={`flex flex-col items-center justify-end opacity-70 ${interactiveClass}`}
        aria-label={`Empty plot: ${CATEGORY_LABELS[categoryId]}${onClickEmpty ? '. Click to install a tool.' : ''}`}
      >
        <svg viewBox="0 0 110 70" width="100" height="63" role="img" aria-hidden="true">
          {/* Ground plot */}
          <polygon
            points="55,16 108,42 55,68 2,42"
            fill="var(--color-terminal-surface, #FFFFFF)"
            stroke="#E0DDD5"
            strokeWidth="1"
            strokeDasharray="4,3"
          />
          {/* Weeds and debris — varies by slot */}
          {/* Weed tufts */}
          <g opacity="0.3">
            <path d="M30,38 Q32,32 34,38" fill="none" stroke="#5a7a5a" strokeWidth="0.8" />
            <path d="M32,38 Q33,30 35,38" fill="none" stroke="#5a7a5a" strokeWidth="0.6" />
            <path d="M75,38 Q77,33 79,38" fill="none" stroke="#5a7a5a" strokeWidth="0.7" />
            <path d="M50,50 Q51,45 53,50" fill="none" stroke="#5a7a5a" strokeWidth="0.6" />
            <path d="M60,46 Q62,41 64,46" fill="none" stroke="#5a7a5a" strokeWidth="0.7" />
          </g>
          {/* Cracked foundation / rubble */}
          <g opacity="0.2">
            <line x1="40" y1="35" x2="48" y2="40" stroke="#636B78" strokeWidth="0.5" />
            <line x1="62" y1="37" x2="68" y2="42" stroke="#636B78" strokeWidth="0.4" />
            <rect x="45" y="42" width="3" height="2" rx="0.3" fill="#636B78" transform="rotate(15,46,43)" />
            <rect x="65" y="40" width="2" height="2" rx="0.3" fill="#636B78" transform="rotate(-10,66,41)" />
          </g>
          {/* Available label */}
          <text x="55" y="44" textAnchor="middle" fill="#636B78" fontFamily="monospace" fontSize="7" opacity="0.7">
            AVAILABLE
          </text>
        </svg>
        <span className="text-xs font-mono text-terminal-muted uppercase tracking-wider mt-1 select-none">
          {CATEGORY_LABELS[categoryId]}
        </span>
      </Wrapper>
    )
  }

  const risk = toolRiskLevel(tool)
  const combined = (tool.jurisdiction || 0) + (tool.continuity || 0) + (tool.surveillance || 0)
  const buildingSvg = getBuilding(categoryId, tool.region)

  const Wrapper = onClick ? 'button' : 'div'
  const interactiveClass = onClick
    ? 'cursor-pointer transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-amber-glow focus-visible:outline-offset-2'
    : ''
  const selectedClass = isSelected ? 'ring-2 ring-amber-glow rounded' : ''

  return (
    <Wrapper
      onClick={onClick}
      className={`flex flex-col items-center justify-end relative animate-slide-up ${risk === 'danger' ? 'animate-glitch' : risk === 'safe' ? 'animate-gentle-breathe' : ''} ${interactiveClass} ${selectedClass}`}
      aria-label={`${tool.name} (${(tool.region || '').toUpperCase()}) — ${CATEGORY_LABELS[categoryId]}, risk: ${risk}${onClick ? '. Click to inspect.' : ''}`}
    >
      {/* Progressive visual effects based on combined risk */}
      {tool.degraded && <TapeEffect />}
      {combined > 15 && combined <= 25 && <SmokeEffect />}
      {combined > 25 && combined <= 35 && <><SmokeEffect /><WarningIcon /></>}
      {combined > 35 && <><FireEffect /><RunningPeople /></>}
      {combined > 40 && <SwatVan />}
      {combined <= 15 && risk === 'warning' && <WarningIcon />}
      {tool.region === 'us' && tool.jurisdiction >= 12 && <PoliceEffect />}
      {tool.surveillance >= 14 && <CameraEffect />}

      <div role="img" aria-hidden="true" className={risk === 'danger' ? 'opacity-80' : ''}>
        {buildingSvg}
      </div>

      {/* Risk LED indicator */}
      <div
        className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full ${LED_COLOURS[risk]} ${risk !== 'safe' ? 'animate-pulse-glow-fast' : ''}`}
        style={risk !== 'safe' ? { boxShadow: `0 0 3px ${risk === 'danger' ? '#C62828' : '#EF6C00'}` } : {}}
        aria-hidden="true"
      />

      <span className="text-xs font-mono text-terminal-muted text-center truncate w-full mt-1 select-none">
        {tool.name}
      </span>
    </Wrapper>
  )
}

export default React.memo(BuildingTile)
