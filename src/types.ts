export type AttendanceStatus = 'present' | 'absent'

export interface Member {
  id: number
  name: string
  avatar: string
  status: AttendanceStatus
}

export type FilterStatus = 'all' | AttendanceStatus
