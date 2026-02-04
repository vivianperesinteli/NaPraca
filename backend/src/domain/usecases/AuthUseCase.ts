import type { AuthRepository, SignUpData, SignInData } from '../../data/repositories/AuthRepository'
import type { ProfileModel } from '../../data/models/ProfileModel'

export class AuthUseCase {
  constructor(private authRepository: AuthRepository) {}

  async signUp(data: SignUpData) {
    const result = await this.authRepository.signUp(data)
    return {
      user: result.user,
      profile: result.profile || null,
    }
  }

  async signIn(data: SignInData) {
    return await this.authRepository.signIn(data)
  }

  async signOut() {
    return await this.authRepository.signOut()
  }

  async getCurrentProfile(): Promise<ProfileModel | null> {
    return await this.authRepository.getCurrentProfile()
  }

  /** Cria o perfil no banco se não existir (a partir do user_metadata). */
  async ensureProfile(): Promise<ProfileModel | null> {
    return await this.authRepository.ensureProfileFromUser()
  }

  async getCurrentUser() {
    return await this.authRepository.getCurrentUser()
  }

  async getCurrentProfileId(): Promise<string | null> {
    return await this.authRepository.getCurrentProfileId()
  }

  onAuthStateChange(callback: (user: unknown) => void) {
    return this.authRepository.onAuthStateChange(callback)
  }
}
