let audioCtx = null
let muted = false

try {
  const stored = localStorage.getItem('stacktopolis-muted')
  if (stored !== null) muted = stored === 'true'
} catch {}

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

function playTone(freq, duration, type = 'sine', volume = 0.15) {
  if (muted) return
  const ctx = getCtx()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.value = volume
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + duration)
}

function playNoise(duration, volume = 0.05) {
  if (muted) return
  const ctx = getCtx()
  const bufferSize = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.5
  }
  const source = ctx.createBufferSource()
  source.buffer = buffer
  const gain = ctx.createGain()
  gain.gain.value = volume
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  source.connect(gain)
  gain.connect(ctx.destination)
  source.start()
}

const SOUNDS = {
  click() {
    playTone(800, 0.04, 'square', 0.06)
    playTone(600, 0.03, 'square', 0.04)
  },

  toolSelect() {
    playTone(440, 0.06, 'square', 0.08)
    setTimeout(() => playTone(660, 0.08, 'square', 0.06), 40)
  },

  eventMinor() {
    playTone(330, 0.15, 'sine', 0.1)
    setTimeout(() => playTone(392, 0.2, 'sine', 0.08), 100)
  },

  eventMajor() {
    playTone(220, 0.2, 'sawtooth', 0.08)
    setTimeout(() => playTone(277, 0.25, 'sawtooth', 0.1), 120)
    setTimeout(() => playTone(330, 0.3, 'sawtooth', 0.06), 240)
  },

  eventCritical() {
    playTone(150, 0.3, 'sawtooth', 0.12)
    setTimeout(() => playTone(180, 0.25, 'sawtooth', 0.14), 100)
    setTimeout(() => playTone(220, 0.4, 'sawtooth', 0.1), 200)
    setTimeout(() => playNoise(0.15, 0.06), 300)
  },

  riskWarning() {
    // Klaxon-style alarm — two alternating tones
    playTone(800, 0.1, 'square', 0.06)
    setTimeout(() => playTone(600, 0.1, 'square', 0.06), 120)
    setTimeout(() => playTone(800, 0.1, 'square', 0.05), 240)
  },

  gameOver() {
    // Dramatic descending "everything is lost" fanfare
    playTone(293, 0.2, 'sawtooth', 0.1)
    setTimeout(() => playTone(261, 0.2, 'sawtooth', 0.09), 200)
    setTimeout(() => playTone(220, 0.3, 'sawtooth', 0.08), 400)
    setTimeout(() => playTone(146, 0.5, 'sawtooth', 0.07), 600)
    setTimeout(() => playNoise(0.4, 0.04), 800)
  },

  positive() {
    // Triumphant little jingle
    playTone(523, 0.08, 'sine', 0.1)
    setTimeout(() => playTone(659, 0.08, 'sine', 0.09), 70)
    setTimeout(() => playTone(784, 0.08, 'sine', 0.08), 140)
    setTimeout(() => playTone(1047, 0.15, 'sine', 0.07), 210)
  },

  endQuarter() {
    playTone(440, 0.05, 'triangle', 0.06)
  },

  colleagueArrive() {
    // Doorbell "ding-dong"
    playTone(660, 0.12, 'sine', 0.08)
    setTimeout(() => playTone(523, 0.15, 'sine', 0.07), 150)
  },

  colleagueExpire() {
    // Sad trombone "wah-wah-wahhh"
    playTone(311, 0.15, 'sawtooth', 0.06)
    setTimeout(() => playTone(293, 0.15, 'sawtooth', 0.06), 200)
    setTimeout(() => playTone(261, 0.3, 'sawtooth', 0.05), 400)
  },
}

export function playSound(name) {
  if (muted) return
  const fn = SOUNDS[name]
  if (fn) fn()
}

export function isMuted() {
  return muted
}

export function setMuted(value) {
  muted = value
  try {
    localStorage.setItem('stacktopolis-muted', value ? 'true' : 'false')
  } catch {}
}

export function toggleMute() {
  setMuted(!muted)
  return muted
}
