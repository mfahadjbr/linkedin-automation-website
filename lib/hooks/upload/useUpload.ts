"use client"

import { useCallback, useReducer } from 'react'
import { useAuthContext } from '@/lib/hooks/auth/AuthContext'
import { uploadReducer, initialUploadState } from './Reducers/uploadReducer'
import type { TextPostPayload, TextPostResponse, Visibility, MultiImagePostResponse, VideoPostPayload, VideoPostResponse } from './types/uploadTypes'
import { DEBUG_LOGS } from '@/lib/config/appConfig'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://backend.postsiva.com/'

export default function useUpload() {
  const { fetchWithAuth } = useAuthContext()
  const [state, dispatch] = useReducer(uploadReducer, initialUploadState)

  const createVideoPost = useCallback(async (payload: VideoPostPayload) => {
    if (DEBUG_LOGS) console.log('🎬 [Upload] Starting createVideoPost', {
      hasFile: !!payload.video,
      hasUrl: !!payload.video_url,
      titleLen: payload.title?.length,
      textLen: payload.text?.length,
      visibility: payload.visibility
    })
    if (!payload.video && !payload.video_url) {
      const msg = 'Provide either a video file or a video URL'
      if (DEBUG_LOGS) console.warn('⚠️ [Upload] ' + msg)
      dispatch({ type: 'SET_ERROR', payload: msg })
      return { success: false, message: msg, post: null, error: msg } as VideoPostResponse
    }

    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: null })
    dispatch({ type: 'SET_SUCCESS', payload: null })
    dispatch({ type: 'SET_POST', payload: null })

    try {
      const form = new FormData()
      if (payload.video) form.append('video', payload.video)
      if (payload.video_url) form.append('video_url', payload.video_url)
      if (payload.title) form.append('title', payload.title)
      if (payload.text) form.append('text', payload.text)
      form.append('visibility', payload.visibility || 'PUBLIC')

      const url = `${API_BASE}linkedin/video-post/`
      if (DEBUG_LOGS) console.log('🌐 [Upload] Request URL:', url)
      const res = await fetchWithAuth(url, { method: 'POST', data: form })
      const data = res.data as VideoPostResponse
      if (DEBUG_LOGS) console.log('✅ [Upload] Video post response', {
        success: data?.success,
        message: data?.message,
        postId: data?.post?.post_id,
        videoUrn: data?.post?.video_urn,
        status: data?.post?.status
      })

      if (!data?.success) {
        const msg = data?.message || data?.error || 'Failed to create video post'
        dispatch({ type: 'SET_ERROR', payload: msg })
        return data
      }

      dispatch({ type: 'SET_POST', payload: data.post || null })
      dispatch({ type: 'SET_SUCCESS', payload: data.message || 'Video post created successfully' })
      return data
    } catch (err: any) {
      const message = err?.message || 'Failed to create video post'
      if (DEBUG_LOGS) console.error('❌ [Upload] Exception during createVideoPost', { message, err })
      dispatch({ type: 'SET_ERROR', payload: message })
      throw err

    } finally {
      if (DEBUG_LOGS) console.log('🔚 [Upload] Finished createVideoPost')
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [fetchWithAuth])


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

  const createMultiImagePost = useCallback(async ({ files, imageUrls, text, visibility }: { files?: File[]; imageUrls?: string[]; text?: string; visibility?: Visibility }) => {
    const fileCount = files?.length || 0
    const urlCount = imageUrls?.filter(Boolean).length || 0
    const total = fileCount + urlCount
    if (DEBUG_LOGS) console.log('🖼️🖼️ [Upload] Starting createMultiImagePost', { fileCount, urlCount, total, visibility })

    if (total < 2) {
      const msg = 'Please provide at least 2 images (files, URLs, or both)'
      if (DEBUG_LOGS) console.warn('⚠️ [Upload] ' + msg)
      dispatch({ type: 'SET_ERROR', payload: msg })
      return { success: false, message: msg, post: null, error: msg } as MultiImagePostResponse
    }
    if (total > 20) {
      const msg = 'You can upload at most 20 images'
      if (DEBUG_LOGS) console.warn('⚠️ [Upload] ' + msg)
      dispatch({ type: 'SET_ERROR', payload: msg })
      return { success: false, message: msg, post: null, error: msg } as MultiImagePostResponse
    }

    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: null })
    dispatch({ type: 'SET_SUCCESS', payload: null })
    dispatch({ type: 'SET_POST', payload: null })

    try {
      const form = new FormData()
      files?.forEach((f) => form.append('images', f))
      if (urlCount > 0) form.append('image_urls', imageUrls!.filter(Boolean).join(','))
      if (text) form.append('text', text)
      form.append('visibility', visibility || 'PUBLIC')

      const url = `${API_BASE}linkedin/image-post/multi/`
      if (DEBUG_LOGS) console.log('🌐 [Upload] Request URL:', url, 'payload', { files: fileCount, urls: urlCount })
      const res = await fetchWithAuth(url, { method: 'POST', data: form })
      const data = res.data as MultiImagePostResponse
      if (DEBUG_LOGS) console.log('✅ [Upload] Multi image response', { success: data?.success, message: data?.message, count: data?.post?.image_count, postId: data?.post?.post_id })

      if (!data?.success) {
        const msg = data?.message || data?.error || 'Failed to create multi-image post'
        dispatch({ type: 'SET_ERROR', payload: msg })
        return data
      }

      dispatch({ type: 'SET_POST', payload: data.post || null })
      dispatch({ type: 'SET_SUCCESS', payload: data.message || 'Carousel post created successfully' })
      return data
    } catch (err: any) {
      const message = err?.message || 'Failed to create multi-image post'
      if (DEBUG_LOGS) console.error('❌ [Upload] Exception during createMultiImagePost', { message, err })
      dispatch({ type: 'SET_ERROR', payload: message })
      throw err
    } finally {
      if (DEBUG_LOGS) console.log('🔚 [Upload] Finished createMultiImagePost')
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [fetchWithAuth])

  return {
    ...state,
    createTextPost,
    createImagePost,
    createMultiImagePost,
    createVideoPost,
    resetUpload,
  }
}
