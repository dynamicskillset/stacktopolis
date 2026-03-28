import { Shield } from 'lucide-react'
import Button from '../ui/Button'
import Attribution from '../shared/Attribution'

export default function TitleScreen({ onStartGame }) {
  return (
    <div className="min-h-screen bg-terminal-bg flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="flex flex-col items-center text-center flex-1 justify-center">
        <Shield className="w-20 h-20 text-amber-glow mb-8" />

        <h1 className="font-mono text-5xl font-bold text-amber-glow tracking-widest mb-4">
          STACKTOPOLIS
        </h1>

        <p className="font-serif text-lg text-terminal-muted italic mb-8">
          A satirical survival game about digital sovereignty
        </p>

        <div className="flex gap-6 justify-center text-sm font-mono uppercase tracking-wider mb-8">
          <span className="text-risk-jurisdiction">Jurisdiction</span>
          <span className="text-risk-continuity">Continuity</span>
          <span className="text-risk-surveillance">Surveillance</span>
        </div>

        <p className="font-serif text-terminal-text max-w-md text-center mb-10 leading-relaxed">
          You are the CTO of a small European charity. Build your tech stack.
          Survive the disasters. How many quarters can you last?
        </p>

        <Button
          onClick={onStartGame}
          className="px-8 py-3 text-base"
        >
          New Game
        </Button>
      </div>

      <Attribution />
    </div>
  )
}
