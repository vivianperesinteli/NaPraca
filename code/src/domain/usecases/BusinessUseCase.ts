import { BusinessRepository, CreateBusinessData, UpdateBusinessData } from '@data/repositories/BusinessRepository'
import { BusinessModel } from '@data/models/BusinessModel'
import { Business } from '../entities/Business'

export class BusinessUseCase {
  constructor(private businessRepository: BusinessRepository) {}

  async getAllBusinesses(): Promise<Business[]> {
    const models = await this.businessRepository.getAll()
    return models.map(model => this.mapBusinessModelToEntity(model))
  }

  async getBusinessById(id: string): Promise<Business | null> {
    const model = await this.businessRepository.getById(id)
    if (!model) return null
    return this.mapBusinessModelToEntity(model)
  }

  async getBusinessesByEntrepreneur(entrepreneurId: string): Promise<Business[]> {
    const models = await this.businessRepository.getByEntrepreneurId(entrepreneurId)
    return models.map(model => this.mapBusinessModelToEntity(model))
  }

  async createBusiness(entrepreneurId: string, data: CreateBusinessData): Promise<Business> {
    const model = await this.businessRepository.create(entrepreneurId, data)
    return this.mapBusinessModelToEntity(model)
  }

  async searchBusinesses(query: string, category?: string): Promise<Business[]> {
    const models = await this.businessRepository.search(query, category)
    return models.map(model => this.mapBusinessModelToEntity(model))
  }

  async updateBusiness(id: string, data: UpdateBusinessData): Promise<Business> {
    const model = await this.businessRepository.update(id, data)
    return this.mapBusinessModelToEntity(model)
  }

  async deleteBusiness(id: string): Promise<void> {
    await this.businessRepository.delete(id)
  }

  private mapBusinessModelToEntity(model: BusinessModel): Business {
    return new Business(
      model.id,
      model.entrepreneur_id,
      model.name,
      model.description,
      model.category,
      model.address,
      model.latitude,
      model.longitude,
      model.phone,
      model.whatsapp,
      model.email,
      model.website,
      model.logo_url,
      model.cover_image_url,
      model.is_active,
    )
  }
}

