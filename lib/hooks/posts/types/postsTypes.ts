export interface BasePost {
  post_id: string
  text?: string
  visibility: string
  post_url: string
  status: string
  posted_at: string
}

export interface ImagePost extends BasePost {
  image_urn?: string
  image_filename?: string
  image_size?: number
}

export interface MultiImageAsset {
  size: number
  source: string
  filename: string
  asset_urn: string
}

export interface MultiImagePost extends BasePost {
  image_count: number
  images: MultiImageAsset[]
  total_size: number
}

export interface TextPost extends BasePost {}

export interface VideoPost extends BasePost {
  video_urn?: string
  video_filename?: string
  video_size?: number
}

export interface PaginatedPosts<T> {
  success: boolean
  message: string
  posts: T[]
  total: number
  error: string | null
}
