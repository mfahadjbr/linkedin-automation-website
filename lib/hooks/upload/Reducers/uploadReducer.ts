import { UploadAction, UploadState } from "../types/uploadTypes"

export const initialUploadState: UploadState = {
  isLoading: false,
  error: null,
  successMessage: null,
  lastPost: null,
}

export function uploadReducer(state: UploadState, action: UploadAction): UploadState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_SUCCESS':
      return { ...state, successMessage: action.payload }
    case 'SET_POST':
      return { ...state, lastPost: action.payload }
    case 'RESET':
      return { ...initialUploadState }
    default:
      return state
  }
}
