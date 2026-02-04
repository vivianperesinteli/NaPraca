/**
 * API de dados: usa repositórios do backend com o cliente Supabase do frontend.
 * Todas as funções respeitam a conta logada (profile_id / entrepreneur_id).
 */
import { supabase } from "@/lib/supabase";
import { BusinessRepository } from "@backend/data/repositories/BusinessRepository";
import { MissionRepository } from "@backend/data/repositories/MissionRepository";
import { AnalyticsRepository } from "@backend/data/repositories/AnalyticsRepository";
import { MissionUseCase } from "@backend/domain/usecases/MissionUseCase";
import type { Mission } from "@backend/domain/entities/Mission";
import type { BusinessModel } from "@backend/data/models/BusinessModel";
import type { BusinessEventCounts } from "@backend/data/repositories/AnalyticsRepository";

const businessRepo = supabase ? new BusinessRepository(supabase) : null;
const missionRepo = supabase ? new MissionRepository(supabase) : null;
const analyticsRepo = supabase ? new AnalyticsRepository(supabase) : null;
const missionUseCase = missionRepo ? new MissionUseCase(missionRepo) : null;

// --- Empreendedor

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
): Promise<BusinessModel | null> {
  if (!businessRepo) return null;
  try {
    return await businessRepo.create(entrepreneurId, data);
  } catch {
    return null;
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
): Promise<BusinessModel | null> {
  if (!businessRepo) return null;
  try {
    return await businessRepo.update(id, data);
  } catch {
    return null;
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
