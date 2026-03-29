export default function NewsVan() {
  return (
    <svg className="absolute bottom-1 left-8 pointer-events-none" width="34" height="22" viewBox="0 0 34 22" aria-hidden="true">
      {/* Van body — white */}
      <polygon points="4,12 17,6 30,12 30,18 4,18" fill="#FFFFFF" stroke="#E0DDD5" strokeWidth="0.5" />
      <polygon points="4,12 4,9 17,3 17,6" fill="#f0ede5" />
      <polygon points="17,3 30,9 30,12 17,6" fill="#FFFFFF" />
      {/* NEWS text */}
      <text x="17" y="16" textAnchor="middle" fill="#1A2332" fontSize="4" fontFamily="monospace" fontWeight="bold">NEWS</text>
      {/* Satellite dish on roof */}
      <g>
        {/* Mast */}
        <line x1="22" y1="6" x2="22" y2="1" stroke="#636B78" strokeWidth="0.8" />
        {/* Dish */}
        <path d="M19,2 Q22,-1 25,2" fill="none" stroke="#636B78" strokeWidth="1" />
        <circle cx="22" cy="1" r="0.8" fill="#636B78" />
        {/* Dish rotates slowly */}
        <animateTransform attributeName="transform" type="rotate" values="0,22,1;10,22,1;0,22,1;-10,22,1;0,22,1" dur="6s" repeatCount="indefinite" />
      </g>
      {/* Wheels */}
      <circle cx="10" cy="18" r="1.5" fill="#2d3748" />
      <circle cx="24" cy="18" r="1.5" fill="#2d3748" />
    </svg>
  )
}
