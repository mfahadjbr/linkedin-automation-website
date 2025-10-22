import { useEffect, useCallback, useReducer } from 'react'
import axios from 'axios'
import {
  generateSessionId,
  setSessionId,
  removeSessionId,
  setActiveUserId,
  removeActiveUserId,
  hasSessionConflict,
  validateSession,
  getSessionId,
  getActiveUserId
} from './authSimple/sessionUtils'

// Types now imported from ./authTypes

import { api } from './authSimple/authApi'
import { DEBUG_LOGS } from '@/lib/config/appConfig'
import { STORAGE_KEYS } from './authSimple/authConstants'
import type { User, AuthState, SignupData, LoginData, AuthResponse, SignupResponse } from './authSimple/types/authTypes'
import { authReducer, initialAuthState } from './authSimple/Reducers/authReducer'

export default function useAuth() {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState)

  // Initialize auth state from localStorage with session validation
  useEffect(() => {
    if (DEBUG_LOGS) console.log('🔄 Initializing auth state from localStorage...')
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    const user = localStorage.getItem(STORAGE_KEYS.USER_DATA)
    
    if (DEBUG_LOGS) console.log('📦 localStorage data:', { 
      token: token ? 'exists' : 'not found', 
      user: user ? 'exists' : 'not found',
      sessionId: getSessionId() ? 'exists' : 'not found',
      activeUserId: getActiveUserId() ? 'exists' : 'not found'
    })
    
    if (token && user) {
      try {
        const userData = JSON.parse(user)
        if (DEBUG_LOGS) console.log('👤 Parsed user data:', userData)

        // Validate session
        const sessionValidation = validateSession()

        if (!sessionValidation.valid) {
          console.warn('⚠️ Session validation failed:', sessionValidation.reason)
          console.warn('🔒 Forcing logout due to invalid session')
          logout()
          return
        }

        if (DEBUG_LOGS) console.log('✅ Session validation successful')
        dispatch({ type: 'INIT', payload: { user: userData, token } })
        if (DEBUG_LOGS) console.log('✅ Auth state initialized successfully')
      } catch (error) {
        if (DEBUG_LOGS) console.error('❌ Error parsing user data:', error)
        logout()
      }
    } else {
      if (DEBUG_LOGS) console.log('ℹ️ No auth data found, setting as unauthenticated')
      dispatch({ type: 'INIT', payload: { user: null, token: null } })
    }
  }, [])

  const signup = useCallback(async (data: SignupData): Promise<SignupResponse> => {
    if (DEBUG_LOGS) console.log('📝 Starting signup process with data:', { ...data, password: '[REDACTED]' })
    
    try {
      const requestData = {
        ...data,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      
      if (DEBUG_LOGS) console.log('📤 Sending signup request with data:', { ...requestData, password: '[REDACTED]' })
      
      const response = await api.post('/auth/signup', requestData)
      
      if (DEBUG_LOGS) console.log('✅ Signup successful:', response.data)
      
      // Save user ID to localStorage
      localStorage.setItem(STORAGE_KEYS.USER_ID, response.data.id)
      console.log('💾 Saved user ID to localStorage:', response.data.id)
      
      return response.data
    } catch (error: any) {
      if (DEBUG_LOGS) console.error('❌ Signup failed:', error)
      
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.detail || `Signup failed: ${error.response?.status}`
        if (DEBUG_LOGS) console.error('📋 Error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        })
        throw new Error(errorMessage)
      } else {
        throw new Error('Signup failed due to network error')
      }
    }
  }, [])

  const login = useCallback(async (data: LoginData): Promise<AuthResponse> => {
    if (DEBUG_LOGS) console.log('🔐 Starting login process with email:', data.email)
    // indicate loading to avoid AuthGuard redirect race during navigation
    dispatch({ type: 'SET_LOADING', payload: true })
    
    // Check if there's already an active session
    const existingToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    const existingUser = localStorage.getItem(STORAGE_KEYS.USER_DATA)
    
    if (existingToken && existingUser) {
      try {
        const existingUserData = JSON.parse(existingUser)
        
        // Check if trying to login with a different account
        if (existingUserData.email !== data.email) {
          console.warn('⚠️ Attempting to login with different account while already logged in')
          console.warn(`⚠️ Current user: ${existingUserData.email}, New login: ${data.email}`)
          
          // Force logout of existing session
          console.log('🔒 Forcing logout of existing session before new login')
          removeSessionId()
          removeActiveUserId()
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
          localStorage.removeItem(STORAGE_KEYS.USER_DATA)
          localStorage.removeItem(STORAGE_KEYS.USER_ID)
        }
      } catch (error) {
        console.error('❌ Error checking existing session:', error)
      }
    }
    
    try {
      if (DEBUG_LOGS) console.log('📤 Sending login request...')
      
      const response = await api.post('/auth/login', data)
      
      if (DEBUG_LOGS) console.log('✅ Login successful:', {
        token: response.data.access_token ? 'exists' : 'not found',
        user: response.data.user,
      })
      
      // Generate new session ID
      const newSessionId = generateSessionId()
      console.log('🆔 Generated new session ID:', newSessionId)
      
      // Save auth data to localStorage
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.access_token)
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user))
      
      // Save session data
      setSessionId(newSessionId)
      setActiveUserId(response.data.user.id)
      
      if (DEBUG_LOGS) console.log('💾 Saved auth data and session to localStorage')
      
  // Update auth state
  dispatch({ type: 'LOGIN_SUCCESS', payload: { user: response.data.user, token: response.data.access_token } })
      if (DEBUG_LOGS) console.log('🔄 Updated auth state to authenticated')

      // ...existing code...
      
      return response.data
    } catch (error: any) {
      if (DEBUG_LOGS) console.error('❌ Login failed:', error)
      
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        let errorMessage = 'Login failed. Please try again.'
        if (status === 401) errorMessage = 'Invalid email or password.'
        else if (status === 429) errorMessage = 'Too many attempts. Please wait and try again.'
        else if (status === 500) errorMessage = 'Server error during login. Please try again later.'
        else if (error.response?.data?.detail) errorMessage = String(error.response.data.detail)
        if (DEBUG_LOGS) console.error('📋 Error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        })
        dispatch({ type: 'SET_LOADING', payload: false })
        throw new Error(errorMessage)
      } else {
        dispatch({ type: 'SET_LOADING', payload: false })
        throw new Error('Network error. Please check your connection and try again.')
      }
    }
  }, [])

  const logout = useCallback((redirectPath: string = '/login') => {
    console.log('Starting logout process...')
    
    // Clear all storage items
    const itemsToRemove = [
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.SESSION_ID,
      STORAGE_KEYS.ACTIVE_USER_ID,
      'user_id',
    ]
    
    itemsToRemove.forEach(item => {
      localStorage.removeItem(item)
    })
    
    // ...existing code...
    
    console.log('✅ Cleared all session and auth data')
    
    // Reset auth state
    dispatch({ type: 'LOGOUT' })
    
    // Return the redirect path so the caller can handle navigation
    // This allows using Next.js router instead of window.location
    return redirectPath
  }, [])

  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      : {
          'Content-Type': 'application/json',
        }
    
    if (DEBUG_LOGS) console.log('🔑 Generated auth headers:', { hasToken: !!token, headers })
    return headers
  }, [])

  const fetchWithAuth = useCallback(async (url: string, options: any = {}) => {
    if (DEBUG_LOGS) console.log('🌐 Making authenticated request to:', url)
    
    const authHeaders = getAuthHeaders()
    
    try {
      const response = await axios({
        url,
        method: options.method || 'GET',
        data: options.body || options.data,
        headers: {
          ...authHeaders,
          ...options.headers,
        },
      })
      
      if (DEBUG_LOGS) console.log('✅ Authenticated request successful:', {
        status: response.status,
        url,
      })
      
      return response
    } catch (error: any) {
      if (DEBUG_LOGS) console.error('❌ Authenticated request failed:', error)
      
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (DEBUG_LOGS) console.log('🔒 Unauthorized response, logging out...')
        logout()
      }
      
      throw error
    }
  }, [getAuthHeaders, logout])

  // Log current auth state when it changes
  useEffect(() => {
    if (DEBUG_LOGS) {
      console.log('🔄 Auth state updated:', {
        isAuthenticated: authState.isAuthenticated,
        isLoading: authState.isLoading,
        hasUser: !!authState.user,
        hasToken: !!authState.token,
        user: authState.user ? { id: authState.user.id, email: authState.user.email, username: authState.user.username } : null,
      })
    }
  }, [authState])

  return {
    ...authState,
    signup,
    login,
    logout,
    getAuthHeaders,
    fetchWithAuth,
  }
}
