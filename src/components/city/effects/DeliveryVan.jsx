export default function DeliveryVan() {
  return (
    <svg className="absolute bottom-1 left-0 right-0 pointer-events-none" height="20" viewBox="0 0 700 20" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      {/* Delivery van — drives right */}
      <g>
        <polygon points="4,10 15,5 26,10 26,15 4,15" fill="#636B78" />
        <polygon points="4,10 4,7 15,2 15,5" fill="#4a5568" />
        <polygon points="15,2 26,7 26,10 15,5" fill="#636B78" />
        <polygon points="6,8 12,5 12,9 6,12" fill="#9ab0c8" opacity="0.5" />
        <circle cx="9" cy="15" r="1.5" fill="#2d3748" />
        <circle cx="21" cy="15" r="1.5" fill="#2d3748" />
        <animateTransform attributeName="transform" type="translate" values="-40,0;720,0" dur="18s" repeatCount="indefinite" />
      </g>

      {/* Taxi — yellow, drives left */}
      <g>
        <polygon points="604,10 615,5 626,10 626,14 604,14" fill="#D4A843" />
        <polygon points="604,10 604,8 615,3 615,5" fill="#b08a30" />
        <polygon points="615,3 626,8 626,10 615,5" fill="#D4A843" />
        <polygon points="618,8 624,5 624,9 618,12" fill="#9ab0c8" opacity="0.4" />
        <circle cx="609" cy="14" r="1.3" fill="#2d3748" />
        <circle cx="621" cy="14" r="1.3" fill="#2d3748" />
        <animateTransform attributeName="transform" type="translate" values="40,0;-720,0" dur="14s" begin="3s" repeatCount="indefinite" />
      </g>

      {/* Bicycle — small, fast */}
      <g opacity="0.4">
        {/* Wheels */}
        <circle cx="302" cy="16" r="2.5" fill="none" stroke="#1A2332" strokeWidth="0.6" />
        <circle cx="312" cy="16" r="2.5" fill="none" stroke="#1A2332" strokeWidth="0.6" />
        {/* Frame */}
        <line x1="302" y1="16" x2="307" y2="10" stroke="#1A2332" strokeWidth="0.7" />
        <line x1="312" y1="16" x2="307" y2="10" stroke="#1A2332" strokeWidth="0.7" />
        <line x1="302" y1="16" x2="312" y2="16" stroke="#1A2332" strokeWidth="0.5" />
        {/* Rider */}
        <circle cx="307" cy="6" r="2" fill="#1A2332" />
        <line x1="307" y1="8" x2="307" y2="10" stroke="#1A2332" strokeWidth="0.8" />
        {/* Pedalling legs */}
        <line x1="307" y1="10" x2="304" y2="14" stroke="#1A2332" strokeWidth="0.7">
          <animate attributeName="x2" values="304;310;304" dur="0.25s" repeatCount="indefinite" />
        </line>
        <animateTransform attributeName="transform" type="translate" values="0,0;380,0;0,0" dur="8s" begin="1s" repeatCount="indefinite" />
      </g>

      {/* Red car — drives right, fast */}
      <g>
        <polygon points="454,11 463,7 472,11 472,15 454,15" fill="#C62828" />
        <polygon points="454,11 454,9 463,5 463,7" fill="#991f1f" />
        <polygon points="463,5 472,9 472,11 463,7" fill="#C62828" />
        <polygon points="456,10 461,7 461,10 456,12" fill="#9ab0c8" opacity="0.4" />
        <circle cx="458" cy="15" r="1.2" fill="#2d3748" />
        <circle cx="468" cy="15" r="1.2" fill="#2d3748" />
        <animateTransform attributeName="transform" type="translate" values="-460,0;260,0" dur="10s" begin="6s" repeatCount="indefinite" />
      </g>

      {/* Blue car — drives left, medium */}
      <g>
        <polygon points="204,11 213,7 222,11 222,15 204,15" fill="#2B6AB0" />
        <polygon points="204,11 204,9 213,5 213,7" fill="#1e5090" />
        <polygon points="213,5 222,9 222,11 213,7" fill="#2B6AB0" />
        <polygon points="215,10 220,7 220,10 215,12" fill="#9ab0c8" opacity="0.4" />
        <circle cx="208" cy="15" r="1.2" fill="#2d3748" />
        <circle cx="218" cy="15" r="1.2" fill="#2d3748" />
        <animateTransform attributeName="transform" type="translate" values="500,0;-220,0" dur="12s" begin="9s" repeatCount="indefinite" />
      </g>
    </svg>
  )
}
