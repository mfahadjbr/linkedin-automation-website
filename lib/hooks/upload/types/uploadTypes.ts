export interface VideoPostPayload {
  video?: File
  video_url?: string
  title?: string
  text?: string
  visibility?: Visibility
}

export interface VideoPostResponse {
  success: boolean
  message: string
  post: VideoPost | null
  error: string | null
}

export interface VideoPost {
  post_id: string
  post_url: string
  video_urn: string
  status: string // e.g. "processing"
  posted_at: string
  title?: string
  text?: string
  visibility: Visibility
}
export type Visibility = 'PUBLIC' | 'CONNECTIONS' | 'PRIVATE' | string

export interface TextPostPayload {
  text: string
  visibility?: Visibility
}

export interface CreatedPost {
  post_id: string
  text?: string
  visibility: Visibility
  post_url: string
  posted_at: string
  image_urn?: string
  image_count?: number
  total_size?: number
  images?: Array<{ image_urn?: string; source?: string; size?: number; index?: number }>
}

export interface MultiImagePostResponse {
  success: boolean
  message: string
  post: CreatedPost | null
  error: string | null
}

export interface TextPostResponse {
  success: boolean
  message: string
  post: CreatedPost | null
  error: string | null
}

export interface UploadState {
  isLoading: boolean
  error: string | null
  successMessage: string | null
  lastPost: CreatedPost | null
}

export type UploadAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SUCCESS'; payload: string | null }
  | { type: 'SET_POST'; payload: CreatedPost | null }
  | { type: 'RESET' }
