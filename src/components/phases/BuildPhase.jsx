import * as Icons from 'lucide-react'
import ToolOption from '../ui/ToolOption'

export default function BuildPhase({ need, onSelectTool }) {
  if (!need) return null

  const NeedIcon = Icons[need.icon] || Icons.Box

  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-amber-glow mb-1">
          Incoming Request
        </div>
        <h2 className="font-mono uppercase font-bold text-xl text-terminal-text tracking-wide">
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
          />
        ))}
      </div>
    </div>
  )
}
