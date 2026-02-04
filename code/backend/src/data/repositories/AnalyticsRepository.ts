import type { SupabaseClient } from '@supabase/supabase-js'

export type BusinessEventType = 'view' | 'click' | 'favorite'

export interface BusinessEventCounts {
  views: number
  clicks: number
  favorites: number
}

export class AnalyticsRepository {
  constructor(private supabase: SupabaseClient) {}

  async recordEvent(
    businessId: string,
    eventType: BusinessEventType,
    profileId?: string | null
  ): Promise<void> {
    const { error } = await this.supabase.from('business_events').insert({
      business_id: businessId,
      event_type: eventType,
      profile_id: profileId ?? null,
    })

    if (error) throw error
  }

  async getViewsToday(businessId: string): Promise<number> {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const { count, error } = await this.supabase
      .from('business_events')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', businessId)
      .eq('event_type', 'view')
      .gte('created_at', startOfDay.toISOString())

    if (error) throw error
    return count ?? 0
  }

  async getViewsCount(businessId: string, since?: Date): Promise<number> {
    let query = this.supabase
      .from('business_events')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', businessId)
      .eq('event_type', 'view')

    if (since) {
      query = query.gte('created_at', since.toISOString())
    }

    const { count, error } = await query

    if (error) throw error
    return count ?? 0
  }

  /** Soma de views hoje para todos os negócios do empreendedor (por business_ids) */
  async getViewsTodayForBusinesses(businessIds: string[]): Promise<number> {
    if (businessIds.length === 0) return 0
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const { count, error } = await this.supabase
      .from('business_events')
      .select('*', { count: 'exact', head: true })
      .in('business_id', businessIds)
      .eq('event_type', 'view')
      .gte('created_at', startOfDay.toISOString())

    if (error) throw error
    return count ?? 0
  }

  /** Total de views (período opcional) para um negócio */
  async getTotalViews(businessId: string, periodDays?: number): Promise<number> {
    let query = this.supabase
      .from('business_events')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', businessId)
      .eq('event_type', 'view')

    if (periodDays != null && periodDays > 0) {
      const since = new Date()
      since.setDate(since.getDate() - periodDays)
      query = query.gte('created_at', since.toISOString())
    }

    const { count, error } = await query
    if (error) throw error
    return count ?? 0
  }

  /** Contagens por tipo para um negócio em um período (ex: últimos 30 dias) */
  async getEventCounts(
    businessId: string,
    periodDays: number = 30
  ): Promise<BusinessEventCounts> {
    const since = new Date()
    since.setDate(since.getDate() - periodDays)

    const { data, error } = await this.supabase
      .from('business_events')
      .select('event_type')
      .eq('business_id', businessId)
      .gte('created_at', since.toISOString())

    if (error) throw error

    const counts: BusinessEventCounts = { views: 0, clicks: 0, favorites: 0 }
    for (const row of data ?? []) {
      if (row.event_type === 'view') counts.views += 1
      else if (row.event_type === 'click') counts.clicks += 1
      else if (row.event_type === 'favorite') counts.favorites += 1
    }
    return counts
  }

  /** Contagens agregadas para vários negócios (ex: todos do empreendedor) */
  async getEventCountsForBusinesses(
    businessIds: string[],
    periodDays: number = 30
  ): Promise<BusinessEventCounts> {
    if (businessIds.length === 0) {
      return { views: 0, clicks: 0, favorites: 0 }
    }

    const since = new Date()
    since.setDate(since.getDate() - periodDays)

    const { data, error } = await this.supabase
      .from('business_events')
      .select('event_type')
      .in('business_id', businessIds)
      .gte('created_at', since.toISOString())

    if (error) throw error

    const counts: BusinessEventCounts = { views: 0, clicks: 0, favorites: 0 }
    for (const row of data ?? []) {
      if (row.event_type === 'view') counts.views += 1
      else if (row.event_type === 'click') counts.clicks += 1
      else if (row.event_type === 'favorite') counts.favorites += 1
    }
    return counts
  }
}
