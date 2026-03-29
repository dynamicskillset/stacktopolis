import React from 'react'

/**
 * Isometric building SVG components for Stacktopolis city grid.
 *
 * Each of the 12 tool categories has a distinctive silhouette so buildings
 * are identifiable even in greyscale. The `region` parameter selects a
 * colour palette: US = glass/steel blue, EU = warm brick, Self-hosted =
 * weathered green-grey.
 *
 * All buildings share an 80x100 viewBox and sit on a consistent isometric
 * diamond base with a ground shadow.
 */

const REGION_PALETTES = {
  us: {
    primary: '#4a90d9',    // glass blue
    secondary: '#2c5f8a',  // darker glass
    accent: '#8ab4e8',     // reflection highlight
    base: '#1a3a5c',       // foundation
  },
  eu: {
    primary: '#c17f4a',    // warm brick
    secondary: '#8b5e3c',  // darker brick
    accent: '#e0a870',     // light brick
    base: '#5c3a20',       // foundation
  },
  self: {
    primary: '#5a7a5a',    // weathered green-grey
    secondary: '#3d5a3d',  // darker
    accent: '#7a9a7a',     // lighter
    base: '#2a3a2a',       // foundation
  },
}

// --------------------------------------------------------------------------
// Shared base shadow — every building sits on this
// --------------------------------------------------------------------------
function BaseShadow() {
  return <ellipse cx="40" cy="92" rx="30" ry="8" fill="rgba(0,0,0,0.3)" />
}

// Animated window light — slow flicker for ambient life
function WinLight({ x, y, w = 4, h = 5, dur = '5s', begin = '0s' }) {
  return (
    <rect x={x} y={y} width={w} height={h} fill="#ffdd66" opacity="0.3">
      <animate attributeName="opacity" values="0.3;0.6;0.2;0.5;0.3" dur={dur} begin={begin} repeatCount="indefinite" />
    </rect>
  )
}

// --------------------------------------------------------------------------
// 1. EMAIL — Tall rectangular building with mail slot / envelope on front
// --------------------------------------------------------------------------
function EmailBuilding({ palette }) {
  return (
    <svg viewBox="0 0 80 100" width="100" height="120">
      <BaseShadow />
      {/* Left face */}
      <polygon points="12,55 40,40 40,88 12,88" fill={palette.secondary} />
      {/* Right face */}
      <polygon points="40,40 68,55 68,88 40,88" fill={palette.primary} />
      {/* Roof */}
      <polygon points="12,55 40,40 68,55 40,70" fill={palette.accent} />
      {/* Envelope shape on right face */}
      <polygon points="46,60 58,55 58,67 46,72" fill={palette.base} opacity="0.6" />
      {/* Envelope flap */}
      <polygon points="46,60 52,64 58,55" fill={palette.accent} opacity="0.5" />
      {/* Left face windows */}
      <rect x="18" y="62" width="5" height="6" fill={palette.accent} opacity="0.4" />
      <rect x="28" y="58" width="5" height="6" fill={palette.accent} opacity="0.4" />
      <rect x="18" y="74" width="5" height="6" fill={palette.accent} opacity="0.4" />
      <rect x="28" y="70" width="5" height="6" fill={palette.accent} opacity="0.4" />
      {/* Door on left face */}
      <rect x="21" y="81" width="6" height="7" fill={palette.base} opacity="0.7" />
      <WinLight x={19} y={63} dur="6s" begin="0.5s" />
      <WinLight x={29} y={59} dur="5s" begin="2s" />
      <WinLight x={47} y={61} dur="7s" begin="1s" />
    </svg>
  )
}

