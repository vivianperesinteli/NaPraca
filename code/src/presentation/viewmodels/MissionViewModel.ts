import { MissionUseCase } from '@domain/usecases/MissionUseCase'
import { Mission } from '@domain/entities/Mission'
import { CreateMissionData } from '@data/repositories/MissionRepository'

export class MissionViewModel {
  constructor(private missionUseCase: MissionUseCase) {}

  async loadMissions(entrepreneurId: string): Promise<{ success: boolean; data?: Mission[]; error?: string }> {
    try {
      const missions = await this.missionUseCase.getMissionsByEntrepreneur(entrepreneurId)
      return { success: true, data: missions }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async createMission(entrepreneurId: string, data: CreateMissionData): Promise<{ success: boolean; data?: Mission; error?: string }> {
    try {
      const mission = await this.missionUseCase.createMission(entrepreneurId, data)
      return { success: true, data: mission }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async completeMission(missionId: string): Promise<{ success: boolean; data?: Mission; error?: string }> {
    try {
      const mission = await this.missionUseCase.completeMission(missionId)
      return { success: true, data: mission }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

