-- ============================================
-- Criar perfis para usuários que estão em auth.users
-- mas NÃO têm linha em public.profiles
-- Execute UMA VEZ no SQL Editor do Supabase (Dashboard → SQL Editor)
-- ============================================

INSERT INTO public.profiles (user_id, full_name, email, profile_type, phone)
SELECT
  u.id,
  COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1), 'Usuário'),
  COALESCE(u.email, ''),
  COALESCE(u.raw_user_meta_data->>'profile_type', 'consumer'),
  u.raw_user_meta_data->>'phone'
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.user_id = u.id
)
ON CONFLICT (user_id) DO NOTHING;

-- Se der erro "ON CONFLICT (user_id)" por não existir constraint única,
-- use só o INSERT e ignore o ON CONFLICT (ou rode o schema que cria profiles com user_id UNIQUE).
