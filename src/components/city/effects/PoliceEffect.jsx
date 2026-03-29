export default function PoliceEffect() {
  return (
    <svg className="absolute bottom-4 -left-1 pointer-events-none" width="22" height="14" viewBox="0 0 28 18" aria-hidden="true">
      {/* Car body — isometric */}
      <polygon points="4,12 14,7 24,12 14,17" fill="#1a2848" />
      <polygon points="4,12 4,10 14,5 14,7" fill="#0f1a30" />
      <polygon points="14,7 14,5 24,10 24,12" fill="#1a2848" />
      {/* Roof */}
      <polygon points="8,9 14,6 20,9 14,12" fill="#2a3858" />
      {/* Flashing lights */}
      <circle cx="11" cy="7" r="1.5" fill="#3b82f6">
        <animate attributeName="opacity" values="1;0;1" dur="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="17" cy="7" r="1.5" fill="#ef4444">
        <animate attributeName="opacity" values="0;1;0" dur="0.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}
