// SVG avatars for the 4 colleagues, matching CassandraAvatar style

function MarcusAvatar() {
  return (
    <svg viewBox="0 0 48 56" width="48" height="56" aria-hidden="true">
      {/* Short cropped hair */}
      <ellipse cx="24" cy="13" rx="12" ry="10" fill="#1a1008" />
      {/* Face — lighter brown */}
      <ellipse cx="24" cy="18" rx="11" ry="13" fill="#c8935a" />
      {/* Eyes — focused, slightly tired */}
      <ellipse cx="19.5" cy="16.5" rx="2" ry="1.4" fill="#1a1008">
        <animate attributeName="ry" values="1.4;1.4;0.2;1.4" dur="6s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="28.5" cy="16.5" rx="2" ry="1.4" fill="#1a1008">
        <animate attributeName="ry" values="1.4;1.4;0.2;1.4" dur="6s" repeatCount="indefinite" />
      </ellipse>
      <circle cx="20.3" cy="15.8" r="0.5" fill="#fff" opacity="0.6" />
      <circle cx="29.3" cy="15.8" r="0.5" fill="#fff" opacity="0.6" />
      {/* Eyebrows — slightly furrowed */}
      <path d="M16 13.5 Q19.5 12 22 13.5" fill="none" stroke="#1a1008" strokeWidth="1" strokeLinecap="round" />
      <path d="M26 13.5 Q28.5 12 32 13.5" fill="none" stroke="#1a1008" strokeWidth="1" strokeLinecap="round" />
      {/* Glasses */}
      <rect x="15" y="13.5" width="9" height="6" rx="1.5" fill="none" stroke="#555" strokeWidth="0.7" />
      <rect x="26" y="13.5" width="9" height="6" rx="1.5" fill="none" stroke="#555" strokeWidth="0.7" />
      <line x1="24" y1="16" x2="26" y2="16" stroke="#555" strokeWidth="0.5" />
      {/* Nose */}
      <path d="M23 19 Q24 21.5 25 19" fill="none" stroke="#9a6a38" strokeWidth="0.7" />
      {/* Mouth — tight, stressed */}
      <path d="M20 24 Q24 25 28 24" fill="none" stroke="#7a4a18" strokeWidth="0.8" strokeLinecap="round" />
      {/* Neck */}
      <rect x="20" y="30" width="8" height="4" fill="#c8935a" />
      {/* Shirt collar + tie */}
      <path d="M12 34 L18 31 L24 35 L30 31 L36 34 L38 48 L10 48 Z" fill="#2a3040" />
      <path d="M22 33 L24 48 L26 33" fill="#f59e0b" opacity="0.8" />
      <path d="M20 32 L24 35 L28 32" fill="none" stroke="#dce3eb" strokeWidth="0.6" />
    </svg>
  )
}

