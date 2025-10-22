"use client"

import { useCallback, useReducer } from 'react'
import { useAuthContext } from '@/lib/hooks/auth/AuthContext'
import { uploadReducer, initialUploadState } from './Reducers/uploadReducer'
import type { TextPostPayload, TextPostResponse } from './types/uploadTypes'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://backend.postsiva.com/'

export default function useUpload() {
  const { fetchWithAuth } = useAuthContext()
  const [state, dispatch] = useReducer(uploadReducer, initialUploadState)

  const createTextPost = useCallback(async (payload: TextPostPayload) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: null })
    dispatch({ type: 'SET_SUCCESS', payload: null })
    dispatch({ type: 'SET_POST', payload: null })

    try {
      const body = {
        text: payload.text,
        visibility: payload.visibility || 'PUBLIC',
      }
      const url = `${API_BASE}linkedin/text-post/`
      const res = await fetchWithAuth(url, { method: 'POST', data: body })
      const data = res.data as TextPostResponse

      if (!data?.success) {
        const msg = data?.message || data?.error || 'Failed to create post'
        dispatch({ type: 'SET_ERROR', payload: msg })
        return data
      }

      dispatch({ type: 'SET_POST', payload: data.post || null })
      dispatch({ type: 'SET_SUCCESS', payload: data.message || 'Post created successfully' })
      return data
    } catch (err: any) {
      const message = err?.message || 'Failed to create post'
      dispatch({ type: 'SET_ERROR', payload: message })
      throw err
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [fetchWithAuth])

  const resetUpload = useCallback(() => dispatch({ type: 'RESET' }), [])

  return {
    ...state,
    createTextPost,
    resetUpload,
  }
}
