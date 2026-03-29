# Changelog

## 3.1.0

### Language & Tone
- All country-specific references removed — "US" replaced with "offshore" / "hostile jurisdiction"
- Red warning flag with "!" on offshore buildings instead of country flags
- Tool labels show "(Offshore)" not "(US)"
- Comedic sound effects: doorbell arrivals, sad trombone expiry, klaxon warnings, dramatic game over fanfare

### Visual
- Dense ambient city life: 7+ walking people (dog walker, jogger, briefcase, umbrella), vehicles (van, taxi, bicycle, red/blue cars), aircraft (plane, drone, balloon, helicopter)
- Whimsical details: cat on roof, rubber duck, pizza scooter, Eye of Sauron (high surveillance), binoculars figure, broken server, protest signs, HELP flag, flying papers
- Region flags on buildings (red warning, EU blue/gold, self-hosted green pennant)
- Dramatic abandoned buildings on empty plots (3 variants with weeds, rubble, broken walls)
- Fire engine sprays water, helicopters face correct direction, fire sits ON buildings
- Progressive visual chaos: smoke → flames → running people → SWAT → fire engine → helicopter swarm

### Gameplay
- Budget mechanics: Run Fundraiser (−8 morale, +12 budget, 1/year), Pizza Party (−8 budget, +10 morale, every 2 quarters)
- Backup Drill moved to global action (not per-building)
- Building inspector: 3 actions (Migrate to Safest, Audit Data Practices, Downgrade to Cheapest)
- Colleague options show impact indicators (red=bad, green=good, ???=unknown) with full risk names
- 3 new Nkechi budget scenarios (matched funding, emergency appeal, corporate partnership)

### Audio
- Procedural ambient music via Web Audio API — evolving chord progressions that shift from calm to tense with danger
- Sound on by default (mute toggle controls both music and SFX)

### UI & UX
- Light-only TechFreedom palette (#F7F5F0 cream, #1A2332 navy, #8B7A2F amber, #2B6AB0 sky)
- No more dark mode, glow effects, or heavy CRT scanlines
- Arcade 3-letter high score initials (only if qualifying for top 10)
- Guided tour on first play (4-step spotlight walkthrough)
- About modal (Tom & Doug, SimCity 2000 inspiration, TechFreedom link)
- Prominent TechFreedom CTA on game over screen
- Random taglines (14), intro text (6), organisation names per session
- Clickable gauges trigger Cassandra metric advice
- Tips moved to "?" help popup, action buttons centred
- New favicon and OG image for light palette
- Difficulty selector as compact pill toggle

### Accessibility
- WCAG AA contrast: amber #8B7A2F (~4.8:1), orange #B85400 (~4.6:1), danger #B71C1C (~5.2:1)
- Focus indicators on all clickable gauges, readouts, tour buttons
- ARIA modals with Escape key handlers on GuidedTour and PauseOverlay
- aria-expanded and aria-label on colleague card expand buttons
- Full risk names in all text (jurisdiction/continuity/surveillance not JUR/CON/SUR)
- React.memo on hot-path components (BuildingTile, ColleagueCard, ColleagueQueue)

### Removed
- Turn-based Build→Event→Manage phase system (replaced by real-time colleagues)
- BuildPhase, EventPhase, ManagePhase, DecisionPanel, EventCard, BreakingBanner, Tutorial, ToolOption, ToolCard components
- Dark theme toggle and theme utilities
- All real company name references

## 2.0.0

### Visual Overhaul
- SimCity 2000-style isometric city grid with 12 SVG building types
- Region-tinted buildings (US glass blue, EU brick, self-hosted green-grey)
- Circular gauge dials replacing progress bars
- LED digital readouts for Budget, Morale, Quarter
- Animated skyline background (calm blue to stormy red)
- CRT scanlines, vignette, screen flash, glitch effects
- Smoke and warning indicators on at-risk buildings
- Value delta indicators floating on changes
- Game title fixed in ticker bar
- Step indicator (1-2-3) showing current phase
- Refreshed GameOver and Title screens with skyline backgrounds

### Gameplay
- Vendor synergy/lock-in system (same-provider discount + continuity penalty)
- Difficulty modes (Easy / Normal / Hard)
- Tutorial overlay (5-step first-run guide)
- Snarky advisor "Cassandra" with human avatar, typewriter effect, pop-in/out
- Risk assessment panel in manage phase with contextual advice
- Cassandra gives manage-phase advice linked to highest risk lens
- Sound effects (Web Audio synthesised, mute toggle)

### Accessibility
- Native button elements throughout
- WCAG AAA contrast (terminal-muted ~8.5:1, terminal-text ~14:1)
- Seizure-safe pulse animation (3s minimum)
- Touch targets >= 44px
- aria-live regions, focus management
- prefers-reduced-motion disables all animations
- Focus trap and Escape key on tutorial modal

## 1.0.0

- Full playable game with Build, Event, and Manage phases
- 12 tool needs with 2-3 options each (34 total)
- 28 events across jurisdiction, continuity, surveillance, multi-lens, and positive categories
- 50 ambient news ticker headlines
- 7 end-game titles with scoring
- 5 game-over causes with newspaper-style death screens
- localStorage high score persistence (top 10)
- Dark retro-futuristic terminal aesthetic
- Responsive layout (desktop two-column, mobile single-column)
- News ticker, breaking news animation, screen shake, risk metre pulses
- Bunny Fonts (IBM Plex Mono + Lora)
- TechFreedom CC BY attribution

## 0.1.0

- Project scaffolding: Vite + React + Tailwind v4
- Custom dark terminal theme with IBM Plex Mono and Lora (Bunny Fonts)
- Animation keyframes for ticker, shake, breaking news, fade, slide
