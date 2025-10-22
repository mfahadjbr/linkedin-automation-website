"use client"

import { useCallback, useReducer } from 'react'
import { useAuthContext } from '@/lib/hooks/auth/AuthContext'
import { uploadReducer, initialUploadState } from './Reducers/uploadReducer'
import type { TextPostPayload, TextPostResponse, Visibility } from './types/uploadTypes'
import { DEBUG_LOGS } from '@/lib/config/appConfig'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://backend.postsiva.com/'

export default function useUpload() {
  const { fetchWithAuth } = useAuthContext()
  const [state, dispatch] = useReducer(uploadReducer, initialUploadState)

  const createTextPost = useCallback(async (payload: TextPostPayload) => {
    if (DEBUG_LOGS) console.log('📝 [Upload] Starting createTextPost', { visibility: payload.visibility, textLength: payload.text?.length })
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: null })
    dispatch({ type: 'SET_SUCCESS', payload: null })
    dispatch({ type: 'SET_POST', payload: null })

    try {
      const body = {
        text: payload.text,
        visibility: payload.visibility || 'PUBLIC',
      }
      if (DEBUG_LOGS) console.log('📤 [Upload] Sending POST body', { ...body, text: body.text?.slice(0, 60) + (body.text && body.text.length > 60 ? '…' : '') })
      const url = `${API_BASE}linkedin/text-post/`
      if (DEBUG_LOGS) console.log('🌐 [Upload] Request URL:', url)
      const res = await fetchWithAuth(url, { method: 'POST', data: body })
      const data = res.data as TextPostResponse
      if (DEBUG_LOGS) console.log('✅ [Upload] Response received', { success: data?.success, message: data?.message, postId: data?.post?.post_id })

      if (!data?.success) {
        const msg = data?.message || data?.error || 'Failed to create post'
        if (DEBUG_LOGS) console.warn('⚠️ [Upload] Post creation failed', { msg, error: data?.error })
        dispatch({ type: 'SET_ERROR', payload: msg })
        return data
      }

      dispatch({ type: 'SET_POST', payload: data.post || null })
      dispatch({ type: 'SET_SUCCESS', payload: data.message || 'Post created successfully' })
      return data
    } catch (err: any) {
      const message = err?.message || 'Failed to create post'
      if (DEBUG_LOGS) console.error('❌ [Upload] Exception during createTextPost', { message, err })
      dispatch({ type: 'SET_ERROR', payload: message })
      throw err
    } finally {
      if (DEBUG_LOGS) console.log('🔚 [Upload] Finished createTextPost')
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [fetchWithAuth])

  const resetUpload = useCallback(() => dispatch({ type: 'RESET' }), [])

  const createImagePost = useCallback(async ({ file, imageUrl, text, visibility }: { file?: File, imageUrl?: string, text?: string, visibility?: Visibility }) => {
    if (DEBUG_LOGS) console.log('🖼️ [Upload] Starting createImagePost', { hasFile: !!file, hasUrl: !!imageUrl, textLen: text?.length, visibility })
    if (!file && !imageUrl) {
      const msg = 'Provide either an image file or an image URL'
      if (DEBUG_LOGS) console.warn('⚠️ [Upload] ' + msg)
      dispatch({ type: 'SET_ERROR', payload: msg })
      return { success: false, message: msg, post: null, error: msg }
    }

    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: null })
    dispatch({ type: 'SET_SUCCESS', payload: null })
    dispatch({ type: 'SET_POST', payload: null })

    try {
      const form = new FormData()
      if (file) form.append('image', file)
      if (imageUrl) form.append('image_url', imageUrl)
      if (text) form.append('text', text)
      form.append('visibility', visibility || 'PUBLIC')

      const url = `${API_BASE}linkedin/image-post/`
      if (DEBUG_LOGS) console.log('🌐 [Upload] Request URL:', url)
      const res = await fetchWithAuth(url, { method: 'POST', data: form })
      const data = res.data as any
      if (DEBUG_LOGS) console.log('✅ [Upload] Image post response', { success: data?.success, message: data?.message, postId: data?.post?.post_id, imageUrn: data?.post?.image_urn })

      if (!data?.success) {
        const msg = data?.message || data?.error || 'Failed to create image post'
        dispatch({ type: 'SET_ERROR', payload: msg })
        return data
      }

      dispatch({ type: 'SET_POST', payload: data.post || null })
      dispatch({ type: 'SET_SUCCESS', payload: data.message || 'Image post created successfully' })
      return data
    } catch (err: any) {
      const message = err?.message || 'Failed to create image post'
      if (DEBUG_LOGS) console.error('❌ [Upload] Exception during createImagePost', { message, err })
      dispatch({ type: 'SET_ERROR', payload: message })
      throw err
    } finally {
      if (DEBUG_LOGS) console.log('🔚 [Upload] Finished createImagePost')
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [fetchWithAuth])

  return {
    ...state,
    createTextPost,
    createImagePost,
    resetUpload,
  }
}
