"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthContext } from "@/lib/hooks/auth/AuthContext"
import useLinkedinAuth from "@/lib/hooks/auth/linkdin/useLinkedinAuth"
import { useEffect } from "react"
import { Spinner } from "@/components/ui/spinner"

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading, isAuthenticated } = useAuthContext()
  const { hasLinkedinToken } = useLinkedinAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // If already authenticated, redirect away from /login
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      ;(async () => {
        const hasToken = await hasLinkedinToken()
        router.replace(hasToken ? '/dashboard' : '/connect/linkedin')
      })()
    }
  }, [isLoading, isAuthenticated, router, hasLinkedinToken])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      setSubmitting(true)
  await login({ email, password })
  const hasToken = await hasLinkedinToken()
  // Replace to avoid going back to login
        router.replace(hasToken ? "/dashboard" : "/connect/linkedin")
    } catch (err: any) {
      setError(err?.message || "Login failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-6 md:py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-0 items-stretch animate-fade-in-up rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl border">
              <div className="bg-background flex items-center justify-center p-4 md:p-8 order-2 lg:order-1">
                <img src="/1.jpg" alt="Signin illustration" className="w-full h-auto max-w-xs md:max-w-sm object-contain rounded-xl md:rounded-2xl shadow-lg" />
              </div>

              <Card className="shadow-none rounded-none border-0 order-1 lg:order-2">
                <CardHeader className="p-4 md:p-6 pb-4">
                  <CardTitle className="text-2xl md:text-3xl">Sign in</CardTitle>
                  <CardDescription className="text-sm md:text-base">Access your Linkedin Automation account</CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-4">
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm md:text-base">Email</Label>
                      <Input id="email" type="email" placeholder="test@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)} required className="h-10 md:h-11 text-sm md:text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm md:text-base">Password</Label>
                      <Input id="password" type="password" placeholder="123123123" value={password} onChange={(e)=>setPassword(e.target.value)} required className="h-10 md:h-11 text-sm md:text-base" />
                    </div>
                    {error && (<p className="text-xs md:text-sm text-destructive">{error}</p>)}
                    <Button
                      type="submit"
                      className={`w-full h-10 md:h-11 text-sm md:text-base transition-opacity ${submitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                      disabled={submitting}
                      aria-busy={submitting}
                    >
                      {submitting ? (
                        <span className="inline-flex items-center gap-2">
                          <Spinner size="sm" />
                          <span>Signing in...</span>
                        </span>
                      ) : (
                        "Sign in"
                      )}
                    </Button>
                    <p className="text-xs md:text-sm text-muted-foreground text-center mt-2">
                      Don't have an account? <a href="/signup" className="underline">Sign up</a>
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}


