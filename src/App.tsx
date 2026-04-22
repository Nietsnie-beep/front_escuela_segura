import { useEffect, useEffectEvent, useMemo, useState } from 'react'
import { MemberGrid } from './components/MemberGrid'
import { SummaryBar } from './components/SummaryBar'
import { TopBar } from './components/TopBar'
import { initialMembers } from './data/members'
import type { TagSnapshotResponse } from './types'
import './App.css'

const BRIDGE_URL = 'http://192.168.1.118:8787/api/tags/snapshot'

function App() {
  const [members, setMembers] = useState(initialMembers)
  const [query, setQuery] = useState('')
  const [bridgeStatus, setBridgeStatus] = useState<'connecting' | 'online' | 'offline'>('connecting')
  const [lastScanLabel, setLastScanLabel] = useState('Esperando lecturas NFC...')

  const registeredCount = members.length
  const activeCount = members.filter((member) => member.status === 'present').length

  const visibleMembers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return members.filter((member) => {
      const passesSearch = member.name.toLowerCase().includes(normalizedQuery)
      return passesSearch && member.status === 'present'
    })
  }, [members, query])

  const applySnapshot = useEffectEvent((snapshot: TagSnapshotResponse) => {
    const incomingTags = snapshot.tags ?? []
    const activeTagIds = incomingTags.map((tag) => tag.tagId)
    setBridgeStatus('online')

    setMembers((current) =>
      current.map((member) => ({
        ...member,
        status: activeTagIds.indexOf(member.nfcId) >= 0 ? 'present' : 'absent',
      })),
    )

    if (incomingTags.length === 0) {
      setLastScanLabel('Sin tarjetas frente al lector')
      return
    }

    const latestTag = snapshot.latest ?? incomingTags[incomingTags.length - 1]
    const matchedMember = members.find((member) => member.nfcId === latestTag.tagId)

    if (matchedMember) {
      setLastScanLabel(`Activas ahora: ${snapshot.activeCount} | Ultima: ${matchedMember.name} (${latestTag.tagId})`)
      return
    }

    setLastScanLabel(`Activas ahora: ${snapshot.activeCount} | Tarjeta sin asignar: ${latestTag.tagId}`)
  })

  useEffect(() => {
    let isMounted = true

    const pollBridge = async () => {
      try {
        const response = await fetch(BRIDGE_URL, { cache: 'no-store' })

        if (!response.ok) {
          throw new Error(`Bridge HTTP ${response.status}`)
        }

        const snapshot = (await response.json()) as TagSnapshotResponse

        if (!isMounted) {
          return
        }

        applySnapshot(snapshot)
      } catch {
        if (!isMounted) {
          return
        }

        setBridgeStatus('offline')
        setLastScanLabel('Sin comunicacion con el lector NFC')
      }
    }

    pollBridge()
    const intervalId = window.setInterval(pollBridge, 300)

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [applySnapshot])

  return (
    <div className="app-shell">
      <div className="main-shell">
        <TopBar
          query={query}
          bridgeStatus={bridgeStatus}
          lastScanLabel={lastScanLabel}
          onQueryChange={setQuery}
        />

        <SummaryBar active={activeCount} registered={registeredCount} />

        <main className="content-area">
          <MemberGrid members={visibleMembers} />
        </main>
      </div>
    </div>
  )
}

export default App
