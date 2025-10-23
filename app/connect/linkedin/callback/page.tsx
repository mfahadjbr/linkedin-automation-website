"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from "lucide-react"

export default function LinkedInCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing')
  const [message, setMessage] = useState('Processing LinkedIn authentication...')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check for error in URL params
        const error = searchParams.get('error')
        const errorDescription = searchParams.get('error_description')
        
        if (error) {
          setStatus('error')
          setMessage(errorDescription || 'LinkedIn authentication failed')
          // Notify parent and close after 2s
          setTimeout(() => {
            if (window.opener && !window.opener.closed) {
              window.opener.postMessage({ type: 'LINKEDIN_CONNECT', status: 'error' }, '*')
              setTimeout(() => window.close(), 2000)
            } else {
              setTimeout(() => router.replace('/connect/linkedin'), 2000)
            }
          }, 0)
          return
        }

        // Check for success (LinkedIn usually redirects after successful auth)
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        
        if (code) {
          setStatus('success')
          setMessage('LinkedIn connected successfully! Redirecting...')
          // Notify parent and close after 2s
          setTimeout(() => {
            if (window.opener && !window.opener.closed) {
              window.opener.postMessage({ type: 'LINKEDIN_CONNECT', status: 'success' }, '*')
              setTimeout(() => window.close(), 2000)
            } else {
              setTimeout(() => { window.location.href = '/dashboard' }, 2000)
            }
          }, 0)
        } else {
          setStatus('success')
          setMessage('LinkedIn connected successfully! Redirecting...')
          setTimeout(() => {
            if (window.opener && !window.opener.closed) {
              window.opener.postMessage({ type: 'LINKEDIN_CONNECT', status: 'success' }, '*')
              setTimeout(() => window.close(), 2000)
            } else {
              setTimeout(() => { window.location.href = '/dashboard' }, 2000)
            }
          }, 0)
        }
      } catch (err) {
        console.error('Callback error:', err)
        setStatus('error')
        setMessage('An unexpected error occurred')
        
        setTimeout(() => {
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage({ type: 'LINKEDIN_CONNECT', status: 'error' }, '*')
            setTimeout(() => window.close(), 2000)
          } else {
            setTimeout(() => router.replace('/connect/linkedin'), 2000)
          }
        }, 0)
      }
    }

    handleCallback()
  }, [searchParams, router])

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-md">
        {status === 'processing' && (
          <div className="text-center">
            <Spinner size="lg" className="mx-auto mb-4" />
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Connecting LinkedIn
            </h1>
            <p className="text-gray-600">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-900">Success!</AlertTitle>
            <AlertDescription className="text-green-800">
              {message}
            </AlertDescription>
          </Alert>
        )}

        {status === 'error' && (
          <Alert variant="destructive">
            <XCircle className="h-5 w-5" />
            <AlertTitle>Connection Failed</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
