import type { FilterStatus } from '../types'

interface SummaryBarProps {
  total: number
  present: number
  absent: number
  activeFilter: FilterStatus
  onFilterChange: (status: FilterStatus) => void
  onSetAllPresent: () => void
}

export function SummaryBar({
  total,
  present,
  absent,
  activeFilter,
  onFilterChange,
  onSetAllPresent,
}: SummaryBarProps) {
  const presentPercent = total === 0 ? 0 : Math.round((present / total) * 100)

  return (
    <section className="summary">
      <div className="summary-main">
        <div className="summary-labels">
          <span>Presentes: {present}</span>
          <span>Ausentes: {absent}</span>
        </div>

        <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={presentPercent}>
          <div className="present-bar" style={{ width: `${presentPercent}%` }} />
          <div className="absent-bar" style={{ width: `${100 - presentPercent}%` }} />
        </div>
      </div>

      <div className="summary-actions">
        <button type="button" className="pill primary" onClick={onSetAllPresent}>
          <span className="material-symbols-outlined" aria-hidden="true">
            check_circle
          </span>
          Marcar todos
        </button>

        {(['all', 'present', 'absent'] as const).map((status) => (
          <button
            key={status}
            type="button"
            className={`pill ${activeFilter === status ? 'active' : ''}`}
            onClick={() => onFilterChange(status)}
          >
            {status === 'all' ? 'todos' : status === 'present' ? 'presentes' : 'ausentes'}
          </button>
        ))}
      </div>
    </section>
  )
}
