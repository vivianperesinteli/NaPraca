import { AuthUseCase } from '@domain/usecases/AuthUseCase'
import { SignUpData, SignInData } from '@data/repositories/AuthRepository'

export class AuthViewModel {
  constructor(private authUseCase: AuthUseCase) {}

  async signUp(data: SignUpData) {
    try {
      const result = await this.authUseCase.signUp(data)
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async signIn(data: SignInData) {
    try {
      const result = await this.authUseCase.signIn(data)
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async signOut() {
    try {
      await this.authUseCase.signOut()
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async getCurrentProfile() {
    try {
      const profile = await this.authUseCase.getCurrentProfile()
      return { success: true, data: profile }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async getCurrentProfileId() {
    try {
      const profileId = await this.authUseCase.getCurrentProfileId()
      return { success: true, data: profileId }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

