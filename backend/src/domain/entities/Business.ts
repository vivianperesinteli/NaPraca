export class Business {
  constructor(
    public readonly id: string,
    public readonly entrepreneurId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly category: string,
    public readonly address: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly isActive: boolean,
    public readonly phone?: string,
    public readonly whatsapp?: string,
    public readonly email?: string,
    public readonly website?: string,
    public readonly logoUrl?: string,
    public readonly coverImageUrl?: string,
  ) {}
}
