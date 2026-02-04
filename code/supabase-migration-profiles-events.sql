-- Migração: perfis (points, level, neighborhood) + business_events
-- Execute no SQL Editor se o projeto já tem profiles/businesses/missions criados.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS points INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS level TEXT NOT NULL DEFAULT 'Iniciante',
  ADD COLUMN IF NOT EXISTS neighborhood TEXT;

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

DROP POLICY IF EXISTS "Owners can read own business events" ON public.business_events;
CREATE POLICY "Owners can read own business events"
  ON public.business_events FOR SELECT
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE entrepreneur_id = public.get_user_profile_id()
    )
  );

DROP POLICY IF EXISTS "Authenticated can insert business events" ON public.business_events;
CREATE POLICY "Authenticated can insert business events"
  ON public.business_events FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
