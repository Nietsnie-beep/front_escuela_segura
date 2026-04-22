export type AttendanceStatus = 'present' | 'absent'

export interface Member {
  id: number
  nfcId: string
  name: string
  avatar: string
  status: AttendanceStatus
}

export type FilterStatus = 'all' | AttendanceStatus

export interface TagSnapshotItem {
  tagId: string
  source: string
  antenna: string
  countForTag: number
  firstSeenUtc?: string
  lastSeenUtc?: string
  session?: number
  sequence?: number
  activeTags?: number
  totalReads?: number
  timestampUtc?: string
}

export interface TagSnapshotResponse {
  session: number
  source: string
  sessionStartedUtc: string
  activeWindowMs: number
  totalReads: number
  activeCount: number
  latest: TagSnapshotItem | null
  tags: TagSnapshotItem[]
}
