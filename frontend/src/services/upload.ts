/**
 * Upload de imagens para Supabase Storage (bucket business-images).
 * Crie o bucket no Dashboard do Supabase: Storage → New bucket → nome "business-images", Public.
 * Depois execute o SQL em supabase-migration-storage-policies.sql para as políticas de acesso.
 */
import { supabase } from "@/lib/supabase";

const BUCKET = "business-images";
const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function getExtension(filename: string): string {
  const i = filename.lastIndexOf(".");
  return i >= 0 ? filename.slice(i) : ".jpg";
}

export async function uploadBusinessImage(
  file: File,
  businessId: string,
  folder: "catalog" | "posts"
): Promise<string | null> {
  if (!supabase) return null;

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`Imagem deve ter no máximo ${MAX_SIZE_MB} MB.`);
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Formato inválido. Use JPG, PNG, WebP ou GIF.");
  }

  const ext = getExtension(file.name);
  const path = `${businessId}/${folder}/${Date.now()}${ext}`;

  const { data, error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;
  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
  return urlData.publicUrl;
}
