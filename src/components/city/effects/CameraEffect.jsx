export default function CameraEffect() {
  return (
    <svg className="absolute top-0 -right-2 pointer-events-none" width="16" height="14" viewBox="0 0 16 14" aria-hidden="true">
      {/* Camera body */}
      <rect x="2" y="3" width="8" height="5" rx="1" fill="#555" />
      {/* Lens */}
      <circle cx="10" cy="5.5" r="2" fill="#333" stroke="#666" strokeWidth="0.5" />
      <circle cx="10" cy="5.5" r="1" fill="#1a1a1a" />
      {/* Mount arm */}
      <line x1="0" y1="5" x2="2" y2="5" stroke="#555" strokeWidth="1" />
      {/* Recording dot */}
      <circle cx="4" cy="4.5" r="1" fill="#ef4444">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}
