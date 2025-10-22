export type Visibility = 'PUBLIC' | 'CONNECTIONS' | 'PRIVATE' | string

export interface TextPostPayload {
  text: string
  visibility?: Visibility
}

export interface CreatedPost {
  post_id: string
  text: string
  visibility: Visibility
  post_url: string
  posted_at: string
  image_urn?: string
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