// --------------------------------------------------------------------------
// 2. VIDEO — Building with broadcast antenna / tower on top
// --------------------------------------------------------------------------
function VideoBuilding({ palette }) {
  return (
    <svg viewBox="0 0 80 100" width="100" height="120">
      <BaseShadow />
      {/* Left face */}
      <polygon points="15,60 40,48 40,88 15,88" fill={palette.secondary} />
      {/* Right face */}
      <polygon points="40,48 65,60 65,88 40,88" fill={palette.primary} />
      {/* Roof */}
      <polygon points="15,60 40,48 65,60 40,72" fill={palette.accent} />
      {/* Antenna mast */}
      <line x1="40" y1="48" x2="40" y2="18" stroke={palette.base} strokeWidth="2" />
      {/* Antenna cross-bars */}
      <line x1="34" y1="22" x2="46" y2="22" stroke={palette.base} strokeWidth="1.5" />
      <line x1="36" y1="28" x2="44" y2="28" stroke={palette.base} strokeWidth="1.5" />
      {/* Broadcast signal arcs */}
      <path d="M 48,18 Q 52,14 48,10" fill="none" stroke={palette.accent} strokeWidth="1" opacity="0.7" />
      <path d="M 50,20 Q 56,14 50,8" fill="none" stroke={palette.accent} strokeWidth="1" opacity="0.5" />
      {/* Antenna tip light */}
      <circle cx="40" cy="17" r="2" fill={palette.accent} />
      {/* Screen-like windows on right face */}
      <rect x="44" y="56" width="10" height="7" fill={palette.base} opacity="0.5" />
      <rect x="44" y="68" width="10" height="7" fill={palette.base} opacity="0.5" />
      {/* Screen glow */}
      <rect x="45" y="57" width="8" height="5" fill={palette.accent} opacity="0.3" />
      <rect x="45" y="69" width="8" height="5" fill={palette.accent} opacity="0.3" />
      {/* Left face windows */}
      <rect x="20" y="66" width="6" height="5" fill={palette.accent} opacity="0.4" />
      <rect x="30" y="62" width="6" height="5" fill={palette.accent} opacity="0.4" />
      <WinLight x={21} y={67} dur="5.5s" begin="1s" />
      <WinLight x={31} y={63} dur="6.5s" begin="3s" />
    </svg>
  )
}

// --------------------------------------------------------------------------
// 3. CLOUD STORAGE — Wide, boxy warehouse / data hall
// --------------------------------------------------------------------------
function CloudStorageBuilding({ palette }) {
  return (
    <svg viewBox="0 0 80 100" width="100" height="120">
      <BaseShadow />
      {/* Wide and squat — warehouse proportions */}
      {/* Left face */}
      <polygon points="5,62 40,50 40,88 5,88" fill={palette.secondary} />
      {/* Right face */}
      <polygon points="40,50 75,62 75,88 40,88" fill={palette.primary} />
      {/* Roof */}
      <polygon points="5,62 40,50 75,62 40,74" fill={palette.accent} />
      {/* Loading bay door on left face */}
      <rect x="10" y="76" width="10" height="12" fill={palette.base} opacity="0.6" />
      {/* Bay door horizontal slats */}
      <line x1="10" y1="80" x2="20" y2="80" stroke={palette.accent} strokeWidth="0.5" opacity="0.5" />
      <line x1="10" y1="84" x2="20" y2="84" stroke={palette.accent} strokeWidth="0.5" opacity="0.5" />
      {/* Server status lights on right face */}
      <circle cx="48" cy="68" r="1.5" fill="#4aff4a" opacity="0.6" />
      <circle cx="54" cy="70" r="1.5" fill="#4aff4a" opacity="0.6" />
      <circle cx="60" cy="72" r="1.5" fill="#4aff4a" opacity="0.6" />
      <circle cx="66" cy="74" r="1.5" fill="#ff4a4a" opacity="0.6" />
      {/* Ventilation grilles on right face */}
      <line x1="45" y1="78" x2="68" y2="78" stroke={palette.base} strokeWidth="0.5" opacity="0.4" />
      <line x1="45" y1="80" x2="68" y2="80" stroke={palette.base} strokeWidth="0.5" opacity="0.4" />
      <line x1="45" y1="82" x2="68" y2="82" stroke={palette.base} strokeWidth="0.5" opacity="0.4" />
      {/* Cloud wisps on roof */}
      <ellipse cx="36" cy="60" rx="6" ry="3" fill={palette.primary} opacity="0.3" />
      <ellipse cx="42" cy="59" rx="5" ry="3.5" fill={palette.primary} opacity="0.3" />
      <WinLight x={46} y={73} dur="6s" begin="0.5s" />
      <WinLight x={56} y={76} dur="7s" begin="2.5s" />
    </svg>
  )
}

