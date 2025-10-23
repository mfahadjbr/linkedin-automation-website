"use client"

import { useState, useEffect } from "react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import useLinkedinAuth from "@/lib/hooks/auth/linkdin/useLinkedinAuth"
import Link from "next/link"
import AuthGuard from "@/lib/hooks/auth/AuthGuard"
import { useAuthContext } from "@/lib/hooks/auth/AuthContext"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export default function ConnectLinkedInPage() {
  const { initiateLinkedinConnect, hasLinkedinToken, isLoading, error, success, authUrl } = useLinkedinAuth()
  const [clicked, setClicked] = useState(false)
  const { logout } = useAuthContext()
  const router = useRouter()
  const [checkingToken, setCheckingToken] = useState(false)
  const [connected, setConnected] = useState(false)
  const [checkingInitialToken, setCheckingInitialToken] = useState(true)
  // On mount, check if LinkedIn token is present
  useEffect(() => {
    let ignore = false
    const check = async () => {
      try {
        const hasToken = await hasLinkedinToken()
        if (!ignore) {
          setConnected(!!hasToken)
        }
      } finally {
        if (!ignore) setCheckingInitialToken(false)
      }
    }
    check()
    return () => { ignore = true }
  }, [hasLinkedinToken])

  // Store popup reference
  const popupRef = useRef<Window | null>(null)

  // Patch initiateLinkedinConnect to store popup
  const onConnect = async () => {
    setClicked(true)
    try {
      // Patch: get authUrl and open popup manually
      const token = localStorage.getItem('auth_token')
      if (!token) throw new Error('You must be logged in to connect LinkedIn')
      const res = await fetch('https://backend.postsiva.com/linkedin/create-token', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (!data.success || !data.data?.auth_url) throw new Error(data.message || 'Failed to get LinkedIn auth URL')
      const authUrl = data.data.auth_url
      const popupWidth = 640
      const popupHeight = 780
      const left = Math.max(0, (window.screenX || window.screenLeft || 0) + (window.outerWidth - popupWidth) / 2)
      const top = Math.max(0, (window.screenY || window.screenTop || 0) + (window.outerHeight - popupHeight) / 2)
      const features = `popup=yes,toolbar=no,menubar=no,location=yes,status=no,scrollbars=yes,resizable=yes,width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
      const popup = window.open(authUrl, 'linkedin_oauth_popup', features)
      popupRef.current = popup
      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        window.location.href = authUrl
      } else {
        try { popup.focus() } catch {}
      }
    } catch {
      // error is already set by the hook
    } finally {
      // keep clicked true to preserve UI until user acts
    }
  }

  // Listen for popup message and redirect immediately
  useEffect(() => {
    if (!success || !clicked) return

    let timeoutId: NodeJS.Timeout
    const handleMessage = async (event: MessageEvent) => {
      if (event.data && event.data.type === 'LINKEDIN_CONNECT' && event.data.status === 'success') {
        setCheckingToken(false)
        // Re-check for token to ensure state is up to date
        const hasToken = await hasLinkedinToken()
        setConnected(!!hasToken)
      }
      if (event.data && event.data.type === 'LINKEDIN_CONNECT' && event.data.status === 'error') {
        setCheckingToken(false)
        setConnected(false)
        setClicked(false)
      }
    }
    window.addEventListener('message', handleMessage)
    // Fallback: if no message after 5 minutes, reset
    timeoutId = setTimeout(() => {
      setClicked(false)
      setConnected(false)
      window.removeEventListener('message', handleMessage)
    }, 300000)
    return () => {
      window.removeEventListener('message', handleMessage)
      clearTimeout(timeoutId)
    }
  }, [success, clicked])

  const handleLogout = () => {
    const redirect = logout('/login')
    router.replace(redirect)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen w-full flex items-center justify-center px-4">
        <div className="w-full max-w-2xl rounded-2xl border bg-card p-5 md:p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold">Connect LinkedIn</h1>
            <Button variant="outline" size="sm" onClick={handleLogout} className="cursor-pointer">
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
          <p className="text-muted-foreground mt-1">Authorize this app to access your LinkedIn account for posting and analytics.</p>

          {checkingInitialToken ? (
            <div className="mt-8 flex flex-col items-center justify-center">
              <Spinner size="lg" />
            </div>
          ) : connected ? (
            <div className="mt-8 flex flex-col items-center justify-center">
              <Alert className="mb-6 border-green-200 bg-green-50 max-w-md">
                <AlertTitle className="text-green-900">LinkedIn Connected!</AlertTitle>
                <AlertDescription className="text-green-800">
                  Your LinkedIn account is now connected.<br />
                  You can now access your dashboard and start using all features.
                </AlertDescription>
              </Alert>
              <Button
                className="h-11 w-full max-w-xs text-base font-semibold bg-[#004d9a] hover:bg-[#0a58ad] text-white"
                onClick={() => router.push('/dashboard')}
              >
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <>
              <div className="mt-6 flex items-center gap-3">
                <Button
                  onClick={onConnect}
                  disabled={isLoading || checkingToken}
                  className={`h-10 md:h-11 ${(isLoading || checkingToken) ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <Spinner size="sm" />
                      <span>Opening LinkedIn…</span>
                    </span>
                  ) : checkingToken ? (
                    <span className="inline-flex items-center gap-2">
                      <Spinner size="sm" />
                      <span>Completing connection…</span>
                    </span>
                  ) : (
                    "Connect with LinkedIn"
                  )}
                </Button>
                {success && authUrl && (
                  <Link href={authUrl} className="text-sm underline" target="_blank" rel="noopener noreferrer">
                    Popup blocked? Continue here
                  </Link>
                )}
              </div>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Connection failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && !checkingToken && (
                <Alert className="mt-4">
                  <AlertTitle>Check the LinkedIn window</AlertTitle>
                  <AlertDescription>
                    We opened a secure LinkedIn window for you to authorize this app. If nothing happened, your browser may
                    have blocked popups — use the link above to continue.
                  </AlertDescription>
                </Alert>
              )}

              {checkingToken && (
                <Alert className="mt-4 border-green-200 bg-green-50">
                  <AlertTitle className="text-green-900">Almost there!</AlertTitle>
                  <AlertDescription className="text-green-800">
                    Completing your LinkedIn connection...
                  </AlertDescription>
                </Alert>
              )}
              <div className="mt-4 text-sm text-gray-600 text-center">
                After connecting your account, please <b>refresh this page</b> to see the connected status.
              </div>
            </>
          )}

          <div className="mt-6 text-xs text-muted-foreground">
            By connecting, you agree to our terms and confirm you have permission to use this account for automation
            features.
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