function PriyaAvatar() {
  return (
    <svg viewBox="0 0 48 56" width="48" height="56" aria-hidden="true">
      {/* Long dark hair */}
      <ellipse cx="24" cy="14" rx="14" ry="12" fill="#0a0a0a" />
      <ellipse cx="12" cy="22" rx="4" ry="8" fill="#0a0a0a" />
      <ellipse cx="36" cy="22" rx="4" ry="8" fill="#0a0a0a" />
      {/* Face — South Asian skin tone */}
      <ellipse cx="24" cy="18" rx="11" ry="13" fill="#c49a6c" />
      {/* Eyes — alert, intense */}
      <ellipse cx="19.5" cy="16" rx="2.2" ry="1.6" fill="#1a1008">
        <animate attributeName="ry" values="1.6;1.6;0.2;1.6" dur="4s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="28.5" cy="16" rx="2.2" ry="1.6" fill="#1a1008">
        <animate attributeName="ry" values="1.6;1.6;0.2;1.6" dur="4s" repeatCount="indefinite" />
      </ellipse>
      <circle cx="20.3" cy="15.3" r="0.6" fill="#fff" opacity="0.7" />
      <circle cx="29.3" cy="15.3" r="0.6" fill="#fff" opacity="0.7" />
      {/* Eyebrows — sharp, focused */}
      <path d="M16 12.5 Q19.5 11 22 12.5" fill="none" stroke="#0a0a0a" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M26 12.5 Q28.5 11 32 12.5" fill="none" stroke="#0a0a0a" strokeWidth="1.1" strokeLinecap="round" />
      {/* Nose */}
      <path d="M23 19 Q24 21 25 19" fill="none" stroke="#9a7a4c" strokeWidth="0.7" />
      {/* Mouth — determined */}
      <path d="M20 24 Q24 26 28 24" fill="none" stroke="#7a4a28" strokeWidth="0.8" strokeLinecap="round" />
      {/* Nose ring */}
      <circle cx="22" cy="20.5" r="1" fill="none" stroke="#c0c0c0" strokeWidth="0.5" />
      {/* Neck */}
      <rect x="20" y="30" width="8" height="4" fill="#c49a6c" />
      {/* Hoodie */}
      <path d="M12 34 L18 31 L24 35 L30 31 L36 34 L38 48 L10 48 Z" fill="#1a2848" />
      <path d="M20 32 L24 36 L28 32" fill="#1a2848" stroke="#2a3858" strokeWidth="0.5" />
      {/* Lock icon on hoodie */}
      <rect x="21.5" y="40" width="5" height="4" rx="0.5" fill="#3b82f6" opacity="0.6" />
      <path d="M23 40 L23 38.5 Q24 37 25 38.5 L25 40" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.6" />
    </svg>
  )
}

function SamAvatar() {
  return (
    <svg viewBox="0 0 48 56" width="48" height="56" aria-hidden="true">
      {/* Messy/wavy hair */}
      <ellipse cx="24" cy="13" rx="14" ry="11" fill="#8b5e3c" />
      <circle cx="12" cy="10" r="3" fill="#8b5e3c" />
      <circle cx="36" cy="10" r="3" fill="#8b5e3c" />
      <circle cx="14" cy="16" r="3" fill="#8b5e3c" />
      <circle cx="34" cy="16" r="3" fill="#8b5e3c" />
      {/* Face — lighter/pinkish skin */}
      <ellipse cx="24" cy="18" rx="11" ry="13" fill="#e8c4a0" />
      {/* Eyes — warm, earnest */}
      <ellipse cx="19.5" cy="16.5" rx="2" ry="1.5" fill="#2a4020">
        <animate attributeName="ry" values="1.5;1.5;0.2;1.5" dur="5.5s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="28.5" cy="16.5" rx="2" ry="1.5" fill="#2a4020">
        <animate attributeName="ry" values="1.5;1.5;0.2;1.5" dur="5.5s" repeatCount="indefinite" />
      </ellipse>
      <circle cx="20.3" cy="15.8" r="0.5" fill="#fff" opacity="0.7" />
      <circle cx="29.3" cy="15.8" r="0.5" fill="#fff" opacity="0.7" />
      {/* Eyebrows — soft */}
      <path d="M16.5 13.5 Q19.5 12.5 22 13.5" fill="none" stroke="#6a4020" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M26 13.5 Q28.5 12.5 31.5 13.5" fill="none" stroke="#6a4020" strokeWidth="0.8" strokeLinecap="round" />
      {/* Nose */}
      <path d="M23 19 Q24 21 25 19" fill="none" stroke="#c09870" strokeWidth="0.7" />
      {/* Mouth — friendly, open */}
      <path d="M19 24 Q24 27 29 24" fill="none" stroke="#8a5a38" strokeWidth="0.9" strokeLinecap="round" />
      {/* Freckles */}
      <circle cx="17" cy="21" r="0.5" fill="#c09870" opacity="0.5" />
      <circle cx="19" cy="22" r="0.4" fill="#c09870" opacity="0.5" />
      <circle cx="29" cy="21" r="0.5" fill="#c09870" opacity="0.5" />
      <circle cx="31" cy="22" r="0.4" fill="#c09870" opacity="0.5" />
      {/* Neck */}
      <rect x="20" y="30" width="8" height="4" fill="#e8c4a0" />
      {/* Casual jumper */}
      <path d="M12 34 L18 31 L24 34 L30 31 L36 34 L38 48 L10 48 Z" fill="#2a6040" />
      {/* T-shirt visible */}
      <path d="M20 32 L24 34 L28 32" fill="#dce3eb" />
    </svg>
  )
}

