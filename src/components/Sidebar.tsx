interface SidebarProps {
  onExport: () => void
}

const navItems = [
  { id: 'live', label: 'Live View', icon: 'sensors', active: true },
  { id: 'logs', label: 'Attendance Logs', icon: 'assignment', active: false },
  { id: 'members', label: 'Member List', icon: 'group', active: false },
  { id: 'settings', label: 'Settings', icon: 'settings', active: false },
]

export function Sidebar({ onExport }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Main Hall</h2>
        <p>Current Event</p>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button type="button" className="export-btn" onClick={onExport}>
        Export Report
      </button>
    </aside>
  )
}
