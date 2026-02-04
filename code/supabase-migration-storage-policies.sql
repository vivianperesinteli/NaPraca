-- ============================================
-- NaPraça - Storage: políticas para upload de imagens
-- Antes de rodar: no Dashboard do Supabase, vá em Storage → New bucket →
--   Nome: business-images
--   Public: sim (para as imagens ficarem acessíveis por URL)
-- Depois execute este script no SQL Editor.
-- ============================================

-- Leitura pública (qualquer um pode ver as imagens do bucket)
CREATE POLICY "Public read business-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'business-images');

-- Usuários autenticados podem enviar imagens (catálogo e posts)
CREATE POLICY "Authenticated can upload business-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'business-images');

-- Opcional: permitir que o usuário atualize ou delete apenas seus arquivos
-- (por path prefix com auth.uid() se quiser restringir por pasta no futuro)
CREATE POLICY "Authenticated can update own business-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'business-images');

CREATE POLICY "Authenticated can delete own business-images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'business-images');
