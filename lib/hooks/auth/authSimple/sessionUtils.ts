// Session and user ID utilities for auth

import { STORAGE_KEYS } from './authConstants'

export function generateSessionId(): string {
  return (
    'sess_' +
    Math.random().toString(36).substr(2, 9) +
    '_' +
    Date.now().toString(36)
  )
}

export function setSessionId(sessionId: string) {
  localStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId)
}

export function removeSessionId() {
  localStorage.removeItem(STORAGE_KEYS.SESSION_ID)
}

export function setActiveUserId(userId: string) {
  localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, userId)
}

export function removeActiveUserId() {
  localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER_ID)
}

export function getSessionId(): string | null {
  return localStorage.getItem(STORAGE_KEYS.SESSION_ID)
}

export function getActiveUserId(): string | null {
  return localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID)
}

export function hasSessionConflict(): boolean {
  // Example: check if sessionId and activeUserId mismatch
  const sessionId = getSessionId()
  const userId = getActiveUserId()
  return !!sessionId && !userId
}

export function validateSession(): { valid: boolean; reason?: string } {
  // Example: session is valid if both sessionId and activeUserId exist
  const sessionId = getSessionId()
  const userId = getActiveUserId()
  if (!sessionId) return { valid: false, reason: 'No sessionId' }
  if (!userId) return { valid: false, reason: 'No activeUserId' }
  return { valid: true }
}
