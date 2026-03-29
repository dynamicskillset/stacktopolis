export const ORG_NAMES = [
  'Bright Futures Trust',
  'Community Action Network',
  'The Solidarity Collective',
  'Open Doors Foundation',
  'Citizens for Change',
  'The Common Good Alliance',
  'Grassroots Aid Society',
  'Digital Rights Collective',
  'The Resilience Project',
  'People First Coalition',
  'Fair Access Foundation',
  'The Lighthouse Co-op',
  'Equitable Futures CIC',
  'The Bridge Initiative',
  'Mutual Aid Network',
  'The Beacon Trust',
  'Community Roots CIO',
  'The Compass Group',
  'Neighbours United',
  'The Seedbed Foundation',
]

export function randomOrgName() {
  return ORG_NAMES[Math.floor(Math.random() * ORG_NAMES.length)]
}
