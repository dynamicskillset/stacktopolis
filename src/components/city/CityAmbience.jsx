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
      <FlyingThings maxRisk={maxRisk} />
      <WhimsicalDetails maxRisk={maxRisk} jurisdiction={jurisdiction} />

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
