export default function RunningPeople() {
  return (
    <svg className="absolute bottom-3 left-0 right-0 pointer-events-none" width="80" height="16" viewBox="0 0 80 16" aria-hidden="true">
      {/* Person 1 — running right */}
      <g opacity="0.7">
        <circle cx="15" cy="4" r="2" fill="#dce3eb" />
        <line x1="15" y1="6" x2="15" y2="11" stroke="#dce3eb" strokeWidth="1" />
        <line x1="15" y1="11" x2="12" y2="15" stroke="#dce3eb" strokeWidth="1">
          <animate attributeName="x2" values="12;18;12" dur="0.3s" repeatCount="indefinite" />
        </line>
        <line x1="15" y1="11" x2="18" y2="15" stroke="#dce3eb" strokeWidth="1">
          <animate attributeName="x2" values="18;12;18" dur="0.3s" repeatCount="indefinite" />
        </line>
        <animate attributeName="transform" type="translate" values="0,0;50,0;0,0" dur="4s" repeatCount="indefinite" />
      </g>
      {/* Person 2 — running left, staggered */}
      <g opacity="0.5">
        <circle cx="60" cy="4" r="2" fill="#dce3eb" />
        <line x1="60" y1="6" x2="60" y2="11" stroke="#dce3eb" strokeWidth="1" />
        <line x1="60" y1="11" x2="57" y2="15" stroke="#dce3eb" strokeWidth="1">
          <animate attributeName="x2" values="57;63;57" dur="0.25s" repeatCount="indefinite" />
        </line>
        <line x1="60" y1="11" x2="63" y2="15" stroke="#dce3eb" strokeWidth="1">
          <animate attributeName="x2" values="63;57;63" dur="0.25s" repeatCount="indefinite" />
        </line>
        <animate attributeName="transform" type="translate" values="0,0;-40,0;0,0" dur="3.5s" begin="0.8s" repeatCount="indefinite" />
      </g>
    </svg>
  )
}
