// ============================================================
// Stacktopolis — Colleague Scenarios
// Each scenario is delivered by a colleague with 2-3 choices
// ============================================================

export const SCENARIOS = [
  // ──────────────────────────────────────────────────────────
  // NKECHI (Funder) — Jurisdiction & Compliance
  // ──────────────────────────────────────────────────────────

  {
    id: 'cloud-act-subpoena',
    colleagueId: 'nkechi',
    type: 'crisis',
    headline: 'CLOUD Act Subpoena Issued for EU Nonprofit Data',
    dialogue: "We've received a CLOUD Act subpoena targeting data held by your offshore providers. Our legal counsel is, shall we say, learning on the job. What's your response?",
    triggerCondition: (state) => state.stack.some(t => t.region === 'us'),
    priority: 4,
    options: [
      {
        label: 'Fight it in court',
        description: 'Expensive but principled',
        effect: (state) => {
          const usCount = state.stack.filter(t => t.region === 'us').length
          return { jurisdiction: usCount * 4, budget: -15, morale: 5 }
        },
        responseText: "Bold. Our lawyers are billing by the hour and learning by the minute.",
      },
      {
        label: 'Comply and review',
        description: 'Cooperate now, migrate later',
        effect: (state) => {
          const usCount = state.stack.filter(t => t.region === 'us').length
          return { jurisdiction: usCount * 8, morale: -5 }
        },
        responseText: "Noted. I'll need to inform the board about our exposure.",
      },
      {
        label: 'Emergency migration',
        description: 'Move affected data immediately',
        effect: () => ({ jurisdiction: 3, budget: -20, continuity: 10 }),
        responseText: "Fast but messy. At least the data will be on the right continent.",
      },
    ],
    ignoreEffect: (state) => {
      const usCount = state.stack.filter(t => t.region === 'us').length
      return { jurisdiction: usCount * 10, budget: -20, morale: -5 }
    },
  },

  {
    id: 'data-treaty-collapse',
    colleagueId: 'nkechi',
    type: 'crisis',
    headline: 'International Data Treaty Collapses in Spectacular Fashion',
    dialogue: "Privacy Shield 4.0 is dead. Eleven months. The ink on the agreement was barely dry. Every offshore-hosted tool in your stack is now in a legal grey area.",
    triggerCondition: (state) => state.stack.some(t => t.region === 'us'),
    priority: 5,
    options: [
      {
        label: 'Invoke standard contractual clauses',
        description: 'Legal patch, buys time',
        effect: (state) => {
          const usCount = state.stack.filter(t => t.region === 'us').length
          return { jurisdiction: usCount * 5, budget: -8 }
        },
        responseText: "Temporary fix. The next legal challenge will tear through those clauses like wet paper.",
      },
      {
        label: 'Accept the risk',
        description: 'Business as usual',
        effect: (state) => {
          const usCount = state.stack.filter(t => t.region === 'us').length
          return { jurisdiction: usCount * 10, morale: -5 }
        },
        responseText: "I respect your appetite for risk. I don't share it.",
      },
    ],
    ignoreEffect: (state) => {
      const usCount = state.stack.filter(t => t.region === 'us').length
      return { jurisdiction: usCount * 12, morale: -8 }
    },
  },

  {
    id: 'executive-order',
    colleagueId: 'nkechi',
    type: 'warning',
    headline: 'Executive Order Mandates Data Sharing with US Agencies',
    dialogue: "There's a new executive order requiring offshore tech companies to share data with federal agencies on request. If you have offshore tools, your beneficiary data could be on the table.",
    triggerCondition: (state) => state.stack.some(t => t.region === 'us'),
    priority: 3,
    options: [
      {
        label: 'Audit US tool data flows',
        description: 'Understand the exposure',
        effect: () => ({ jurisdiction: 8, surveillance: 3, budget: -5 }),
        responseText: "I'll commission a data mapping exercise. The results will not be comfortable reading.",
      },
      {
        label: 'Brief the board',
        description: 'Escalate the concern',
        effect: () => ({ jurisdiction: 12, surveillance: 5, morale: -3 }),
        responseText: "I'll prepare the briefing. They should know what they're exposed to.",
      },
    ],
    ignoreEffect: () => ({ jurisdiction: 15, surveillance: 8, morale: -5 }),
  },

  {
    id: 'eu-sovereignty-act',
    colleagueId: 'nkechi',
    type: 'opportunity',
    headline: 'EU Digital Sovereignty Act Passes with Teeth',
    dialogue: "Good news for once. The EU has passed strong digital sovereignty legislation. Your EU-hosted tools are now on firmer legal ground. offshore-hosted tools... less so.",
    triggerCondition: () => true,
    priority: 2,
    options: [
      {
        label: 'Leverage for migration funding',
        description: 'Use the regulation to justify moving off offshore tools',
        effect: (state) => {
          const euCount = state.stack.filter(t => t.region === 'eu').length
          const usCount = state.stack.filter(t => t.region === 'us').length
          return { jurisdiction: usCount * 5 - euCount * 5, budget: 10 }
        },
        responseText: "I can write a compelling case for the next grant application.",
      },
      {
        label: 'Note it and move on',
        description: 'Good to know',
        effect: (state) => {
          const euCount = state.stack.filter(t => t.region === 'eu').length
          return { jurisdiction: -euCount * 3 }
        },
        responseText: "Understood. I'll update our compliance register.",
      },
    ],
    ignoreEffect: () => ({ jurisdiction: 5 }),
  },

  {
    id: 'regulatory-overhaul',
    colleagueId: 'nkechi',
    type: 'crisis',
    headline: 'Major Regulatory Overhaul Reshuffles the Deck',
    dialogue: "Four hundred pages of new regulation just dropped. Our compliance officer has started bringing a hip flask to meetings. We need to respond.",
    triggerCondition: () => true,
    priority: 4,
    options: [
      {
        label: 'Hire a compliance consultant',
        description: 'Expert help, big cost',
        effect: (state) => {
          const usCount = state.stack.filter(t => t.region === 'us').length
          return { jurisdiction: usCount * 4, surveillance: usCount * 2, budget: -15 }
        },
        responseText: "Expensive, but at least someone will read all four hundred pages.",
      },
      {
        label: 'Internal review only',
        description: 'Save money, risk gaps',
        effect: (state) => {
          const usCount = state.stack.filter(t => t.region === 'us').length
          const euCount = state.stack.filter(t => t.region === 'eu').length
          return { jurisdiction: usCount * 8 - euCount * 5, surveillance: usCount * 5 - euCount * 3, morale: -5 }
        },
        responseText: "Your call. I hope someone on your team reads fast.",
      },
    ],
    ignoreEffect: () => ({ jurisdiction: 15, surveillance: 10, morale: -8 }),
  },

  // ──────────────────────────────────────────────────────────
  // MARCUS (COO) — Continuity & Budget
  // ──────────────────────────────────────────────────────────

  {
    id: 'free-tier-removed',
    colleagueId: 'marcus',
    type: 'crisis',
    headline: 'Major Platform Axes Free Tier for Nonprofits',
    dialogue: '"We remain committed to our nonprofit community," reads the email that just tripled our costs. I need a decision on this: pay up, find an alternative, or do nothing and hope they change their minds.',
    triggerCondition: (state) => state.stack.some(t => t.region === 'us'),
    priority: 4,
    options: [
      {
        label: 'Pay the new price',
        description: 'Keep the tool, absorb the cost',
        effect: () => ({ continuity: 5, budget: -15 }),
        responseText: "Done. The budget spreadsheet just turned an interesting shade of red.",
      },
      {
        label: 'Start migration planning',
        description: 'Begin looking for alternatives',
        effect: () => ({ continuity: 15, budget: -5, morale: -5 }),
        responseText: "I'll put together a transition timeline. Don't expect it to be short.",
      },
      {
        label: 'Negotiate',
        description: 'Push back on the pricing',
        effect: () => ({ continuity: 8, budget: -8 }),
        responseText: "I'll get on a call with their 'customer success' team. Success for whom, I wonder.",
      },
    ],
    ignoreEffect: () => ({ continuity: 20, budget: -15, morale: -5 }),
  },

  {
    id: 'api-deprecated',
    colleagueId: 'marcus',
    type: 'warning',
    headline: 'Critical API Deprecated Overnight Without Warning',
    dialogue: "A deprecation notice was posted on a developer forum at 2am. Two of our integrations are about to break. I need you to decide how we handle this.",
    triggerCondition: (state) => state.stack.length >= 3,
    priority: 3,
    options: [
      {
        label: 'Emergency patch',
        description: 'Fix the integrations immediately',
        effect: () => ({ continuity: 5, budget: -10, morale: -3 }),
        responseText: "I'll pull people off other work. Nobody will be happy about it.",
      },
      {
        label: 'Wait for official timeline',
        description: 'Maybe they will extend the deadline',
        effect: () => ({ continuity: 15 }),
        responseText: "Optimistic. But I'll set a reminder to check back in a week.",
      },
    ],
    ignoreEffect: () => ({ continuity: 20, morale: -5 }),
  },

  {
    id: 'crypto-acquisition',
    colleagueId: 'marcus',
    type: 'crisis',
    headline: 'Your Key Vendor Acquired by Crypto Company',
    dialogue: "The new CEO's first message: 'We're pivoting to Web3.' I wish I were joking. Our data is apparently going on a blockchain. We need to act.",
    triggerCondition: (state) => state.stack.length >= 2,
    priority: 5,
    options: [
      {
        label: 'Immediate migration',
        description: 'Get out now while data export still works',
        effect: () => ({ continuity: 8, budget: -15, morale: -3 }),
        responseText: "Smart. The export tool will probably be 'sunsetted' by Friday.",
      },
      {
        label: 'Wait and see',
        description: 'Maybe the pivot will fail quickly',
        effect: () => ({ continuity: 18, morale: -5 }),
        responseText: "Your optimism is noted. I'm backing up everything I can reach.",
      },
      {
        label: 'Lobby the new owners',
        description: 'Try to get nonprofit carve-outs',
        effect: () => ({ continuity: 12, budget: -5 }),
        responseText: "I'll write a letter. They'll probably tokenise it.",
      },
    ],
    ignoreEffect: () => ({ continuity: 25, morale: -8 }),
  },

  {
    id: 'global-outage',
    colleagueId: 'marcus',
    type: 'crisis',
    headline: '48-Hour Global Outage Brings Everything Down',
    dialogue: "The status page says 'All Systems Operational' while our entire team stares at spinning wheels. We've been down for six hours. What's the play?",
    triggerCondition: (state) => state.stack.length >= 2,
    priority: 5,
    options: [
      {
        label: 'Activate backup systems',
        description: 'Switch to alternatives where possible',
        effect: (state) => {
          const providerCounts = {}
          state.stack.forEach(t => { providerCounts[t.provider] = (providerCounts[t.provider] || 0) + 1 })
          const hasDup = Object.values(providerCounts).some(c => c >= 2)
          return { continuity: hasDup ? 12 : 3, budget: -8 }
        },
        responseText: "On it. Some of these 'backup systems' are a Google Doc and a prayer, but we'll manage.",
      },
      {
        label: 'Wait it out',
        description: 'These things usually resolve',
        effect: (state) => {
          const providerCounts = {}
          state.stack.forEach(t => { providerCounts[t.provider] = (providerCounts[t.provider] || 0) + 1 })
          const hasDup = Object.values(providerCounts).some(c => c >= 2)
          return { continuity: hasDup ? 20 : 5, morale: -5 }
        },
        responseText: "Fine. I'll tell the team to go home. Again.",
      },
    ],
    ignoreEffect: () => ({ continuity: 25, morale: -8 }),
  },

  {
    id: 'price-hike',
    colleagueId: 'marcus',
    type: 'crisis',
    headline: 'Surprise 300% Price Increase Drops Like a Bomb',
    dialogue: "They call it 'aligning pricing with the value we deliver'. I call it extortion. We're locked in for three months. Options?",
    triggerCondition: (state) => state.stack.length >= 2,
    priority: 4,
    options: [
      {
        label: 'Absorb the cost',
        description: 'Pay and plan a move later',
        effect: () => ({ continuity: 5, budget: -18 }),
        responseText: "I'll find the budget somewhere. Probably from the training fund. Again.",
      },
      {
        label: 'Downgrade to basic tier',
        description: 'Lose features, keep the budget',
        effect: () => ({ continuity: 12, budget: -8, morale: -8 }),
        responseText: "The team will lose half their features overnight. Prepare for complaints.",
      },
      {
        label: 'Threaten to leave',
        description: 'Negotiate with leverage',
        effect: () => ({ continuity: 8, budget: -12 }),
        responseText: "I'll make the call. They'll offer us 10% off and call it a 'loyalty discount'.",
      },
    ],
    ignoreEffect: () => ({ continuity: 18, budget: -20, morale: -5 }),
  },

  {
    id: 'sysadmin-quits',
    colleagueId: 'marcus',
    type: 'crisis',
    headline: 'Key Volunteer Sysadmin Quits Without Notice',
    dialogue: "They left a sticky note on the server: 'Good luck. Root password taped under keyboard.' Every self-hosted service we run is now one reboot away from disaster.",
    triggerCondition: (state) => state.stack.some(t => t.region === 'self'),
    priority: 4,
    options: [
      {
        label: 'Emergency contractor',
        description: 'Hire someone immediately',
        effect: (state) => {
          const selfCount = state.stack.filter(t => t.region === 'self').length
          return { continuity: selfCount * 5, budget: -10 }
        },
        responseText: "I've found someone. They charge twice the going rate because they know we're desperate.",
      },
      {
        label: 'Recruit a replacement',
        description: 'Slower but sustainable',
        effect: (state) => {
          const selfCount = state.stack.filter(t => t.region === 'self').length
          return { continuity: selfCount * 10, budget: -5 }
        },
        responseText: "I'll put the word out. Could take weeks. Maybe months.",
      },
      {
        label: 'Consider hosted alternatives',
        description: 'Use this as a trigger to migrate',
        effect: () => ({ continuity: 8, budget: -5, morale: -3 }),
        responseText: "Pragmatic. The team might actually prefer it, once they stop mourning.",
      },
    ],
    ignoreEffect: (state) => {
      const selfCount = state.stack.filter(t => t.region === 'self').length
      return { continuity: selfCount * 12, budget: -8 }
    },
  },

  {
    id: 'sunsetting',
    colleagueId: 'marcus',
    type: 'warning',
    headline: '"Sunsetting" Announcement Ruins Your Morning',
    dialogue: "They wrote a heartfelt blog post about their 'incredible journey'. Your data export window is 30 days. The clock is ticking.",
    triggerCondition: (state) => state.stack.length >= 3,
    priority: 3,
    options: [
      {
        label: 'Begin orderly migration',
        description: 'Use the 30-day window wisely',
        effect: () => ({ continuity: 8, budget: -8, morale: -3 }),
        responseText: "I'll prioritise the data export. Thirty days feels generous until you start counting.",
      },
      {
        label: 'Scramble for alternatives',
        description: 'Quick and dirty replacement',
        effect: () => ({ continuity: 15, morale: -8 }),
        responseText: "We'll find something. It won't be pretty, but it'll work. Probably.",
      },
    ],
    ignoreEffect: () => ({ continuity: 20, morale: -10 }),
  },

  // ──────────────────────────────────────────────────────────
  // PRIYA (Security Analyst) — Surveillance
  // ──────────────────────────────────────────────────────────

  {
    id: 'shadow-ai-usage',
    colleagueId: 'priya',
    type: 'crisis',
    headline: 'Staff Caught Pasting Beneficiary Data into AI',
    dialogue: "I've found staff using BrainBot to summarise beneficiary case notes. The data is hitting offshore servers and training their model. What do you want me to do?",
    triggerCondition: (state) => state.stack.some(t => t.needId === 'ai' && t.region === 'us') || state.surveillance > 30,
    priority: 4,
    options: [
      {
        label: 'Block it immediately',
        description: 'Cut access, deal with the fallout',
        effect: () => ({ surveillance: -8, morale: -12 }),
        responseText: "Done. The team is furious, but the data stops leaking.",
      },
      {
        label: 'Write a usage policy',
        description: 'Guidelines with teeth',
        effect: () => ({ surveillance: -3, morale: -5, budget: -5 }),
        responseText: "I'll draft something. It won't stop everyone, but it's a start.",
      },
      {
        label: 'Ignore it for now',
        description: 'Pick your battles',
        effect: () => ({ surveillance: 8 }),
        responseText: "Your call. I'll document that I raised this.",
      },
    ],
    ignoreEffect: () => ({ surveillance: 12, morale: -5 }),
  },

  {
    id: 'keystroke-logging',
    colleagueId: 'priya',
    type: 'crisis',
    headline: 'Analytics Platform Caught Logging Keystrokes',
    dialogue: "Every angry message your staff typed about the board is now training data. I've traced it to session recording in our analytics tool. Every. Single. Keystroke.",
    triggerCondition: (state) => state.stack.some(t => t.surveillance > 5),
    priority: 4,
    options: [
      {
        label: 'Disable session recording',
        description: 'Quick fix for the immediate problem',
        effect: () => ({ surveillance: -5, morale: 3 }),
        responseText: "Done. But the data they already collected isn't coming back.",
      },
      {
        label: 'Replace the analytics tool',
        description: 'Switch to privacy-respecting alternative',
        effect: () => ({ surveillance: -10, budget: -10, continuity: 5 }),
        responseText: "I'll start the migration. The new tool won't have as many features. That's rather the point.",
      },
    ],
    ignoreEffect: (state) => {
      const dodgy = state.stack.filter(t => t.surveillance > 5).length
      return { surveillance: dodgy * 5, morale: -5 }
    },
  },

  {
    id: 'data-breach',
    colleagueId: 'priya',
    type: 'crisis',
    headline: 'Data Breach Exposes Thousands of Beneficiary Records',
    dialogue: "We've been breached. The hacker group calls themselves 'DataFreedomz'. They want Bitcoin. We have a petty cash float. I need an immediate decision.",
    triggerCondition: () => true,
    priority: 5,
    options: [
      {
        label: 'Incident response protocol',
        description: 'By the book: notify, contain, investigate',
        effect: () => ({ surveillance: 5, budget: -12, morale: -5 }),
        responseText: "I've triggered the response plan. Assuming anyone has read it.",
      },
      {
        label: 'Lock everything down',
        description: 'Maximum containment, maximum disruption',
        effect: () => ({ surveillance: 3, continuity: 10, budget: -8, morale: -8 }),
        responseText: "Systems are locked. Nobody can work. But nobody can leak either.",
      },
      {
        label: 'Contain and minimise',
        description: 'Fix quietly, hope for the best',
        effect: () => ({ surveillance: 10, morale: -3 }),
        responseText: "Noted. I strongly advise against this approach, for the record.",
      },
    ],
    ignoreEffect: () => ({ surveillance: 15, budget: -15, morale: -10 }),
  },

  {
    id: 'ai-training-scandal',
    colleagueId: 'priya',
    type: 'crisis',
    headline: 'AI Training Data Scandal Engulfs Your Vendors',
    dialogue: "Your beneficiaries' case notes are powering a chatbot that writes marketing copy. I've confirmed it: our vendor's privacy policy has a clause that covers this. It's legal. It's also appalling.",
    triggerCondition: (state) => state.stack.some(t => t.surveillance > 8),
    priority: 4,
    options: [
      {
        label: 'Demand data deletion',
        description: 'Invoke GDPR right to erasure',
        effect: (state) => {
          const suspects = state.stack.filter(t => t.surveillance > 8).length
          return { surveillance: suspects * 4, jurisdiction: suspects * 2, budget: -5 }
        },
        responseText: "I'll submit the request. Expect a 30-day response window and a lot of foot-dragging.",
      },
      {
        label: 'Accept and audit',
        description: 'Map the data flows, plan for next time',
        effect: (state) => {
          const suspects = state.stack.filter(t => t.surveillance > 8).length
          return { surveillance: suspects * 8, jurisdiction: suspects * 5 }
        },
        responseText: "I'll document everything. The audit trail might be useful when the regulator comes calling.",
      },
    ],
    ignoreEffect: (state) => {
      const suspects = state.stack.filter(t => t.surveillance > 8).length
      return { surveillance: suspects * 10, jurisdiction: suspects * 6, morale: -5 }
    },
  },

  {
    id: 'analytics-sold',
    colleagueId: 'priya',
    type: 'warning',
    headline: 'Analytics Vendor Sold to Ad-Tech Giant',
    dialogue: "Your privacy-first analytics tool just got acquired by a company whose logo is literally an eye. The privacy policy updates start in 30 days.",
    triggerCondition: (state) => state.stack.some(t => t.needId === 'analytics'),
    priority: 3,
    options: [
      {
        label: 'Switch immediately',
        description: 'Move before the policy changes',
        effect: () => ({ surveillance: -5, budget: -8, continuity: 5 }),
        responseText: "On it. The new tool won't have as many dashboards. Your data team will need grief counselling.",
      },
      {
        label: 'Wait for the new terms',
        description: 'Maybe it will be fine',
        effect: () => ({ surveillance: 15, morale: -5 }),
        responseText: "You're gambling on the goodwill of an ad-tech company. Noted.",
      },
    ],
    ignoreEffect: () => ({ surveillance: 18, morale: -5 }),
  },

  {
    id: 'encryption-backdoor',
    colleagueId: 'priya',
    type: 'warning',
    headline: 'Government Demands Encryption Backdoor',
    dialogue: "New legislation requires backdoor access to encrypted communications. They promise it's only for criminals. The definition of 'criminal' is being revised next quarter.",
    triggerCondition: (state) => state.stack.some(t => t.surveillance > 3),
    priority: 3,
    options: [
      {
        label: 'Switch to non-compliant provider',
        description: 'An EU provider that will resist',
        effect: () => ({ surveillance: -5, jurisdiction: 5, budget: -5 }),
        responseText: "There are providers outside the jurisdiction. It's a grey area, but a principled one.",
      },
      {
        label: 'Comply and hope',
        description: 'Follow the law as written',
        effect: () => ({ surveillance: 12, jurisdiction: 8 }),
        responseText: "Understood. I'll update the risk register. It's getting quite thick.",
      },
    ],
    ignoreEffect: () => ({ surveillance: 15, jurisdiction: 10, morale: -3 }),
  },

  // ──────────────────────────────────────────────────────────
  // SAM (Staff Rep) — Morale & Tool Complaints
  // ──────────────────────────────────────────────────────────

  {
    id: 'staff-hate-tool',
    colleagueId: 'sam',
    type: 'warning',
    headline: 'Staff Petition Against Internal Tool',
    dialogue: "The team has signed a petition. They say the project management tool is 'aggressively unusable' and makes them want to 'communicate exclusively by carrier pigeon'. Their words, not mine.",
    triggerCondition: (state) => state.stack.length >= 4 && state.morale < 70,
    priority: 2,
    options: [
      {
        label: 'Promise a review',
        description: 'Listen and investigate',
        effect: () => ({ morale: 5 }),
        responseText: "They'll hold you to that. I'd give it two weeks before the follow-up petition arrives.",
      },
      {
        label: 'Replace it',
        description: 'Give the people what they want',
        effect: () => ({ morale: 12, budget: -10, continuity: 8 }),
        responseText: "Thank you. I'll tell them they're being heard. For once.",
      },
      {
        label: 'Mandate training',
        description: 'The tool is fine, users need help',
        effect: () => ({ morale: -8, budget: -3 }),
        responseText: "Bold strategy. 'The beatings will continue until morale improves.'",
      },
    ],
    ignoreEffect: () => ({ morale: -10 }),
  },

  {
    id: 'unofficial-tools',
    colleagueId: 'sam',
    type: 'warning',
    headline: 'Staff Using Unauthorised Tools for Work',
    dialogue: "Half the team is using their personal WhatsApp for work communications. The other half is on Discord. Nobody is using the official chat tool we're paying for.",
    triggerCondition: (state) => state.stack.some(t => t.needId === 'messaging') && state.morale < 65,
    priority: 2,
    options: [
      {
        label: 'Enforce the official tool',
        description: 'Crack down on shadow IT',
        effect: () => ({ morale: -10, surveillance: -3 }),
        responseText: "Fine, but you should know that the official tool's onboarding process is the reason people left in the first place.",
      },
      {
        label: 'Adopt what they prefer',
        description: 'If you can not beat them, join them',
        effect: () => ({ morale: 8, surveillance: 8, budget: -3 }),
        responseText: "At least people will actually communicate. The surveillance implications are your problem.",
      },
      {
        label: 'Ask why they switched',
        description: 'Understand the root cause',
        effect: () => ({ morale: 3 }),
        responseText: "I appreciate you listening. They'll tell you the official tool is too slow, too ugly, and too monitored.",
      },
    ],
    ignoreEffect: () => ({ morale: -8, surveillance: 5 }),
  },

  {
    id: 'burnout-wave',
    colleagueId: 'sam',
    type: 'crisis',
    headline: 'Burnout Wave Sweeps Through the Organisation',
    dialogue: "Three people have gone on sick leave this month. The rest are working through illness because they feel guilty. The team is held together by caffeine and mutual obligation.",
    triggerCondition: (state) => state.morale < 40,
    priority: 4,
    options: [
      {
        label: 'Emergency wellbeing day',
        description: 'Close the office for a day',
        effect: () => ({ morale: 15, budget: -5 }),
        responseText: "Thank you. One day won't fix this, but it shows you're paying attention.",
      },
      {
        label: 'Address root causes',
        description: 'Review workload and tools',
        effect: () => ({ morale: 8, budget: -8 }),
        responseText: "I'll compile a report. Fair warning: the root causes include 'everything about this place'.",
      },
    ],
    ignoreEffect: () => ({ morale: -12 }),
  },

  {
    id: 'remote-work-tools',
    colleagueId: 'sam',
    type: 'warning',
    headline: 'Remote Staff Struggling with Tool Access',
    dialogue: "The field team can not access half our systems from their phones. They're doing case notes on paper napkins and photographing them. We need mobile-friendly tools.",
    triggerCondition: (state) => state.stack.length >= 4,
    priority: 2,
    options: [
      {
        label: 'Budget for mobile licences',
        description: 'Pay for proper mobile access',
        effect: () => ({ morale: 8, budget: -10 }),
        responseText: "Thank you. I'll set up the mobile accounts this week.",
      },
      {
        label: 'Suggest workarounds',
        description: 'Creative use of existing tools',
        effect: () => ({ morale: -3 }),
        responseText: "I'll pass that on. Expect the response to be unprintable.",
      },
    ],
    ignoreEffect: () => ({ morale: -8 }),
  },

  {
    id: 'staff-data-concerns',
    colleagueId: 'sam',
    type: 'warning',
    headline: 'Staff Raise Data Privacy Concerns About Own Monitoring',
    dialogue: "The team is worried about how much of their activity is being tracked by our own tools. Someone found an employee monitoring feature buried in the settings. People are rattled.",
    triggerCondition: (state) => state.surveillance > 40,
    priority: 3,
    options: [
      {
        label: 'Disable monitoring features',
        description: 'Turn off employee tracking',
        effect: () => ({ morale: 10, surveillance: -5 }),
        responseText: "Good call. I'll announce it at the all-hands. Trust is hard to rebuild.",
      },
      {
        label: 'Publish a transparency report',
        description: 'Show exactly what is collected',
        effect: () => ({ morale: 5, surveillance: -2, budget: -3 }),
        responseText: "I'll work with your DPO on the report. Transparency helps.",
      },
    ],
    ignoreEffect: () => ({ morale: -10, surveillance: 3 }),
  },

  // ──────────────────────────────────────────────────────────
  // MULTI-COLLEAGUE — Major Events
  // ──────────────────────────────────────────────────────────

  {
    id: 'drone-strike-datacentre',
    colleagueId: 'marcus',
    type: 'crisis',
    headline: 'Drone Strike Damages Major Data Centre',
    dialogue: "Your disaster recovery plan assumed disasters would be metaphorical. It did not account for actual explosions. Multiple services are down and there's no ETA for recovery.",
    triggerCondition: (state) => state.stack.length >= 3,
    priority: 5,
    options: [
      {
        label: 'Activate disaster recovery',
        description: 'Execute the DR plan (such as it is)',
        effect: (state) => {
          const providerCounts = {}
          state.stack.forEach(t => { providerCounts[t.provider] = (providerCounts[t.provider] || 0) + 1 })
          const hasDup = Object.values(providerCounts).some(c => c >= 2)
          return { continuity: hasDup ? 15 : 5, jurisdiction: hasDup ? 5 : 0, budget: -10 }
        },
        responseText: "The DR plan is... optimistic. But it's what we have.",
      },
      {
        label: 'Emergency vendor switch',
        description: 'Move to a different provider immediately',
        effect: () => ({ continuity: 10, budget: -15, jurisdiction: 3 }),
        responseText: "We'll be up faster but the cost is eye-watering.",
      },
    ],
    ignoreEffect: () => ({ continuity: 25, jurisdiction: 10, morale: -8 }),
  },

  {
    id: 'whistleblower',
    colleagueId: 'priya',
    type: 'crisis',
    headline: 'Whistleblower Exposes Full-Stack Surveillance Programme',
    dialogue: "Leaked slides include a diagram of our exact tech stack with a smiley face next to it. Every tool we use is feeding data into a surveillance programme. This is not a drill.",
    triggerCondition: (state) => state.surveillance > 30,
    priority: 5,
    options: [
      {
        label: 'Full transparency response',
        description: 'Acknowledge it publicly, commit to change',
        effect: () => ({ jurisdiction: 5, surveillance: 5, morale: -5, budget: -5 }),
        responseText: "It'll hurt short-term, but at least we control the narrative.",
      },
      {
        label: 'Quiet investigation',
        description: 'Verify the claims before going public',
        effect: () => ({ jurisdiction: 8, continuity: 8, surveillance: 8, morale: -10 }),
        responseText: "I'll dig into the claims. If even half of them are true, we have a serious problem.",
      },
    ],
    ignoreEffect: () => ({ jurisdiction: 12, continuity: 10, surveillance: 12, morale: -12 }),
  },

  {
    id: 'ransomware-supply-chain',
    colleagueId: 'priya',
    type: 'crisis',
    headline: 'Ransomware Attack Rips Through Supply Chain',
    dialogue: "The ransom note is professionally typeset with a customer support hotline. They're more organised than we are. Every tool in our stack is potentially compromised.",
    triggerCondition: (state) => state.stack.length >= 3,
    priority: 5,
    options: [
      {
        label: 'Full lockdown',
        description: 'Isolate everything, assess damage',
        effect: (state) => ({ continuity: state.stack.length * 3, surveillance: state.stack.length * 2, budget: -10, morale: -5 }),
        responseText: "Systems locked. I'm scanning for indicators of compromise.",
      },
      {
        label: 'Targeted response',
        description: 'Only lock down confirmed affected tools',
        effect: (state) => ({ continuity: state.stack.length * 2, surveillance: state.stack.length * 3, budget: -5 }),
        responseText: "Faster recovery, but if I've missed something, we're exposed.",
      },
    ],
    ignoreEffect: (state) => ({ continuity: state.stack.length * 5, surveillance: state.stack.length * 4, budget: -15 }),
  },

  // ──────────────────────────────────────────────────────────
  // POSITIVE SCENARIOS
  // ──────────────────────────────────────────────────────────

  {
    id: 'sovereignty-grant',
    colleagueId: 'nkechi',
    type: 'opportunity',
    headline: 'Digital Sovereignty Grant Lands in Your Inbox',
    dialogue: "An actual piece of good news. There's a grant available specifically for organisations migrating to sovereign infrastructure. I can apply if you want.",
    triggerCondition: () => true,
    priority: 2,
    options: [
      {
        label: 'Apply for the grant',
        description: 'Free money for doing the right thing',
        effect: () => ({ budget: 20, morale: 10 }),
        responseText: "Application submitted. The review panel includes people who actually understand technology. A first.",
      },
      {
        label: 'Apply and earmark for migration',
        description: 'Use the grant to move off offshore tools',
        effect: () => ({ budget: 15, morale: 8, jurisdiction: -5 }),
        responseText: "Smart. I'll ring-fence the funds for infrastructure changes.",
      },
    ],
    ignoreEffect: () => ({ morale: -3 }),
  },

  {
    id: 'matched-funding',
    colleagueId: 'nkechi',
    type: 'opportunity',
    headline: 'Matched Funding Opportunity Available',
    dialogue: "A corporate partner is offering matched funding for digital infrastructure projects. For every pound we spend on tools, they will match it. The catch: they want their logo on your website.",
    triggerCondition: (state) => state.budget < 40,
    priority: 3,
    options: [
      {
        label: 'Accept the match',
        description: 'Double your spending power',
        effect: () => ({ budget: 18, morale: 5 }),
        responseText: "Done. Their logo is now larger than yours on the homepage. A small price to pay.",
      },
      {
        label: 'Negotiate terms',
        description: 'Try to limit the branding',
        effect: () => ({ budget: 12 }),
        responseText: "They agreed to a small logo in the footer. Still feels like selling out, but the budget needed it.",
      },
      {
        label: 'Decline',
        description: 'Keep your independence',
        effect: () => ({ morale: 5 }),
        responseText: "Principled. Also broke. But principled.",
      },
    ],
    ignoreEffect: () => ({ morale: -3 }),
  },

  {
    id: 'emergency-appeal',
    colleagueId: 'nkechi',
    type: 'opportunity',
    headline: 'Emergency Fundraising Appeal Approved',
    dialogue: "The board has approved an emergency fundraising appeal. We can send it out immediately, but it will take staff time to manage the responses. Worth it?",
    triggerCondition: (state) => state.budget < 25,
    priority: 4,
    options: [
      {
        label: 'Launch the appeal',
        description: 'All hands on deck',
        effect: () => ({ budget: 20, morale: -6 }),
        responseText: "Appeal sent. The donations are coming in. So are the complaints about email frequency.",
      },
      {
        label: 'Targeted approach',
        description: 'Only contact major donors',
        effect: () => ({ budget: 12, morale: -3 }),
        responseText: "Targeted emails sent. Fewer donations, fewer complaints. A fair trade.",
      },
    ],
    ignoreEffect: () => ({ budget: -5 }),
  },

  {
    id: 'corporate-partnership',
    colleagueId: 'nkechi',
    type: 'opportunity',
    headline: 'Corporate Tech Partnership Offered',
    dialogue: "An offshore tech company is offering free tool licences in exchange for a case study. Free tools, but they will want access to your usage data for marketing purposes.",
    triggerCondition: (state) => state.stack.some(t => t.region === 'us'),
    priority: 2,
    options: [
      {
        label: 'Accept the deal',
        description: 'Free tools, strings attached',
        effect: () => ({ budget: 15, surveillance: 8 }),
        responseText: "Free licences activated. They are already writing the case study. Your data is the product.",
      },
      {
        label: 'Counter-offer',
        description: 'Negotiate data limits',
        effect: () => ({ budget: 8, surveillance: 3 }),
        responseText: "They agreed to anonymised data only. Whether they will honour that is another question.",
      },
      {
        label: 'Pass',
        description: 'Nothing is truly free',
        effect: () => ({}),
        responseText: "Wise. If the product is free, you are the product.",
      },
    ],
    ignoreEffect: () => ({}),
  },

  {
    id: 'volunteer-sysadmin',
    colleagueId: 'marcus',
    type: 'opportunity',
    headline: 'Volunteer with Sysadmin Skills Appears Like Magic',
    dialogue: "Someone just applied to volunteer and they actually know what Docker is AND they reply to emails within 24 hours. I might be hallucinating. Should I bring them on?",
    triggerCondition: (state) => state.stack.some(t => t.region === 'self'),
    priority: 2,
    options: [
      {
        label: 'Welcome aboard',
        description: 'Accept the gift horse',
        effect: (state) => {
          const selfCount = state.stack.filter(t => t.region === 'self').length
          return { continuity: -selfCount * 5, morale: 8 }
        },
        responseText: "They start Monday. I've already started a list of things that need fixing.",
      },
      {
        label: 'Background check first',
        description: 'Verify before granting access',
        effect: () => ({ morale: 5 }),
        responseText: "Sensible. References are clean. They're genuinely just... helpful? Apparently that still exists.",
      },
    ],
    ignoreEffect: () => ({ morale: -3 }),
  },

  {
    id: 'community-rally',
    colleagueId: 'sam',
    type: 'opportunity',
    headline: 'Community Rally Boosts Team Spirit',
    dialogue: "Someone brought homemade cake to the all-hands meeting. Productivity has never been higher. The team is actually smiling. Can we bottle this?",
    triggerCondition: () => true,
    priority: 1,
    options: [
      {
        label: 'Build on the momentum',
        description: 'Invest in team culture',
        effect: () => ({ morale: 15, surveillance: -3 }),
        responseText: "Regular cake deliveries are now line-item in the budget. I'm not joking.",
      },
      {
        label: 'Enjoy the moment',
        description: 'Sometimes things are just good',
        effect: () => ({ morale: 10 }),
        responseText: "Fair enough. I'll save the optimism for when we need it.",
      },
    ],
    ignoreEffect: () => ({ morale: 5 }),
  },

  {
    id: 'strong-eu-regulation',
    colleagueId: 'nkechi',
    type: 'opportunity',
    headline: 'Strong EU Regulation Passes with Broad Support',
    dialogue: "For once, the regulation was written by people who understand what a server is. Your EU-hosted tools are now on much firmer ground. Shall we capitalise on this?",
    triggerCondition: (state) => state.stack.some(t => t.region === 'eu'),
    priority: 2,
    options: [
      {
        label: 'Use it to accelerate migration',
        description: 'Justify moving more tools to EU providers',
        effect: (state) => {
          const euCount = state.stack.filter(t => t.region === 'eu').length
          return { jurisdiction: -euCount * 5, surveillance: -euCount * 3, budget: 5 }
        },
        responseText: "I'll draft a business case referencing the new regulation. The board loves a policy citation.",
      },
      {
        label: 'Acknowledge and continue',
        description: 'Good news, no action needed',
        effect: (state) => {
          const euCount = state.stack.filter(t => t.region === 'eu').length
          return { jurisdiction: -euCount * 3 }
        },
        responseText: "Noted for the compliance register. One fewer thing to worry about.",
      },
    ],
    ignoreEffect: () => ({}),
  },

  // ──────────────────────────────────────────────────────────
  // TOOL INSTALL SCENARIOS (colleague brings a need + 3 options)
  // Options include toolInstall payloads that trigger installation
  // ──────────────────────────────────────────────────────────

  {
    id: 'install-email',
    colleagueId: 'marcus',
    type: 'request',
    headline: 'Organisation Lacks Proper Email System',
    dialogue: "A grant funder just emailed asking for a progress report. We replied from someone's personal Gmail. We need a proper email provider.",
    triggerCondition: (state) => !state.stack.some(t => t.needId === 'email'),
    priority: 3,
    options: [
      { label: 'MegaMail Pro (Offshore)', description: 'Free, popular, reads your data', effect: () => ({}), toolInstall: { needId: 'email', optionId: 'email-megamail' }, responseText: "Cheap and cheerful. Your data now has a scenic route through a hostile jurisdiction." },
      { label: 'EuroPost (EU)', description: 'Encrypted, compliant, pricey', effect: () => ({}), toolInstall: { needId: 'email', optionId: 'email-europost' }, responseText: "European-hosted. Your compliance officer just did a little dance." },
      { label: 'LibreMail (Self)', description: 'Self-hosted, full control', effect: () => ({}), toolInstall: { needId: 'email', optionId: 'email-libremail' }, responseText: "Self-hosted email. You will learn more about SMTP than any human should." },
    ],
    ignoreEffect: () => ({ morale: -5 }),
  },
  {
    id: 'install-video',
    colleagueId: 'sam',
    type: 'request',
    headline: 'Board Demands Video Conferencing',
    dialogue: "The board wants quarterly updates and they refuse to leave their houses. We need video conferencing. What are our options?",
    triggerCondition: (state) => !state.stack.some(t => t.needId === 'video'),
    priority: 3,
    options: [
      { label: 'VidCall Pro (Offshore)', description: 'Everyone knows it, data leaves the country', effect: () => ({}), toolInstall: { needId: 'video', optionId: 'video-zoomcorp' }, responseText: "Done. Your meeting data now takes a scenic tour before anyone says hello." },
      { label: 'MeetFree (Self)', description: 'Self-hosted, breaks at 4 users', effect: () => ({}), toolInstall: { needId: 'video', optionId: 'video-meetfree' }, responseText: "Works beautifully until the fourth person joins." },
      { label: 'TeamSync (Offshore)', description: 'Bundled free, bundled surveillance', effect: () => ({}), toolInstall: { needId: 'video', optionId: 'video-teamsync' }, responseText: "Bundled free with your office suite. Like a loyalty card for a surveillance programme." },
    ],
    ignoreEffect: () => ({ morale: -5 }),
  },
  {
    id: 'install-storage',
    colleagueId: 'marcus',
    type: 'request',
    headline: 'Safeguarding Policy Found Only on Staff Desktops',
    dialogue: "Someone asked where the safeguarding policy lives. Three people said 'my desktop'. We need cloud storage. Properly.",
    triggerCondition: (state) => !state.stack.some(t => t.needId === 'storage'),
    priority: 4,
    options: [
      { label: 'CloudVault (Offshore)', description: 'Infinite storage, infinite indexing', effect: () => ({}), toolInstall: { needId: 'storage', optionId: 'storage-cloudvault' }, responseText: "Infinite storage. Infinite regret when the CLOUD Act requests arrive." },
      { label: 'NextDrive (Self)', description: 'Your data stays on your server', effect: () => ({}), toolInstall: { needId: 'storage', optionId: 'storage-nextdrive' }, responseText: "Your data never leaves your server. Neither does your sysadmin." },
      { label: 'DropStore (Offshore)', description: 'Easy, cheap, questionable privacy', effect: () => ({}), toolInstall: { needId: 'storage', optionId: 'storage-dropstore' }, responseText: "Remember when they promised not to look at your files? Neither do they." },
    ],
    ignoreEffect: () => ({ morale: -5, continuity: 5 }),
  },
  {
    id: 'install-project',
    colleagueId: 'sam',
    type: 'request',
    headline: 'Tasks Tracked Across Spreadsheets and Prayers',
    dialogue: "The team is tracking tasks across three spreadsheets, two WhatsApp groups, and a prayer. Can we please get a project management tool?",
    triggerCondition: (state) => !state.stack.some(t => t.needId === 'project'),
    priority: 2,
    options: [
      { label: 'TaskMaster (Offshore)', description: 'Watch deadlines sail past in real time', effect: () => ({}), toolInstall: { needId: 'project', optionId: 'project-taskmaster' }, responseText: "Finally, you can watch deadlines sail past in high definition." },
      { label: 'OpenBoard (EU)', description: 'All the features, character-building setup', effect: () => ({}), toolInstall: { needId: 'project', optionId: 'project-openboard' }, responseText: "All the features you need and a setup process that builds character." },
      { label: 'CardFlow (Offshore)', description: 'Drag cards until acquired by Atlassian', effect: () => ({}), toolInstall: { needId: 'project', optionId: 'project-cardflow' }, responseText: "Drag cards from 'To Do' to 'Owned by Atlassian now, sorry'." },
    ],
    ignoreEffect: () => ({ morale: -5 }),
  },
  {
    id: 'install-crm',
    colleagueId: 'nkechi',
    type: 'request',
    headline: 'Major Donor Calls and Nobody Knows Their Name',
    dialogue: "A major donor just rang. Nobody could remember their name, their gift history, or where the database went. We need a CRM. Urgently.",
    triggerCondition: (state) => !state.stack.some(t => t.needId === 'crm'),
    priority: 3,
    options: [
      { label: 'DonorForce Pro (Offshore)', description: 'Enterprise pricing for 200 people', effect: () => ({}), toolInstall: { needId: 'crm', optionId: 'crm-salesforce' }, responseText: "Enterprise pricing for your 200-person mailing list. You will need a consultant." },
      { label: 'CiviData (Self)', description: 'Community-built, understood by four people', effect: () => ({}), toolInstall: { needId: 'crm', optionId: 'crm-cividata' }, responseText: "Built by the community. Understood by approximately four people." },
      { label: 'AirSheet (Offshore)', description: 'A spreadsheet pretending to be a database', effect: () => ({}), toolInstall: { needId: 'crm', optionId: 'crm-airsheet' }, responseText: "A spreadsheet that thinks it is a database. Your auditor will think otherwise." },
    ],
    ignoreEffect: () => ({ morale: -5, budget: -5 }),
  },
  {
    id: 'install-hosting',
    colleagueId: 'marcus',
    type: 'request',
    headline: 'Website Down, Nobody Knows the Login',
    dialogue: "Your website is down. The only person who knew the login left in 2019. We need to sort hosting out properly.",
    triggerCondition: (state) => !state.stack.some(t => t.needId === 'hosting'),
    priority: 3,
    options: [
      { label: 'MegaHost (Offshore)', description: 'Powers the internet, answers to foreign courts', effect: () => ({}), toolInstall: { needId: 'hosting', optionId: 'hosting-amacloud' }, responseText: "Powers half the internet and answers to foreign intelligence courts. But the free tier is generous." },
      { label: 'EuroServe (EU)', description: 'German engineering and data protection', effect: () => ({}), toolInstall: { needId: 'hosting', optionId: 'hosting-hetznerbox' }, responseText: "German engineering. German data protection. German-language error messages." },
      { label: 'SelfServe (Self)', description: 'A laptop under a desk', effect: () => ({}), toolInstall: { needId: 'hosting', optionId: 'hosting-selfserve' }, responseText: "A repurposed laptop under a desk. It has survived three office moves." },
    ],
    ignoreEffect: () => ({ morale: -5, continuity: 5 }),
  },
  {
    id: 'install-messaging',
    colleagueId: 'sam',
    type: 'request',
    headline: 'Critical Decisions Made in Reply-All Email Chains',
    dialogue: "Critical organisational decisions are being made in reply-all email chains. This cannot continue. We need a proper chat tool.",
    triggerCondition: (state) => !state.stack.some(t => t.needId === 'messaging'),
    priority: 2,
    options: [
      { label: 'ChatHive (Offshore)', description: 'Conversations die after 90 days', effect: () => ({}), toolInstall: { needId: 'messaging', optionId: 'messaging-slackchat' }, responseText: "Where conversations go to die after 90 days on the free plan." },
      { label: 'MatterBridge (Self)', description: 'Looks like Slack, maintained on weekends', effect: () => ({}), toolInstall: { needId: 'messaging', optionId: 'messaging-matterbridge' }, responseText: "Looks like Slack but your IT volunteer maintains it on weekends." },
      { label: 'SignalWire (EU)', description: 'So private even you can not find messages', effect: () => ({}), toolInstall: { needId: 'messaging', optionId: 'messaging-signalwire' }, responseText: "So private that even you will struggle to find last week's messages." },
    ],
    ignoreEffect: () => ({ morale: -5 }),
  },
  {
    id: 'install-office',
    colleagueId: 'marcus',
    type: 'request',
    headline: 'Document Format Incompatibility Crisis',
    dialogue: "Someone sent a .docx that only opens properly in one specific application. Half the team can not read it. We need to standardise on an office suite.",
    triggerCondition: (state) => !state.stack.some(t => t.needId === 'office'),
    priority: 2,
    options: [
      { label: 'OfficeSuite 365 (Offshore)', description: '365 days of telemetry', effect: () => ({}), toolInstall: { needId: 'office', optionId: 'office-officecorp' }, responseText: "Three hundred and sixty-five days a year of telemetry, phoning home." },
      { label: 'LibreWrite (Self)', description: 'Identical, staff will complain anyway', effect: () => ({}), toolInstall: { needId: 'office', optionId: 'office-librewrite' }, responseText: "Functionally identical. Your staff will still complain it 'feels different'." },
      { label: 'DocuCloud (Offshore)', description: 'Collaborative editing trains their AI', effect: () => ({}), toolInstall: { needId: 'office', optionId: 'office-docucloud' }, responseText: "Collaborative editing that trains an AI model on your funding applications." },
    ],
    ignoreEffect: () => ({ morale: -5 }),
  },
  {
    id: 'install-analytics',
    colleagueId: 'nkechi',
    type: 'request',
    headline: 'Funder Demands Impact Metrics',
    dialogue: "The grant renewal requires 'evidence of impact'. Your current measurement strategy appears to be 'vibes'. We need analytics.",
    triggerCondition: (state) => !state.stack.some(t => t.needId === 'analytics'),
    priority: 3,
    options: [
      { label: 'TrackAll Analytics (Offshore)', description: 'You learn everything, so does an advertising company abroad', effect: () => ({}), toolInstall: { needId: 'analytics', optionId: 'analytics-trackall' }, responseText: "You learn everything about your visitors. So does an advertising company." },
      { label: 'ClearMetrics (EU)', description: 'Privacy-respecting, fits one dashboard', effect: () => ({}), toolInstall: { needId: 'analytics', optionId: 'analytics-plausible' }, responseText: "Privacy-respecting analytics. Your data team will be furious." },
      { label: 'SelfMetrics (Self)', description: 'Full control, PHP codebase from the depths', effect: () => ({}), toolInstall: { needId: 'analytics', optionId: 'analytics-selfmetrics' }, responseText: "Full control. And a PHP codebase that has seen things you would not believe." },
    ],
    ignoreEffect: () => ({ budget: -8, morale: -5 }),
  },
  {
    id: 'install-passwords',
    colleagueId: 'priya',
    type: 'request',
    headline: 'Shared Login Spreadsheet Emailed to External Partner',
    dialogue: "Someone just emailed the shared password spreadsheet to an external partner. By accident. Again. We need a proper password manager.",
    triggerCondition: (state) => !state.stack.some(t => t.needId === 'passwords'),
    priority: 4,
    options: [
      { label: 'PassVault (Offshore)', description: 'Stores passwords, gets breached biannually', effect: () => ({}), toolInstall: { needId: 'passwords', optionId: 'passwords-passvault' }, responseText: "Securely stores all passwords. Gets breached every eighteen months." },
      { label: 'BitGuard (EU)', description: 'Open source, audited, actually good', effect: () => ({}), toolInstall: { needId: 'passwords', optionId: 'passwords-bitguard' }, responseText: "Open source, audited. The rare case where self-hosted does not mean self-harming." },
      { label: 'SwissVault (EU)', description: 'Swiss-grade, CEO still uses sticky notes', effect: () => ({}), toolInstall: { needId: 'passwords', optionId: 'passwords-protonlock' }, responseText: "Swiss-grade encryption for passwords your CEO will still write on sticky notes." },
    ],
    ignoreEffect: () => ({ surveillance: 12, morale: -5 }),
  },
  {
    id: 'install-social',
    colleagueId: 'sam',
    type: 'request',
    headline: 'Comms Officer Needs Social Media Presence',
    dialogue: "The comms officer needs to 'raise awareness'. They're eyeing platforms owned by billionaires with opinions. What should we use?",
    triggerCondition: (state) => !state.stack.some(t => t.needId === 'social'),
    priority: 2,
    options: [
      { label: 'BirdApp (Offshore)', description: 'The town square, on fire', effect: () => ({}), toolInstall: { needId: 'social', optionId: 'social-birdapp' }, responseText: "The town square, if it were on fire and owned by the richest man alive." },
      { label: 'FediVerse (Self)', description: 'Nobody can censor you or find you', effect: () => ({}), toolInstall: { needId: 'social', optionId: 'social-fediverse' }, responseText: "Nobody can censor you. Also, nobody can find you." },
      { label: 'OpenFeed (Offshore)', description: 'Decentralised in theory, offshore in practice', effect: () => ({}), toolInstall: { needId: 'social', optionId: 'social-skyfeed' }, responseText: "Decentralised in theory. offshore-hosted in practice. But the vibes are better." },
    ],
    ignoreEffect: () => ({ morale: -3 }),
  },
  {
    id: 'install-ai',
    colleagueId: 'priya',
    type: 'request',
    headline: 'Staff Already Using AI Without Permission',
    dialogue: "Everyone on the team is secretly using AI already. You might as well make a policy before it makes one for you. What's the official position?",
    triggerCondition: (state) => !state.stack.some(t => t.needId === 'ai'),
    priority: 3,
    options: [
      { label: 'BrainBot (Offshore)', description: 'Writes grants, feeds training sets', effect: () => ({}), toolInstall: { needId: 'ai', optionId: 'ai-chatgenius' }, responseText: "It writes your grant applications and feeds them into a training set." },
      { label: 'LocalLLM (Self)', description: 'Private, local, hallucinates with charm', effect: () => ({}), toolInstall: { needId: 'ai', optionId: 'ai-localllm' }, responseText: "Runs on your hardware. Respects your privacy. Hallucinates with local charm." },
      { label: 'Ban AI entirely', description: 'A bold stance, until the first deadline', effect: () => ({}), toolInstall: { needId: 'ai', optionId: 'ai-noai' }, responseText: "A bold stance that lasts until the first funding deadline at 11pm on a Sunday." },
    ],
    ignoreEffect: () => ({ surveillance: 8, morale: -3 }),
  },
]