function NkechiAvatar() {
  return (
    <svg viewBox="0 0 48 56" width="48" height="56" aria-hidden="true">
      {/* Wrapped headscarf */}
      <ellipse cx="24" cy="12" rx="14" ry="11" fill="#6b21a8" />
      <ellipse cx="24" cy="8" rx="10" ry="6" fill="#7c3aed" />
      <path d="M10 12 Q14 18 18 12" fill="#6b21a8" />
      <path d="M30 12 Q34 18 38 12" fill="#6b21a8" />
      {/* Face — dark brown skin */}
      <ellipse cx="24" cy="19" rx="11" ry="12" fill="#8b6040" />
      {/* Eyes — composed, steady */}
      <ellipse cx="19.5" cy="17" rx="2" ry="1.4" fill="#1a1008">
        <animate attributeName="ry" values="1.4;1.4;0.2;1.4" dur="5s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="28.5" cy="17" rx="2" ry="1.4" fill="#1a1008">
        <animate attributeName="ry" values="1.4;1.4;0.2;1.4" dur="5s" repeatCount="indefinite" />
      </ellipse>
      <circle cx="20.3" cy="16.3" r="0.5" fill="#fff" opacity="0.6" />
      <circle cx="29.3" cy="16.3" r="0.5" fill="#fff" opacity="0.6" />
      {/* Eyebrows — composed */}
      <path d="M16 14 Q19.5 13 22 14" fill="none" stroke="#1a1008" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M26 14 Q28.5 13 32 14" fill="none" stroke="#1a1008" strokeWidth="0.9" strokeLinecap="round" />
      {/* Nose */}
      <path d="M23 19.5 Q24 22 25 19.5" fill="none" stroke="#6a4028" strokeWidth="0.7" />
      {/* Mouth — firm but warm */}
      <path d="M20 24.5 Q24 26 28 24.5" fill="none" stroke="#5a3018" strokeWidth="0.8" strokeLinecap="round" />
      {/* Earrings — gold hoops */}
      <circle cx="13" cy="21" r="2" fill="none" stroke="#fbbf24" strokeWidth="0.7" />
      <circle cx="35" cy="21" r="2" fill="none" stroke="#fbbf24" strokeWidth="0.7" />
      {/* Neck */}
      <rect x="20" y="30" width="8" height="4" fill="#8b6040" />
      {/* Formal blazer */}
      <path d="M12 34 L18 31 L24 35 L30 31 L36 34 L38 48 L10 48 Z" fill="#1a1020" />
      <path d="M18 31 L22 36 L24 35" fill="#141018" />
      <path d="M30 31 L26 36 L24 35" fill="#141018" />
      <path d="M20 32 L24 35 L28 32" fill="none" stroke="#dce3eb" strokeWidth="0.6" />
      {/* Brooch */}
      <circle cx="24" cy="37" r="1.5" fill="#fbbf24" />
    </svg>
  )
}

const AVATARS = {
  marcus: MarcusAvatar,
  priya: PriyaAvatar,
  sam: SamAvatar,
  nkechi: NkechiAvatar,
}

export default function ColleagueAvatar({ colleagueId }) {
  const Avatar = AVATARS[colleagueId]
  if (!Avatar) return null
  return <Avatar />
}
