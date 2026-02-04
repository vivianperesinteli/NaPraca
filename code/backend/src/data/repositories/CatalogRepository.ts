import type { SupabaseClient } from '@supabase/supabase-js'
import type { CatalogItemModel } from '../models/CatalogItemModel'

export interface CreateCatalogItemData {
  name: string
  description?: string
  price: number
  image_url?: string
  category?: string
  position?: number
}

export interface UpdateCatalogItemData extends Partial<CreateCatalogItemData> {}

export class CatalogRepository {
  constructor(private supabase: SupabaseClient) {}

  async getByBusinessId(businessId: string): Promise<CatalogItemModel[]> {
    const { data, error } = await this.supabase
      .from('business_catalog')
      .select('*')
      .eq('business_id', businessId)
      .order('position', { ascending: true })
      .order('created_at', { ascending: true })

    if (error) throw error
    return (data || []).map((row: Record<string, unknown>) => ({
      ...row,
      price: Number(row.price),
    })) as CatalogItemModel[]
  }

  async create(businessId: string, data: CreateCatalogItemData): Promise<CatalogItemModel> {
    const position = data.position ?? 0
    const { data: item, error } = await this.supabase
      .from('business_catalog')
      .insert({
        business_id: businessId,
        name: data.name,
        description: data.description ?? null,
        price: data.price,
        image_url: data.image_url ?? null,
        category: data.category ?? 'Geral',
        position,
      })
      .select()
      .single()

    if (error) throw error
    return { ...item, price: Number(item.price) } as CatalogItemModel
  }

  async update(id: string, data: UpdateCatalogItemData): Promise<CatalogItemModel> {
    const { data: item, error } = await this.supabase
      .from('business_catalog')
      .update({
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.image_url !== undefined && { image_url: data.image_url }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.position !== undefined && { position: data.position }),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { ...item, price: Number(item.price) } as CatalogItemModel
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('business_catalog')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}
