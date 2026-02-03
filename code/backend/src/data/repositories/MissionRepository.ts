import type { SupabaseClient } from '@supabase/supabase-js'
import type { MissionModel } from '../models/MissionModel'

export interface CreateMissionData {
  title: string
  description: string
  mission_type: 'learning' | 'marketing' | 'sales' | 'management'
  points: number
  business_id?: string
}

export class MissionRepository {
  constructor(private supabase: SupabaseClient) {}

  async getByEntrepreneurId(entrepreneurId: string): Promise<MissionModel[]> {
    const { data, error } = await this.supabase
      .from('missions')
      .select('*')
      .eq('entrepreneur_id', entrepreneurId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async create(entrepreneurId: string, data: CreateMissionData): Promise<MissionModel> {
    const { data: mission, error } = await this.supabase
      .from('missions')
      .insert({
        entrepreneur_id: entrepreneurId,
        ...data,
        is_completed: false,
      })
      .select()
      .single()

    if (error) throw error
    return mission
  }

  async complete(missionId: string): Promise<MissionModel> {
    const { data, error } = await this.supabase
      .from('missions')
      .update({
        is_completed: true,
        completed_at: new Date().toISOString(),
      })
      .eq('id', missionId)
      .select()
      .single()

    if (error) throw error
    return data
  }
}
