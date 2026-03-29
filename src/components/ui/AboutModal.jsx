import { X } from 'lucide-react'

export default function AboutModal({ onClose }) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-terminal-bg/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="About Stacktopolis"
      onKeyDown={(e) => { if (e.key === 'Escape') onClose() }}
      tabIndex={0}
    >
      <div
        className="bg-terminal-surface border border-terminal-border rounded-lg p-8 max-w-lg w-full mx-4 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
      >
        <div className="flex items-start justify-between mb-4">
          <h2 className="font-mono text-lg font-bold text-terminal-text uppercase tracking-wider">
            About Stacktopolis
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center text-terminal-muted hover:text-terminal-text transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 font-serif text-sm text-terminal-text leading-relaxed">
          <p>
            Stacktopolis started as a noodling session between{' '}
            <strong>Tom Watson</strong> and <strong>Doug Belshaw</strong> while
            planning the cohort sessions for{' '}
            <a
              href="https://techfreedom.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-risk-surveillance underline hover:text-terminal-text transition-colors"
            >
              TechFreedom.eu
            </a>
            . The question was simple: how do you make digital sovereignty
            tangible and urgent for people who run small organisations?
          </p>

          <p>
            The answer, it turned out, was a game. Specifically, a game inspired
            by <strong>SimCity 2000</strong>, which they both enjoyed growing up.
            The isometric buildings, the creeping sense of things going wrong,
            the satisfaction of managing chaos: it all mapped surprisingly well
            onto the reality of running a charity&rsquo;s tech stack.
          </p>

          <p>
            The three risk lenses (Jurisdiction, Continuity, Surveillance) come
            directly from the{' '}
            <a
              href="https://techfreedom.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-risk-surveillance underline hover:text-terminal-text transition-colors"
            >
              TechFreedom risk framework
            </a>
            , which helps organisations assess their digital dependencies and
            make informed decisions about sovereignty. The game turns that
            framework into something you can feel in your gut: the slow creep
            of jurisdiction risk, the sudden sting of a vendor acquisition,
            the daily trade-offs between cost and control.
          </p>

          <p className="text-terminal-muted italic">
            If you run an organisation and any of this felt uncomfortably
            familiar, that was the point. Visit{' '}
            <a
              href="https://techfreedom.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-risk-surveillance underline hover:text-terminal-text transition-colors font-bold"
            >
              TechFreedom.eu
            </a>{' '}
            to do something about it.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-terminal-border text-center">
          <p className="font-mono text-xs text-terminal-muted">
            AGPL-3.0 &middot; Risk framework CC BY
          </p>
        </div>
      </div>
    </div>
  )
}
