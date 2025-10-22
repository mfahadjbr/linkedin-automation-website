import { AnalyticsAction, AnalyticsState } from "../types/analyticsTypes"

export const initialAnalyticsState: AnalyticsState = {
  isLoading: false,
  error: null,
  data: null,
  source: null,
  lastUpdated: null,
}

export function analyticsReducer(state: AnalyticsState, action: AnalyticsAction): AnalyticsState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload.data,
        source: action.payload.source,
        lastUpdated: action.payload.lastUpdated,
        error: null,
        isLoading: false,
      }
    case 'RESET':
      return { ...initialAnalyticsState }
    default:
      return state
  }
}
