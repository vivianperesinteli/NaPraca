export interface MissionModel {
  id: string
  entrepreneur_id: string
  business_id?: string
  title: string
  description: string
  mission_type: 'learning' | 'marketing' | 'sales' | 'management'
  points: number
  is_completed: boolean
  completed_at?: string
  created_at: string
  updated_at: string
}

