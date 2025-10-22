# Auth integration overview

This project includes a simple client-side authentication hook and context in `lib/hooks/auth`.

## Key pieces

- `lib/hooks/auth/useAuth.ts`: Core hook exposing `{ isAuthenticated, isLoading, user, token, login, logout, signup, fetchWithAuth }`.
- `lib/hooks/auth/AuthContext.tsx`: Provider and `useAuthContext()` to access auth state anywhere.
- `lib/hooks/auth/AuthGuard.tsx`: Client-side guard that redirects unauthenticated users to `/login`.
- `lib/hooks/auth/authSimple/*`: Internal modules (types, reducer, API, storage constants, session utils).

## App wiring

- Root provider added in `app/layout.tsx`:
  - Wraps the app in `<AuthProvider>`.
- Dashboard protection in `app/dashboard/layout.tsx`:
  - Wrapped with `<AuthGuard>`; uses `logout()` from context.
- Login page at `app/login/page.tsx`:
  - Uses `useAuth().login({ email, password })` and redirects to `/dashboard` on success.

## Backend API

- Base URL: `NEXT_PUBLIC_API_BASE_URL` (default `https://backend.postsiva.com/`).
- Endpoints expected:
  - `POST /auth/login` -> `{ access_token, token_type, user }`
  - `POST /auth/signup` -> `{ id, email, username, ... }`

## Storage and session

- LocalStorage keys configured in `authConstants.ts`.
- Session integrity best-effort via `sessionUtils.ts` (session id + active user id).

## Usage examples

```tsx
import { useAuthContext } from '@/lib/hooks/auth/AuthContext'

function ProfileButton() {
  const { user, logout } = useAuthContext()
  return (
    <button onClick={() => logout('/login')}>Logout {user?.username}</button>
  )
}
```

## Notes and next steps

- This is a client-side guard; for SSR/Edge protection use cookies and add `middleware.ts`.
- If your backend sets httpOnly cookies, adjust the hook to use cookie-based auth instead of localStorage.
- Add rate-limiting and error UI on login as needed.