// --------------------------------------------------------------------------
// 4. PROJECT MGMT — Multi-story office building with window grid
// --------------------------------------------------------------------------
function ProjectMgmtBuilding({ palette }) {
  return (
    <svg viewBox="0 0 80 100" width="100" height="120">
      <BaseShadow />
      {/* Tall building — 4 stories */}
      {/* Left face */}
      <polygon points="14,45 40,30 40,88 14,88" fill={palette.secondary} />
      {/* Right face */}
      <polygon points="40,30 66,45 66,88 40,88" fill={palette.primary} />
      {/* Roof */}
      <polygon points="14,45 40,30 66,45 40,60" fill={palette.accent} />
      {/* Left face windows — 2 cols x 4 rows */}
      {[0, 1, 2, 3].map(row =>
        [0, 1].map(col => (
          <rect
            key={`l-${row}-${col}`}
            x={18 + col * 9}
            y={52 + row * 9}
            width="5"
            height="5"
            fill={palette.accent}
            opacity="0.4"
          />
        ))
      )}
      {/* Right face windows — 3 cols x 4 rows */}
      {[0, 1, 2, 3].map(row =>
        [0, 1, 2].map(col => (
          <rect
            key={`r-${row}-${col}`}
            x={44 + col * 7}
            y={52 + row * 9}
            width="4"
            height="5"
            fill={palette.accent}
            opacity="0.35"
          />
        ))
      )}
      {/* Floor division lines on right face */}
      {[0, 1, 2].map(i => (
        <line
          key={`floor-${i}`}
          x1="40"
          y1={57 + i * 9}
          x2="66"
          y2={57 + i * 9}
          stroke={palette.base}
          strokeWidth="0.5"
          opacity="0.3"
        />
      ))}
      {/* Rooftop water tank */}
      <rect x="36" y="26" width="8" height="5" fill={palette.base} opacity="0.5" />
    </svg>
  )
}

// --------------------------------------------------------------------------
// 5. CRM — Building with satellite dish and database drum on roof
// --------------------------------------------------------------------------
function CrmBuilding({ palette }) {
  return (
    <svg viewBox="0 0 80 100" width="100" height="120">
      <BaseShadow />
      {/* Left face */}
      <polygon points="14,58 40,45 40,88 14,88" fill={palette.secondary} />
      {/* Right face */}
      <polygon points="40,45 66,58 66,88 40,88" fill={palette.primary} />
      {/* Roof */}
      <polygon points="14,58 40,45 66,58 40,70" fill={palette.accent} />
      {/* Database drum on roof — cylinder */}
      <ellipse cx="40" cy="38" rx="10" ry="4" fill={palette.accent} />
      <rect x="30" y="34" width="20" height="4" fill={palette.primary} />
      <ellipse cx="40" cy="34" rx="10" ry="4" fill={palette.accent} />
      {/* Drum detail line */}
      <ellipse cx="40" cy="36" rx="10" ry="4" fill="none" stroke={palette.base} strokeWidth="0.5" opacity="0.4" />
      {/* Satellite dish on right side of roof */}
      <path d="M 55,48 Q 58,40 52,38" fill="none" stroke={palette.base} strokeWidth="1.5" />
      <circle cx="55" cy="48" r="1.5" fill={palette.base} />
      {/* Windows */}
      <rect x="18" y="65" width="6" height="5" fill={palette.accent} opacity="0.4" />
      <rect x="28" y="62" width="6" height="5" fill={palette.accent} opacity="0.4" />
      <rect x="44" y="63" width="6" height="5" fill={palette.accent} opacity="0.35" />
      <rect x="54" y="66" width="6" height="5" fill={palette.accent} opacity="0.35" />
      {/* Door */}
      <rect x="44" y="80" width="7" height="8" fill={palette.base} opacity="0.6" />
    </svg>
  )
}

