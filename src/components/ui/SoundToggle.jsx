import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { isMuted, toggleMute } from '../../utils/sounds'

export default function SoundToggle() {
  const [muted, setMuted] = useState(isMuted)

  function handleToggle() {
    toggleMute()
    setMuted(isMuted())
  }

  return (
    <button
      onClick={handleToggle}
      className="fixed top-2 right-3 z-50 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-terminal-muted hover:text-amber-glow transition-colors"
      aria-label={muted ? 'Unmute sound' : 'Mute sound'}
    >
      {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
    </button>
  )
}
