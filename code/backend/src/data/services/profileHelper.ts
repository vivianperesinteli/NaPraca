import type { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'

/** Obtém o profile_id do usuário autenticado. Pode receber cliente (ex.: do frontend). */
export async function getCurrentProfileId(client?: SupabaseClient): Promise<string | null> {
  const sb = client ?? supabase
  const { data: { user } } = await sb.auth.getUser()
  if (!user) return null

  const { data, error } = await sb
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (error) {
    console.error('Error getting profile ID:', error)
    return null
  }

  return data?.id ?? null
}
