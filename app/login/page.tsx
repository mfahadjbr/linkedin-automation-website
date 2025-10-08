"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validEmail = "test@gmail.com"
    const validPassword = "123123123"
    if (email === validEmail && password === validPassword) {
      localStorage.setItem("auth", "true")
      router.push("/dashboard")
    } else {
      setError("Invalid credentials. Use test@gmail.com / 123123123")
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
                    <Button type="submit" className="w-full h-10 md:h-11 cursor-pointer text-sm md:text-base">Sign in</Button>
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


