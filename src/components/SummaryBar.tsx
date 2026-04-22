interface SummaryBarProps {
  active: number
  registered: number
}

export function SummaryBar({ active, registered }: SummaryBarProps) {
  const activePercent = registered === 0 ? 0 : Math.round((active / registered) * 100)

  return (
    <section className="summary">
      <div className="summary-main">
        <div className="summary-labels">
          <span>Activos frente al lector: {active}</span>
          <span>Registrados: {registered}</span>
        </div>

        <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={activePercent}>
          <div className="present-bar" style={{ width: `${activePercent}%` }} />
          <div className="absent-bar" style={{ width: `${100 - activePercent}%` }} />
        </div>
      </div>
    </section>
  )
}
