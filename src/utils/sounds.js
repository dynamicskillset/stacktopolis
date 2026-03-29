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

// Warm tone with filter — sounds like a wooden instrument
function playWarm(freq, duration, volume = 0.08) {
  if (muted) return
  const ctx = getCtx()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()

  osc.type = 'sine'
  osc.frequency.value = freq

  filter.type = 'lowpass'
  filter.frequency.value = freq * 3
  filter.Q.value = 0.5

  const now = ctx.currentTime
  gain.gain.setValueAtTime(volume, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

  osc.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + duration)
}

// Mellow bell — sine + quiet harmonic for richness
function playBell(freq, duration, volume = 0.06) {
  if (muted) return
  const ctx = getCtx()
  const now = ctx.currentTime

  // Fundamental
  const osc1 = ctx.createOscillator()
  const gain1 = ctx.createGain()
  osc1.type = 'sine'
  osc1.frequency.value = freq
  gain1.gain.setValueAtTime(volume, now)
  gain1.gain.exponentialRampToValueAtTime(0.001, now + duration)
  osc1.connect(gain1)
  gain1.connect(ctx.destination)
  osc1.start(now)
  osc1.stop(now + duration)

  // Quiet octave above for shimmer
  const osc2 = ctx.createOscillator()
  const gain2 = ctx.createGain()
  osc2.type = 'sine'
  osc2.frequency.value = freq * 2
  gain2.gain.setValueAtTime(volume * 0.3, now)
  gain2.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.6)
  osc2.connect(gain2)
  gain2.connect(ctx.destination)
  osc2.start(now)
  osc2.stop(now + duration)
}

// Soft noise puff — like a whisper
function playSoftNoise(duration, volume = 0.02) {
  if (muted) return
  const ctx = getCtx()
  const bufferSize = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.3
  }
  const source = ctx.createBufferSource()
  source.buffer = buffer
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 1500
  gain.gain.setValueAtTime(volume, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  source.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  source.start()
}

const SOUNDS = {
  click() {
    // Soft tap — like touching a wooden surface
    playWarm(600, 0.08, 0.05)
  },

  toolSelect() {
    // Gentle ascending chime — "something was chosen"
    playBell(440, 0.2, 0.06)
    setTimeout(() => playBell(554, 0.25, 0.05), 80)
  },

  eventMinor() {
    // Soft two-note notification
    playWarm(392, 0.3, 0.06)
    setTimeout(() => playWarm(440, 0.35, 0.05), 150)
  },

  eventMajor() {
    // Deeper, more serious three-note phrase
    playWarm(262, 0.3, 0.07)
    setTimeout(() => playWarm(294, 0.3, 0.06), 180)
    setTimeout(() => playWarm(262, 0.4, 0.05), 360)
  },

  eventCritical() {
    // Low rumbling concern — triangle waves for gravity
    playWarm(165, 0.4, 0.08)
    setTimeout(() => playWarm(147, 0.4, 0.07), 200)
    setTimeout(() => playWarm(131, 0.5, 0.06), 400)
    setTimeout(() => playSoftNoise(0.2, 0.03), 500)
  },

  riskWarning() {
    // Two gentle but insistent bells
    playBell(698, 0.15, 0.07)
    setTimeout(() => playBell(698, 0.15, 0.06), 200)
    setTimeout(() => playBell(698, 0.2, 0.05), 400)
  },

  gameOver() {
    // Slow, melancholic descending notes — acceptance, not alarm
    playBell(392, 0.4, 0.07)
    setTimeout(() => playBell(349, 0.4, 0.06), 300)
    setTimeout(() => playBell(294, 0.5, 0.06), 600)
    setTimeout(() => playBell(262, 0.7, 0.05), 900)
    setTimeout(() => playSoftNoise(0.5, 0.02), 1100)
  },

  positive() {
    // Bright ascending bells — celebration
    playBell(523, 0.15, 0.07)
    setTimeout(() => playBell(659, 0.15, 0.06), 100)
    setTimeout(() => playBell(784, 0.15, 0.06), 200)
    setTimeout(() => playBell(1047, 0.2, 0.05), 300)
  },

  endQuarter() {
    // Soft single chime — like a clock marking time
    playBell(523, 0.3, 0.05)
  },

  colleagueArrive() {
    // Friendly knock — two soft taps
    playWarm(440, 0.1, 0.06)
    setTimeout(() => playWarm(554, 0.15, 0.05), 120)
  },

  colleagueExpire() {
    // Gentle descending sigh — they left
    playWarm(392, 0.2, 0.05)
    setTimeout(() => playWarm(330, 0.25, 0.04), 180)
    setTimeout(() => playWarm(262, 0.35, 0.03), 360)
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
