// ============================================================
// Stacktopolis — CASSANDRA, the Snarky Advisor
// A sardonic, world-weary digital sovereignty expert who has
// Seen Things. ~60 lines across 10 categories.
// ============================================================

export const ADVISOR_LINES = {
  toolSelectUs: [
    'Another US tool. At this rate, the NSA will send you a thank-you card.',
    'Bold choice. Your data now has a layover in Virginia before it does anything useful.',
    'The CLOUD Act thanks you for your generous contribution.',
    'I see you went with the one that phones home like a homesick teenager.',
    'Cheap and cheerful, until the subpoena arrives. Then just cheap.',
    'Your data protection officer just aged five years in five seconds.',
    'Nothing says "digital sovereignty" quite like routing everything through Maryland.',
    'Well, at least it was a conscious decision. That puts you ahead of most.',
  ],

  toolSelectEu: [
    'An EU provider. Your compliance officer just did a little dance.',
    'European-hosted. How refreshingly quaint. And legal.',
    'Good choice. The documentation is in four languages, but the data stays put.',
    'An EU tool. Somewhere in Brussels, a bureaucrat feels a warm glow.',
    'Locally hosted, locally accountable. I almost feel hopeful. Almost.',
    'Your beneficiaries\' data stays on this side of the Atlantic. Novel concept.',
  ],

  toolSelectSelf: [
    'Self-hosted. I admire your optimism. And your weekend schedule.',
    'Self-hosted. I hope your volunteer sysadmin isn\'t planning any holidays.',
    'Full sovereignty over your data. Full responsibility for your uptime. Fair trade.',
    'Your own server, your own rules, your own 3am emergencies.',
    'Brave. Let\'s hope your backup strategy is more than crossed fingers.',
    'Self-hosted. The triumph of principle over convenience. Godspeed.',
  ],

  riskHigh: [
    'That risk metre is looking distinctly unhealthy. Just like your compliance posture.',
    'Your data protection officer has started updating their CV.',
    'Risk climbing nicely. And by "nicely" I mean "towards regulatory oblivion".',
    'We\'re firmly in "sweating at the audit" territory now.',
    'At this rate, your next board meeting will need a trigger warning.',
    'The risk is high enough to see from space. Specifically, from a US satellite.',
    'You\'re one bad quarter away from the ICO knowing your name.',
    'I\'ve seen healthier risk profiles on organisations that don\'t exist any more.',
  ],

  riskCritical: [
    'Congratulations, you\'ve built a compliance disaster with a user interface.',
    'Your beneficiaries\' data is now a liability with a subscription fee.',
    'This is the part of the film where the protagonist makes a different choice. Just saying.',
    'I would suggest panic, but it seems redundant at this point.',
    'If this were a stress test, you\'d have failed three screens ago.',
    'Critical risk. Your organisation is now a cautionary tale in someone\'s slide deck.',
  ],

  budgetLow: [
    'Budget looking thin. Have you considered a bake sale?',
    'Your finances are approaching "intern pays for the hosting" levels.',
    'Budget critical. The free tier is looking more and more like a lifestyle choice.',
    'You could cut costs by turning things off. Like the organisation.',
    'Pennies in the pot. Your next tool choice is basically "whatever\'s free".',
  ],

  moraleLow: [
    'Morale at rock bottom. The interns have started a support group.',
    'Staff morale is lower than your budget, and that\'s saying something.',
    'Your team has the collective enthusiasm of a wet Tuesday in February.',
    'Morale so low it\'s practically geological. Have you tried cake?',
    'At this point, the away day would need to be in the Maldives to make a dent.',
  ],

  eventReaction: [
    'Another quarterly disaster. At least this one had flavour text.',
    'Well, that happened. Shall we pretend it didn\'t?',
    'The hits keep coming. I\'d say you\'ll laugh about this later, but you won\'t.',
    'Every quarter brings fresh chaos. It\'s almost comforting in its reliability.',
    'File that under "things we should have seen coming but absolutely did not".',
    'The tech sector giveth, and the tech sector taketh away. Mostly taketh.',
    'Another day, another existential threat to your digital infrastructure.',
    'I\'d say "it can\'t get worse" but I\'ve been wrong about that before.',
  ],

  positiveEvent: [
    'Good news? I... don\'t know what to do with my face.',
    'Something positive for once. Quick, someone document this for the annual report.',
    'A rare win. Savour it. The next event is almost certainly terrible.',
    'Well, well. Not everything is on fire. How novel.',
  ],

  manageJurisdiction: [
    'Jurisdiction is your biggest problem. Migrating a US tool would help. If you can afford it.',
    'That jurisdiction exposure is getting uncomfortable. Consider swapping a US provider.',
    'Your data is spread across more jurisdictions than a spy novel. Time to consolidate.',
    'Jurisdiction risk this high means one subpoena away from a very bad day.',
  ],

  manageContinuity: [
    'Continuity risk is climbing. A backup drill would give you some breathing room.',
    'If your biggest provider goes down tomorrow, how many tools do you lose? Run a backup drill.',
    'Continuity at this level means one outage away from carrier pigeons. Test your recovery plan.',
    'All those eggs in one basket? A backup drill reduces continuity by 8 points.',
  ],

  manageSurveillance: [
    'Surveillance debt is your top concern. An audit would shine a light on what is being collected.',
    'Your tools are collecting more data than a nosy neighbour. Time for a privacy audit.',
    'That surveillance number makes compliance officers nervous. An audit reduces it by 8 points.',
    'Your beneficiaries\' data is having quite the adventure. A data practices audit would help.',
  ],

  manageBalanced: [
    'Risks are fairly balanced. No fires to put out, but do not get complacent.',
    'Nothing screaming at you right now. Save your resources, or do some preventative maintenance.',
    'All risks under control. A rare moment of calm. Enjoy it while it lasts.',
  ],

  quarterMilestone: [
    'Quarter 5. You\'ve survived longer than most Privacy Shield agreements.',
    'Quarter 10. You\'ve outlasted three prime ministers and a data protection framework.',
    'Quarter 15. At this point, you\'re less a charity and more a survival experiment.',
    'Quarter 20. If this were a PhD, you\'d have a thesis on institutional suffering by now.',
  ],
}

export function getAdvisorLine(category) {
  const lines = ADVISOR_LINES[category]
  if (!lines || lines.length === 0) return null
  return lines[Math.floor(Math.random() * lines.length)]
}
