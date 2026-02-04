import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Missing Supabase environment variables.')
  console.error('Required: SUPABASE_URL and SUPABASE_ANON_KEY (or VITE_* for compat)')
}

/** Cliente Supabase para uso em Node/scripts. No frontend use createSupabaseClient(import.meta.env.VITE_*) */
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

/** Factory para criar cliente (ex.: no frontend com import.meta.env) */
export function createSupabaseClient(url: string, anonKey: string): SupabaseClient {
  return createClient(url, anonKey)
}
