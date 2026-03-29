export default function WhimsicalDetails({ maxRisk, jurisdiction }) {
  return (
    <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 620 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {/* Cat on a roof — always present, tail swishes */}
      <g opacity="0.3" transform="translate(480, 60)">
        {/* Body */}
        <ellipse cx="0" cy="0" rx="4" ry="2.5" fill="#1A2332" />
        {/* Head */}
        <circle cx="-4" cy="-2" r="2" fill="#1A2332" />
        {/* Ears */}
        <polygon points="-5.5,-4 -4.5,-6 -3.5,-4" fill="#1A2332" />
        <polygon points="-3,-4 -2,-6 -1,-4" fill="#1A2332" />
        {/* Tail — swishes */}
        <path d="M4,0 Q8,-4 6,-6" fill="none" stroke="#1A2332" strokeWidth="0.8" strokeLinecap="round">
          <animate attributeName="d" values="M4,0 Q8,-4 6,-6;M4,0 Q8,2 10,0;M4,0 Q8,-4 6,-6" dur="3s" repeatCount="indefinite" />
        </path>
      </g>

      {/* Pizza scooter — zips across fast */}
      <g opacity="0.3">
        {/* Scooter body */}
        <rect x="0" y="390" width="10" height="5" rx="1" fill="#C62828" />
        {/* Wheels */}
        <circle cx="2" cy="396" r="1.8" fill="#2d3748" />
        <circle cx="9" cy="396" r="1.8" fill="#2d3748" />
        {/* Rider */}
        <circle cx="5" cy="386" r="2" fill="#1A2332" />
        <line x1="5" y1="388" x2="5" y2="390" stroke="#1A2332" strokeWidth="0.8" />
        {/* Pizza box on back */}
        <rect x="10" y="388" width="4" height="3" rx="0.3" fill="#8B7A2F" />
        <animateTransform attributeName="transform" type="translate" values="-20,0;660,0" dur="6s" begin="4s" repeatCount="indefinite" />
      </g>

      {/* Papers flying — appears at high jurisdiction (bureaucracy chaos) */}
      {jurisdiction > 50 && (
        <g opacity="0.2">
          {[0, 1, 2, 3, 4].map(i => (
            <rect
              key={i}
              x={150 + i * 80}
              y={100 + i * 30}
              width="5"
              height="6"
              rx="0.3"
              fill="#E0DDD5"
              stroke="#636B78"
              strokeWidth="0.3"
              transform={`rotate(${15 + i * 25}, ${152 + i * 80}, ${103 + i * 30})`}
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values={`0,0;${10 + i * 5},${-20 - i * 10};${20 + i * 8},0`}
                dur={`${3 + i * 0.5}s`}
                begin={`${i * 0.8}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
        </g>
      )}

      {/* HELP flag waving from building window — high risk */}
      {maxRisk > 70 && (
        <g opacity="0.4" transform="translate(200, 150)">
          {/* Flag pole */}
          <line x1="0" y1="0" x2="0" y2="-12" stroke="#636B78" strokeWidth="0.6" />
          {/* Flag — waving */}
          <path d="M0,-12 L10,-11 L10,-6 L0,-7 Z" fill="#C62828">
            <animate attributeName="d" values="M0,-12 L10,-11 L10,-6 L0,-7 Z;M0,-12 L10,-10 L10,-7 L0,-7 Z;M0,-12 L10,-11 L10,-6 L0,-7 Z" dur="1s" repeatCount="indefinite" />
          </path>
          <text x="2" y="-8" fill="#FFFFFF" fontSize="3" fontFamily="monospace" fontWeight="bold">HELP</text>
        </g>
      )}
    </svg>
  )
}
