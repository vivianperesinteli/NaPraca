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
   * Garante que o perfil existe. Primeiro verifica se existe, só então cria se necessário.
   * Use apenas quando getCurrentProfile falhar e você tiver certeza de que o perfil não existe.
   * IMPORTANTE: O perfil deve ser criado pelo trigger do Supabase no signUp.
   * Este método é apenas um fallback para casos excepcionais.
   */
  async ensureProfileFromUser(): Promise<ProfileModel | null> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (!user) return null

    // Primeiro, tentar buscar o perfil existente
    const { data: existing, error: selectError } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    // Se encontrou, retornar
    if (!selectError && existing) {
      return existing
    }

    // Se não encontrou e o erro não é "não encontrado", lançar o erro
    if (selectError && selectError.code !== 'PGRST116') {
      throw selectError
    }

    // Só criar se realmente não existir (erro PGRST116 = não encontrado)
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

    if (insertError) {
      // Se deu erro de duplicata, tentar buscar novamente
      if (insertError.code === '23505' || insertError.message?.includes('duplicate')) {
        const { data: existingAfterError, error: selectError2 } = await this.supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()
        if (!selectError2 && existingAfterError) return existingAfterError
      }
      throw insertError
    }

    return inserted
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
