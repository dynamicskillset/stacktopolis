export default function Helicopter() {
  return (
    <svg className="absolute top-0 pointer-events-none" width="36" height="20" viewBox="0 0 36 20" aria-hidden="true" opacity="0.5">
      {/* Body */}
      <ellipse cx="18" cy="12" rx="8" ry="4" fill="#1A2332" />
      {/* Tail */}
      <line x1="26" y1="12" x2="34" y2="10" stroke="#1A2332" strokeWidth="1.5" />
      <line x1="33" y1="8" x2="35" y2="12" stroke="#1A2332" strokeWidth="1" />
      {/* Skids */}
      <line x1="13" y1="16" x2="23" y2="16" stroke="#1A2332" strokeWidth="0.8" />
      <line x1="15" y1="14" x2="15" y2="16" stroke="#1A2332" strokeWidth="0.6" />
      <line x1="21" y1="14" x2="21" y2="16" stroke="#1A2332" strokeWidth="0.6" />
      {/* Rotor — spinning */}
      <line x1="6" y1="8" x2="30" y2="8" stroke="#636B78" strokeWidth="1" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" values="0,18,8;360,18,8" dur="0.15s" repeatCount="indefinite" />
      </line>
      {/* Rotor hub */}
      <circle cx="18" cy="8" r="1.5" fill="#1A2332" />
      {/* Fly across */}
      <animateTransform attributeName="transform" type="translate" values="-50,0;700,0" dur="10s" repeatCount="indefinite" />
    </svg>
  )
}
