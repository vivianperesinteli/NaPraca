import type { SupabaseClient } from '@supabase/supabase-js'
import type { BusinessPostModel } from '../models/BusinessPostModel'

export interface CreateBusinessPostData {
  image_url?: string
  text: string
}

export interface UpdateBusinessPostData {
  image_url?: string
  text?: string
}

export class BusinessPostRepository {
  constructor(private supabase: SupabaseClient) {}

  async getByBusinessId(businessId: string): Promise<BusinessPostModel[]> {
    const { data, error } = await this.supabase
      .from('business_posts')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []) as BusinessPostModel[]
  }

  async create(businessId: string, data: CreateBusinessPostData): Promise<BusinessPostModel> {
    const { data: post, error } = await this.supabase
      .from('business_posts')
      .insert({
        business_id: businessId,
        image_url: data.image_url ?? null,
        text: data.text,
      })
      .select()
      .single()

    if (error) throw error
    return post as BusinessPostModel
  }

  async update(id: string, data: UpdateBusinessPostData): Promise<BusinessPostModel> {
    const { data: post, error } = await this.supabase
      .from('business_posts')
      .update({
        ...(data.image_url !== undefined && { image_url: data.image_url }),
        ...(data.text !== undefined && { text: data.text }),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return post as BusinessPostModel
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('business_posts')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}
