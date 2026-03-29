export default function InspectorFigure() {
  return (
    <svg className="absolute bottom-2 right-4 pointer-events-none" width="16" height="22" viewBox="0 0 16 22" aria-hidden="true">
      {/* Head */}
      <circle cx="8" cy="4" r="3" fill="#1A2332" />
      {/* Body */}
      <line x1="8" y1="7" x2="8" y2="15" stroke="#1A2332" strokeWidth="1.5" />
      {/* Legs */}
      <line x1="8" y1="15" x2="5" y2="21" stroke="#1A2332" strokeWidth="1" />
      <line x1="8" y1="15" x2="11" y2="21" stroke="#1A2332" strokeWidth="1" />
      {/* Clipboard arm */}
      <line x1="8" y1="9" x2="13" y2="11" stroke="#1A2332" strokeWidth="1" />
      {/* Clipboard */}
      <rect x="11" y="9" width="4" height="5" rx="0.5" fill="#E0DDD5" stroke="#636B78" strokeWidth="0.4" />
      <line x1="12" y1="10.5" x2="14" y2="10.5" stroke="#636B78" strokeWidth="0.3" />
      <line x1="12" y1="11.5" x2="14" y2="11.5" stroke="#636B78" strokeWidth="0.3" />
      <line x1="12" y1="12.5" x2="13.5" y2="12.5" stroke="#636B78" strokeWidth="0.3" />
      {/* Subtle head nod */}
      <animateTransform attributeName="transform" type="translate" values="0,0;0,-1;0,0" dur="3s" repeatCount="indefinite" />
    </svg>
  )
}
