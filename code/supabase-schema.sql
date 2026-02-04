-- ============================================
-- NaPraça - Script completo para novo Supabase
-- Execute no SQL Editor do projeto: Dashboard → SQL Editor → New query → Cole e Run
-- ============================================

-- Extensão UUID (já existe no Supabase, mas não faz mal)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. TABELA profiles
-- ============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  profile_type TEXT NOT NULL CHECK (profile_type IN ('consumer', 'entrepreneur')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_profile_type ON public.profiles(profile_type);

-- ============================================
-- 2. TABELA businesses
-- ============================================
CREATE TABLE public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entrepreneur_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  website TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_businesses_entrepreneur_id ON public.businesses(entrepreneur_id);
CREATE INDEX idx_businesses_category ON public.businesses(category);
CREATE INDEX idx_businesses_is_active ON public.businesses(is_active);
CREATE INDEX idx_businesses_location ON public.businesses(latitude, longitude);

-- ============================================
-- 3. TABELA missions
-- ============================================
CREATE TABLE public.missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entrepreneur_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  mission_type TEXT NOT NULL CHECK (mission_type IN ('learning', 'marketing', 'sales', 'management')),
  points INTEGER NOT NULL DEFAULT 0,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_missions_entrepreneur_id ON public.missions(entrepreneur_id);
CREATE INDEX idx_missions_business_id ON public.missions(business_id);
CREATE INDEX idx_missions_is_completed ON public.missions(is_completed);
CREATE INDEX idx_missions_mission_type ON public.missions(mission_type);

-- ============================================
-- 4. FUNÇÃO updated_at + TRIGGERS
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_businesses_updated_at
  BEFORE UPDATE ON public.businesses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_missions_updated_at
  BEFORE UPDATE ON public.missions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 5. TRIGGER: criar perfil ao cadastrar usuário (auth.users)
-- O app envia full_name, profile_type, phone no signUp → user_metadata
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, profile_type, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'profile_type', 'consumer'),
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;

-- Helper: id do perfil do usuário logado
CREATE OR REPLACE FUNCTION public.get_user_profile_id()
RETURNS UUID AS $$
  SELECT id FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- Garantir perfil: cria na hora se não existir (para usuários antigos ou trigger que falhou)
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
  IF uid IS NULL THEN RETURN NULL; END IF;
  SELECT id INTO pid FROM public.profiles WHERE user_id = uid LIMIT 1;
  IF pid IS NOT NULL THEN RETURN pid; END IF;
  INSERT INTO public.profiles (user_id, full_name, email, profile_type, phone)
  SELECT
    uid,
    COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1), 'Usuário'),
    COALESCE(u.email, ''),
    COALESCE(u.raw_user_meta_data->>'profile_type', 'consumer'),
    u.raw_user_meta_data->>'phone'
  FROM auth.users u WHERE u.id = uid
  RETURNING id INTO pid;
  RETURN pid;
END;
$$;
GRANT EXECUTE ON FUNCTION public.ensure_my_profile() TO authenticated;

-- ---------- Políticas profiles ----------
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own profile"
  ON public.profiles FOR DELETE
  USING (auth.uid() = user_id);

-- ---------- Políticas businesses ----------
CREATE POLICY "Anyone can read active businesses"
  ON public.businesses FOR SELECT
  USING (is_active = true);

CREATE POLICY "Entrepreneurs can read own businesses"
  ON public.businesses FOR SELECT
  USING (entrepreneur_id = public.get_user_profile_id());

CREATE POLICY "Entrepreneurs can insert own businesses"
  ON public.businesses FOR INSERT
  WITH CHECK (entrepreneur_id = public.get_user_profile_id());

CREATE POLICY "Owners can update own businesses"
  ON public.businesses FOR UPDATE
  USING (entrepreneur_id = public.get_user_profile_id())
  WITH CHECK (entrepreneur_id = public.get_user_profile_id());

CREATE POLICY "Owners can delete own businesses"
  ON public.businesses FOR DELETE
  USING (entrepreneur_id = public.get_user_profile_id());

-- ---------- Políticas missions ----------
CREATE POLICY "Entrepreneurs can read own missions"
  ON public.missions FOR SELECT
  USING (entrepreneur_id = public.get_user_profile_id());

CREATE POLICY "Entrepreneurs can insert own missions"
  ON public.missions FOR INSERT
  WITH CHECK (entrepreneur_id = public.get_user_profile_id());

CREATE POLICY "Owners can update own missions"
  ON public.missions FOR UPDATE
  USING (entrepreneur_id = public.get_user_profile_id())
  WITH CHECK (entrepreneur_id = public.get_user_profile_id());

CREATE POLICY "Owners can delete own missions"
  ON public.missions FOR DELETE
  USING (entrepreneur_id = public.get_user_profile_id());

-- ============================================
-- 7. CAMPOS EXTRAS EM profiles (consumidor: pontos, nível, bairro)
-- ============================================
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS points INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS level TEXT NOT NULL DEFAULT 'Iniciante',
  ADD COLUMN IF NOT EXISTS neighborhood TEXT;

-- ============================================
-- 8. TABELA business_events (visualizações, cliques, favoritos)
-- ============================================
CREATE TABLE IF NOT EXISTS public.business_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('view', 'click', 'favorite')),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_business_events_business_id ON public.business_events(business_id);
CREATE INDEX IF NOT EXISTS idx_business_events_created_at ON public.business_events(created_at);
CREATE INDEX IF NOT EXISTS idx_business_events_business_created ON public.business_events(business_id, created_at);

ALTER TABLE public.business_events ENABLE ROW LEVEL SECURITY;

-- Donos do negócio podem ler eventos do próprio negócio
CREATE POLICY "Owners can read own business events"
  ON public.business_events FOR SELECT
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE entrepreneur_id = public.get_user_profile_id()
    )
  );

-- Qualquer um autenticado pode registrar evento (ex: consumidor viu o perfil do negócio)
CREATE POLICY "Authenticated can insert business events"
  ON public.business_events FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
