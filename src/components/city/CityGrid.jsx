import BuildingTile from './BuildingTile'

const GRID_SLOTS = [
  'email', 'video', 'storage', 'project',
  'crm', 'hosting', 'messaging', 'office',
  'analytics', 'passwords', 'social', 'ai',
]

export default function CityGrid({ stack }) {
  return (
    <div className="city-grid" role="region" aria-label="City grid showing installed tools">
      {GRID_SLOTS.map((slotId, index) => {
        const tool = stack.find(t => t.needId === slotId)
        const row = Math.floor(index / 4)
        const col = index % 4
        return (
          <div
            key={slotId}
            className="city-tile"
            style={{
              gridRow: row + 1,
              gridColumn: col + 1,
              marginLeft: row % 2 === 1 ? '50px' : '0',
            }}
          >
            <BuildingTile tool={tool} categoryId={slotId} />
          </div>
        )
      })}
    </div>
  )
}
