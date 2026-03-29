import WalkingPeople from './effects/WalkingPeople'
import DeliveryVan from './effects/DeliveryVan'
import ProtestSigns from './effects/ProtestSigns'
import InspectorFigure from './effects/InspectorFigure'
import FireEngine from './effects/FireEngine'
import Ambulance from './effects/Ambulance'
import Helicopter from './effects/Helicopter'
import NewsVan from './effects/NewsVan'
import FlyingThings from './effects/FlyingThings'
import WhimsicalDetails from './effects/WhimsicalDetails'

export default function CityAmbience({ stack, morale, jurisdiction, continuity, surveillance }) {
  const maxRisk = Math.max(jurisdiction, continuity, surveillance)
  const hasFire = stack.some(t => {
    const combined = (t.jurisdiction || 0) + (t.continuity || 0) + (t.surveillance || 0)
    return combined > 35
  })

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Always present — ambient life */}
      <WalkingPeople />
      {/* Second row of walking people — middle of the grid */}
      <div style={{ position: 'absolute', top: '45%', left: 0, right: 0 }}>
        <svg height="16" viewBox="0 0 620 16" preserveAspectRatio="xMidYMax meet" className="pointer-events-none" aria-hidden="true">
          <g opacity="0.2">
            <circle cx="100" cy="5" r="2" fill="#1A2332" />
            <line x1="100" y1="7" x2="100" y2="12" stroke="#1A2332" strokeWidth="0.8" />
            <line x1="100" y1="12" x2="98" y2="15" stroke="#1A2332" strokeWidth="0.7">
              <animate attributeName="x2" values="98;102;98" dur="0.55s" repeatCount="indefinite" />
            </line>
            <animateTransform attributeName="transform" type="translate" values="0,0;450,0;0,0" dur="20s" begin="2s" repeatCount="indefinite" />
          </g>
          <g opacity="0.18">
            <circle cx="500" cy="5" r="2" fill="#1A2332" />
            <line x1="500" y1="7" x2="500" y2="12" stroke="#1A2332" strokeWidth="0.8" />
            <line x1="500" y1="12" x2="498" y2="15" stroke="#1A2332" strokeWidth="0.7">
              <animate attributeName="x2" values="498;502;498" dur="0.5s" repeatCount="indefinite" />
            </line>
            <animateTransform attributeName="transform" type="translate" values="0,0;-400,0;0,0" dur="16s" begin="5s" repeatCount="indefinite" />
          </g>
          <g opacity="0.15">
            <circle cx="300" cy="5" r="1.8" fill="#1A2332" />
            <line x1="300" y1="7" x2="300" y2="11" stroke="#1A2332" strokeWidth="0.7" />
            <line x1="300" y1="11" x2="298" y2="14" stroke="#1A2332" strokeWidth="0.6">
              <animate attributeName="x2" values="298;302;298" dur="0.6s" repeatCount="indefinite" />
            </line>
            <animateTransform attributeName="transform" type="translate" values="0,0;280,0;0,0" dur="14s" begin="8s" repeatCount="indefinite" />
          </g>
        </svg>
      </div>
      <FlyingThings maxRisk={maxRisk} />
      <WhimsicalDetails maxRisk={maxRisk} jurisdiction={jurisdiction} surveillance={surveillance} continuity={continuity} />

      {/* Normal operations or emergency vehicles */}
      {hasFire ? <FireEngine /> : <DeliveryVan />}

      {/* Medium risk — inspector when jurisdiction high */}
      {jurisdiction > 60 && <InspectorFigure />}

      {/* Morale crisis — protests then ambulance */}
      {morale < 40 && <ProtestSigns />}
      {morale < 20 && <Ambulance />}

      {/* Critical — escalating emergency response */}
      {maxRisk > 75 && <Helicopter />}
      {maxRisk > 85 && (
        <div style={{ transform: 'translate(100px, 8px)' }}>
          <Helicopter />
        </div>
      )}
      {maxRisk > 95 && (
        <div style={{ transform: 'translate(-60px, 14px)' }}>
          <Helicopter />
        </div>
      )}

      {maxRisk > 80 && <NewsVan />}
    </div>
  )
}
