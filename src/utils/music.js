// Procedural ambient music — shifts with danger level
// Uses Web Audio API oscillators, filters, and gain nodes
// No external audio files needed

let musicCtx = null
let isPlaying = false
let nodes = null
let currentDanger = 0

function getMusicCtx() {
  if (!musicCtx) {
    musicCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (musicCtx.state === 'suspended') {
    musicCtx.resume()
  }
  return musicCtx
}

function createPad(ctx, freq, type = 'sine', volume = 0.03) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()

  osc.type = type
  osc.frequency.value = freq
  filter.type = 'lowpass'
  filter.frequency.value = 800
  filter.Q.value = 1

  gain.gain.value = volume

  osc.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  osc.start()
  return { osc, gain, filter }
}

export function startMusic() {
  if (isPlaying) return
  const ctx = getMusicCtx()

  // Create layered ambient pads
  // Layer 1: Deep drone (always present)
  const drone = createPad(ctx, 65.41, 'sine', 0.025) // C2

  // Layer 2: Warm pad (calm — fades with danger)
  const warmPad = createPad(ctx, 130.81, 'sine', 0.02) // C3
  const warmPad2 = createPad(ctx, 164.81, 'sine', 0.015) // E3

  // Layer 3: Tension pad (rises with danger)
  const tensionPad = createPad(ctx, 123.47, 'sawtooth', 0) // B2
  const tensionPad2 = createPad(ctx, 146.83, 'sawtooth', 0) // D3

  // Layer 4: High shimmer (low danger only — peaceful)
  const shimmer = createPad(ctx, 523.25, 'sine', 0.008) // C5
  const shimmer2 = createPad(ctx, 659.25, 'sine', 0.006) // E5

  // Slow LFO for gentle movement
  const lfo = ctx.createOscillator()
  const lfoGain = ctx.createGain()
  lfo.type = 'sine'
  lfo.frequency.value = 0.15 // Very slow wobble
  lfoGain.gain.value = 3
  lfo.connect(lfoGain)
  lfoGain.connect(drone.osc.frequency)
  lfoGain.connect(warmPad.osc.frequency)
  lfo.start()

  // Second LFO for filter sweep
  const lfo2 = ctx.createOscillator()
  const lfo2Gain = ctx.createGain()
  lfo2.type = 'sine'
  lfo2.frequency.value = 0.08
  lfo2Gain.gain.value = 200
  lfo2.connect(lfo2Gain)
  lfo2Gain.connect(warmPad.filter.frequency)
  lfo2Gain.connect(tensionPad.filter.frequency)
  lfo2.start()

  nodes = {
    drone, warmPad, warmPad2,
    tensionPad, tensionPad2,
    shimmer, shimmer2,
    lfo, lfoGain, lfo2, lfo2Gain,
  }

  isPlaying = true
  updateDanger(currentDanger)
}

export function stopMusic() {
  if (!isPlaying || !nodes) return

  const ctx = getMusicCtx()
  const fadeTime = ctx.currentTime + 1

  // Fade everything out
  Object.values(nodes).forEach(node => {
    if (node.gain) {
      node.gain.gain.linearRampToValueAtTime(0, fadeTime)
    }
  })

  // Stop oscillators after fade
  setTimeout(() => {
    Object.values(nodes).forEach(node => {
      if (node.osc) {
        try { node.osc.stop() } catch {}
      }
      if (node.disconnect) {
        try { node.disconnect() } catch {}
      }
    })
    nodes = null
    isPlaying = false
  }, 1200)
}

export function updateDanger(dangerLevel) {
  currentDanger = dangerLevel
  if (!isPlaying || !nodes) return

  const ctx = getMusicCtx()
  const t = ctx.currentTime + 0.5 // Smooth transition
  const danger = Math.max(0, Math.min(100, dangerLevel))
  const dangerPct = danger / 100

  // Warm pads fade out as danger rises
  const warmVol = 0.02 * (1 - dangerPct)
  nodes.warmPad.gain.gain.linearRampToValueAtTime(warmVol, t)
  nodes.warmPad2.gain.gain.linearRampToValueAtTime(warmVol * 0.75, t)

  // Tension pads fade in as danger rises
  const tensionVol = 0.02 * dangerPct
  nodes.tensionPad.gain.gain.linearRampToValueAtTime(tensionVol, t)
  nodes.tensionPad2.gain.gain.linearRampToValueAtTime(tensionVol * 0.8, t)

  // Filter opens up with danger (more harsh harmonics)
  const filterFreq = 400 + dangerPct * 1200
  nodes.tensionPad.filter.frequency.linearRampToValueAtTime(filterFreq, t)
  nodes.tensionPad2.filter.frequency.linearRampToValueAtTime(filterFreq, t)

  // Shimmer fades out at high danger
  const shimmerVol = danger < 50 ? 0.008 * (1 - dangerPct * 2) : 0
  nodes.shimmer.gain.gain.linearRampToValueAtTime(Math.max(0, shimmerVol), t)
  nodes.shimmer2.gain.gain.linearRampToValueAtTime(Math.max(0, shimmerVol * 0.75), t)

  // LFO speeds up slightly with danger
  nodes.lfo.frequency.linearRampToValueAtTime(0.15 + dangerPct * 0.3, t)

  // Drone gets slightly louder and lower with danger
  nodes.drone.gain.gain.linearRampToValueAtTime(0.025 + dangerPct * 0.015, t)
  nodes.drone.osc.frequency.linearRampToValueAtTime(65.41 - dangerPct * 10, t)
}

export function isMusicPlaying() {
  return isPlaying
}
