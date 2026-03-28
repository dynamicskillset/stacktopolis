# Changelog

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
