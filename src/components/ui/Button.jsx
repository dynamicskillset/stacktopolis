const variants = {
  primary:
    'bg-amber-glow text-terminal-bg hover:shadow-[0_0_12px_var(--color-amber-glow)] hover:brightness-110',
  secondary:
    'bg-terminal-surface text-terminal-text border border-terminal-border hover:border-terminal-muted',
  danger:
    'bg-danger text-terminal-bg hover:shadow-[0_0_12px_var(--color-danger)] hover:brightness-110',
}

export default function Button({ children, onClick, variant = 'primary', disabled, className = '' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-mono uppercase tracking-wider px-5 py-2.5 text-sm font-semibold rounded transition-all duration-200 ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {children}
    </button>
  )
}
