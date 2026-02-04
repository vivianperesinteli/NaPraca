-- ============================================
-- Garantir perfil do usuário logado (cria se não existir)
-- Execute no SQL Editor do Supabase (Dashboard → SQL Editor → New query → Run)
-- ============================================

CREATE OR REPLACE FUNCTION public.ensure_my_profile()
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  pid UUID;
  uid UUID := auth.uid();
BEGIN
  IF uid IS NULL THEN
    RETURN NULL;
  END IF;

  SELECT id INTO pid FROM public.profiles WHERE user_id = uid LIMIT 1;
  IF pid IS NOT NULL THEN
    RETURN pid;
  END IF;

  INSERT INTO public.profiles (user_id, full_name, email, profile_type, phone)
  SELECT
    uid,
    COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1), 'Usuário'),
    COALESCE(u.email, ''),
    COALESCE(u.raw_user_meta_data->>'profile_type', 'consumer'),
    u.raw_user_meta_data->>'phone'
  FROM auth.users u
  WHERE u.id = uid
  RETURNING id INTO pid;

  RETURN pid;
END;
$$;

-- Permite o usuário autenticado chamar a função
GRANT EXECUTE ON FUNCTION public.ensure_my_profile() TO authenticated;
GRANT EXECUTE ON FUNCTION public.ensure_my_profile() TO anon;
