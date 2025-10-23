"use client"

import { useState, useEffect } from "react"
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

  // Poll for LinkedIn token when popup might be open
  useEffect(() => {
    if (!success || !clicked) return

    let intervalId: NodeJS.Timeout
    let timeoutId: NodeJS.Timeout
    let isChecking = false

    const checkToken = async () => {
      if (isChecking) return
      isChecking = true
      
      try {
        const hasToken = await hasLinkedinToken()
        if (hasToken) {
          setCheckingToken(true)
          clearInterval(intervalId)
          clearTimeout(timeoutId)
          // Give a brief moment to show success, then redirect
          setTimeout(() => {
            router.push('/dashboard')
          }, 500)
        }
      } catch (err) {
        console.error('Error checking LinkedIn token:', err)
      } finally {
        isChecking = false
      }
    }

    // Check immediately
    checkToken()

    // Then check every 2 seconds
    intervalId = setInterval(checkToken, 2000)

    // Stop checking after 5 minutes (user might have abandoned the flow)
    timeoutId = setTimeout(() => {
      clearInterval(intervalId)
      setClicked(false)
    }, 300000)

    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [success, clicked, hasLinkedinToken, router])

  const handleLogout = () => {
    const redirect = logout('/login')
    router.replace(redirect)
  }

  const onConnect = async () => {
    setClicked(true)
    try {
      await initiateLinkedinConnect()
    } catch {
      // error is already set by the hook
    } finally {
      // keep clicked true to preserve UI until user acts
    }
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

          <div className="mt-6 text-xs text-muted-foreground">
            By connecting, you agree to our terms and confirm you have permission to use this account for automation
            features.
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
