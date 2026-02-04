/**
 * API de dados: usa repositórios do backend com o cliente Supabase do frontend.
 * Todas as funções respeitam a conta logada (profile_id / entrepreneur_id).
 */
import { supabase } from "@/lib/supabase";
import { BusinessRepository } from "@backend/data/repositories/BusinessRepository";
import { MissionRepository } from "@backend/data/repositories/MissionRepository";
import { AnalyticsRepository } from "@backend/data/repositories/AnalyticsRepository";
import { CatalogRepository } from "@backend/data/repositories/CatalogRepository";
import { BusinessPostRepository } from "@backend/data/repositories/BusinessPostRepository";
import { BusinessReviewRepository } from "@backend/data/repositories/BusinessReviewRepository";
import { MissionUseCase } from "@backend/domain/usecases/MissionUseCase";
import type { Mission } from "@backend/domain/entities/Mission";
import type { BusinessModel } from "@backend/data/models/BusinessModel";
import type { CatalogItemModel } from "@backend/data/models/CatalogItemModel";
import type { BusinessPostModel } from "@backend/data/models/BusinessPostModel";
import type { BusinessReviewModel } from "@backend/data/models/BusinessReviewModel";
import type { BusinessEventCounts } from "@backend/data/repositories/AnalyticsRepository";

const businessRepo = supabase ? new BusinessRepository(supabase) : null;
const missionRepo = supabase ? new MissionRepository(supabase) : null;
const analyticsRepo = supabase ? new AnalyticsRepository(supabase) : null;
const catalogRepo = supabase ? new CatalogRepository(supabase) : null;
const businessPostRepo = supabase ? new BusinessPostRepository(supabase) : null;
const businessReviewRepo = supabase ? new BusinessReviewRepository(supabase) : null;
const missionUseCase = missionRepo ? new MissionUseCase(missionRepo) : null;

// --- Empreendedor

/** Garante que o usuário logado tenha perfil no banco; retorna o id do perfil (ou null). */
export async function ensureMyProfileId(): Promise<string | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.rpc("ensure_my_profile");
    if (error) throw error;
    return typeof data === "string" ? data : null;
  } catch {
    return null;
  }
}

export async function getBusinessesByEntrepreneur(
  entrepreneurId: string
): Promise<BusinessModel[]> {
  if (!businessRepo) return [];
  return businessRepo.getByEntrepreneurId(entrepreneurId);
}

