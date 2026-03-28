// ============================================================
// Stacktopolis — Event Deck
// 28 quarterly events that shake your charity's tech stack
// ============================================================

export const EVENTS = [
  // ──────────────────────────────────────────────────────────
  // JURISDICTION EVENTS (7)
  // ──────────────────────────────────────────────────────────

  {
    id: 'cloud-act-subpoena',
    lens: 'jurisdiction',
    headline: 'CLOUD Act Subpoena Issued for EU Nonprofit Data',
    flavourText:
      'Your pro-bono lawyer just googled "what is CLOUD Act" in front of you.',
    severity: 'major',
    effectSummary:
      'All US-hosted tools: +8 Jurisdiction. If Jurisdiction exceeds 70: -20 Budget (legal fees).',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      const usTools = state.stack.filter((t) => t.region === 'us')
      delta.jurisdiction = usTools.length * 8
      if (state.jurisdiction + delta.jurisdiction > 70) {
        delta.budget = -20
      }
      return delta
    },
  },

  {
    id: 'data-treaty-collapse',
    lens: 'jurisdiction',
    headline: 'US-EU Data Treaty Collapses in Spectacular Fashion',
    flavourText:
      'Privacy Shield 4.0 lasted eleven months. The champagne at the signing ceremony has barely gone flat.',
    severity: 'critical',
    effectSummary:
      'All US tools: +10 Jurisdiction, -5 Morale.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      const usTools = state.stack.filter((t) => t.region === 'us')
      delta.jurisdiction = usTools.length * 10
      if (usTools.length > 0) {
        delta.morale = -5
      }
      return delta
    },
  },

  {
    id: 'executive-order-data-sharing',
    lens: 'jurisdiction',
    headline: 'Executive Order Mandates Data Sharing with US Agencies',
    flavourText:
      'The order was signed live on a social media platform that your charity also uses. Brilliant.',
    severity: 'major',
    effectSummary:
      'If any US tools installed: +12 Jurisdiction, +5 Surveillance.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      const hasUs = state.stack.some((t) => t.region === 'us')
      if (hasUs) {
        delta.jurisdiction = 12
        delta.surveillance = 5
      }
      return delta
    },
  },

  {
    id: 'foreign-intelligence-request',
    lens: 'jurisdiction',
    headline: 'Foreign Intelligence Request Lands on Your Desk',
    flavourText:
      'The letter is addressed to "The Data Controller (or occupier)". Reassuring.',
    severity: 'minor',
    effectSummary:
      'Tool with highest jurisdiction cost: +15 Jurisdiction.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      if (state.stack.length === 0) return delta
      const worst = state.stack.reduce((a, b) =>
        b.jurisdiction > a.jurisdiction ? b : a
      )
      if (worst) {
        delta.jurisdiction = 15
      }
      return delta
    },
  },

  {
    id: 'sanctions-cloud-hosting',
    lens: 'jurisdiction',
    headline: 'Sanctions Complicate Cloud Hosting Arrangements',
    flavourText:
      'Your hosting provider now requires a 14-page compliance form and a sworn oath of allegiance to "freedom".',
    severity: 'major',
    effectSummary:
      'US-region tools: +10 Jurisdiction, +8 Continuity.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      const usTools = state.stack.filter((t) => t.region === 'us')
      delta.jurisdiction = usTools.length * 10
      delta.continuity = usTools.length * 8
      return delta
    },
  },

  {
    id: 'extraterritorial-subpoena',
    lens: 'jurisdiction',
    headline: 'Extraterritorial Subpoena Targets EU-Hosted Tools',
    flavourText:
      'Turns out your "European" provider is a wholly owned subsidiary of a company in Delaware. Who knew?',
    severity: 'minor',
    effectSummary:
      'EU tools with continuity cost > 10 (implying US parent): +8 Jurisdiction.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      const suspects = state.stack.filter(
        (t) => t.region === 'eu' && t.continuity > 10
      )
      delta.jurisdiction = suspects.length * 8
      return delta
    },
  },

  {
    id: 'eu-digital-sovereignty-act',
    lens: 'jurisdiction',
    headline: 'EU Digital Sovereignty Act Passes with Teeth',
    flavourText:
      'Brussels has finally done something. The lobbyists are furious; the champagne is European.',
    severity: 'major',
    effectSummary:
      'EU tools: -5 Jurisdiction. US tools: +10 Jurisdiction.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      const euTools = state.stack.filter((t) => t.region === 'eu')
      const usTools = state.stack.filter((t) => t.region === 'us')
      delta.jurisdiction = usTools.length * 10 - euTools.length * 5
      return delta
    },
  },

  // ──────────────────────────────────────────────────────────
  // CONTINUITY EVENTS (7)
  // ──────────────────────────────────────────────────────────

  {
    id: 'free-tier-removed',
    lens: 'continuity',
    headline: 'Major Platform Axes Free Tier for Nonprofits',
    flavourText:
      '"We remain committed to our nonprofit community," reads the email that just tripled your costs.',
    severity: 'major',
    effectSummary:
      'Tool with highest continuity cost: +15 Continuity, -10 Budget.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      if (state.stack.length === 0) return delta
      const worst = state.stack.reduce((a, b) =>
        b.continuity > a.continuity ? b : a
      )
      if (worst) {
        delta.continuity = 15
        delta.budget = -10
      }
      return delta
    },
  },

  {
    id: 'api-deprecated-overnight',
    lens: 'continuity',
    headline: 'Critical API Deprecated Overnight Without Warning',
    flavourText:
      'The deprecation notice was posted on a developer forum thread with two replies, both from bots.',
    severity: 'minor',
    effectSummary:
      'Two tools with highest continuity cost: +10 Continuity each.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      if (state.stack.length === 0) return delta
      const sorted = [...state.stack].sort((a, b) => b.continuity - a.continuity)
      const affected = sorted.slice(0, 2)
      delta.continuity = affected.length * 10
      return delta
    },
  },

  {
    id: 'crypto-acquisition',
    lens: 'continuity',
    headline: 'Your Key Vendor Acquired by Crypto Company',
    flavourText:
      'The new CEO\'s first message: "We\'re pivoting to Web3. Also, your data is now on a blockchain. You\'re welcome."',
    severity: 'critical',
    effectSummary:
      'Tool with highest continuity cost: +18 Continuity, -5 Morale.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      if (state.stack.length === 0) return delta
      const worst = state.stack.reduce((a, b) =>
        b.continuity > a.continuity ? b : a
      )
      if (worst) {
        delta.continuity = 18
        delta.morale = -5
      }
      return delta
    },
  },

  {
    id: 'global-outage',
    lens: 'continuity',
    headline: '48-Hour Global Outage Brings Everything Crashing Down',
    flavourText:
      'The status page says "All Systems Operational" while your entire organisation stares at spinning wheels.',
    severity: 'major',
    effectSummary:
      'If 2+ tools share a provider: +20 Continuity. Otherwise: +5 Continuity.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      if (state.stack.length === 0) return delta
      const providerCounts = {}
      state.stack.forEach((t) => {
        providerCounts[t.provider] = (providerCounts[t.provider] || 0) + 1
      })
      const hasDuplicate = Object.values(providerCounts).some((c) => c >= 2)
      delta.continuity = hasDuplicate ? 20 : 5
      return delta
    },
  },

  {
    id: 'price-increase-300',
    lens: 'continuity',
    headline: 'Surprise 300% Price Increase Drops Like a Bomb',
    flavourText:
      'They call it "aligning pricing with the value we deliver". You call it highway robbery.',
    severity: 'major',
    effectSummary:
      'Tool with highest continuity cost: +12 Continuity, -15 Budget.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      if (state.stack.length === 0) return delta
      const worst = state.stack.reduce((a, b) =>
        b.continuity > a.continuity ? b : a
      )
      if (worst) {
        delta.continuity = 12
        delta.budget = -15
      }
      return delta
    },
  },

  {
    id: 'sunsetting-announcement',
    lens: 'continuity',
    headline: '"Sunsetting" Announcement Ruins Your Morning',
    flavourText:
      'They wrote a heartfelt blog post about the "incredible journey". Your data export window is 30 days.',
    severity: 'minor',
    effectSummary:
      'A random tool: +15 Continuity, -8 Morale.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      if (state.stack.length === 0) return delta
      // Pick a pseudo-random tool based on stack length and current metre values
      const index = (state.jurisdiction + state.continuity + state.surveillance) % state.stack.length
      // The effect applies regardless of which tool is "chosen"
      delta.continuity = 15
      delta.morale = -8
      return delta
    },
  },

  {
    id: 'sysadmin-quits',
    lens: 'continuity',
    headline: 'Key Volunteer Sysadmin Quits Without Notice',
    flavourText:
      'They left a sticky note on the server that reads "Good luck. The root password is taped under the keyboard."',
    severity: 'major',
    effectSummary:
      'All self-hosted tools: +10 Continuity, -5 Budget (emergency contractor).',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      const selfHosted = state.stack.filter((t) => t.region === 'self')
      delta.continuity = selfHosted.length * 10
      if (selfHosted.length > 0) {
        delta.budget = -5 * selfHosted.length
      }
      return delta
    },
  },

  // ──────────────────────────────────────────────────────────
  // SURVEILLANCE EVENTS (6)
  // ──────────────────────────────────────────────────────────

  {
    id: 'keystroke-logging',
    lens: 'surveillance',
    headline: 'Analytics Platform Caught Logging Keystrokes',
    flavourText:
      'Every angry Slack message your staff typed about the board is now training data. Every. Single. One.',
    severity: 'major',
    effectSummary:
      'All tools with surveillance cost > 5: +5 Surveillance.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      const dodgy = state.stack.filter((t) => t.surveillance > 5)
      delta.surveillance = dodgy.length * 5
      return delta
    },
  },

  {
    id: 'data-breach',
    lens: 'surveillance',
    headline: 'Data Breach Exposes Thousands of Beneficiary Records',
    flavourText:
      'The hacker group calls themselves "DataFreedomz". They want Bitcoin. You have a £47 petty cash float.',
    severity: 'critical',
    effectSummary:
      '+10 Surveillance, -8 Morale. If Surveillance > 50: -15 Budget (regulatory fines).',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      delta.surveillance = 10
      delta.morale = -8
      if (state.surveillance + delta.surveillance > 50) {
        delta.budget = -15
      }
      return delta
    },
  },

  {
    id: 'ai-training-scandal',
    lens: 'surveillance',
    headline: 'AI Training Data Scandal Engulfs Your Vendors',
    flavourText:
      'Your beneficiaries\' case notes are now powering a chatbot that writes marketing copy. Progress.',
    severity: 'major',
    effectSummary:
      'Tools with surveillance cost > 8: +8 Surveillance, +5 Jurisdiction.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      const suspects = state.stack.filter((t) => t.surveillance > 8)
      delta.surveillance = suspects.length * 8
      delta.jurisdiction = suspects.length * 5
      return delta
    },
  },

  {
    id: 'analytics-sold-adtech',
    lens: 'surveillance',
    headline: 'Analytics Vendor Sold to Ad-Tech Giant',
    flavourText:
      'Your privacy-first analytics tool just got acquired by a company whose logo is literally an eye.',
    severity: 'major',
    effectSummary:
      'Tool with highest surveillance cost: +15 Surveillance, -5 Morale.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      if (state.stack.length === 0) return delta
      const worst = state.stack.reduce((a, b) =>
        b.surveillance > a.surveillance ? b : a
      )
      if (worst) {
        delta.surveillance = 15
        delta.morale = -5
      }
      return delta
    },
  },

  {
    id: 'tracking-cookies-audit',
    lens: 'surveillance',
    headline: 'Compliance Audit Finds 47 Undisclosed Tracking Cookies',
    flavourText:
      'Your cookie banner said "We respect your privacy". The auditor laughed so hard they cried.',
    severity: 'minor',
    effectSummary:
      '+8 Surveillance, -10 Budget (consultant fees).',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      delta.surveillance = 8
      delta.budget = -10
      return delta
    },
  },

  {
    id: 'encryption-backdoor',
    lens: 'surveillance',
    headline: 'Government Demands Encryption Backdoor in Chat Tools',
    flavourText:
      'They promise it will only be used against criminals. The definition of "criminal" is being revised next quarter.',
    severity: 'major',
    effectSummary:
      'If any tools have surveillance > 3 (likely comms tools): +12 Surveillance, +8 Jurisdiction.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      // Target tools that are likely messaging/chat — identified by having some surveillance cost
      const commsTools = state.stack.filter((t) => t.surveillance > 3)
      if (commsTools.length > 0) {
        delta.surveillance = 12
        delta.jurisdiction = 8
      }
      return delta
    },
  },

  // ──────────────────────────────────────────────────────────
  // MULTI-LENS EVENTS (4)
  // ──────────────────────────────────────────────────────────

  {
    id: 'drone-strike-datacentre',
    lens: 'multi',
    headline: 'Drone Strike Damages Major Data Centre',
    flavourText:
      'Your disaster recovery plan assumed disasters would be metaphorical. It did not account for actual explosions.',
    severity: 'critical',
    effectSummary:
      'If 2+ tools share a provider: +20 Continuity, +10 Jurisdiction. Otherwise: +5 Continuity.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      if (state.stack.length === 0) return delta
      const providerCounts = {}
      state.stack.forEach((t) => {
        providerCounts[t.provider] = (providerCounts[t.provider] || 0) + 1
      })
      const hasDuplicate = Object.values(providerCounts).some((c) => c >= 2)
      if (hasDuplicate) {
        delta.continuity = 20
        delta.jurisdiction = 10
      } else {
        delta.continuity = 5
      }
      return delta
    },
  },

  {
    id: 'whistleblower-surveillance',
    lens: 'multi',
    headline: 'Whistleblower Exposes Full-Stack Surveillance Programme',
    flavourText:
      'The leaked slides include a diagram of your exact tech stack with a smiley face next to it. Chilling.',
    severity: 'critical',
    effectSummary:
      '+8 Jurisdiction, +8 Continuity, +8 Surveillance, -10 Morale.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      delta.jurisdiction = 8
      delta.continuity = 8
      delta.surveillance = 8
      delta.morale = -10
      return delta
    },
  },

  {
    id: 'regulatory-overhaul',
    lens: 'multi',
    headline: 'Major Regulatory Overhaul Reshuffles the Deck',
    flavourText:
      'Four hundred pages of new regulation. Your compliance officer has started drinking at lunch.',
    severity: 'major',
    effectSummary:
      'EU tools: -5 Jurisdiction, -3 Surveillance. US tools: +8 Jurisdiction, +5 Surveillance.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      const euTools = state.stack.filter((t) => t.region === 'eu')
      const usTools = state.stack.filter((t) => t.region === 'us')
      delta.jurisdiction = usTools.length * 8 - euTools.length * 5
      delta.surveillance = usTools.length * 5 - euTools.length * 3
      return delta
    },
  },

  {
    id: 'ransomware-supply-chain',
    lens: 'multi',
    headline: 'Ransomware Attack Rips Through Supply Chain',
    flavourText:
      'The ransom note is professionally typeset with a customer support hotline. They are more organised than you.',
    severity: 'critical',
    effectSummary:
      'All tools: +5 Continuity, +3 Surveillance. -10 Budget.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      const toolCount = state.stack.length
      delta.continuity = toolCount > 0 ? toolCount * 5 : 5
      delta.surveillance = toolCount > 0 ? toolCount * 3 : 3
      delta.budget = -10
      return delta
    },
  },

  // ──────────────────────────────────────────────────────────
  // POSITIVE EVENTS (4)
  // ──────────────────────────────────────────────────────────

  {
    id: 'sovereignty-grant',
    lens: 'positive',
    headline: 'Digital Sovereignty Grant Lands in Your Inbox',
    flavourText:
      'An actual piece of good news. Your team briefly forgets what existential dread feels like.',
    severity: 'minor',
    effectSummary:
      '+20 Budget, +10 Morale.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      delta.budget = 20
      delta.morale = 10
      return delta
    },
  },

  {
    id: 'volunteer-sysadmin-joins',
    lens: 'positive',
    headline: 'Volunteer with Sysadmin Skills Appears Like Magic',
    flavourText:
      'They know what Docker is AND they reply to emails within 24 hours. You may be dreaming.',
    severity: 'minor',
    effectSummary:
      'All self-hosted tools: -5 Continuity. +8 Morale.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      const selfHosted = state.stack.filter((t) => t.region === 'self')
      delta.continuity = selfHosted.length > 0 ? selfHosted.length * -5 : 0
      delta.morale = 8
      return delta
    },
  },

  {
    id: 'strong-eu-regulation',
    lens: 'positive',
    headline: 'Strong EU Regulation Passes with Broad Support',
    flavourText:
      'For once, the regulation was written by people who understand what a server is. Miracles happen.',
    severity: 'minor',
    effectSummary:
      'All EU tools: -5 Jurisdiction, -3 Surveillance.',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      const euTools = state.stack.filter((t) => t.region === 'eu')
      delta.jurisdiction = euTools.length > 0 ? euTools.length * -5 : 0
      delta.surveillance = euTools.length > 0 ? euTools.length * -3 : 0
      return delta
    },
  },

  {
    id: 'community-rally',
    lens: 'positive',
    headline: 'Community Rally Boosts Team Spirit Across the Board',
    flavourText:
      'Someone brought homemade cake to the all-hands meeting. Productivity has never been higher.',
    severity: 'minor',
    effectSummary:
      '+15 Morale, -3 Surveillance (transparent practices adopted).',
    apply: (state) => {
      const delta = { jurisdiction: 0, continuity: 0, surveillance: 0, budget: 0, morale: 0 }
      delta.morale = 15
      delta.surveillance = -3
      return delta
    },
  },
]
