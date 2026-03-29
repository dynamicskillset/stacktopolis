// Name pools per role — randomised each game session
const COO_NAMES = ['Marcus', 'Fatima', 'Tomasz', 'Chen Wei', 'Amara', 'Jorge']
const SECURITY_NAMES = ['Priya', 'Yuki', 'Olumide', 'Elena', 'Kwame', 'Aisling']
const STAFF_NAMES = ['Sam', 'Aisha', 'Liam', 'Mei-Lin', 'Dayo', 'Freya']
const FUNDER_NAMES = ['Nkechi', 'Ingrid', 'Tariq', 'Lucia', 'Blessing', 'Annika']

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

export function generateColleagues() {
  return {
    marcus: {
      id: 'marcus',
      name: pick(COO_NAMES),
      role: 'COO',
      domain: ['continuity', 'budget'],
      patience: 20000,
      colour: '#8B7A2F',
    },
    priya: {
      id: 'priya',
      name: pick(SECURITY_NAMES),
      role: 'Security Analyst',
      domain: ['surveillance'],
      patience: 25000,
      colour: '#2B6AB0',
    },
    sam: {
      id: 'sam',
      name: pick(STAFF_NAMES),
      role: 'Staff Rep',
      domain: ['morale'],
      patience: 40000,
      colour: '#2E7D32',
    },
    nkechi: {
      id: 'nkechi',
      name: pick(FUNDER_NAMES),
      role: 'External Funder',
      domain: ['jurisdiction', 'compliance'],
      patience: 15000,
      colour: '#636B78',
    },
  }
}

// Default instance — regenerated each page load
export const COLLEAGUES = generateColleagues()
export const COLLEAGUE_LIST = Object.values(COLLEAGUES)
