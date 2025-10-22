import { LinkedInAuthAction, LinkedInAuthState } from '../types/linkedinTypes'

export const initialLinkedInState: LinkedInAuthState = {
  isLoading: false,
  error: null,
  authUrl: null,
  success: false,
}

export function linkedinReducer(state: LinkedInAuthState, action: LinkedInAuthAction): LinkedInAuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_AUTH_URL':
      return { ...state, authUrl: action.payload }
    case 'SET_SUCCESS':
      return { ...state, success: action.payload }
    default:
      return state
  }
}
