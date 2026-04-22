interface TopBarProps {
  query: string
  bridgeStatus: 'connecting' | 'online' | 'offline'
  lastScanLabel: string
  onQueryChange: (value: string) => void
}

export function TopBar({ query, bridgeStatus, lastScanLabel, onQueryChange }: TopBarProps) {
  const bridgeLabel =
    bridgeStatus === 'online'
      ? 'Lector en linea'
      : bridgeStatus === 'offline'
        ? 'Lector sin conexion'
        : 'Conectando lector'

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <h1>Escuela Segura</h1>
        <span className="divider" />
        <p>Asistencia escolar</p>
        <span className={`bridge-pill is-${bridgeStatus}`}>{bridgeLabel}</span>
        <span className="last-scan-label">{lastScanLabel}</span>
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

        <div className="icon-actions" aria-label="Acciones rapidas">
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
