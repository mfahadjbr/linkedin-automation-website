"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { useAuthContext } from "@/lib/hooks/auth/AuthContext"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()
  const { signup, isLoading } = useAuthContext()
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    try {
      await signup({
        email,
        username,
        full_name: fullName,
        password,
      })
      setSuccess("Account created successfully. You can now log in.")
      // Redirect to login after a brief pause so the user can read the message
      setTimeout(() => router.replace("/login"), 800)
    } catch (err: any) {
      setError(err?.message || "Signup failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-6 md:py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto grid lg:grid-cols-2 gap-0 items-stretch animate-fade-in-up rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl border">
              <div className="bg-background flex items-center justify-center p-4 md:p-8 order-2 lg:order-1">
                <img src="/1.jpg" alt="Signup illustration" className="w-full h-auto max-w-xs md:max-w-sm object-contain rounded-xl md:rounded-2xl shadow-lg" />
              </div>

              <Card className="shadow-none rounded-none border-0 order-1 lg:order-2">
                <CardHeader className="p-4 md:p-6 pb-2">
                  <CardTitle className="text-2xl md:text-3xl">Create your account</CardTitle>
                  <CardDescription className="text-sm md:text-base">Start your journey with Linkedin Automation</CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-2">
                  <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                    {error && (
                      <Alert variant="destructive">
                        <AlertTitle>Signup failed</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    {success && (
                      <Alert>
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{success}</AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-sm md:text-base">Full name</Label>
                      <Input
                        id="full_name"
                        type="text"
                        placeholder="Jane Doe"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-10 md:h-11 text-sm md:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-sm md:text-base">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="janedoe"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="h-10 md:h-11 text-sm md:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm md:text-base">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-10 md:h-11 text-sm md:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm md:text-base">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-10 md:h-11 text-sm md:text-base"
                      />
                    </div>
                    <Button type="submit" className="w-full h-10 md:h-11 text-sm md:text-base" disabled={isLoading}>
                      {isLoading ? (
                        <span className="inline-flex items-center gap-2">
                          <Spinner size="sm" />
                          <span>Creating account…</span>
                        </span>
                      ) : (
                        "Create account"
                      )}
                    </Button>
                    <div className="text-xs md:text-sm text-muted-foreground text-center">
                      Already have an account? <Link href="/login" className="underline">Log in</Link>
                    </div>
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


