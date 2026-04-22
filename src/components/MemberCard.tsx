import type { Member } from '../types'

interface MemberCardProps {
  member: Member
}

export function MemberCard({ member }: MemberCardProps) {
  const isPresent = member.status === 'present'
  const statusLabel = isPresent ? 'Activo' : 'Inactivo'

  return (
    <article className={`member-card ${isPresent ? 'is-present' : 'is-absent'}`}>
      <div className="member-click" aria-label={`Tarjeta activa de ${member.name}`}>
        <div className="avatar-wrap">
          <img src={member.avatar} alt={member.name} className="avatar" loading="lazy" />
          <span className={`badge ${isPresent ? 'day' : 'night'}`}>
            <span className="material-symbols-outlined" aria-hidden="true">
              {isPresent ? 'wb_sunny' : 'dark_mode'}
            </span>
          </span>
        </div>

        <h3>{member.name}</h3>
        <p>{statusLabel}</p>
      </div>
    </article>
  )
}
