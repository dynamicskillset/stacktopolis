export default function CraneEffect() {
  return (
    <svg className="absolute top-0 right-0 pointer-events-none" width="20" height="24" viewBox="0 0 24 28" aria-hidden="true">
      {/* Vertical mast */}
      <rect x="10" y="0" width="2" height="28" fill="#f59e0b" />
      {/* Horizontal boom */}
      <rect x="0" y="2" width="22" height="1.5" fill="#f59e0b" />
      {/* Support cables */}
      <line x1="11" y1="0" x2="2" y2="2" stroke="#f59e0b" strokeWidth="0.5" />
      <line x1="11" y1="0" x2="20" y2="2" stroke="#f59e0b" strokeWidth="0.5" />
      {/* Hook */}
      <line x1="4" y1="3.5" x2="4" y2="12" stroke="#888" strokeWidth="0.5" />
      <path d="M2,12 Q4,15 6,12" fill="none" stroke="#888" strokeWidth="0.7" />
      {/* Swinging animation */}
      <animateTransform attributeName="transform" type="rotate" values="-2,11,14;2,11,14;-2,11,14" dur="3s" repeatCount="indefinite" />
    </svg>
  )
}
