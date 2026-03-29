export default function WhimsicalDetails({ maxRisk, jurisdiction, surveillance, continuity }) {
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
          <line x1="0" y1="0" x2="0" y2="-12" stroke="#636B78" strokeWidth="0.6" />
          <path d="M0,-12 L10,-11 L10,-6 L0,-7 Z" fill="#C62828">
            <animate attributeName="d" values="M0,-12 L10,-11 L10,-6 L0,-7 Z;M0,-12 L10,-10 L10,-7 L0,-7 Z;M0,-12 L10,-11 L10,-6 L0,-7 Z" dur="1s" repeatCount="indefinite" />
          </path>
          <text x="2" y="-8" fill="#FFFFFF" fontSize="3" fontFamily="monospace" fontWeight="bold">HELP</text>
        </g>
      )}

      {/* Rubber duck on a rooftop — pure whimsy, always present */}
      <g opacity="0.4" transform="translate(380, 85)">
        <ellipse cx="0" cy="0" rx="3.5" ry="2.5" fill="#D4A843" />
        <circle cx="-3" cy="-2" r="2" fill="#D4A843" />
        <circle cx="-3.5" cy="-2.5" r="0.6" fill="#1A2332" />
        <polygon points="-5,-2 -6.5,-1.5 -5,-1" fill="#B85400" />
      </g>

      {/* Binoculars figure — surveillance > 40, person spying from rooftop */}
      {surveillance > 40 && (
        <g opacity="0.3" transform="translate(520, 120)">
          <circle cx="0" cy="0" r="2.5" fill="#1A2332" />
          <line x1="0" y1="3" x2="0" y2="10" stroke="#1A2332" strokeWidth="1.2" />
          <line x1="0" y1="10" x2="-2" y2="15" stroke="#1A2332" strokeWidth="1" />
          <line x1="0" y1="10" x2="2" y2="15" stroke="#1A2332" strokeWidth="1" />
          {/* Binoculars */}
          <circle cx="-2" cy="-1" r="1.5" fill="none" stroke="#1A2332" strokeWidth="0.6" />
          <circle cx="2" cy="-1" r="1.5" fill="none" stroke="#1A2332" strokeWidth="0.6" />
          <line x1="-0.5" y1="-1" x2="0.5" y2="-1" stroke="#1A2332" strokeWidth="0.4" />
          {/* Looking left-right */}
          <animateTransform attributeName="transform" type="translate" values="520,120;525,120;520,120;515,120;520,120" dur="6s" repeatCount="indefinite" />
        </g>
      )}

      {/* Eye of Sauron — surveillance > 70, glowing eye above the city */}
      {surveillance > 70 && (
        <g opacity="0.25" transform="translate(310, 20)">
          {/* Outer glow */}
          <ellipse cx="0" cy="0" rx="18" ry="10" fill="none" stroke="#C62828" strokeWidth="1" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />
          </ellipse>
          {/* Iris */}
          <ellipse cx="0" cy="0" rx="12" ry="7" fill="#B85400" opacity="0.6">
            <animate attributeName="ry" values="7;5;7" dur="4s" repeatCount="indefinite" />
          </ellipse>
          {/* Pupil — slit */}
          <ellipse cx="0" cy="0" rx="2" ry="6" fill="#1A2332" opacity="0.8">
            <animate attributeName="ry" values="6;4;6" dur="4s" repeatCount="indefinite" />
          </ellipse>
          {/* Fire wisps */}
          <path d="M-15,0 Q-18,-8 -12,-12" fill="none" stroke="#C62828" strokeWidth="0.8" opacity="0.3">
            <animate attributeName="d" values="M-15,0 Q-18,-8 -12,-12;M-15,0 Q-20,-6 -14,-10;M-15,0 Q-18,-8 -12,-12" dur="2s" repeatCount="indefinite" />
          </path>
          <path d="M15,0 Q18,-8 12,-12" fill="none" stroke="#C62828" strokeWidth="0.8" opacity="0.3">
            <animate attributeName="d" values="M15,0 Q18,-8 12,-12;M15,0 Q20,-6 14,-10;M15,0 Q18,-8 12,-12" dur="2s" repeatCount="indefinite" />
          </path>
        </g>
      )}

      {/* Broken server rack — continuity > 60, toppled with sparks */}
      {continuity > 60 && (
        <g opacity="0.3" transform="translate(100, 350)">
          {/* Toppled server */}
          <rect x="0" y="0" width="8" height="14" rx="0.5" fill="#636B78" transform="rotate(25, 4, 7)" />
          <rect x="1" y="2" width="6" height="1" rx="0.2" fill="#2E7D32" transform="rotate(25, 4, 7)" opacity="0.5" />
          <rect x="1" y="5" width="6" height="1" rx="0.2" fill="#C62828" transform="rotate(25, 4, 7)" opacity="0.5" />
          <rect x="1" y="8" width="6" height="1" rx="0.2" fill="#B85400" transform="rotate(25, 4, 7)" opacity="0.5" />
          {/* Sparks */}
          <circle cx="10" cy="-2" r="1" fill="#D4A843">
            <animate attributeName="opacity" values="1;0;1" dur="0.3s" repeatCount="indefinite" />
          </circle>
          <circle cx="12" cy="1" r="0.7" fill="#D4A843">
            <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite" />
          </circle>
        </g>
      )}
    </svg>
  )
}
