export type MissionType = 'learning' | 'marketing' | 'sales' | 'management'

export class Mission {
  constructor(
    public readonly id: string,
    public readonly entrepreneurId: string,
    public readonly title: string,
    public readonly description: string,
    public readonly missionType: MissionType,
    public readonly points: number,
    public readonly isCompleted: boolean,
    public readonly businessId?: string,
    public readonly completedAt?: Date,
  ) {}
}

