import type { Member } from '../types'
import { MemberCard } from './MemberCard'

interface MemberGridProps {
  members: Member[]
  onToggleStatus: (id: number) => void
}

export function MemberGrid({ members, onToggleStatus }: MemberGridProps) {
  if (members.length === 0) {
    return (
      <section className="empty-state">
        <h2>No se encontraron estudiantes</h2>
        <p>Prueba otra búsqueda o ajusta el filtro.</p>
      </section>
    )
  }

  return (
    <section className="member-grid" aria-live="polite">
      {members.map((member) => (
        <MemberCard key={member.id} member={member} onToggleStatus={onToggleStatus} />
      ))}
    </section>
  )
}
