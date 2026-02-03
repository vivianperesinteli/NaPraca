import { supabase } from '../services/supabaseClient'
import { BusinessModel } from '../models/BusinessModel'

export interface CreateBusinessData {
  name: string
  description: string
  category: string
  address: string
  latitude: number
  longitude: number
  phone?: string
  whatsapp?: string
  email?: string
  website?: string
}

export interface UpdateBusinessData extends Partial<CreateBusinessData> {
  is_active?: boolean
}

export class BusinessRepository {
  async getAll(): Promise<BusinessModel[]> {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async getById(id: string): Promise<BusinessModel | null> {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async getByEntrepreneurId(entrepreneurId: string): Promise<BusinessModel[]> {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('entrepreneur_id', entrepreneurId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async create(entrepreneurId: string, data: CreateBusinessData): Promise<BusinessModel> {
    const { data: business, error } = await supabase
      .from('businesses')
      .insert({
        entrepreneur_id: entrepreneurId,
        ...data,
        is_active: true,
      })
      .select()
      .single()

    if (error) throw error
    return business
  }

  async search(query: string, category?: string): Promise<BusinessModel[]> {
    let queryBuilder = supabase
      .from('businesses')
      .select('*')
      .eq('is_active', true)

    if (query) {
      queryBuilder = queryBuilder.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    }

    if (category) {
      // Buscar categoria dentro da string (suporta múltiplas categorias separadas por vírgula)
      queryBuilder = queryBuilder.ilike('category', `%${category}%`)
    }

    const { data, error } = await queryBuilder.order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async update(id: string, data: UpdateBusinessData): Promise<BusinessModel> {
    const { data: business, error } = await supabase
      .from('businesses')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return business
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('businesses')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

