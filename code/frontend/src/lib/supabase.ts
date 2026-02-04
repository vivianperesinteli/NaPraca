import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = (import.meta.env.VITE_SUPABASE_URL as string)?.trim() ?? "";
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string)?.trim() ?? "";

const isConfigured = Boolean(url && anonKey && !url.includes("placeholder"));

if (!isConfigured) {
  console.warn(
    "Supabase: crie o arquivo .env na pasta frontend com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY (veja .env.example)"
  );
}

/** Só cria o cliente se URL e chave estiverem configurados no .env (evita 'failed to fetch') */
export const supabase: SupabaseClient | null = isConfigured
  ? createClient(url, anonKey)
  : null;

export const isSupabaseConfigured = isConfigured;
