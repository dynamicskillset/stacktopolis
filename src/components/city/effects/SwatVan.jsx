export default function SwatVan() {
  return (
    <svg className="absolute -bottom-2 -right-4 pointer-events-none" width="32" height="20" viewBox="0 0 32 20" aria-hidden="true">
      {/* Van body — isometric, dark */}
      <polygon points="4,14 16,8 28,14 28,18 4,18" fill="#1a1a2a" />
      <polygon points="4,14 4,10 16,4 16,8" fill="#111122" />
      <polygon points="16,4 28,10 28,14 16,8" fill="#1a1a2a" />
      {/* SWAT text */}
      <text x="16" y="16" textAnchor="middle" fill="#dce3eb" fontSize="4" fontFamily="monospace" fontWeight="bold">SWAT</text>
      {/* Flashing lights — alternating red/blue */}
      <circle cx="8" cy="9" r="1.5" fill="#ef4444">
        <animate attributeName="opacity" values="1;0;1" dur="0.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="12" cy="7" r="1.5" fill="#3b82f6">
        <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="20" cy="7" r="1.5" fill="#ef4444">
        <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="24" cy="9" r="1.5" fill="#3b82f6">
        <animate attributeName="opacity" values="1;0;1" dur="0.4s" repeatCount="indefinite" />
      </circle>
      {/* Wheels */}
      <circle cx="8" cy="18" r="1.5" fill="#333" />
      <circle cx="24" cy="18" r="1.5" fill="#333" />
    </svg>
  )
}
