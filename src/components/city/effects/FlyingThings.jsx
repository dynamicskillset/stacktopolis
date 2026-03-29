export default function FlyingThings({ maxRisk }) {
  return (
    <svg className="absolute top-0 left-0 right-0 pointer-events-none" height="40" viewBox="0 0 700 40" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
      {/* Small propeller plane — always present */}
      <g opacity="0.3">
        {/* Fuselage */}
        <ellipse cx="15" cy="15" rx="8" ry="2.5" fill="#636B78" />
        {/* Wings */}
        <line x1="10" y1="15" x2="20" y2="15" stroke="#636B78" strokeWidth="0.5" />
        <rect x="8" y="13.5" width="14" height="3" rx="0.5" fill="#636B78" opacity="0.5" />
        {/* Tail */}
        <polygon points="23,15 27,12 27,18" fill="#636B78" opacity="0.6" />
        {/* Propeller */}
        <line x1="7" y1="12" x2="7" y2="18" stroke="#1A2332" strokeWidth="0.8">
          <animateTransform attributeName="transform" type="rotate" values="0,7,15;360,7,15" dur="0.1s" repeatCount="indefinite" />
        </line>
        <animateTransform attributeName="transform" type="translate" values="-30,0;730,0" dur="22s" repeatCount="indefinite" />
      </g>

      {/* Drone — appears at risk > 30, jittery */}
      {maxRisk > 30 && (
        <g opacity="0.25">
          {/* Body */}
          <rect x="348" y="28" width="6" height="3" rx="1" fill="#1A2332" />
          {/* Arms */}
          <line x1="346" y1="29" x2="342" y2="27" stroke="#1A2332" strokeWidth="0.6" />
          <line x1="354" y1="29" x2="358" y2="27" stroke="#1A2332" strokeWidth="0.6" />
          {/* Rotors */}
          <line x1="340" y1="26" x2="344" y2="26" stroke="#636B78" strokeWidth="0.5">
            <animateTransform attributeName="transform" type="rotate" values="0,342,26;360,342,26" dur="0.12s" repeatCount="indefinite" />
          </line>
          <line x1="356" y1="26" x2="360" y2="26" stroke="#636B78" strokeWidth="0.5">
            <animateTransform attributeName="transform" type="rotate" values="0,358,26;360,358,26" dur="0.12s" repeatCount="indefinite" />
          </line>
          {/* Recording light */}
          <circle cx="351" cy="31" r="0.6" fill="#C62828">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
          </circle>
          {/* Jittery hover */}
          <animateTransform attributeName="transform" type="translate" values="0,0;3,-1;-2,1;1,-2;0,0" dur="2s" repeatCount="indefinite" />
        </g>
      )}

      {/* Hot air balloon — only at low danger, very slow, whimsical */}
      {maxRisk < 40 && (
        <g opacity="0.2">
          {/* Balloon */}
          <ellipse cx="550" cy="10" rx="6" ry="8" fill="#C62828" />
          <ellipse cx="550" cy="10" rx="6" ry="8" fill="none" stroke="#8B7A2F" strokeWidth="0.3" />
          {/* Basket lines */}
          <line x1="546" y1="17" x2="548" y2="22" stroke="#636B78" strokeWidth="0.3" />
          <line x1="554" y1="17" x2="552" y2="22" stroke="#636B78" strokeWidth="0.3" />
          {/* Basket */}
          <rect x="547" y="22" width="6" height="3" rx="0.5" fill="#8B7A2F" />
          <animateTransform attributeName="transform" type="translate" values="0,0;-600,0" dur="50s" repeatCount="indefinite" />
        </g>
      )}
    </svg>
  )
}
