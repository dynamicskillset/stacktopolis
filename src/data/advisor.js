// ============================================================
// Stacktopolis — CASSANDRA, the Snarky Advisor
// A sardonic, world-weary digital sovereignty expert who has
// Seen Things. ~60 lines across 10 categories.
// ============================================================

export const ADVISOR_LINES = {
  // Onboarding — fired once per session
  welcome: [
    'Welcome to the mess. Your predecessor left six months of technical debt and a password on a sticky note. Click a building to inspect it, or an empty plot to fill the gap.',
    'So, you are the new CTO. Take a look around. Click the buildings to see what you have inherited. Click the empty plots to install what you are missing. Colleagues will arrive with problems shortly.',
    'Right. This is what they left you. Some of these tools are... questionable. Click any building to investigate, or claim an empty plot before someone else decides for you.',
  ],
  hintClickBuilding: [
    'Try clicking one of those buildings. You can migrate, audit, or back up any tool in your stack.',
  ],
  hintClickEmpty: [
    'Those empty plots are not going to fill themselves. Click one to choose a tool.',
  ],
  hintColleague: [
    'Your first visitor. Colleagues bring problems that need decisions. Choose an option before their patience runs out, or face the consequences.',
  ],

  toolSelectUs: [
    'Another offshore tool. At this rate, foreign intelligence agencies will send you a thank-you card.',
    'Bold choice. Your data now has a layover in a hostile jurisdiction before it does anything useful.',
    'The CLOUD Act thanks you for your generous contribution.',
    'I see you went with the one that phones home like a homesick teenager.',
    'Cheap and cheerful, until the subpoena arrives. Then just cheap.',
    'Your data protection officer just aged five years in five seconds.',
    'Nothing says "digital sovereignty" quite like routing everything through a foreign data centre.',
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
    'The risk is high enough to see from space. Specifically, from a foreign surveillance satellite.',
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
    'Jurisdiction risk is your biggest problem. Migrating an offshore tool would help. If you can afford it.',
    'That jurisdiction exposure is getting uncomfortable. Consider swapping an offshore provider.',
    'Your data is spread across more jurisdictions than a spy novel. Time to consolidate.',
    'Jurisdiction risk this high means one subpoena away from a very bad day.',
  ],

  manageContinuity: [
    'Continuity risk is climbing. A backup drill would give you some breathing room.',
    'If your biggest provider goes down tomorrow, how many tools do you lose? Run a backup drill.',
    'Continuity risk at this level means one outage away from carrier pigeons. Test your recovery plan.',
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

  // Metric advice — triggered when player clicks a gauge
  adviceJurisdiction: [
    'Jurisdiction risk too high? Click an offshore building and choose Migrate to Safest. Or build with EU and self-hosted tools instead. Nkechi sometimes brings regulation scenarios that help too.',
    'Every offshore tool adds jurisdiction risk drift. Migrate the worst offenders first, then fill empty plots with EU providers. It costs budget, but it buys you time.',
  ],
  adviceContinuity: [
    'Continuity risk climbing? Click any building and run a Backup Drill for 10 budget. Also avoid putting too many tools with the same provider: lock-in makes outages catastrophic.',
    'Continuity risk too high? Spread your tools across different providers. If one goes down, you do not want to lose everything. Backup drills reduce continuity risk by 8 points each.',
  ],
  adviceSurveillance: [
    'Surveillance risk creeping up? Click any building and Audit Data Practices for 8 morale. Self-hosted tools have zero surveillance drift. Priya brings scenarios that help if you choose well.',
    'Surveillance risk rising? Offshore tools generate passive drift every tick. Replace them with self-hosted options for zero surveillance, or EU tools for lower exposure. Audits buy immediate relief.',
  ],
  adviceBudget: [
    'Budget tight? It regenerates by 5 each quarter automatically. Nkechi sometimes brings grant opportunities worth 15 to 20 budget. Offshore tools are cheap but risky. Your call.',
    'Budget pressure? Survive and it recovers on its own. Do not ignore colleagues: the morale penalty from ignoring them compounds the problem. Accept grants when Nkechi offers them.',
  ],
  adviceMorale: [
    'Morale dropping? Respond to Sam quickly: his scenarios boost morale if you choose the supportive option. Every ignored colleague costs 5 morale on top of whatever else they brought.',
    'Morale crisis? Stop ignoring your colleagues. Each one that leaves costs 5 morale plus their scenario penalty. Sam and community rally scenarios are your best morale sources.',
  ],

  // Hidden info reveals
  revealBadSurveillance: [
    'Surprise. The free tier has a surveillance cost. Who could have predicted this. Oh wait, I did.',
    'And there it is. The hidden surveillance score. Higher than you hoped, lower than I expected.',
    'The surveillance number just appeared. I wish I could say I was shocked.',
    'That surveillance figure was hidden for a reason. Now you know why.',
  ],
  revealBadCost: [
    'The true cost of self-hosting reveals itself. Your budget just felt that.',
    'And the real morale cost lands. Self-hosting: great for sovereignty, brutal for weekends.',
    'There is the actual price tag. Self-hosted tools are free in the same way puppies are free.',
  ],

  // Colleague-related reactions
  colleagueArrived: [
    'Another colleague at your door. This is what happens when you answer emails.',
    'Someone wants your attention. They always do.',
    'A queue is forming. You should probably deal with that before they start leaving.',
  ],
  colleagueIgnored: [
    'Ignoring people is a choice. An expensive one.',
    'They left. The problem they brought did not.',
    'Well, that\'s one way to handle things. Not a good way, but a way.',
    'Ignoring your colleagues. Your predecessor did that too. Look where it got them.',
  ],
  colleagueResolved: [
    'Handled. For now.',
    'Decision made. On to the next crisis.',
    'One down. I would not celebrate just yet.',
  ],
  colleagueCrisis: [
    'This one looks serious. I would not keep them waiting.',
    'High priority. The kind of thing that ends up in a board report.',
  ],
}

export function getAdvisorLine(category) {
  const lines = ADVISOR_LINES[category]
  if (!lines || lines.length === 0) return null
  return lines[Math.floor(Math.random() * lines.length)]
}
