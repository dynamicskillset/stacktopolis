import BuildingTile from './BuildingTile'

const GRID_SLOTS = [
  'email', 'video', 'storage', 'project',
  'crm', 'hosting', 'messaging', 'office',
  'analytics', 'passwords', 'social', 'ai',
]

export default function CityGrid({ stack, onSelectTool, selectedToolId, onClickEmpty }) {
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
              marginLeft: row % 2 === 1 ? '65px' : '0',
            }}
          >
            <BuildingTile
              tool={tool}
              categoryId={slotId}
              onClick={tool && onSelectTool ? () => onSelectTool(tool) : undefined}
              isSelected={tool && tool.id === selectedToolId}
              onClickEmpty={!tool && onClickEmpty ? onClickEmpty : undefined}
            />
          </div>
        )
      })}
    </div>
  )
}