// --------------------------------------------------------------------------
// 6. HOSTING — Server rack building, tall and narrow, vents and lights
// --------------------------------------------------------------------------
function HostingBuilding({ palette }) {
  return (
    <svg viewBox="0 0 80 100" width="100" height="120">
      <BaseShadow />
      {/* Tall, narrow tower */}
      {/* Left face */}
      <polygon points="18,40 40,28 40,88 18,88" fill={palette.secondary} />
      {/* Right face */}
      <polygon points="40,28 62,40 62,88 40,88" fill={palette.primary} />
      {/* Roof */}
      <polygon points="18,40 40,28 62,40 40,52" fill={palette.accent} />
      {/* Server rack horizontal lines on right face */}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <line
          key={`vent-${i}`}
          x1="43"
          y1={48 + i * 6}
          x2="59"
          y2={48 + i * 6}
          stroke={palette.base}
          strokeWidth="0.8"
          opacity="0.4"
        />
      ))}
      {/* Status LEDs on right face */}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <circle
          key={`light-${i}`}
          cx="57"
          cy={48 + i * 6}
          r="1.2"
          fill={i === 4 ? '#ff6b4a' : '#4aff4a'}
          opacity="0.7"
        />
      ))}
      {/* Left face vent lines */}
      {[0, 1, 2, 3].map(i => (
        <line
          key={`lvent-${i}`}
          x1="21"
          y1={52 + i * 8}
          x2="37"
          y2={52 + i * 8}
          stroke={palette.accent}
          strokeWidth="0.6"
          opacity="0.3"
        />
      ))}
      {/* Exhaust vent on roof */}
      <rect x="36" y="24" width="8" height="5" fill={palette.base} opacity="0.5" />
      <rect x="37" y="22" width="6" height="3" fill={palette.secondary} opacity="0.6" />
    </svg>
  )
}

// --------------------------------------------------------------------------
// 7. MESSAGING — Building with tall communications mast / antenna
// --------------------------------------------------------------------------
function MessagingBuilding({ palette }) {
  return (
    <svg viewBox="0 0 80 100" width="100" height="120">
      <BaseShadow />
      {/* Squat building base */}
      {/* Left face */}
      <polygon points="12,65 40,55 40,88 12,88" fill={palette.secondary} />
      {/* Right face */}
      <polygon points="40,55 68,65 68,88 40,88" fill={palette.primary} />
      {/* Roof */}
      <polygon points="12,65 40,55 68,65 40,76" fill={palette.accent} />
      {/* Tall communications mast */}
      <line x1="40" y1="55" x2="40" y2="8" stroke={palette.base} strokeWidth="2.5" />
      {/* Mast cross-arms at different heights */}
      <line x1="32" y1="15" x2="48" y2="15" stroke={palette.base} strokeWidth="1.5" />
      <line x1="34" y1="25" x2="46" y2="25" stroke={palette.base} strokeWidth="1.5" />
      <line x1="35" y1="35" x2="45" y2="35" stroke={palette.base} strokeWidth="1.5" />
      <line x1="36" y1="45" x2="44" y2="45" stroke={palette.base} strokeWidth="1" />
      {/* Antenna panels hanging from cross-arms */}
      <rect x="32" y="15" width="3" height="6" fill={palette.secondary} opacity="0.7" />
      <rect x="45" y="15" width="3" height="6" fill={palette.secondary} opacity="0.7" />
      <rect x="34" y="25" width="3" height="5" fill={palette.secondary} opacity="0.7" />
      <rect x="43" y="25" width="3" height="5" fill={palette.secondary} opacity="0.7" />
      {/* Blinking light at top */}
      <circle cx="40" cy="8" r="2.5" fill="#ff4444" opacity="0.8" />
      {/* Chat bubble on right face */}
      <path
        d="M 46,70 L 60,70 L 60,78 L 52,78 L 48,82 L 48,78 L 46,78 Z"
        fill={palette.accent}
        opacity="0.4"
      />
      {/* Dots inside chat bubble */}
      <circle cx="50" cy="74" r="1" fill={palette.base} opacity="0.5" />
      <circle cx="54" cy="74" r="1" fill={palette.base} opacity="0.5" />
      <circle cx="58" cy="74" r="1" fill={palette.base} opacity="0.5" />
    </svg>
  )
}

