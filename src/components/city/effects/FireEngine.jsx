export default function FireEngine() {
  return (
    <svg className="absolute bottom-1 pointer-events-none" width="40" height="22" viewBox="0 0 40 22" aria-hidden="true">
      {/* Sequenced: drive in (0-4s), park+spray (4-10s), drive off (10-14s), reset (14-16s) */}
      <animateTransform attributeName="transform" type="translate"
        values="-60,0;200,0;200,0;200,0;500,0;-60,0"
        keyTimes="0;0.25;0.3;0.625;0.8;1"
        dur="16s" repeatCount="indefinite" />

      {/* Engine body */}
      <polygon points="5,12 20,6 35,12 35,18 5,18" fill="#C62828" />
      <polygon points="5,12 5,9 20,3 20,6" fill="#991f1f" />
      <polygon points="20,3 35,9 35,12 20,6" fill="#C62828" />
      {/* Ladder */}
      <rect x="10" y="4" width="16" height="1.5" rx="0.3" fill="#8B7A2F" />
      <rect x="12" y="2" width="12" height="1.5" rx="0.3" fill="#8B7A2F" />
      {/* Windshield */}
      <polygon points="7,10 14,7 14,11 7,14" fill="#9ab0c8" opacity="0.4" />
      {/* Flashing lights */}
      <circle cx="10" cy="5" r="1.5" fill="#B85400">
        <animate attributeName="opacity" values="1;0.2;1" dur="0.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="26" cy="5" r="1.5" fill="#B85400">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="0.6s" repeatCount="indefinite" />
      </circle>
      {/* Wheels */}
      <circle cx="11" cy="18" r="2" fill="#2d3748" />
      <circle cx="29" cy="18" r="2" fill="#2d3748" />

      {/* Water spray — only during park phase (25%-62.5% = 4-10s) */}
      <g>
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.25;0.3;0.625;0.65;1" dur="16s" repeatCount="indefinite" />
        <path d="M14,3 Q20,-8 30,-5" fill="none" stroke="#2B6AB0" strokeWidth="1" opacity="0.5">
          <animate attributeName="d" values="M14,3 Q20,-8 30,-5;M14,3 Q22,-10 32,-3;M14,3 Q18,-6 28,-7;M14,3 Q20,-8 30,-5" dur="1.5s" repeatCount="indefinite" />
        </path>
        <circle cx="28" cy="-4" r="1" fill="#2B6AB0" opacity="0.3">
          <animate attributeName="cy" values="-4;2;8" dur="0.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.2;0" dur="0.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="31" cy="-2" r="0.8" fill="#2B6AB0" opacity="0.25">
          <animate attributeName="cy" values="-2;4;10" dur="0.9s" begin="0.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.25;0.15;0" dur="0.9s" begin="0.3s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  )
}
