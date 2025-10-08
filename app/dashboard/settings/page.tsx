"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  Key, 
  Eye,
  EyeOff,
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [geminiKey, setGeminiKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("gemini_api_key") || ""
    setGeminiKey(stored)
    setNotifications(localStorage.getItem("notifications") === "true")
    setAutoSave(localStorage.getItem("autoSave") === "true")
    setDarkMode(localStorage.getItem("darkMode") === "true")
    setTwoFactorAuth(localStorage.getItem("twoFactorAuth") === "true")
  }, [])

  const saveSettings = () => {
    localStorage.setItem("gemini_api_key", geminiKey)
    localStorage.setItem("notifications", String(notifications))
    localStorage.setItem("autoSave", String(autoSave))
    localStorage.setItem("darkMode", String(darkMode))
    localStorage.setItem("twoFactorAuth", String(twoFactorAuth))
    alert("Settings saved successfully!")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-4 md:py-6 lg:py-8" style={{ backgroundColor: '#daebfe' }}>
        <section className="container mx-auto px-3 md:px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="mb-4 md:mb-6">
              <Link href="/dashboard" className="inline-flex items-center text-[#004d9a] hover:text-[#0a58ad] text-sm md:text-base">
                <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                Back to Dashboard
              </Link>
      </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 lg:mb-8">Settings</h1>

        {/* API Configuration */}
            <Card className="mb-4 md:mb-6 lg:mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="p-4 md:p-6 pb-3 md:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl lg:text-2xl">
                  <Key className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-blue-500" />
              Gemini API Key
            </CardTitle>
          </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0 space-y-4">
                <p className="text-xs md:text-sm text-muted-foreground">
                  Configure your Gemini API key for AI-powered features.
                </p>
            <div className="space-y-2">
                  <Label htmlFor="gemini-key" className="text-sm md:text-base">API Key</Label>
              <div className="relative">
                <Input
                  id="gemini-key"
                  type={showKey ? "text" : "password"}
                  placeholder="Enter Gemini API key"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                      className="pr-10 bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-400 h-10 md:h-11 text-sm md:text-base"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? (
                        <EyeOff className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
                  ) : (
                        <Eye className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={saveSettings}
                    className="bg-[#004d9a] cursor-pointer hover:bg-[#004d9a] text-white h-10 md:h-11 text-sm md:text-base w-full sm:w-auto"
                  >
                    Save API Key
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* General Settings */}
            <Card className="mb-4 md:mb-6 lg:mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="p-4 md:p-6 pb-3 md:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl lg:text-2xl">
                  <SettingsIcon className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-green-500" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-save" className="text-sm md:text-base">Enable Auto-Save</Label>
                  <Switch
                    id="auto-save"
                    checked={autoSave}
                    onCheckedChange={setAutoSave}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" className="text-sm md:text-base">Dark Mode</Label>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="mb-4 md:mb-6 lg:mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="p-4 md:p-6 pb-3 md:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl lg:text-2xl">
                  <Bell className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-yellow-500" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="text-sm md:text-base">Email Notifications</Label>
                  <Switch
                    id="email-notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <Separator />
                <p className="text-xs md:text-sm text-muted-foreground">
                  Receive important updates and alerts via email.
                </p>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="p-4 md:p-6 pb-3 md:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl lg:text-2xl">
                  <Shield className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-red-500" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor-auth" className="text-sm md:text-base">Two-Factor Authentication</Label>
                  <Switch
                    id="two-factor-auth"
                    checked={twoFactorAuth}
                    onCheckedChange={setTwoFactorAuth}
                  />
                </div>
                <Separator />
                <p className="text-xs md:text-sm text-muted-foreground">
                  Add an extra layer of security to your account.
                </p>
                <div className="flex justify-end">
                  <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 h-10 md:h-11 text-sm md:text-base w-full sm:w-auto">
                    Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
        </section>
      </main>
    </div>
  )
}