// --------------------------------------------------------------------------
// 8. OFFICE SUITE — Widest classic office, most windows, corporate HQ
// --------------------------------------------------------------------------
function OfficeSuiteBuilding({ palette }) {
  return (
    <svg viewBox="0 0 80 100" width="100" height="120">
      <BaseShadow />
      {/* Widest building — classic corporate HQ */}
      {/* Left face */}
      <polygon points="5,52 40,38 40,88 5,88" fill={palette.secondary} />
      {/* Right face */}
      <polygon points="40,38 75,52 75,88 40,88" fill={palette.primary} />
      {/* Roof */}
      <polygon points="5,52 40,38 75,52 40,66" fill={palette.accent} />
      {/* Penthouse / top floor setback */}
      <polygon points="18,46 40,36 62,46 40,56" fill={palette.accent} opacity="0.8" />
      <polygon points="18,46 40,56 40,44 18,54" fill={palette.secondary} opacity="0.6" />
      <polygon points="40,56 62,46 62,54 40,44" fill={palette.primary} opacity="0.6" />
      {/* Left face windows — 4 cols x 3 rows */}
      {[0, 1, 2].map(row =>
        [0, 1, 2, 3].map(col => (
          <rect
            key={`ol-${row}-${col}`}
            x={9 + col * 8}
            y={58 + row * 9}
            width="5"
            height="5"
            fill={palette.accent}
            opacity="0.35"
          />
        ))
      )}
      {/* Right face windows — 4 cols x 3 rows */}
      {[0, 1, 2].map(row =>
        [0, 1, 2, 3].map(col => (
          <rect
            key={`or-${row}-${col}`}
            x={44 + col * 7}
            y={58 + row * 9}
            width="4"
            height="5"
            fill={palette.accent}
            opacity="0.3"
          />
        ))
      )}
      {/* Grand entrance on right face */}
      <rect x="48" y="80" width="10" height="8" fill={palette.base} opacity="0.6" />
      <line x1="53" y1="80" x2="53" y2="88" stroke={palette.accent} strokeWidth="0.5" opacity="0.4" />
    </svg>
  )
}

// --------------------------------------------------------------------------
// 9. ANALYTICS — Building with observatory dome and telescope
// --------------------------------------------------------------------------
function AnalyticsBuilding({ palette }) {
  return (
    <svg viewBox="0 0 80 100" width="100" height="120">
      <BaseShadow />
      {/* Left face */}
      <polygon points="14,58 40,46 40,88 14,88" fill={palette.secondary} />
      {/* Right face */}
      <polygon points="40,46 66,58 66,88 40,88" fill={palette.primary} />
      {/* Roof */}
      <polygon points="14,58 40,46 66,58 40,70" fill={palette.accent} />
      {/* Observatory dome */}
      <ellipse cx="40" cy="42" rx="14" ry="6" fill={palette.accent} />
      <path d="M 26,42 Q 26,28 40,28 Q 54,28 54,42" fill={palette.primary} />
      {/* Dome slit / telescope opening */}
      <path d="M 38,28 L 38,42 L 42,42 L 42,28" fill={palette.base} opacity="0.5" />
      {/* Telescope poking out */}
      <line x1="40" y1="32" x2="48" y2="22" stroke={palette.base} strokeWidth="2" />
      <circle cx="49" cy="21" r="2.5" fill={palette.base} opacity="0.7" />
      {/* Bar chart motif on right face */}
      <rect x="46" y="75" width="4" height="13" fill={palette.accent} opacity="0.4" />
      <rect x="52" y="70" width="4" height="18" fill={palette.accent} opacity="0.4" />
      <rect x="58" y="65" width="4" height="23" fill={palette.accent} opacity="0.4" />
      {/* Left face windows */}
      <rect x="18" y="65" width="6" height="5" fill={palette.accent} opacity="0.4" />
      <rect x="28" y="62" width="6" height="5" fill={palette.accent} opacity="0.4" />
    </svg>
  )
}

