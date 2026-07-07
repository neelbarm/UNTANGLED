// Tiny synthesized UI sounds via Web Audio — no assets, no network.
// Everything is wrapped in try/catch: audio must never break the app.

let enabled = true
export function setSoundEnabled(v: boolean) {
  enabled = v
}

let ctx: AudioContext | null = null
function ac(): AudioContext {
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    ctx = new Ctor()
  }
  return ctx
}

function note(freq: number, t0: number, dur: number, gain = 0.06, type: OscillatorType = 'sine') {
  const c = ac()
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.value = freq
  g.gain.setValueAtTime(0, t0)
  g.gain.linearRampToValueAtTime(gain, t0 + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  o.connect(g)
  g.connect(c.destination)
  o.start(t0)
  o.stop(t0 + dur + 0.05)
}

/** Soft two-tone blip when a checkbox is ticked. */
export function tick() {
  if (!enabled) return
  try {
    const c = ac()
    if (c.state === 'suspended') void c.resume()
    const t = c.currentTime
    note(880, t, 0.09, 0.05)
    note(1318.5, t + 0.055, 0.12, 0.04)
  } catch {
    // audio unavailable — stay silent
  }
}

/** Short ascending fanfare for completing the whole day. */
export function fanfare() {
  if (!enabled) return
  try {
    const c = ac()
    if (c.state === 'suspended') void c.resume()
    const t = c.currentTime
    const arp = [523.25, 659.25, 783.99, 1046.5] // C5 E5 G5 C6
    arp.forEach((f, i) => note(f, t + i * 0.09, 0.35, 0.06, 'triangle'))
    note(1318.51, t + 0.38, 0.55, 0.05, 'triangle') // E6 sparkle on top
  } catch {
    // audio unavailable — stay silent
  }
}
