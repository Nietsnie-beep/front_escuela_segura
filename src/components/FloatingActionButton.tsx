interface FloatingActionButtonProps {
  onClick: () => void
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <button type="button" className="fab" onClick={onClick} aria-label="Marcar todos como presentes">
      <span className="material-symbols-outlined" aria-hidden="true">
        done_all
      </span>
    </button>
  )
}
