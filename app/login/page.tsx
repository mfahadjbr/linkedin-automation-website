import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-0 items-stretch animate-fade-in-up rounded-3xl overflow-hidden shadow-2xl border">
              <div className="bg-background flex items-center justify-center p-8">
                <img src="/1.jpg" alt="Signin illustration" className="w-full h-auto max-w-sm object-contain rounded-2xl shadow-lg" />
              </div>

              <Card className="shadow-none rounded-none border-0">
                <CardHeader className="p-6 pb-4">
                  <CardTitle>Sign in</CardTitle>
                  <CardDescription>Access your Linkedin Automation account</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-4">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" required className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="••••••••" required className="h-11" />
                    </div>
                    <Button type="submit" className="w-full h-11">Sign in</Button>
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


