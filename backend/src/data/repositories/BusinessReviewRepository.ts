import type { SupabaseClient } from '@supabase/supabase-js'
import type { BusinessReviewModel } from '../models/BusinessReviewModel'

export interface CreateReviewData {
  rating: number
  text?: string
}

export class BusinessReviewRepository {
  constructor(private supabase: SupabaseClient) {}

  async getByBusinessId(businessId: string): Promise<BusinessReviewModel[]> {
    const { data, error } = await this.supabase
      .from('business_reviews')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []) as BusinessReviewModel[]
  }

  async getStats(businessId: string): Promise<{ averageRating: number; count: number }> {
    const list = await this.getByBusinessId(businessId)
    if (list.length === 0) return { averageRating: 0, count: 0 }
    const sum = list.reduce((acc, r) => acc + r.rating, 0)
    return { averageRating: sum / list.length, count: list.length }
  }

  async upsertForProfile(
    businessId: string,
    profileId: string,
    data: CreateReviewData
  ): Promise<BusinessReviewModel> {
    const { data: review, error } = await this.supabase
      .from('business_reviews')
      .upsert(
        {
          business_id: businessId,
          profile_id: profileId,
          rating: data.rating,
          text: data.text ?? null,
        },
        { onConflict: 'business_id,profile_id' }
      )
      .select()
      .single()

    if (error) throw error
    return review as BusinessReviewModel
  }
}
