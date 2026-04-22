import type { Member } from '../types'
import { MemberCard } from './MemberCard'

interface MemberGridProps {
  members: Member[]
}

export function MemberGrid({ members }: MemberGridProps) {
  if (members.length === 0) {
    return (
      <section className="empty-state">
        <h2>No hay tarjetas activas</h2>
        <p>Los estudiantes apareceran aqui en cuanto acerquen su tarjeta al lector.</p>
      </section>
    )
  }

  return (
    <section className="member-grid" aria-live="polite">
      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </section>
  )
}
