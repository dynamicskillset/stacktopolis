let audioCtx = null
let muted = true

try {
  muted = localStorage.getItem('stacktopolis-muted') !== 'false'
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
    playTone(880, 0.08, 'square', 0.06)
    setTimeout(() => playTone(880, 0.08, 'square', 0.06), 150)
  },

  gameOver() {
    playTone(200, 0.3, 'sawtooth', 0.1)
    setTimeout(() => playTone(150, 0.4, 'sawtooth', 0.08), 200)
    setTimeout(() => playTone(100, 0.6, 'sawtooth', 0.06), 400)
    setTimeout(() => playNoise(0.3, 0.04), 600)
  },

  positive() {
    playTone(523, 0.1, 'sine', 0.1)
    setTimeout(() => playTone(659, 0.1, 'sine', 0.08), 80)
    setTimeout(() => playTone(784, 0.15, 'sine', 0.06), 160)
  },

  endQuarter() {
    playTone(440, 0.05, 'triangle', 0.06)
  },

  colleagueArrive() {
    playTone(523, 0.06, 'sine', 0.06)
    setTimeout(() => playTone(659, 0.06, 'sine', 0.05), 60)
  },

  colleagueExpire() {
    playTone(330, 0.12, 'sawtooth', 0.06)
    setTimeout(() => playTone(220, 0.15, 'sawtooth', 0.04), 100)
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
