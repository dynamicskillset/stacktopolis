// Which fields are hidden per region, and how to display them.
// Real values stay in tools.js — this only affects the UI.

const OBSCURED = {
  us: {
    surveillance: { display: '???' },
    // Budget/morale shown (cheap is their selling point)
  },
  self: {
    budgetCost: { display: (v) => `${Math.max(0, v - 4)}–${v + 4}` },
    moraleCost: { display: (v) => `${Math.max(0, v - 3)}–${v + 3}` },
    // Risk scores shown (you control the data)
  },
  eu: {
    // Fully transparent — GDPR cuts both ways
  },
}

export function getObscuredFields(region) {
  return OBSCURED[region] || {}
}

export function isFieldObscured(region, field) {
  const fields = OBSCURED[region] || {}
  return field in fields
}

export function getObscuredDisplay(region, field, realValue) {
  const fields = OBSCURED[region] || {}
  const config = fields[field]
  if (!config) return null
  if (typeof config.display === 'function') return config.display(realValue)
  return config.display
}
