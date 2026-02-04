export interface BusinessModel {
  id: string
  entrepreneur_id: string
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
  logo_url?: string
  cover_image_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}
