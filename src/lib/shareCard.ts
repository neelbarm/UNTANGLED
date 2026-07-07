// Renders a 1080x1920 (story/Reel format) scoreboard card on a canvas and
// downloads it as a PNG — made to be posted straight to Instagram.

export interface ShareData {
  day: number
  total: number
  dateLabel: string
  weekTitle: string
  weekNumber: number
  flowDone: number
  flowTotal: number
  checkDone: number
  checkTotal: number
  streak: number
  won: Set<number>
}

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', system-ui, sans-serif"

export function downloadShareCard(d: ShareData) {
  const W = 1080
  const H = 1920
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const g = canvas.getContext('2d')
  if (!g) return

  // --- Backdrop: black + two aurora blobs -----------------------------------
  g.fillStyle = '#000'
  g.fillRect(0, 0, W, H)

  const blob = (x: number, y: number, r: number, color: string) => {
    const rad = g.createRadialGradient(x, y, 0, x, y, r)
    rad.addColorStop(0, color)
    rad.addColorStop(1, 'rgba(0,0,0,0)')
    g.fillStyle = rad
    g.fillRect(0, 0, W, H)
  }
  blob(140, 320, 640, 'rgba(41,151,255,0.38)')
  blob(960, 1050, 700, 'rgba(191,90,242,0.30)')
  blob(400, 1800, 620, 'rgba(41,151,255,0.18)')

  const center = W / 2

  // --- Header ----------------------------------------------------------------
  g.textAlign = 'center'
  g.fillStyle = 'rgba(255,255,255,0.55)'
  g.font = `600 30px ${FONT}`
  g.fillText('N E E L   B A R M E C H A', center, 170)
  g.fillStyle = 'rgba(255,255,255,0.35)'
  g.font = `500 26px ${FONT}`
  g.fillText('8 0 - D A Y   O P E R A T I N G   S Y S T E M', center, 218)

  // --- Giant day number -------------------------------------------------------
  const grad = g.createLinearGradient(center - 320, 0, center + 320, 0)
  grad.addColorStop(0, '#2997ff')
  grad.addColorStop(1, '#bf5af2')
  g.fillStyle = grad
  g.font = `800 250px ${FONT}`
  g.fillText(`DAY ${d.day}`, center, 560)

  g.fillStyle = 'rgba(255,255,255,0.45)'
  g.font = `500 40px ${FONT}`
  g.fillText(`of ${d.total}  ·  ${d.dateLabel}`, center, 640)

  g.fillStyle = 'rgba(255,255,255,0.85)'
  g.font = `700 46px ${FONT}`
  g.fillText(`Week ${d.weekNumber} — ${d.weekTitle}`, center, 745)

  // --- 80-dot grid (16 x 5) ---------------------------------------------------
  const cols = 16
  const spacing = 56
  const gridW = (cols - 1) * spacing
  const x0 = (W - gridW) / 2
  const y0 = 860
  for (let i = 0; i < d.total; i++) {
    const n = i + 1
    const cx = x0 + (i % cols) * spacing
    const cy = y0 + Math.floor(i / cols) * spacing
    const current = n === d.day
    const won = d.won.has(n)
    const past = n < d.day
    g.beginPath()
    g.arc(cx, cy, current ? 15 : 12, 0, Math.PI * 2)
    if (won) g.fillStyle = '#ff8a2e'
    else if (current) g.fillStyle = '#2997ff'
    else if (past) g.fillStyle = 'rgba(255,255,255,0.28)'
    else g.fillStyle = 'rgba(255,255,255,0.10)'
    g.fill()
    if (current) {
      g.beginPath()
      g.arc(cx, cy, 24, 0, Math.PI * 2)
      g.strokeStyle = 'rgba(41,151,255,0.6)'
      g.lineWidth = 3
      g.stroke()
    }
  }

  // --- Scoreboard row ----------------------------------------------------------
  const statY = 1290
  const stat = (x: number, value: string, label: string) => {
    g.fillStyle = 'rgba(255,255,255,0.95)'
    g.font = `800 84px ${FONT}`
    g.fillText(value, x, statY)
    g.fillStyle = 'rgba(255,255,255,0.4)'
    g.font = `600 26px ${FONT}`
    g.fillText(label, x, statY + 52)
  }
  stat(W * 0.22, `${d.flowDone}/${d.flowTotal}`, "TODAY'S FLOW")
  stat(W * 0.5, `${d.checkDone}/${d.checkTotal}`, 'NON-NEGOTIABLES')
  stat(W * 0.78, `🔥${d.streak}`, 'DAY STREAK')

  // hairline dividers between stats
  g.strokeStyle = 'rgba(255,255,255,0.14)'
  g.lineWidth = 2
  for (const fx of [0.36, 0.64]) {
    g.beginPath()
    g.moveTo(W * fx, statY - 80)
    g.lineTo(W * fx, statY + 60)
    g.stroke()
  }

  // --- The four goals -----------------------------------------------------------
  g.fillStyle = 'rgba(255,255,255,0.45)'
  g.font = `600 28px ${FONT}`
  g.fillText('LOSE 10 LBS  ·  TRADE WITH DISCIPLINE', center, 1500)
  g.fillText('BREAK INTO VC / AI  ·  MOVE TO NYC', center, 1548)

  // --- Footer ---------------------------------------------------------------------
  g.strokeStyle = 'rgba(255,255,255,0.12)'
  g.beginPath()
  g.moveTo(W * 0.2, 1680)
  g.lineTo(W * 0.8, 1680)
  g.stroke()
  g.fillStyle = 'rgba(255,255,255,0.6)'
  g.font = `700 32px ${FONT}`
  g.fillText('Built in public. No hype — just receipts.', center, 1760)
  g.fillStyle = grad
  g.font = `800 34px ${FONT}`
  g.fillText('FOLLOW THE SCOREBOARD', center, 1820)

  // --- Download ---------------------------------------------------------------------
  canvas.toBlob((blobOut) => {
    if (!blobOut) return
    const url = URL.createObjectURL(blobOut)
    const a = document.createElement('a')
    a.href = url
    a.download = `day-${d.day}-of-${d.total}.png`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 5000)
  }, 'image/png')
}
