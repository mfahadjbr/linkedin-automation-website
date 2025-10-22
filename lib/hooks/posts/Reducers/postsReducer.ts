import type { PaginatedPosts, BasePost } from '../types/postsTypes'

export interface PostsState<T = BasePost> {
  isLoading: boolean
  error: string | null
  posts: T[]
  total: number
  page: number
  pageSize: number
}

export type PostsAction<T = BasePost> =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_POSTS'; payload: { posts: T[]; total: number } }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'RESET' }

export function postsReducer<T = BasePost>(state: PostsState<T>, action: PostsAction<T>): PostsState<T> {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'SET_POSTS':
      return { ...state, posts: action.payload.posts, total: action.payload.total, isLoading: false, error: null }
    case 'SET_PAGE':
      return { ...state, page: action.payload }
    case 'RESET':
      return { ...state, isLoading: false, error: null, posts: [], total: 0, page: 1 }
    default:
      return state
  }
}

export const initialPostsState: PostsState = {
  isLoading: false,
  error: null,
  posts: [],
  total: 0,
  page: 1,
  pageSize: 10,
}
