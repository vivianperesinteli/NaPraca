export type ProfileType = 'consumer' | 'entrepreneur'

export class Profile {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly fullName: string,
    public readonly email: string,
    public readonly profileType: ProfileType,
    public readonly phone?: string,
    public readonly avatarUrl?: string,
    public readonly points?: number,
    public readonly level?: string,
    public readonly neighborhood?: string,
  ) {}
}
