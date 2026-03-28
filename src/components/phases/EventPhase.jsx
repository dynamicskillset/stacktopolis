import BreakingBanner from '../ui/BreakingBanner'
import EventCard from '../ui/EventCard'

export default function EventPhase({ event, onAcknowledge }) {
  if (!event) return null

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-terminal-surface/30 rounded-lg p-4">
      <BreakingBanner visible severity={event.severity} />
      <EventCard event={event} onAcknowledge={onAcknowledge} />
    </div>
  )
}
