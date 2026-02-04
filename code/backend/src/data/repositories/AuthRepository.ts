import type { SupabaseClient } from '@supabase/supabase-js'
import type { ProfileModel } from '../models/ProfileModel'

export interface SignUpData {
  email: string
  password: string
  fullName: string
  profileType: 'consumer' | 'entrepreneur'
  phone?: string
}

export interface SignInData {
  email: string
  password: string
}

export class AuthRepository {
  constructor(private supabase: SupabaseClient) {}

  async signUp(data: SignUpData) {
    const { data: authData, error: authError } = await this.supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          profile_type: data.profileType,
          phone: data.phone,
        },
      },
    })

    if (authError) throw authError
    if (!authData.user) throw new Error('Failed to create user')

    return { user: authData.user }
  }

  async signIn(data: SignInData) {
    const { data: authData, error } = await this.supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) throw error
    return authData
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut()
    if (error) throw error
  }

  async getCurrentProfile(): Promise<ProfileModel | null> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error) throw error
    return data
  }

  /**
   * Cria o perfil no banco a partir do usuário logado (user_metadata).
   * Use quando getCurrentProfile falhar (ex.: trigger não criou o perfil).
   * Tenta INSERT; se já existir (unique), faz SELECT e retorna.
   */
  async ensureProfileFromUser(): Promise<ProfileModel | null> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (!user) return null

    const fullName = (user.user_metadata?.full_name as string) ?? ''
    const profileType = (user.user_metadata?.profile_type as 'consumer' | 'entrepreneur') ?? 'consumer'
    const phone = (user.user_metadata?.phone as string) ?? null

    const insertPayload = {
      user_id: user.id,
      full_name: fullName || user.email?.split('@')[0] || 'Usuário',
      email: user.email ?? '',
      profile_type: profileType,
      phone,
    }

    const { data: inserted, error: insertError } = await this.supabase
      .from('profiles')
      .insert(insertPayload)
      .select()
      .single()

    if (!insertError) return inserted

    const isDuplicate = insertError.code === '23505'
    if (isDuplicate) {
      const { data: existing, error: selectError } = await this.supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()
      if (!selectError) return existing
    }

    throw insertError
  }

  async getCurrentUser() {
    const { data: { user } } = await this.supabase.auth.getUser()
    return user
  }

  async getCurrentProfileId(): Promise<string | null> {
    const profile = await this.getCurrentProfile()
    return profile?.id ?? null
  }

  onAuthStateChange(callback: (user: unknown) => void) {
    return this.supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null)
    })
  }
}
