// Procedural ambient music — evolving chords that shift with danger
// Uses Web Audio API. No external audio files.

let musicCtx = null
let isPlaying = false
let masterGain = null
let chordInterval = null
let currentDanger = 0
let activeOscs = []

// Chord progressions — calm vs tense
const CALM_CHORDS = [
  [130.81, 164.81, 196.00],  // C E G (C major)
  [146.83, 174.61, 220.00],  // D F# A (D major)
  [110.00, 130.81, 164.81],  // A C E (A minor)
  [123.47, 155.56, 185.00],  // B D# F# (sort of)
  [130.81, 155.56, 196.00],  // C Eb G (C minor)
  [116.54, 146.83, 174.61],  // Bb D F#
]

const TENSE_CHORDS = [
  [123.47, 146.83, 185.00],  // B D F# (B minor)
  [110.00, 138.59, 164.81],  // A C# E (A major — tension through brightness)
  [103.83, 130.81, 155.56],  // Ab C Eb
  [116.54, 138.59, 174.61],  // Bb C# F
  [98.00, 123.47, 146.83],   // G B D (lower, darker)
  [92.50, 116.54, 138.59],   // F# Bb C#
]

let chordIndex = 0

function getMusicCtx() {
  if (!musicCtx) {
    musicCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (musicCtx.state === 'suspended') {
    musicCtx.resume()
  }
  return musicCtx
}

function playChord(ctx, freqs, type, volume, filterFreq, duration) {
  const oscs = freqs.map((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = type
    osc.frequency.value = freq
    // Slight detuning for richness
    osc.detune.value = (i - 1) * 4

    filter.type = 'lowpass'
    filter.frequency.value = filterFreq
    filter.Q.value = 0.7

    // Envelope: fade in, sustain, fade out
    const now = ctx.currentTime
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(volume, now + 1.5)
    gain.gain.setValueAtTime(volume, now + duration - 2)
    gain.gain.linearRampToValueAtTime(0, now + duration)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(masterGain)

    osc.start(now)
    osc.stop(now + duration + 0.1)

    return { osc, gain, filter }
  })

  activeOscs.push(...oscs)

  // Clean up stopped oscillators
  setTimeout(() => {
    activeOscs = activeOscs.filter(o => {
      try { o.osc.frequency.value; return true } catch { return false }
    })
  }, (duration + 1) * 1000)

  return oscs
}

function playNextChord() {
  if (!isPlaying || !masterGain) return
  const ctx = getMusicCtx()
  const dangerPct = Math.max(0, Math.min(100, currentDanger)) / 100

  // Pick chord from calm or tense progression based on danger
  const calmChords = CALM_CHORDS
  const tenseChords = TENSE_CHORDS

  // Crossfade between calm and tense chords
  const chordDuration = 8 // seconds per chord

  // Calm pad (fades with danger)
  if (dangerPct < 0.8) {
    const calmVol = 0.018 * (1 - dangerPct)
    const chord = calmChords[chordIndex % calmChords.length]
    playChord(ctx, chord, 'sine', calmVol, 600 + dangerPct * 200, chordDuration)
  }

  // Tense pad (rises with danger)
  if (dangerPct > 0.2) {
    const tenseVol = 0.014 * dangerPct
    const chord = tenseChords[chordIndex % tenseChords.length]
    const filterF = 300 + dangerPct * 1000
    playChord(ctx, chord, 'sawtooth', tenseVol, filterF, chordDuration)
  }

  // Deep bass note (always, root of current chord)
  const bassChord = dangerPct < 0.5
    ? calmChords[chordIndex % calmChords.length]
    : tenseChords[chordIndex % tenseChords.length]
  playChord(ctx, [bassChord[0] / 2], 'sine', 0.02, 200, chordDuration)

  // High shimmer at low danger
  if (dangerPct < 0.4) {
    const shimmerVol = 0.005 * (1 - dangerPct * 2.5)
    const shimmerChord = calmChords[chordIndex % calmChords.length].map(f => f * 4)
    playChord(ctx, [shimmerChord[0], shimmerChord[2]], 'sine', shimmerVol, 2000, chordDuration)
  }

  chordIndex++
}

export function startMusic() {
  if (isPlaying) return
  const ctx = getMusicCtx()

  masterGain = ctx.createGain()
  masterGain.gain.value = 1
  masterGain.connect(ctx.destination)

  isPlaying = true
  chordIndex = 0

  // Play first chord immediately
  playNextChord()

  // Cycle chords every 8 seconds
  chordInterval = setInterval(playNextChord, 8000)
}

export function stopMusic() {
  if (!isPlaying) return

  clearInterval(chordInterval)
  chordInterval = null

  if (masterGain) {
    const ctx = getMusicCtx()
    masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5)
  }

  setTimeout(() => {
    activeOscs.forEach(o => {
      try { o.osc.stop() } catch {}
    })
    activeOscs = []
    if (masterGain) {
      try { masterGain.disconnect() } catch {}
      masterGain = null
    }
    isPlaying = false
  }, 2000)
}

export function updateDanger(dangerLevel) {
  currentDanger = dangerLevel
  // Danger changes affect the NEXT chord that plays (every 8s)
  // The current chord continues playing naturally
}

export function isMusicPlaying() {
  return isPlaying
}
