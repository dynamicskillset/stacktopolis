import ToolCard from '../ui/ToolCard'
import { toolRiskLevel } from '../../utils/riskLevel'

export default function TechStack({ stack, onToolSelect }) {
  if (!stack || stack.length === 0) {
    return (
      <div className="text-center py-8 text-terminal-muted font-mono text-sm uppercase tracking-wider">
        No tools installed
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {stack.map((tool, index) => (
        <div
          key={tool.id}
          className="animate-slide-in-right"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <ToolCard
            tool={tool}
            riskLevel={toolRiskLevel(tool)}
            onClick={onToolSelect ? () => onToolSelect(tool) : undefined}
          />
        </div>
      ))}
    </div>
  )
}
