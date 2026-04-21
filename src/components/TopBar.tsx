interface TopBarProps {
  query: string
  onQueryChange: (value: string) => void
}

export function TopBar({ query, onQueryChange }: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <h1>Escuela Segura</h1>
        <span className="divider" />
        <p>Asistencia escolar</p>
      </div>

      <div className="top-bar-right">
        <label className="search" htmlFor="member-search">
          <span className="material-symbols-outlined" aria-hidden="true">
            search
          </span>
          <input
            id="member-search"
            type="text"
            placeholder="Buscar estudiantes..."
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </label>

        <div className="icon-actions" aria-label="Acciones rápidas">
          {['notifications', 'history', 'bar_chart'].map((icon) => (
            <button key={icon} type="button" className="icon-btn" aria-label={icon}>
              <span className="material-symbols-outlined" aria-hidden="true">
                {icon}
              </span>
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
