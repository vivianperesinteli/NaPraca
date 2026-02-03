export interface ProfileModel {
  id: string
  user_id: string
  full_name: string
  email: string
  phone?: string
  profile_type: 'consumer' | 'entrepreneur'
  avatar_url?: string
  created_at: string
  updated_at: string
}

