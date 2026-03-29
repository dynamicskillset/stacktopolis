export default function Ambulance() {
  return (
    <svg className="absolute bottom-1 right-8 pointer-events-none" width="32" height="18" viewBox="0 0 32 18" aria-hidden="true">
      {/* Body — white isometric */}
      <polygon points="4,10 16,5 28,10 28,15 4,15" fill="#FFFFFF" stroke="#E0DDD5" strokeWidth="0.5" />
      <polygon points="4,10 4,7 16,2 16,5" fill="#f0ede5" />
      <polygon points="16,2 28,7 28,10 16,5" fill="#FFFFFF" />
      {/* Red cross */}
      <rect x="17" y="8" width="6" height="1.5" rx="0.2" fill="#C62828" />
      <rect x="19" y="6" width="1.5" height="6" rx="0.2" fill="#C62828" />
      {/* Blue flashing lights */}
      <circle cx="8" cy="4" r="1.2" fill="#2B6AB0">
        <animate attributeName="opacity" values="1;0;1" dur="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="14" cy="2" r="1.2" fill="#2B6AB0">
        <animate attributeName="opacity" values="0;1;0" dur="0.5s" repeatCount="indefinite" />
      </circle>
      {/* Wheels */}
      <circle cx="9" cy="15" r="1.5" fill="#2d3748" />
      <circle cx="23" cy="15" r="1.5" fill="#2d3748" />
    </svg>
  )
}
