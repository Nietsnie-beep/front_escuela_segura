import type { Member } from '../types'

interface MemberCardProps {
  member: Member
  onToggleStatus: (id: number) => void
}

export function MemberCard({ member, onToggleStatus }: MemberCardProps) {
  const isPresent = member.status === 'present'
  const statusLabel = isPresent ? 'Presente' : 'Ausente'

  return (
    <article className={`member-card ${isPresent ? 'is-present' : 'is-absent'}`}>
      <button
        type="button"
        className="member-click"
        onClick={() => onToggleStatus(member.id)}
        aria-label={`Cambiar estado de ${member.name}`}
      >
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
      </button>
    </article>
  )
}
