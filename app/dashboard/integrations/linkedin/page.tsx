"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import useLinkedinAuth from "@/lib/hooks/auth/linkdin/useLinkedinAuth"
import Link from "next/link"

export default function DashboardLinkedInConnectPage() {
  const { initiateLinkedinConnect, isLoading, error, success, authUrl } = useLinkedinAuth()
  const [clicked, setClicked] = useState(false)

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
    <div className="max-w-2xl mx-auto py-6 md:py-8">
      <div className="rounded-2xl border bg-card p-5 md:p-6 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-semibold">Connect LinkedIn</h1>
        <p className="text-muted-foreground mt-1">Authorize this app to access your LinkedIn account for posting and analytics.</p>

        <div className="mt-6 flex items-center gap-3">
          <Button
            onClick={onConnect}
            disabled={isLoading}
            className={`h-10 md:h-11 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <Spinner size="sm" />
                <span>Opening LinkedIn…</span>
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

        {success && (
          <Alert className="mt-4">
            <AlertTitle>Check the LinkedIn window</AlertTitle>
            <AlertDescription>
              We opened a secure LinkedIn window for you to authorize this app. If nothing happened, your browser may
              have blocked popups — use the link above to continue.
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-6 text-xs text-muted-foreground">
          By connecting, you agree to our terms and confirm you have permission to use this account for automation
          features.
        </div>
      </div>
    </div>
  )
}
