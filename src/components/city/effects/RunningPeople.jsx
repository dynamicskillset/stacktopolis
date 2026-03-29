export default function RunningPeople() {
  return (
    <svg className="absolute bottom-3 left-0 right-0 pointer-events-none" width="80" height="16" viewBox="0 0 80 16" aria-hidden="true">
      {/* Person 1 — running right, exits right */}
      <g opacity="0.6">
        <circle cx="5" cy="4" r="2" fill="#1A2332" />
        <line x1="5" y1="6" x2="5" y2="11" stroke="#1A2332" strokeWidth="1" />
        <line x1="5" y1="11" x2="2" y2="15" stroke="#1A2332" strokeWidth="1">
          <animate attributeName="x2" values="2;8;2" dur="0.3s" repeatCount="indefinite" />
        </line>
        <line x1="5" y1="11" x2="8" y2="15" stroke="#1A2332" strokeWidth="1">
          <animate attributeName="x2" values="8;2;8" dur="0.3s" repeatCount="indefinite" />
        </line>
        <animateTransform attributeName="transform" type="translate" values="-10,0;90,0" dur="3s" repeatCount="indefinite" />
      </g>
      {/* Person 2 — running left, exits left */}
      <g opacity="0.45">
        <circle cx="75" cy="4" r="2" fill="#1A2332" />
        <line x1="75" y1="6" x2="75" y2="11" stroke="#1A2332" strokeWidth="1" />
        <line x1="75" y1="11" x2="72" y2="15" stroke="#1A2332" strokeWidth="1">
          <animate attributeName="x2" values="72;78;72" dur="0.25s" repeatCount="indefinite" />
        </line>
        <line x1="75" y1="11" x2="78" y2="15" stroke="#1A2332" strokeWidth="1">
          <animate attributeName="x2" values="78;72;78" dur="0.25s" repeatCount="indefinite" />
        </line>
        <animateTransform attributeName="transform" type="translate" values="10,0;-90,0" dur="2.5s" begin="1s" repeatCount="indefinite" />
      </g>
    </svg>
  )
}