// --------------------------------------------------------------------------
// 10. PASSWORD — Vault-like building, thick walls, heavy door, reinforced
// --------------------------------------------------------------------------
function PasswordBuilding({ palette }) {
  return (
    <svg viewBox="0 0 80 100" width="100" height="120">
      <BaseShadow />
      {/* Squat, heavy, reinforced building */}
      {/* Left face */}
      <polygon points="10,62 40,52 40,88 10,88" fill={palette.secondary} />
      {/* Right face */}
      <polygon points="40,52 70,62 70,88 40,88" fill={palette.primary} />
      {/* Roof — flat and heavy */}
      <polygon points="10,62 40,52 70,62 40,74" fill={palette.accent} />
      {/* Thick parapet / wall-top edge on left */}
      <polygon points="10,62 40,52 40,55 10,65" fill={palette.secondary} opacity="0.7" />
      {/* Thick parapet / wall-top edge on right */}
      <polygon points="40,52 70,62 70,65 40,55" fill={palette.primary} opacity="0.7" />
      {/* Reinforcement bands on left face */}
      <line x1="10" y1="72" x2="40" y2="62" stroke={palette.base} strokeWidth="1.5" opacity="0.3" />
      <line x1="10" y1="80" x2="40" y2="70" stroke={palette.base} strokeWidth="1.5" opacity="0.3" />
      {/* Heavy vault door on right face */}
      <rect x="47" y="70" width="12" height="18" rx="1" fill={palette.base} opacity="0.7" />
      {/* Door frame inset */}
      <rect x="48" y="71" width="10" height="16" rx="1" fill={palette.secondary} opacity="0.5" />
      {/* Vault wheel / combination lock */}
      <circle cx="53" cy="79" r="4" fill={palette.base} opacity="0.6" />
      <circle cx="53" cy="79" r="2.5" fill={palette.accent} opacity="0.4" />
      {/* Lock spokes */}
      <line x1="53" y1="75" x2="53" y2="83" stroke={palette.accent} strokeWidth="0.7" opacity="0.5" />
      <line x1="49" y1="79" x2="57" y2="79" stroke={palette.accent} strokeWidth="0.7" opacity="0.5" />
      {/* Keyhole centre */}
      <circle cx="53" cy="79" r="1" fill={palette.base} />
      {/* No windows — this is a vault */}
      {/* Corner rivets */}
      <circle cx="14" cy="66" r="1" fill={palette.accent} opacity="0.3" />
      <circle cx="14" cy="84" r="1" fill={palette.accent} opacity="0.3" />
      <circle cx="66" cy="66" r="1" fill={palette.accent} opacity="0.3" />
      <circle cx="66" cy="84" r="1" fill={palette.accent} opacity="0.3" />
    </svg>
  )
}

// --------------------------------------------------------------------------
// 11. SOCIAL MEDIA — Building with megaphone / broadcast horn
// --------------------------------------------------------------------------
function SocialMediaBuilding({ palette }) {
  return (
    <svg viewBox="0 0 80 100" width="100" height="120">
      <BaseShadow />
      {/* Left face */}
      <polygon points="14,58 40,46 40,88 14,88" fill={palette.secondary} />
      {/* Right face */}
      <polygon points="40,46 66,58 66,88 40,88" fill={palette.primary} />
      {/* Roof */}
      <polygon points="14,58 40,46 66,58 40,70" fill={palette.accent} />
      {/* Giant megaphone on roof pointing right */}
      <polygon
        points="30,42 38,38 52,28 56,22 56,34 52,38 38,44"
        fill={palette.primary}
        opacity="0.8"
      />
      {/* Megaphone bell opening */}
      <ellipse cx="56" cy="28" rx="3" ry="6" fill={palette.accent} opacity="0.6" />
      {/* Megaphone mount */}
      <line x1="34" y1="43" x2="34" y2="46" stroke={palette.base} strokeWidth="2" />
      {/* Sound waves */}
      <path d="M 60,28 Q 64,24 60,20" fill="none" stroke={palette.accent} strokeWidth="1" opacity="0.5" />
      <path d="M 63,30 Q 68,24 63,18" fill="none" stroke={palette.accent} strokeWidth="1" opacity="0.4" />
      <path d="M 66,32 Q 72,24 66,16" fill="none" stroke={palette.accent} strokeWidth="1" opacity="0.3" />
      {/* Heart / like icon on left face */}
      <path
        d="M 22,70 Q 22,67 25,67 Q 28,67 28,70 Q 28,74 25,76 Q 22,74 22,70"
        fill={palette.accent}
        opacity="0.4"
      />
      {/* Thumbs-up shape on right face */}
      <rect x="50" y="72" width="4" height="8" rx="1" fill={palette.accent} opacity="0.35" />
      <rect x="48" y="70" width="8" height="4" rx="2" fill={palette.accent} opacity="0.35" />
      {/* Windows */}
      <rect x="18" y="62" width="5" height="4" fill={palette.accent} opacity="0.35" />
      <rect x="30" y="58" width="5" height="4" fill={palette.accent} opacity="0.35" />
      <rect x="44" y="62" width="5" height="4" fill={palette.accent} opacity="0.3" />
      <rect x="56" y="65" width="5" height="4" fill={palette.accent} opacity="0.3" />
    </svg>
  )
}

