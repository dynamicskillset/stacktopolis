export default function WalkingPeople() {
  const col = '#1A2332'
  return (
    <svg className="absolute bottom-0 left-0 right-0 pointer-events-none" height="24" viewBox="0 0 620 24" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      {/* Person 1 — walking right, slow */}
      <g opacity="0.35">
        <circle cx="60" cy="8" r="2.5" fill={col} />
        <line x1="60" y1="11" x2="60" y2="17" stroke={col} strokeWidth="1.2" />
        <line x1="60" y1="17" x2="57" y2="22" stroke={col} strokeWidth="1">
          <animate attributeName="x2" values="57;63;57" dur="0.6s" repeatCount="indefinite" />
        </line>
        <line x1="60" y1="17" x2="63" y2="22" stroke={col} strokeWidth="1">
          <animate attributeName="x2" values="63;57;63" dur="0.6s" repeatCount="indefinite" />
        </line>
        <animateTransform attributeName="transform" type="translate" values="0,0;500,0;0,0" dur="22s" repeatCount="indefinite" />
      </g>
      {/* Person 2 — walking left, medium */}
      <g opacity="0.3">
        <circle cx="400" cy="8" r="2.5" fill={col} />
        <line x1="400" y1="11" x2="400" y2="17" stroke={col} strokeWidth="1.2" />
        <line x1="400" y1="17" x2="397" y2="22" stroke={col} strokeWidth="1">
          <animate attributeName="x2" values="397;403;397" dur="0.55s" repeatCount="indefinite" />
        </line>
        <line x1="400" y1="17" x2="403" y2="22" stroke={col} strokeWidth="1">
          <animate attributeName="x2" values="403;397;403" dur="0.55s" repeatCount="indefinite" />
        </line>
        <animateTransform attributeName="transform" type="translate" values="0,0;-350,0;0,0" dur="18s" begin="2s" repeatCount="indefinite" />
      </g>
      {/* Person 3 — jogging right, fast legs */}
      <g opacity="0.25">
        <circle cx="200" cy="8" r="2.5" fill={col} />
        <line x1="200" y1="11" x2="200" y2="17" stroke={col} strokeWidth="1.2" />
        <line x1="200" y1="17" x2="196" y2="22" stroke={col} strokeWidth="1">
          <animate attributeName="x2" values="196;204;196" dur="0.3s" repeatCount="indefinite" />
        </line>
        <line x1="200" y1="17" x2="204" y2="22" stroke={col} strokeWidth="1">
          <animate attributeName="x2" values="204;196;204" dur="0.3s" repeatCount="indefinite" />
        </line>
        <animateTransform attributeName="transform" type="translate" values="0,0;380,0;0,0" dur="10s" begin="5s" repeatCount="indefinite" />
      </g>
      {/* Person 4 — briefcase carrier, walking left */}
      <g opacity="0.3">
        <circle cx="500" cy="8" r="2.5" fill={col} />
        <line x1="500" y1="11" x2="500" y2="17" stroke={col} strokeWidth="1.2" />
        <line x1="500" y1="17" x2="497" y2="22" stroke={col} strokeWidth="1">
          <animate attributeName="x2" values="497;503;497" dur="0.65s" repeatCount="indefinite" />
        </line>
        <line x1="500" y1="17" x2="503" y2="22" stroke={col} strokeWidth="1">
          <animate attributeName="x2" values="503;497;503" dur="0.65s" repeatCount="indefinite" />
        </line>
        {/* Briefcase */}
        <rect x="503" y="13" width="3" height="2.5" rx="0.3" fill={col} opacity="0.6" />
        <animateTransform attributeName="transform" type="translate" values="0,0;-440,0;0,0" dur="20s" begin="8s" repeatCount="indefinite" />
      </g>
      {/* Person 5 — umbrella holder, slow right */}
      <g opacity="0.28">
        <circle cx="130" cy="8" r="2.5" fill={col} />
        <line x1="130" y1="11" x2="130" y2="17" stroke={col} strokeWidth="1.2" />
        <line x1="130" y1="17" x2="127" y2="22" stroke={col} strokeWidth="1">
          <animate attributeName="x2" values="127;133;127" dur="0.7s" repeatCount="indefinite" />
        </line>
        <line x1="130" y1="17" x2="133" y2="22" stroke={col} strokeWidth="1">
          <animate attributeName="x2" values="133;127;133" dur="0.7s" repeatCount="indefinite" />
        </line>
        {/* Umbrella */}
        <line x1="130" y1="11" x2="130" y2="3" stroke={col} strokeWidth="0.6" />
        <path d="M125,4 Q130,0 135,4" fill="none" stroke={col} strokeWidth="0.8" />
        <animateTransform attributeName="transform" type="translate" values="0,0;420,0;0,0" dur="24s" begin="12s" repeatCount="indefinite" />
      </g>
      {/* Person 6 — middle row walker, right */}
      <g opacity="0.2" transform="translate(0,-8)">
        <circle cx="320" cy="8" r="2" fill={col} />
        <line x1="320" y1="10" x2="320" y2="15" stroke={col} strokeWidth="1" />
        <line x1="320" y1="15" x2="318" y2="19" stroke={col} strokeWidth="0.8">
          <animate attributeName="x2" values="318;322;318" dur="0.5s" repeatCount="indefinite" />
        </line>
        <animateTransform attributeName="transform" type="translate" values="0,0;260,0;0,0" dur="15s" begin="4s" repeatCount="indefinite" />
      </g>
      {/* Person 7 — top row walker, left, smaller (further away) */}
      <g opacity="0.15" transform="translate(0,-14)">
        <circle cx="450" cy="8" r="1.5" fill={col} />
        <line x1="450" y1="9.5" x2="450" y2="13" stroke={col} strokeWidth="0.8" />
        <line x1="450" y1="13" x2="448" y2="16" stroke={col} strokeWidth="0.6">
          <animate attributeName="x2" values="448;452;448" dur="0.5s" repeatCount="indefinite" />
        </line>
        <animateTransform attributeName="transform" type="translate" values="0,0;-300,0;0,0" dur="18s" begin="6s" repeatCount="indefinite" />
      </g>
      {/* Dog walker — person with tiny dog on leash */}
      <g opacity="0.3">
        <circle cx="540" cy="8" r="2.5" fill={col} />
        <line x1="540" y1="11" x2="540" y2="17" stroke={col} strokeWidth="1.2" />
        <line x1="540" y1="17" x2="537" y2="22" stroke={col} strokeWidth="1">
          <animate attributeName="x2" values="537;543;537" dur="0.6s" repeatCount="indefinite" />
        </line>
        <line x1="540" y1="17" x2="543" y2="22" stroke={col} strokeWidth="1">
          <animate attributeName="x2" values="543;537;543" dur="0.6s" repeatCount="indefinite" />
        </line>
        {/* Leash */}
        <line x1="540" y1="13" x2="550" y2="17" stroke={col} strokeWidth="0.4" />
        {/* Dog — tiny */}
        <ellipse cx="551" cy="18" rx="3" ry="1.5" fill={col} opacity="0.6" />
        <circle cx="554" cy="17" r="1" fill={col} opacity="0.6" />
        {/* Dog tail wag */}
        <line x1="548" y1="17" x2="546" y2="15" stroke={col} strokeWidth="0.5">
          <animate attributeName="x2" values="546;548;546" dur="0.4s" repeatCount="indefinite" />
        </line>
        <animateTransform attributeName="transform" type="translate" values="0,0;-500,0;0,0" dur="25s" begin="3s" repeatCount="indefinite" />
      </g>

      {/* Birds overhead */}
      <g opacity="0.2">
        <path d="M160,2 Q163,-1 166,2 Q169,-1 172,2" fill="none" stroke={col} strokeWidth="0.8" />
        <animateTransform attributeName="transform" type="translate" values="0,0;400,0" dur="15s" repeatCount="indefinite" />
      </g>
      <g opacity="0.15">
        <path d="M380,4 Q382,1 384,4 Q386,1 388,4" fill="none" stroke={col} strokeWidth="0.6" />
        <animateTransform attributeName="transform" type="translate" values="0,0;-350,0" dur="12s" begin="5s" repeatCount="indefinite" />
      </g>
      <g opacity="0.18">
        <path d="M250,1 Q252,-2 254,1 Q256,-2 258,1" fill="none" stroke={col} strokeWidth="0.7" />
        <animateTransform attributeName="transform" type="translate" values="0,0;300,0" dur="18s" begin="8s" repeatCount="indefinite" />
      </g>
    </svg>
  )
}
