import { useMemo } from 'react'

function getSkyGradient(dangerLevel) {
  if (dangerLevel < 20) return 'linear-gradient(180deg, #c8ddf0 0%, #dce8f2 40%, #e8eff5 100%)'
  if (dangerLevel < 40) return 'linear-gradient(180deg, #c0d0e0 0%, #d5dde8 40%, #e0e5ea 100%)'
  if (dangerLevel < 60) return 'linear-gradient(180deg, #d0c0b8 0%, #ddd0c8 40%, #e5dcd5 100%)'
  if (dangerLevel < 80) return 'linear-gradient(180deg, #d8b8a8 0%, #e0c0b0 40%, #e8c8b8 100%)'
  return 'linear-gradient(180deg, #d8a8a0 0%, #e0b0a8 40%, #e8b8b0 100%)'
}

export default function Skyline({ dangerLevel = 0 }) {
  const skyGradient = useMemo(() => getSkyGradient(dangerLevel), [dangerLevel])
  const stormOpacity = Math.min(1, Math.max(0, (dangerLevel - 50) / 50))

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ background: skyGradient, transition: 'background 3s ease', zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Stars */}
      <div className="absolute inset-0" style={{ opacity: Math.max(0, 1 - dangerLevel / 80) }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/30"
            style={{
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              left: `${(i * 47 + 13) % 100}%`,
              top: `${(i * 31 + 7) % 50}%`,
            }}
          />
        ))}
      </div>

      {/* Clouds */}
      <div
        className="absolute w-full"
        style={{
          top: '15%',
          opacity: 0.15 + stormOpacity * 0.3,
          animation: 'ticker-scroll 120s linear infinite',
        }}
      >
        <svg viewBox="0 0 1200 80" width="2400" height="80" className="opacity-40">
          <ellipse cx="100" cy="50" rx="80" ry="25" fill="#FFFFFF" />
          <ellipse cx="160" cy="45" rx="60" ry="20" fill="#FFFFFF" />
          <ellipse cx="400" cy="55" rx="90" ry="22" fill="#FFFFFF" />
          <ellipse cx="470" cy="48" rx="50" ry="18" fill="#FFFFFF" />
          <ellipse cx="700" cy="52" rx="70" ry="24" fill="#FFFFFF" />
          <ellipse cx="950" cy="48" rx="85" ry="20" fill="#FFFFFF" />
          <ellipse cx="1020" cy="55" rx="55" ry="22" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Distant skyline silhouette */}
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1200 200"
        preserveAspectRatio="xMidYMax slice"
        style={{ opacity: 0.25 + stormOpacity * 0.1 }}
      >
        <defs>
          <linearGradient id="skyline-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c0c8d0" />
            <stop offset="100%" stopColor="#a8b0b8" />
          </linearGradient>
        </defs>
        {/* City silhouette */}
        <polygon
          fill="url(#skyline-grad)"
          points="
            0,200
            0,160 30,160 30,120 50,120 50,140 80,140 80,100 100,100 100,130
            120,130 120,80 140,80 140,70 155,70 155,110 170,110 170,130
            200,130 200,150 230,150 230,90 245,90 245,60 260,60 260,90 275,90 275,120
            300,120 300,140 330,140 330,100 350,100 350,85 365,85 365,100 380,100 380,130
            410,130 410,110 430,110 430,70 445,70 445,50 460,50 460,80 480,80 480,120
            510,120 510,140 540,140 540,130 560,130 560,100 575,100 575,65 590,65 590,110
            620,110 620,140 650,140 650,120 670,120 670,90 685,90 685,55 700,55 700,95
            720,95 720,130 750,130 750,110 770,110 770,75 785,75 785,100 800,100 800,140
            830,140 830,120 850,120 850,80 870,80 870,60 885,60 885,100 900,100 900,130
            930,130 930,150 960,150 960,100 975,100 975,70 990,70 990,110 1010,110 1010,140
            1040,140 1040,120 1060,120 1060,85 1080,85 1080,130 1100,130 1100,150
            1130,150 1130,110 1150,110 1150,130 1170,130 1170,160 1200,160 1200,200
          "
        />
        {/* Window lights - tiny dots scattered on the skyline */}
        {[...Array(40)].map((_, i) => (
          <rect
            key={i}
            x={30 + (i * 29) % 1140}
            y={80 + (i * 17) % 100}
            width="2"
            height="3"
            fill="#8B7A2F"
            opacity={0.2 + (i % 4) * 0.15}
          />
        ))}
      </svg>

      {/* Ambient birds/drones drifting across */}
      {dangerLevel < 60 && (
        <div className="absolute inset-0">
          {[
            { top: '22%', dur: '35s', delay: '0s', scale: 1 },
            { top: '18%', dur: '28s', delay: '8s', scale: 0.7 },
            { top: '30%', dur: '42s', delay: '15s', scale: 0.85 },
          ].map((bird, i) => (
            <svg
              key={i}
              className="absolute"
              style={{
                top: bird.top,
                width: `${8 * bird.scale}px`,
                height: `${6 * bird.scale}px`,
                animation: `ticker-scroll ${bird.dur} linear infinite`,
                animationDelay: bird.delay,
                opacity: 0.3,
              }}
              viewBox="0 0 12 8"
            >
              <path d="M0,4 Q3,0 6,4 Q9,0 12,4" fill="none" stroke="#94a7bb" strokeWidth="1.2" />
            </svg>
          ))}
        </div>
      )}

      {/* Lightning flash on high danger */}
      {dangerLevel >= 70 && (
        <div
          className="absolute inset-0 animate-flash"
          style={{
            background: 'rgba(200, 200, 255, 0.03)',
            animationDuration: `${3 + Math.random() * 5}s`,
            animationIterationCount: 'infinite',
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      )}
    </div>
  )
}
