import type { AuthRepository, SignUpData, SignInData } from '../../data/repositories/AuthRepository'
import type { ProfileModel } from '../../data/models/ProfileModel'
import type { Profile } from '../entities/Profile'

export class AuthUseCase {
  constructor(private authRepository: AuthRepository) {}

  async signUp(data: SignUpData) {
    const result = await this.authRepository.signUp(data)
    return {
      user: result.user,
      profile: result.profile ? this.mapProfileModelToEntity(result.profile) : null,
    }
  }

  async signIn(data: SignInData) {
    return await this.authRepository.signIn(data)
  }

  async signOut() {
    return await this.authRepository.signOut()
  }

  async getCurrentProfile(): Promise<Profile | null> {
    const profileModel = await this.authRepository.getCurrentProfile()
    if (!profileModel) return null
    return this.mapProfileModelToEntity(profileModel)
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

  private mapProfileModelToEntity(model: ProfileModel): Profile {
    return new Profile(
      model.id,
      model.user_id,
      model.full_name,
      model.email,
      model.profile_type,
      model.phone,
      model.avatar_url,
      model.points,
      model.level,
      model.neighborhood,
    )
  }
}
