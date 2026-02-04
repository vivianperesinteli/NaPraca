-- ============================================
-- Histórico do chat do Assistente do empreendedor
-- Execute no SQL Editor do Supabase: Dashboard → SQL Editor → New query → Cole e Run
-- ============================================

-- Tabela de mensagens do assistente (um registro por mensagem)
CREATE TABLE IF NOT EXISTS public.assistant_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assistant_messages_profile_created
  ON public.assistant_messages(profile_id, created_at);

COMMENT ON TABLE public.assistant_messages IS 'Histórico do chat do Assistente do empreendedor (tela /empreendedor/assistente)';

-- RLS
ALTER TABLE public.assistant_messages ENABLE ROW LEVEL SECURITY;

-- Só o dono do perfil vê e insere as próprias mensagens
CREATE POLICY "Users can read own assistant messages"
  ON public.assistant_messages FOR SELECT
  USING (profile_id = public.get_user_profile_id());

CREATE POLICY "Users can insert own assistant messages"
  ON public.assistant_messages FOR INSERT
  WITH CHECK (profile_id = public.get_user_profile_id());

CREATE POLICY "Users can delete own assistant messages"
  ON public.assistant_messages FOR DELETE
  USING (profile_id = public.get_user_profile_id());
