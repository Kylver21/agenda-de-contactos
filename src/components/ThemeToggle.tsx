interface ThemeToggleProps {
  theme: string
  toggleTheme: () => void
}

function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <button 
      onClick={toggleTheme} 
      className={`theme-toggle ${theme}`}
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      <span className="theme-text">
        {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
      </span>
    </button>
  )
}

export default ThemeToggle