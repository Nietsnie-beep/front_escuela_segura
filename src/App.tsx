import { useMemo, useState } from 'react'
import { FloatingActionButton } from './components/FloatingActionButton'
import { MemberGrid } from './components/MemberGrid'
import { SummaryBar } from './components/SummaryBar'
import { TopBar } from './components/TopBar'
import { initialMembers } from './data/members'
import type { FilterStatus } from './types'
import './App.css'

function App() {
  const [members, setMembers] = useState(initialMembers)
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all')

  const totalMembers = members.length
  const presentCount = members.filter((member) => member.status === 'present').length
  const absentCount = totalMembers - presentCount

  const visibleMembers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return members.filter((member) => {
      const passesSearch = member.name.toLowerCase().includes(normalizedQuery)
      const passesFilter = activeFilter === 'all' || member.status === activeFilter
      return passesSearch && passesFilter
    })
  }, [activeFilter, members, query])

  const toggleStatus = (id: number) => {
    setMembers((current) =>
      current.map((member) =>
        member.id === id
          ? {
              ...member,
              status: member.status === 'present' ? 'absent' : 'present',
            }
          : member,
      ),
    )
  }

  const setAllPresent = () => {
    setMembers((current) => current.map((member) => ({ ...member, status: 'present' })))
  }

  return (
    <div className="app-shell">
      <div className="main-shell">
        <TopBar query={query} onQueryChange={setQuery} />

        <SummaryBar
          total={totalMembers}
          present={presentCount}
          absent={absentCount}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onSetAllPresent={setAllPresent}
        />

        <main className="content-area">
          <MemberGrid members={visibleMembers} onToggleStatus={toggleStatus} />
        </main>
      </div>

      <FloatingActionButton onClick={setAllPresent} />
    </div>
  )
}

export default App
