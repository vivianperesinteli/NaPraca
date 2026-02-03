// import { supabase } from '../services/supabaseClient'
// import { ProfileModel } from '../models/ProfileModel'

// export interface SignUpData {
//   email: string
//   password: string
//   fullName: string
//   profileType: 'consumer' | 'entrepreneur'
//   phone?: string
// }

// export interface SignInData {
//   email: string
//   password: string
// }

// export class AuthRepository {
//   async signUp(data: SignUpData) {
//     const { data: authData, error: authError } = await supabase.auth.signUp({
//       email: data.email,
//       password: data.password,
//     })

//     if (authError) throw authError
//     if (!authData.user) throw new Error('Failed to create user')

//     const { data: profile, error: profileError } = await supabase
//       .from('profiles')
//       .insert({
//         user_id: authData.user.id,
//         full_name: data.fullName,
//         email: data.email,
//         phone: data.phone,
//         profile_type: data.profileType,
//       })
//       .select()
//       .single()

//     if (profileError) throw profileError

//     return { user: authData.user, profile }
//   }

//   async signIn(data: SignInData) {
//     const { data: authData, error } = await supabase.auth.signInWithPassword({
//       email: data.email,
//       password: data.password,
//     })

//     if (error) throw error
//     return authData
//   }

//   async signOut() {
//     const { error } = await supabase.auth.signOut()
//     if (error) throw error
//   }

//   async getCurrentProfile(): Promise<ProfileModel | null> {
//     const { data: { user } } = await supabase.auth.getUser()
//     if (!user) return null

//     const { data, error } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('user_id', user.id)
//       .single()

//     if (error) throw error
//     return data
//   }

//   async getCurrentUser() {
//     const { data: { user } } = await supabase.auth.getUser()
//     return user
//   }

//   async getCurrentProfileId(): Promise<string | null> {
//     const profile = await this.getCurrentProfile()
//     return profile?.id || null
//   }

//   onAuthStateChange(callback: (user: any) => void) {
//     return supabase.auth.onAuthStateChange((_event, session) => {
//       callback(session?.user ?? null)
//     })
//   }
// }



import { supabase } from '../services/supabaseClient'
import { ProfileModel } from '../models/ProfileModel'

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
  async signUp(data: SignUpData) {
    // 1. Criamos o usuário e passamos os dados extras no objeto 'options.data'
    // Esses dados ficam salvos no 'user_metadata' do Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
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

    // --- PARTE REMOVIDA DAQUI ---
    // O 'supabase.from("profiles").insert' foi removido.
    // O erro 401 acontecia exatamente aqui.
    // Agora, o Trigger que você colocou no SQL do Supabase vai criar o perfil automaticamente.

    return { user: authData.user }
  }

  async signIn(data: SignInData) {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) throw error
    return authData
  }

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  async getCurrentProfile(): Promise<ProfileModel | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error) throw error
    return data
  }

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }

  async getCurrentProfileId(): Promise<string | null> {
    const profile = await this.getCurrentProfile()
    return profile?.id || null
  }

  onAuthStateChange(callback: (user: any) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null)
    })
  }
}

