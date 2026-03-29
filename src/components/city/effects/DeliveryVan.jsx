export default function DeliveryVan() {
  return (
    <svg className="absolute bottom-1 pointer-events-none" width="30" height="18" viewBox="0 0 30 18" aria-hidden="true">
      {/* Van body */}
      <polygon points="4,10 15,5 26,10 26,15 4,15" fill="#636B78" />
      <polygon points="4,10 4,7 15,2 15,5" fill="#4a5568" />
      <polygon points="15,2 26,7 26,10 15,5" fill="#636B78" />
      {/* Windshield */}
      <polygon points="6,8 12,5 12,9 6,12" fill="#9ab0c8" opacity="0.5" />
      {/* Wheels */}
      <circle cx="9" cy="15" r="1.5" fill="#2d3748" />
      <circle cx="21" cy="15" r="1.5" fill="#2d3748" />
      {/* Driving animation */}
      <animateTransform attributeName="transform" type="translate" values="-40,0;650,0" dur="18s" repeatCount="indefinite" />
    </svg>
  )
}
