import { supabase } from './supabaseClient'

/**
 * Obtém o profile_id do usuário autenticado atual
 * Necessário para as políticas RLS que verificam ownership
 */
export async function getCurrentProfileId(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (error) {
    console.error('Error getting profile ID:', error)
    return null
  }

  return data?.id || null
}

