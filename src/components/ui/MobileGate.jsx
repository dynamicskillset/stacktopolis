import { Shield } from 'lucide-react'

export default function MobileGate() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center lg:hidden bg-terminal-bg">
      <Shield className="w-12 h-12 text-amber-glow mb-6" />

      <h1 className="font-mono text-2xl font-bold text-amber-glow tracking-widest mb-4">
        STACKTOPOLIS
      </h1>

      <p className="font-serif text-terminal-text max-w-sm leading-relaxed mb-6">
        This game is best played on a larger screen. Your organisation&rsquo;s
        tech stack deserves a proper viewport.
      </p>

      <p className="font-serif text-sm text-terminal-muted italic max-w-xs">
        &ldquo;You wouldn&rsquo;t run a charity&rsquo;s IT infrastructure from
        a phone. Well, you might, but that&rsquo;s rather the problem we&rsquo;re
        satirising here.&rdquo;
      </p>
      <p className="font-mono text-xs text-amber-glow mt-2">
        &mdash; CASSANDRA, DPO
      </p>
    </div>
  )
}
