import { useCallback, useReducer } from 'react'
import { useAuthContext } from '@/lib/hooks/auth/AuthContext'
import { postsReducer, initialPostsState } from './Reducers/postsReducer'
import type { PostsState } from './Reducers/postsReducer'
import type { ImagePost, MultiImagePost, TextPost, PaginatedPosts } from './types/postsTypes'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://backend.postsiva.com/'

type PostType = 'image' | 'multi-image' | 'text'

export default function usePosts(postType: PostType, pageSize = 10) {
  const { fetchWithAuth } = useAuthContext()
  const [state, dispatch] = useReducer(postsReducer, { ...initialPostsState, pageSize })

  const fetchPosts = useCallback(async (page = 1) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: null })
    let url = ''
    if (postType === 'image') {
      url = `${API_BASE}linkedin/image-post/my-posts?limit=${state.pageSize}&offset=${(page-1)*state.pageSize}`
    } else if (postType === 'multi-image') {
      url = `${API_BASE}linkedin/image-post/my-multi-posts?limit=${state.pageSize}&offset=${(page-1)*state.pageSize}`
    } else if (postType === 'text') {
      url = `${API_BASE}linkedin/text-post/my-posts?limit=${state.pageSize}&offset=${(page-1)*state.pageSize}`
    }
    try {
      const res = await fetchWithAuth(url)
      const data = res.data as PaginatedPosts<ImagePost | MultiImagePost | TextPost>
      if (!data.success) throw new Error(data.error || 'Failed to fetch posts')
      dispatch({ type: 'SET_POSTS', payload: { posts: data.posts, total: data.total } })
      dispatch({ type: 'SET_PAGE', payload: page })
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err?.message || 'Failed to fetch posts' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [fetchWithAuth, postType, state.pageSize])

  const goToPage = (page: number) => {
    fetchPosts(page)
  }

  return {
    ...state,
    fetchPosts,
    goToPage,
  }
}
