export default function ProtestSigns() {
  return (
    <svg className="absolute bottom-0 left-1/4 pointer-events-none" width="60" height="24" viewBox="0 0 60 24" aria-hidden="true">
      {/* Protester 1 with sign */}
      <g opacity="0.5">
        <circle cx="12" cy="10" r="2" fill="#1A2332" />
        <line x1="12" y1="12" x2="12" y2="19" stroke="#1A2332" strokeWidth="1" />
        <line x1="12" y1="19" x2="10" y2="23" stroke="#1A2332" strokeWidth="0.8" />
        <line x1="12" y1="19" x2="14" y2="23" stroke="#1A2332" strokeWidth="0.8" />
        {/* Sign on stick */}
        <line x1="12" y1="12" x2="12" y2="3" stroke="#636B78" strokeWidth="0.6" />
        <rect x="7" y="0" width="10" height="5" rx="0.5" fill="#C62828" opacity="0.7">
          <animateTransform attributeName="transform" type="rotate" values="-3,12,2.5;3,12,2.5;-3,12,2.5" dur="1.5s" repeatCount="indefinite" />
        </rect>
      </g>
      {/* Protester 2 */}
      <g opacity="0.4">
        <circle cx="30" cy="10" r="2" fill="#1A2332" />
        <line x1="30" y1="12" x2="30" y2="19" stroke="#1A2332" strokeWidth="1" />
        <line x1="30" y1="19" x2="28" y2="23" stroke="#1A2332" strokeWidth="0.8" />
        <line x1="30" y1="19" x2="32" y2="23" stroke="#1A2332" strokeWidth="0.8" />
        <line x1="30" y1="12" x2="30" y2="3" stroke="#636B78" strokeWidth="0.6" />
        <rect x="25" y="0" width="10" height="5" rx="0.5" fill="#B85400" opacity="0.7">
          <animateTransform attributeName="transform" type="rotate" values="2,30,2.5;-2,30,2.5;2,30,2.5" dur="1.8s" repeatCount="indefinite" />
        </rect>
      </g>
      {/* Protester 3 */}
      <g opacity="0.35">
        <circle cx="48" cy="10" r="2" fill="#1A2332" />
        <line x1="48" y1="12" x2="48" y2="19" stroke="#1A2332" strokeWidth="1" />
        <line x1="48" y1="19" x2="46" y2="23" stroke="#1A2332" strokeWidth="0.8" />
        <line x1="48" y1="19" x2="50" y2="23" stroke="#1A2332" strokeWidth="0.8" />
        <line x1="48" y1="12" x2="48" y2="3" stroke="#636B78" strokeWidth="0.6" />
        <rect x="43" y="0" width="10" height="5" rx="0.5" fill="#2B6AB0" opacity="0.7">
          <animateTransform attributeName="transform" type="rotate" values="-4,48,2.5;4,48,2.5;-4,48,2.5" dur="2s" repeatCount="indefinite" />
        </rect>
      </g>
    </svg>
  )
}