// --------------------------------------------------------------------------
// 12. AI ASSISTANT — Futuristic / angular, unusual twisted geometry
// --------------------------------------------------------------------------
function AiAssistantBuilding({ palette }) {
  return (
    <svg viewBox="0 0 80 100" width="100" height="120">
      <BaseShadow />
      {/* Unconventional shape — twisted / stacked blocks */}
      {/* Lower section — left face */}
      <polygon points="14,68 40,58 40,88 14,88" fill={palette.secondary} />
      {/* Lower section — right face */}
      <polygon points="40,58 66,68 66,88 40,88" fill={palette.primary} />
      {/* Mid-section — twisted offset, left face */}
      <polygon points="18,48 44,36 44,58 18,68" fill={palette.secondary} opacity="0.9" />
      {/* Mid-section — twisted offset, right face */}
      <polygon points="44,36 62,46 62,68 44,58" fill={palette.primary} opacity="0.9" />
      {/* Upper section — another twist back towards centre */}
      <polygon points="20,30 40,20 40,36 20,46" fill={palette.secondary} opacity="0.8" />
      <polygon points="40,20 60,30 60,46 40,36" fill={palette.primary} opacity="0.8" />
      {/* Angular roof / crown */}
      <polygon points="20,30 40,20 60,30 40,40" fill={palette.accent} />
      {/* Spire */}
      <polygon points="38,20 40,8 42,20" fill={palette.accent} opacity="0.8" />
      {/* Glowing "eye" / sensor on upper section */}
      <ellipse cx="50" cy="37" rx="4" ry="3" fill={palette.base} opacity="0.6" />
      <ellipse cx="50" cy="37" rx="2.5" ry="1.8" fill={palette.accent} opacity="0.7" />
      <circle cx="50" cy="37" r="1" fill="#ffffff" opacity="0.5" />
      {/* Circuit-like patterns on lower right face */}
      <line x1="44" y1="65" x2="58" y2="65" stroke={palette.accent} strokeWidth="0.5" opacity="0.4" />
      <line x1="52" y1="65" x2="52" y2="80" stroke={palette.accent} strokeWidth="0.5" opacity="0.4" />
      <line x1="44" y1="75" x2="52" y2="75" stroke={palette.accent} strokeWidth="0.5" opacity="0.4" />
      <circle cx="52" cy="65" r="1.5" fill={palette.accent} opacity="0.3" />
      <circle cx="52" cy="75" r="1.5" fill={palette.accent} opacity="0.3" />
      {/* Pulsing glow at spire tip */}
      <circle cx="40" cy="8" r="3" fill={palette.accent} opacity="0.3" />
      <circle cx="40" cy="8" r="1.5" fill="#ffffff" opacity="0.4" />
    </svg>
  )
}

// --------------------------------------------------------------------------
// Building registry and public API
// --------------------------------------------------------------------------

const BUILDINGS = {
  'email': EmailBuilding,
  'video': VideoBuilding,
  'storage': CloudStorageBuilding,
  'project': ProjectMgmtBuilding,
  'crm': CrmBuilding,
  'hosting': HostingBuilding,
  'messaging': MessagingBuilding,
  'office': OfficeSuiteBuilding,
  'analytics': AnalyticsBuilding,
  'passwords': PasswordBuilding,
  'social': SocialMediaBuilding,
  'ai': AiAssistantBuilding,
}

/**
 * Return the building JSX for a given tool category and region.
 *
 * @param {string} categoryId  One of the 12 tool-need IDs (e.g. 'email', 'hosting')
 * @param {string} region      'us' | 'eu' | 'self' — defaults to 'us'
 * @returns {JSX.Element|null} Inline SVG element for the building
 */
export function getBuilding(categoryId, region = 'us') {
  const BuildingComponent = BUILDINGS[categoryId]
  const palette = REGION_PALETTES[region]
  if (!BuildingComponent) return null
  return <BuildingComponent palette={palette} />
}

export { REGION_PALETTES }
