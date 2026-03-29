export default function FireEffect() {
  return (
    <svg className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none" width="30" height="26" viewBox="0 0 36 32" aria-hidden="true">
      {/* Outer flame */}
      <path d="M18,28 Q10,20 14,12 Q16,8 18,4 Q20,8 22,12 Q26,20 18,28Z" fill="#ff6b00" opacity="0.8">
        <animate attributeName="d"
          values="M18,28 Q10,20 14,12 Q16,8 18,4 Q20,8 22,12 Q26,20 18,28Z;
                  M18,28 Q11,22 13,14 Q15,9 18,3 Q21,9 23,14 Q25,22 18,28Z;
                  M18,28 Q10,20 14,12 Q16,8 18,4 Q20,8 22,12 Q26,20 18,28Z"
          dur="0.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.6;0.8" dur="0.3s" repeatCount="indefinite" />
      </path>
      {/* Inner flame */}
      <path d="M18,28 Q13,22 15,16 Q17,12 18,8 Q19,12 21,16 Q23,22 18,28Z" fill="#ffcc00" opacity="0.9">
        <animate attributeName="d"
          values="M18,28 Q13,22 15,16 Q17,12 18,8 Q19,12 21,16 Q23,22 18,28Z;
                  M18,28 Q14,23 16,17 Q17,13 18,9 Q19,13 20,17 Q22,23 18,28Z;
                  M18,28 Q13,22 15,16 Q17,12 18,8 Q19,12 21,16 Q23,22 18,28Z"
          dur="0.35s" repeatCount="indefinite" />
      </path>
      {/* Core */}
      <ellipse cx="18" cy="26" rx="4" ry="3" fill="#fff" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.2;0.4" dur="0.25s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  )
}
