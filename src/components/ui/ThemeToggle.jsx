import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { getTheme, toggleTheme } from '../../utils/theme'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getTheme)

  function handleToggle() {
    const next = toggleTheme()
    setTheme(next)
  }

  return (
    <button
      onClick={handleToggle}
      className="fixed top-2 right-14 z-50 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-terminal-muted hover:text-amber-glow transition-colors"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}
