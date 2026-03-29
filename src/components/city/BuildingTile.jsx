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
    // Use category to seed visual variety
    const variant = categoryId.charCodeAt(0) % 3

    return (
      <Wrapper
        onClick={onClickEmpty ? () => onClickEmpty(categoryId) : undefined}
        className={`flex flex-col items-center justify-end opacity-70 ${interactiveClass}`}
        aria-label={`Empty plot: ${CATEGORY_LABELS[categoryId]}${onClickEmpty ? '. Click to install a tool.' : ''}`}
      >
        <svg viewBox="0 0 110 90" width="100" height="82" role="img" aria-hidden="true">
          {/* Ground shadow */}
          <ellipse cx="55" cy="80" rx="35" ry="8" fill="rgba(0,0,0,0.08)" />
          {/* Ground plot — cracked earth */}
          <polygon
            points="55,30 108,56 55,82 2,56"
            fill="#e8e2d8"
            stroke="#d0c8b8"
            strokeWidth="0.8"
          />
          {/* Cracks in ground */}
          <g opacity="0.25" stroke="#a09880" strokeWidth="0.5">
            <line x1="35" y1="50" x2="50" y2="58" />
            <line x1="50" y1="58" x2="48" y2="65" />
            <line x1="60" y1="48" x2="72" y2="55" />
            <line x1="55" y1="60" x2="65" y2="68" />
          </g>

          {/* Abandoned building shell — 3 variants */}
          {variant === 0 && (
            <g opacity="0.35">
              {/* Tall narrow ruin */}
              <polygon points="40,28 52,22 52,55 40,58" fill="#b0a898" />
              <polygon points="52,22 64,28 64,52 52,55" fill="#c0b8a8" />
              <polygon points="40,28 44,24 48,30 52,22 56,28 60,25 64,28 64,30 40,30" fill="#c8c0b0" />
              <rect x="44" y="36" width="4" height="5" fill="#8b7a5a" opacity="0.6" />
              <line x1="44" y1="36" x2="48" y2="41" stroke="#6b5a3a" strokeWidth="0.5" />
              <line x1="48" y1="36" x2="44" y2="41" stroke="#6b5a3a" strokeWidth="0.5" />
              <rect x="55" y="34" width="5" height="5" fill="#636B78" opacity="0.15" />
            </g>
          )}
          {variant === 1 && (
            <g opacity="0.35">
              {/* Wide low ruin — like a warehouse */}
              <polygon points="22,44 55,32 55,56 22,62" fill="#b0a898" />
              <polygon points="55,32 88,44 88,58 55,56" fill="#c0b8a8" />
              <polygon points="22,44 30,42 38,46 46,38 55,32 62,38 70,42 78,40 88,44 88,46 22,46" fill="#c8c0b0" />
              <rect x="30" y="48" width="6" height="5" fill="#636B78" opacity="0.15" />
              <rect x="42" y="47" width="6" height="5" fill="#636B78" opacity="0.15" />
              <rect x="62" y="47" width="6" height="5" fill="#8b7a5a" opacity="0.5" />
              <line x1="62" y1="47" x2="68" y2="52" stroke="#6b5a3a" strokeWidth="0.4" />
            </g>
          )}
          {variant === 2 && (
            <g opacity="0.35">
              {/* Corner ruin — L-shaped remains */}
              <polygon points="30,42 48,33 48,55 30,60" fill="#b0a898" />
              <polygon points="48,33 66,42 66,58 48,55" fill="#c0b8a8" />
              <polygon points="30,42 36,38 40,42 44,36 48,33 52,38 56,35 60,40 66,42 66,44 30,44" fill="#c8c0b0" />
              {/* Chimney stub */}
              <rect x="60" y="36" width="3" height="6" fill="#a09888" />
              <rect x="34" y="46" width="5" height="6" fill="#8b7a5a" opacity="0.6" />
              <line x1="34" y1="46" x2="39" y2="52" stroke="#6b5a3a" strokeWidth="0.5" />
              <line x1="39" y1="46" x2="34" y2="52" stroke="#6b5a3a" strokeWidth="0.5" />
            </g>
          )}

          {/* Overgrown weeds — positions vary by variant */}
          <g opacity="0.5">
            <path d={`M${22 + variant * 5},55 Q${24 + variant * 5},42 ${26 + variant * 5},55`} fill="none" stroke="#4a7a3a" strokeWidth="1" />
            <path d={`M${25 + variant * 3},55 Q${26 + variant * 3},40 ${28 + variant * 3},55`} fill="none" stroke="#5a8a4a" strokeWidth="0.8" />
            <path d={`M${18 + variant * 6},56 Q${21 + variant * 6},46 ${23 + variant * 6},56`} fill="none" stroke="#3a6a2a" strokeWidth="0.7" />
            <path d={`M${68 - variant * 4},55 Q${70 - variant * 4},44 ${72 - variant * 4},55`} fill="none" stroke="#5a8a4a" strokeWidth="0.8" />
            <path d={`M${78 - variant * 6},52 Q${80 - variant * 6},42 ${82 - variant * 6},52`} fill="none" stroke="#4a7a3a" strokeWidth="0.9" />
            <path d={`M${40 + variant * 8},68 Q${42 + variant * 8},58 ${44 + variant * 8},68`} fill="none" stroke="#5a8a4a" strokeWidth="0.7" />
            <path d={`M${60 - variant * 5},65 Q${62 - variant * 5},55 ${64 - variant * 5},65`} fill="none" stroke="#4a7a3a" strokeWidth="0.8" />
            <path d={`M${74 - variant * 8},62 Q${75 - variant * 8},54 ${77 - variant * 8},62`} fill="none" stroke="#3a6a2a" strokeWidth="0.6" />
            {variant === 1 && <path d="M44,60 Q46,50 48,60" fill="none" stroke="#4a7a3a" strokeWidth="0.9" />}
            {variant === 2 && <path d="M84,50 Q86,42 88,50" fill="none" stroke="#5a8a4a" strokeWidth="0.7" />}
          </g>

          {/* Scattered rubble */}
          <g opacity="0.3">
            <rect x="50" y="62" width="4" height="3" rx="0.5" fill="#a09888" transform="rotate(20,52,63)" />
            <rect x="34" y="64" width="3" height="2" rx="0.3" fill="#b0a898" transform="rotate(-15,35,65)" />
            <rect x="74" y="58" width="3" height="2" rx="0.3" fill="#a09888" transform="rotate(10,75,59)" />
            <circle cx="62" cy="70" r="1.5" fill="#b0a898" />
            <circle cx="44" cy="62" r="1" fill="#a09888" />
          </g>

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
      {/* Building SVG — rendered first so effects overlay on top */}
      <div role="img" aria-hidden="true" className={risk === 'danger' ? 'opacity-80' : ''}>
        {buildingSvg}
      </div>

      {/* Effects overlaid ON the building */}
      {tool.degraded && <TapeEffect />}
      {combined > 15 && combined <= 25 && <SmokeEffect />}
      {combined > 25 && combined <= 35 && <><SmokeEffect /><WarningIcon /></>}
      {combined > 35 && <><FireEffect /><RunningPeople /></>}
      {combined > 40 && <SwatVan />}
      {combined <= 15 && risk === 'warning' && <WarningIcon />}
      {tool.region === 'us' && tool.jurisdiction >= 12 && <PoliceEffect />}
      {tool.surveillance >= 14 && <CameraEffect />}

      {/* Region flag on the roof */}
      <svg className="absolute top-3 left-1 pointer-events-none" width="16" height="13" viewBox="0 0 12 10" aria-hidden="true">
        <line x1="1" y1="0" x2="1" y2="10" stroke="#636B78" strokeWidth="0.5" />
        {tool.region === 'us' && (
          <g>
            {/* Red warning flag — hostile jurisdiction */}
            <rect x="2" y="0" width="9" height="6" fill="#C62828" />
            <text x="6.5" y="4.5" textAnchor="middle" fill="#FFFFFF" fontSize="4" fontWeight="bold" fontFamily="sans-serif">!</text>
          </g>
        )}
        {tool.region === 'eu' && (
          <g>
            <rect x="2" y="0" width="9" height="6" fill="#2B6AB0" />
            <circle cx="6.5" cy="3" r="0.5" fill="#D4A843" />
            <circle cx="5" cy="1.5" r="0.5" fill="#D4A843" />
            <circle cx="8" cy="1.5" r="0.5" fill="#D4A843" />
            <circle cx="5" cy="4.5" r="0.5" fill="#D4A843" />
            <circle cx="8" cy="4.5" r="0.5" fill="#D4A843" />
          </g>
        )}
        {tool.region === 'self' && (
          <polygon points="2,0 10,3 2,6" fill="#2E7D32" opacity="0.7" />
        )}
      </svg>

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
