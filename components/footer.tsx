import Link from "next/link"
import { Linkedin, Twitter, Facebook, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded">
                <Linkedin className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">Linkedin Automation</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The most powerful LinkedIn automation platform for professionals who want to scale their network and
              generate more leads.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <div className="space-y-2">
              <Link
                href="/features"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/integrations"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Integrations
              </Link>
              <Link href="/api" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                API
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/blog" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link
                href="/careers"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Careers
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </Link>
              <Link href="/docs" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </Link>
              <Link
                href="/privacy"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 md:mt-12 pt-6 md:pt-8 text-center">
          <p className="text-xs md:text-sm text-muted-foreground">© 2025 Linkedin Automation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
