"use client"

import { useCallback, useReducer } from 'react'
import { useAuthContext } from '@/lib/hooks/auth/AuthContext'
import { analyticsReducer, initialAnalyticsState } from './Reducers/analyticsReducer'
import type { AnalyticsResponse } from './types/analyticsTypes'

export default function useAnalytics() {
  const { fetchWithAuth } = useAuthContext()
  const [state, dispatch] = useReducer(analyticsReducer, initialAnalyticsState)

  const fetchAnalytics = useCallback(async (refresh: boolean = false) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: null })
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://backend.postsiva.com/'}linkedin/analytics/?refresh=${refresh ? 'true' : 'false'}`
      const res = await fetchWithAuth(url, { method: 'GET' })
      const data = res.data as AnalyticsResponse
      if (!data || data.success === false) {
        const msg = (data as any)?.message || 'Failed to fetch analytics'
        dispatch({ type: 'SET_ERROR', payload: msg })
        return
      }

      dispatch({
        type: 'SET_DATA',
        payload: {
          data: data.analytics,
          source: data.source || null,
          lastUpdated: data.last_updated || null,
        },
      })
    } catch (err: any) {
      const message = err?.message || 'Failed to fetch analytics'
      dispatch({ type: 'SET_ERROR', payload: message })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [fetchWithAuth])

  return {
    ...state,
    fetchAnalytics,
  }
}
