import { BusinessUseCase } from '@domain/usecases/BusinessUseCase'
import { Business } from '@domain/entities/Business'
import { CreateBusinessData, UpdateBusinessData } from '@data/repositories/BusinessRepository'

export class BusinessViewModel {
  constructor(private businessUseCase: BusinessUseCase) {}

  async loadAllBusinesses(): Promise<{ success: boolean; data?: Business[]; error?: string }> {
    try {
      const businesses = await this.businessUseCase.getAllBusinesses()
      return { success: true, data: businesses }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async loadBusinessById(id: string): Promise<{ success: boolean; data?: Business; error?: string }> {
    try {
      const business = await this.businessUseCase.getBusinessById(id)
      if (!business) {
        return { success: false, error: 'Business not found' }
      }
      return { success: true, data: business }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async searchBusinesses(query: string, category?: string): Promise<{ success: boolean; data?: Business[]; error?: string }> {
    try {
      const businesses = await this.businessUseCase.searchBusinesses(query, category)
      return { success: true, data: businesses }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async createBusiness(entrepreneurId: string, data: CreateBusinessData): Promise<{ success: boolean; data?: Business; error?: string }> {
    try {
      const business = await this.businessUseCase.createBusiness(entrepreneurId, data)
      return { success: true, data: business }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async loadBusinessesByEntrepreneur(entrepreneurId: string): Promise<{ success: boolean; data?: Business[]; error?: string }> {
    try {
      const businesses = await this.businessUseCase.getBusinessesByEntrepreneur(entrepreneurId)
      return { success: true, data: businesses }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async updateBusiness(id: string, data: UpdateBusinessData): Promise<{ success: boolean; data?: Business; error?: string }> {
    try {
      const business = await this.businessUseCase.updateBusiness(id, data)
      return { success: true, data: business }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async deleteBusiness(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      await this.businessUseCase.deleteBusiness(id)
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

