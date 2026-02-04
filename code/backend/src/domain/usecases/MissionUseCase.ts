import type { MissionRepository, CreateMissionData } from '../../data/repositories/MissionRepository'
import type { MissionModel } from '../../data/models/MissionModel'
import type { Mission } from '../entities/Mission'

export class MissionUseCase {
  constructor(private missionRepository: MissionRepository) {}

  async getMissionById(missionId: string): Promise<Mission | null> {
    const model = await this.missionRepository.getById(missionId)
    if (!model) return null
    return this.mapMissionModelToEntity(model)
  }

  async getNextIncompleteMission(entrepreneurId: string): Promise<Mission | null> {
    const model = await this.missionRepository.getNextIncomplete(entrepreneurId)
    if (!model) return null
    return this.mapMissionModelToEntity(model)
  }

  async getMissionsByEntrepreneur(entrepreneurId: string): Promise<Mission[]> {
    const models = await this.missionRepository.getByEntrepreneurId(entrepreneurId)
    return models.map(model => this.mapMissionModelToEntity(model))
  }

  async createMission(entrepreneurId: string, data: CreateMissionData): Promise<Mission> {
    const model = await this.missionRepository.create(entrepreneurId, data)
    return this.mapMissionModelToEntity(model)
  }

  async completeMission(missionId: string): Promise<Mission> {
    const model = await this.missionRepository.complete(missionId)
    return this.mapMissionModelToEntity(model)
  }

  private mapMissionModelToEntity(model: MissionModel): Mission {
    return new Mission(
      model.id,
      model.entrepreneur_id,
      model.title,
      model.description,
      model.mission_type,
      model.points,
      model.is_completed,
      model.business_id,
      model.completed_at ? new Date(model.completed_at) : undefined,
    )
  }
}
