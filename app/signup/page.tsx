import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
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
                  <form className="space-y-4 md:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm md:text-base">Full name</Label>
                      <Input id="name" type="text" placeholder="Jane Doe" required className="h-10 md:h-11 text-sm md:text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm md:text-base">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" required className="h-10 md:h-11 text-sm md:text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm md:text-base">Password</Label>
                      <Input id="password" type="password" placeholder="••••••••" required className="h-10 md:h-11 text-sm md:text-base" />
                    </div>
                    <Button type="submit" className="w-full h-10 md:h-11 text-sm md:text-base">Create account</Button>
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


