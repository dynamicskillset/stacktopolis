import { Shield } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-terminal-bg flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <Shield className="w-16 h-16 text-amber-glow mx-auto mb-6" />
        <h1 className="font-mono text-4xl font-bold text-amber-glow tracking-wider mb-4">
          STACKTOPOLIS
        </h1>
        <p className="font-serif text-lg text-terminal-muted italic">
          A satirical survival game about digital sovereignty
        </p>
        <div className="mt-8 flex gap-6 justify-center text-sm text-terminal-muted">
          <span className="text-risk-jurisdiction">Jurisdiction</span>
          <span className="text-risk-continuity">Continuity</span>
          <span className="text-risk-surveillance">Surveillance</span>
        </div>
      </div>
    </div>
  )
}

export default App
