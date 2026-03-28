import { getIcon } from '../../utils/iconMap'
import ToolOption from '../ui/ToolOption'

export default function BuildPhase({ need, onSelectTool, stack }) {
  if (!need) return null

  const NeedIcon = getIcon(need.icon)

  return (
    <div className="animate-fade-in space-y-5 bg-terminal-surface/50 rounded-lg p-4 border border-terminal-border">
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-amber-glow mb-1 border-b-2 border-amber-glow pb-1 inline-block">
          Incoming Request
        </div>
        <h2 className="font-mono uppercase font-bold text-xl text-terminal-text tracking-wide mt-2">
          {need.label}
        </h2>
      </div>

      <p className="font-serif italic text-terminal-muted">
        {need.description}
      </p>

      <div className="space-y-3">
        {need.options.map((option) => (
          <ToolOption
            key={option.id}
            option={option}
            onSelect={onSelectTool}
            needIcon={NeedIcon}
            stack={stack}
          />
        ))}
      </div>
    </div>
  )
}
