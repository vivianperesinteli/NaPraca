-- ============================================
-- NaPraça - Catálogo, publicações (feed) e avaliações
-- Execute no SQL Editor do Supabase após o schema principal e business_events
-- ============================================

-- 1. Catálogo do negócio (produtos/serviços) - editável pelo empreendedor
CREATE TABLE IF NOT EXISTS public.business_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12, 2) NOT NULL DEFAULT 0,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'Geral',
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_business_catalog_business_id ON public.business_catalog(business_id);
CREATE INDEX IF NOT EXISTS idx_business_catalog_position ON public.business_catalog(business_id, position);

CREATE TRIGGER update_business_catalog_updated_at
  BEFORE UPDATE ON public.business_catalog
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.business_catalog ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can manage own business catalog"
  ON public.business_catalog FOR ALL
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE entrepreneur_id = public.get_user_profile_id()
    )
  )
  WITH CHECK (
    business_id IN (
      SELECT id FROM public.businesses WHERE entrepreneur_id = public.get_user_profile_id()
    )
  );

-- Leitura pública do catálogo de negócios ativos
CREATE POLICY "Anyone can read catalog of active businesses"
  ON public.business_catalog FOR SELECT
  USING (
    business_id IN (SELECT id FROM public.businesses WHERE is_active = true)
  );

-- 2. Publicações no feed do negócio - editável pelo empreendedor
CREATE TABLE IF NOT EXISTS public.business_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  image_url TEXT,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_business_posts_business_id ON public.business_posts(business_id);
CREATE INDEX IF NOT EXISTS idx_business_posts_created_at ON public.business_posts(business_id, created_at DESC);

CREATE TRIGGER update_business_posts_updated_at
  BEFORE UPDATE ON public.business_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.business_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can manage own business posts"
  ON public.business_posts FOR ALL
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE entrepreneur_id = public.get_user_profile_id()
    )
  )
  WITH CHECK (
    business_id IN (
      SELECT id FROM public.businesses WHERE entrepreneur_id = public.get_user_profile_id()
    )
  );

CREATE POLICY "Anyone can read posts of active businesses"
  ON public.business_posts FOR SELECT
  USING (
    business_id IN (SELECT id FROM public.businesses WHERE is_active = true)
  );

-- 3. Avaliações - apenas consumidores criam; empreendedor só visualiza
CREATE TABLE IF NOT EXISTS public.business_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, profile_id)
);

CREATE INDEX IF NOT EXISTS idx_business_reviews_business_id ON public.business_reviews(business_id);
CREATE INDEX IF NOT EXISTS idx_business_reviews_created_at ON public.business_reviews(business_id, created_at DESC);

ALTER TABLE public.business_reviews ENABLE ROW LEVEL SECURITY;

-- Dono do negócio pode apenas ler avaliações do próprio negócio
CREATE POLICY "Owners can read own business reviews"
  ON public.business_reviews FOR SELECT
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE entrepreneur_id = public.get_user_profile_id()
    )
  );

-- Consumidores autenticados podem inserir/atualizar sua própria avaliação
CREATE POLICY "Consumers can insert own review"
  ON public.business_reviews FOR INSERT
  WITH CHECK (
    profile_id = public.get_user_profile_id()
    AND profile_id IN (SELECT id FROM public.profiles WHERE profile_type = 'consumer')
  );

CREATE POLICY "Consumers can update own review"
  ON public.business_reviews FOR UPDATE
  USING (profile_id = public.get_user_profile_id())
  WITH CHECK (profile_id = public.get_user_profile_id());

-- Qualquer um pode ler avaliações de negócios ativos (para exibir no perfil do negócio)
CREATE POLICY "Anyone can read reviews of active businesses"
  ON public.business_reviews FOR SELECT
  USING (
    business_id IN (SELECT id FROM public.businesses WHERE is_active = true)
  );
