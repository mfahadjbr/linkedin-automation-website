"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import { 
  Key, 
  Eye,
  EyeOff,
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Unplug
} from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [geminiKey, setGeminiKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false)
  const [isDisconnecting, setIsDisconnecting] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("gemini_api_key") || ""
    setGeminiKey(stored)
  }, [])

  const saveSettings = () => {
    localStorage.setItem("gemini_api_key", geminiKey)
    // Add success feedback here
  }

  const handleDisconnectLinkedIn = async () => {
    setIsDisconnecting(true)
    try {
      const token = localStorage.getItem('auth_token')
      
      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await fetch('https://backend.postsiva.com/linkedin/delete-token', {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to disconnect LinkedIn account')
      }

      // Clear all auth data
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      
      // Redirect to login
      router.push('/login')
    } catch (error: any) {
      console.error('Error disconnecting LinkedIn:', error)
      alert(error.message || 'Failed to disconnect LinkedIn account')
    } finally {
      setIsDisconnecting(false)
      setShowDisconnectDialog(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#daebfe' }}>
      <Header />
      <main>
        {/* Header Section */}
        <section className="py-6 md:py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Settings</h1>
              <p className="text-gray-600 text-sm md:text-base">Manage your account preferences and API configurations</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-8 md:pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
              
              {/* API Configuration */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <Key className="h-5 w-5 text-blue-400" />
                    API Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gemini-key" className="text-sm md:text-base">Gemini API Key</Label>
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
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500">Your API key is stored locally and never shared</p>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      onClick={saveSettings}
                      className="bg-[#004d9a] cursor-pointer hover:bg-[#004d9a] text-white h-10 md:h-11 text-sm md:text-base"
                    >
                      Save API Key
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <User className="h-5 w-5 text-green-400" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm md:text-base">Auto-save changes</Label>
                      <p className="text-xs md:text-sm text-gray-500">Automatically save your work as you type</p>
                    </div>
                    <Switch
                      checked={autoSave}
                      onCheckedChange={setAutoSave}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm md:text-base">Dark mode</Label>
                      <p className="text-xs md:text-sm text-gray-500">Switch to dark theme</p>
                    </div>
                    <Switch
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <Bell className="h-5 w-5 text-yellow-400" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm md:text-base">Email notifications</Label>
                      <p className="text-xs md:text-sm text-gray-500">Receive updates via email</p>
                    </div>
                    <Switch
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <Shield className="h-5 w-5 text-red-400" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm md:text-base">Two-factor authentication</Label>
                      <p className="text-xs md:text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <Badge variant="secondary" className="text-xs md:text-sm">Not enabled</Badge>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" className="h-10 md:h-11 text-sm md:text-base">
                      Enable 2FA
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* LinkedIn Integration */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm border-red-200">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <Unplug className="h-5 w-5 text-red-500" />
                    LinkedIn Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm md:text-base">LinkedIn Account</Label>
                        <p className="text-xs md:text-sm text-gray-500">
                          Disconnect your LinkedIn account and revoke access
                        </p>
                      </div>
                      <Badge variant="default" className="text-xs md:text-sm bg-green-500">Connected</Badge>
                    </div>
                  </div>
                  <Separator />
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-red-900 mb-2">Warning</h4>
                    <p className="text-xs md:text-sm text-red-700 mb-4">
                      Disconnecting your LinkedIn account will:
                    </p>
                    <ul className="text-xs md:text-sm text-red-700 space-y-1 ml-4 mb-4 list-disc">
                      <li>Revoke all access tokens</li>
                      <li>Log you out immediately</li>
                      <li>Require re-authentication to use the platform</li>
                    </ul>
                    <Button 
                      variant="destructive"
                      onClick={() => setShowDisconnectDialog(true)}
                      className="w-full h-10 md:h-11 text-sm md:text-base"
                    >
                      Disconnect LinkedIn Account
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Disconnect Confirmation Dialog */}
      <AlertDialog open={showDisconnectDialog} onOpenChange={setShowDisconnectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                This action will disconnect your LinkedIn account and revoke all access tokens.
              </p>
              <p className="font-semibold text-red-600">
                You will be logged out immediately and will need to reconnect your LinkedIn account to continue using the platform.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDisconnecting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDisconnectLinkedIn}
              disabled={isDisconnecting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDisconnecting ? 'Disconnecting...' : 'Yes, Disconnect'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}