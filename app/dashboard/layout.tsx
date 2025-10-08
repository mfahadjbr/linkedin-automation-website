"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Linkedin, BarChart3, FileText, Upload, User, Settings, LogOut, ChevronLeft, ChevronRight, Menu, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const authed = typeof window !== "undefined" && localStorage.getItem("auth") === "true"
    if (!authed) router.replace("/login")
  }, [router])

  const logout = () => {
    localStorage.removeItem("auth")
    router.replace("/login")
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="h-12 md:h-14 flex items-center justify-between px-3 md:px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-primary rounded">
              <Linkedin className="h-3 w-3 md:h-5 md:w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg md:text-2xl lg:text-2xl">LinkedIn Automation</span>
          </Link>
          <div className="hidden md:flex items-center gap-2">
          </div>
          
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2">
                <Avatar className="w-8 h-8 md:w-10 md:h-10">
                  <AvatarImage src="https://imgs.search.brave.com/Rj7GDZcu_IZtt0oYYwOSGhjQPqs3XxjZE8-UEDB3Sy8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1wc2Qv/M2QtYXZhdGFyLWNo/YXJhY3Rlcl85NzUx/NjMtNjg4LmpwZz9z/ZW10PWFpc19oeWJy/aWQmdz03NDA" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => router.push("/dashboard/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => router.push("/dashboard/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onSelect={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="px-4 py-4 space-y-3">
            <Link href="/dashboard" className="flex items-center gap-3 w-full rounded-lg px-4 py-3 font-semibold cursor-pointer transition-colors bg-[#e7eff8] text-[#0b64c1] hover:bg-[#d8e7f7]" onClick={() => setMobileMenuOpen(false)}>
              <BarChart3 className="h-5 w-5" />
              <span>Overview</span>
            </Link>
            <Link href="/dashboard/posts" className="flex items-center gap-3 w-full rounded-lg px-4 py-3 font-semibold cursor-pointer transition-colors bg-[#e7eff8] text-[#0b64c1] hover:bg-[#d8e7f7]" onClick={() => setMobileMenuOpen(false)}>
              <FileText className="h-5 w-5" />
              <span>LinkedIn Posts</span>
            </Link>
            <Link href="/dashboard/upload" className="flex items-center gap-3 w-full rounded-lg px-4 py-3 font-semibold cursor-pointer transition-colors bg-[#e7eff8] text-[#0b64c1] hover:bg-[#d8e7f7]" onClick={() => setMobileMenuOpen(false)}>
              <Upload className="h-5 w-5" />
              <span>Upload Posts</span>
            </Link>
          </nav>
        </div>
      )}

      <main className={`px-3 md:px-4 py-3 md:py-4 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`} style={{ backgroundColor: '#daebfe' }}>
        {/* Sidebar */}
        <aside className={`hidden md:block fixed left-0 top-14 h-[calc(100vh-56px)] border-r bg-background transition-all duration-300 z-30 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
          {/* Toggle Button */}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3 top-6 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-40 shadow-sm"
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4 text-gray-700" /> : <ChevronLeft className="h-4 w-4 text-gray-700" />}
          </button>
          
          <div className={`h-full w-full flex flex-col items-stretch justify-start gap-3 pt-6 transition-all duration-300 ${sidebarCollapsed ? 'px-2' : 'px-4'}`}>
            <Link href="/dashboard" className="w-full">
              <button className={`w-full rounded-lg px-4 py-3 font-semibold cursor-pointer transition-colors flex items-center gap-3 ${pathname === '/dashboard' ? 'bg-[#0b64c1] text-white hover:bg-[#0a58ad]' : 'bg-[#e7eff8] text-[#0b64c1] hover:bg-[#d8e7f7]'} ${sidebarCollapsed ? 'px-3 justify-center' : ''}`}>
                <BarChart3 className="h-5 w-5" />
                {!sidebarCollapsed && <span>Overview</span>}
              </button>
            </Link>
            <Link href="/dashboard/posts" className="w-full">
              <button className={`w-full rounded-lg px-4 py-3 font-semibold cursor-pointer transition-colors flex items-center gap-3 ${pathname === '/dashboard/posts' ? 'bg-[#0b64c1] text-white hover:bg-[#0a58ad]' : 'bg-[#e7eff8] text-[#0b64c1] hover:bg-[#d8e7f7]'} ${sidebarCollapsed ? 'px-3 justify-center' : ''}`}>
                <FileText className="h-5 w-5" />
                {!sidebarCollapsed && <span>LinkedIn Posts</span>}
              </button>
            </Link>
            <Link href="/dashboard/upload" className="w-full">
              <button className={`w-full rounded-lg px-4 py-3 font-semibold cursor-pointer transition-colors flex items-center gap-3 ${pathname === '/dashboard/upload' ? 'bg-[#0b64c1] text-white hover:bg-[#0a58ad]' : 'bg-[#e7eff8] text-[#0b64c1] hover:bg-[#d8e7f7]'} ${sidebarCollapsed ? 'px-3 justify-center' : ''}`}>
                <Upload className="h-5 w-5" />
                {!sidebarCollapsed && <span>Upload Posts</span>}
              </button>
            </Link>
          </div>
        </aside>

        {/* Content */}
        <div>
          {children}
        </div>
      </main>
    </div>
  )
}


