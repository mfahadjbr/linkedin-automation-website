export interface AnalyticsCore {
  linkedin_user_id: string
  total_posts: number
  total_likes: number
  total_comments: number
  total_shares: number
  total_impressions: number
  total_clicks: number
  average_engagement_rate: number
  posts_last_30_days: number
  follower_count: number
  connection_count: number
  total_engagement: number
}

export interface AnalyticsResponse {
  success: boolean
  message: string
  analytics: AnalyticsCore
  source: string | null
  last_updated: string | null
  error: string | null
}

export interface AnalyticsState {
  isLoading: boolean
  error: string | null
  data: AnalyticsCore | null
  source: string | null
  lastUpdated: string | null
}

export type AnalyticsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_DATA'; payload: { data: AnalyticsCore; source: string | null; lastUpdated: string | null } }
  | { type: 'RESET' }
