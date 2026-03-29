import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { isMuted, toggleMute } from '../../utils/sounds'
import { startMusic, stopMusic, isMusicPlaying } from '../../utils/music'

export default function SoundToggle() {
  const [muted, setMuted] = useState(isMuted)

  function handleToggle() {
    toggleMute()
    const nowMuted = isMuted()
    setMuted(nowMuted)
    if (nowMuted) {
      stopMusic()
    } else if (!isMusicPlaying()) {
      startMusic()
    }
  }

  return (
    <button
      onClick={handleToggle}
      className="fixed top-1 right-2 z-50 p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full bg-terminal-surface/80 border border-terminal-border text-terminal-muted hover:text-amber-glow transition-colors"
      aria-label={muted ? 'Unmute sound' : 'Mute sound'}
    >
      {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
    </button>
  )
}
