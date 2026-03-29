export default function WalkingPeople() {
  return (
    <svg className="absolute bottom-0 left-0 right-0 pointer-events-none" height="20" viewBox="0 0 600 20" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      {/* Person 1 — walking right, slow */}
      <g opacity="0.35">
        <circle cx="80" cy="6" r="2.5" fill="#1A2332" />
        <line x1="80" y1="9" x2="80" y2="15" stroke="#1A2332" strokeWidth="1.2" />
        <line x1="80" y1="15" x2="77" y2="19" stroke="#1A2332" strokeWidth="1">
          <animate attributeName="x2" values="77;83;77" dur="0.6s" repeatCount="indefinite" />
        </line>
        <line x1="80" y1="15" x2="83" y2="19" stroke="#1A2332" strokeWidth="1">
          <animate attributeName="x2" values="83;77;83" dur="0.6s" repeatCount="indefinite" />
        </line>
        <animateTransform attributeName="transform" type="translate" values="0,0;500,0;0,0" dur="20s" repeatCount="indefinite" />
      </g>
      {/* Person 2 — walking left, medium */}
      <g opacity="0.3">
        <circle cx="400" cy="6" r="2.5" fill="#1A2332" />
        <line x1="400" y1="9" x2="400" y2="15" stroke="#1A2332" strokeWidth="1.2" />
        <line x1="400" y1="15" x2="397" y2="19" stroke="#1A2332" strokeWidth="1">
          <animate attributeName="x2" values="397;403;397" dur="0.55s" repeatCount="indefinite" />
        </line>
        <line x1="400" y1="15" x2="403" y2="19" stroke="#1A2332" strokeWidth="1">
          <animate attributeName="x2" values="403;397;403" dur="0.55s" repeatCount="indefinite" />
        </line>
        <animateTransform attributeName="transform" type="translate" values="0,0;-350,0;0,0" dur="16s" begin="3s" repeatCount="indefinite" />
      </g>
      {/* Person 3 — walking right, fast */}
      <g opacity="0.25">
        <circle cx="250" cy="6" r="2.5" fill="#1A2332" />
        <line x1="250" y1="9" x2="250" y2="15" stroke="#1A2332" strokeWidth="1.2" />
        <line x1="250" y1="15" x2="247" y2="19" stroke="#1A2332" strokeWidth="1">
          <animate attributeName="x2" values="247;253;247" dur="0.45s" repeatCount="indefinite" />
        </line>
        <line x1="250" y1="15" x2="253" y2="19" stroke="#1A2332" strokeWidth="1">
          <animate attributeName="x2" values="253;247;253" dur="0.45s" repeatCount="indefinite" />
        </line>
        <animateTransform attributeName="transform" type="translate" values="0,0;300,0;0,0" dur="12s" begin="7s" repeatCount="indefinite" />
      </g>
    </svg>
  )
}