export async function createBusiness(
  entrepreneurId: string,
  data: {
    name: string;
    description: string;
    category: string;
    address: string;
    latitude: number;
    longitude: number;
    phone?: string;
    whatsapp?: string;
    email?: string;
    website?: string;
  }
): Promise<{ data: BusinessModel | null; error: string | null }> {
  if (!businessRepo) return { data: null, error: "Conexão não configurada." };
  try {
    const business = await businessRepo.create(entrepreneurId, data);
    return { data: business, error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erro ao cadastrar negócio.";
    return { data: null, error: msg };
  }
}

export async function updateBusiness(
  id: string,
  data: Partial<{
    name: string;
    description: string;
    category: string;
    address: string;
    latitude: number;
    longitude: number;
    phone: string;
    whatsapp: string;
    email: string;
    website: string;
    is_active: boolean;
  }>
): Promise<{ data: BusinessModel | null; error: string | null }> {
  if (!businessRepo) return { data: null, error: "Conexão não configurada." };
  try {
    const business = await businessRepo.update(id, data);
    return { data: business, error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erro ao atualizar negócio.";
    return { data: null, error: msg };
  }
}

export async function getMissionsByEntrepreneur(
  entrepreneurId: string
): Promise<Mission[]> {
  if (!missionUseCase) return [];
  return missionUseCase.getMissionsByEntrepreneur(entrepreneurId);
}

export async function getMissionById(missionId: string): Promise<Mission | null> {
  if (!missionUseCase) return null;
  return missionUseCase.getMissionById(missionId);
}

export async function getNextIncompleteMission(
  entrepreneurId: string
): Promise<Mission | null> {
  if (!missionUseCase) return null;
  return missionUseCase.getNextIncompleteMission(entrepreneurId);
}

export async function completeMission(missionId: string): Promise<Mission | null> {
  if (!missionUseCase) return null;
  try {
    return await missionUseCase.completeMission(missionId);
  } catch {
    return null;
  }
}

export async function getViewsTodayForEntrepreneur(
  businessIds: string[]
): Promise<number> {
  if (!analyticsRepo || businessIds.length === 0) return 0;
  return analyticsRepo.getViewsTodayForBusinesses(businessIds);
}

export async function getEventCountsForEntrepreneur(
  businessIds: string[],
  periodDays: number = 30
): Promise<BusinessEventCounts> {
  if (!analyticsRepo || businessIds.length === 0) {
    return { views: 0, clicks: 0, favorites: 0 };
  }
  return analyticsRepo.getEventCountsForBusinesses(businessIds, periodDays);
}

// --- Catálogo do negócio (empreendedor)
export async function getCatalogByBusiness(businessId: string): Promise<CatalogItemModel[]> {
  if (!catalogRepo) return [];
  return catalogRepo.getByBusinessId(businessId);
}

export async function createCatalogItem(
  businessId: string,
  data: { name: string; description?: string; price: number; image_url?: string; category?: string; position?: number }
): Promise<{ data: CatalogItemModel | null; error: string | null }> {
  if (!catalogRepo) return { data: null, error: "Conexão não configurada." };
  try {
    const item = await catalogRepo.create(businessId, data);
    return { data: item, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : "Erro ao adicionar item." };
  }
}

export async function updateCatalogItem(
  id: string,
  data: Partial<{ name: string; description: string; price: number; image_url: string; category: string; position: number }>
): Promise<{ data: CatalogItemModel | null; error: string | null }> {
  if (!catalogRepo) return { data: null, error: "Conexão não configurada." };
  try {
    const item = await catalogRepo.update(id, data);
    return { data: item, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : "Erro ao atualizar item." };
  }
}

export async function deleteCatalogItem(id: string): Promise<{ error: string | null }> {
  if (!catalogRepo) return { error: "Conexão não configurada." };
  try {
    await catalogRepo.delete(id);
    return { error: null };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erro ao remover item." };
  }
}

// --- Publicações (feed) do negócio (empreendedor)
export async function getPostsByBusiness(businessId: string): Promise<BusinessPostModel[]> {
  if (!businessPostRepo) return [];
  return businessPostRepo.getByBusinessId(businessId);
}

export async function createBusinessPost(
  businessId: string,
  data: { text: string; image_url?: string }
): Promise<{ data: BusinessPostModel | null; error: string | null }> {
  if (!businessPostRepo) return { data: null, error: "Conexão não configurada." };
  try {
    const post = await businessPostRepo.create(businessId, data);
    return { data: post, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : "Erro ao publicar." };
  }
}

export async function updateBusinessPost(
  id: string,
  data: Partial<{ text: string; image_url: string }>
): Promise<{ data: BusinessPostModel | null; error: string | null }> {
  if (!businessPostRepo) return { data: null, error: "Conexão não configurada." };
  try {
    const post = await businessPostRepo.update(id, data);
    return { data: post, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : "Erro ao atualizar publicação." };
  }
}

export async function deleteBusinessPost(id: string): Promise<{ error: string | null }> {
  if (!businessPostRepo) return { error: "Conexão não configurada." };
  try {
    await businessPostRepo.delete(id);
    return { error: null };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erro ao remover publicação." };
  }
}

// --- Avaliações (somente leitura para empreendedor; consumidor pode criar/editar)
export async function getReviewsByBusiness(businessId: string): Promise<BusinessReviewModel[]> {
  if (!businessReviewRepo) return [];
  return businessReviewRepo.getByBusinessId(businessId);
}

export async function getReviewStatsByBusiness(
  businessId: string
): Promise<{ averageRating: number; count: number }> {
  if (!businessReviewRepo) return { averageRating: 0, count: 0 };
  return businessReviewRepo.getStats(businessId);
}

export async function upsertReview(
  businessId: string,
  profileId: string,
  data: { rating: number; text?: string }
): Promise<{ data: BusinessReviewModel | null; error: string | null }> {
  if (!businessReviewRepo) return { data: null, error: "Conexão não configurada." };
  try {
    const review = await businessReviewRepo.upsertForProfile(businessId, profileId, data);
    return { data: review, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : "Erro ao enviar avaliação." };
  }
}

// --- Consumidor / Público

export async function getAllBusinesses(): Promise<BusinessModel[]> {
  if (!businessRepo) return [];
  return businessRepo.getAll();
}

export async function getBusinessById(id: string): Promise<BusinessModel | null> {
  if (!businessRepo) return null;
  return businessRepo.getById(id);
}

export async function searchBusinesses(
  query: string,
  category?: string
): Promise<BusinessModel[]> {
  if (!businessRepo) return [];
  return businessRepo.search(query, category);
}

/** Registrar evento (ex: consumidor viu o perfil do negócio). */
export async function recordBusinessEvent(
  businessId: string,
  eventType: "view" | "click" | "favorite",
  profileId?: string | null
): Promise<void> {
  if (!analyticsRepo) return;
  try {
    await analyticsRepo.recordEvent(businessId, eventType, profileId);
  } catch {
    // ignore
  }
}
