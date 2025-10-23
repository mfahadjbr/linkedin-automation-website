"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  Mail, 
  Globe, 
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  User
} from "lucide-react"
import Link from "next/link"

interface LinkedInProfile {
  linkedin_user_id: string
  name: string
  given_name: string
  family_name: string
  email: string
  email_verified: boolean
  picture: string
  locale: {
    language: string
    country: string
  }
}

interface ProfileResponse {
  success: boolean
  message: string
  profile: LinkedInProfile
  source: string
  last_updated: string
  error: null | string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<LinkedInProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<string>("")
  const [lastUpdated, setLastUpdated] = useState<string>("")

  const fetchProfile = async (refresh: boolean = false) => {
    if (refresh) {
      setIsRefreshing(true)
    } else {
      setIsLoading(true)
    }
    setError(null)

    try {
      const token = localStorage.getItem('auth_token')
      
      if (!token) {
        throw new Error('No authentication token found. Please log in.')
      }

      const response = await fetch(
        `https://backend.postsiva.com/linkedin/user-profile/?refresh=${refresh}`,
        {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`)
      }

      const data: ProfileResponse = await response.json()

      if (!data.success) {
        throw new Error(data.error || data.message || 'Failed to fetch profile')
      }

      setProfile(data.profile)
      setSource(data.source)
      setLastUpdated(data.last_updated)
    } catch (err: any) {
      console.error('Error fetching profile:', err)
      setError(err.message || 'Failed to load profile')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchProfile(false)
  }, [])

  const handleRefresh = () => {
    fetchProfile(true)
  }

  const getInitials = (name: string) => {
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  return (
    <>
      <div className="mb-4 md:mb-6 lg:mb-8">
        <div className="flex items-center justify-between mb-4 md:mb-6 lg:mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-[#004d9a] hover:text-[#0a58ad] text-sm md:text-base">
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 lg:mb-8 ml-2 md:ml-4">LinkedIn Profile</h1>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center py-4 md:py-6 lg:py-8 rounded-lg">
        <div className="w-full max-w-4xl mx-auto px-3 md:px-4">
          {isLoading ? (
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
              <Spinner size="lg" className="mx-auto mb-4" />
              <p className="text-gray-600">Loading your LinkedIn profile...</p>
            </div>
          ) : error ? (
            <Alert variant="destructive" className="shadow-lg">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Error Loading Profile</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
              <Button 
                onClick={() => fetchProfile(false)} 
                variant="outline" 
                className="mt-4"
              >
                Try Again
              </Button>
            </Alert>
          ) : profile ? (
            <>
              {/* Profile Header */}
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8 mb-6">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-blue-200 shadow-lg">
                    <AvatarImage src={profile.picture} alt={profile.name} />
                    <AvatarFallback className="text-xl md:text-2xl font-bold bg-[#004d9a] text-white">
                      {getInitials(profile.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">{profile.name}</h1>
                    <p className="text-gray-600 text-sm md:text-base mb-3">
                      {profile.given_name} {profile.family_name}
                    </p>
                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span>{profile.email}</span>
                        {profile.email_verified && (
                          <CheckCircle2 className="h-4 w-4 text-green-500 ml-1" />
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        <span>{profile.locale.language.toUpperCase()} - {profile.locale.country}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center sm:justify-end w-full sm:w-auto">
                    <Button 
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      variant="outline" 
                      className="bg-[#004d9a] cursor-pointer hover:bg-[#0a58ad] text-white text-sm md:text-base w-full sm:w-auto"
                    >
                      {isRefreshing ? (
                        <>
                          <Spinner size="sm" className="mr-2" />
                          Refreshing...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Refresh Profile
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Account Information */}
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                      <User className="h-5 w-5 text-[#004d9a]" />
                      Account Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0 space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">LinkedIn User ID</p>
                      <p className="font-mono text-sm bg-gray-100 px-3 py-2 rounded">{profile.linkedin_user_id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Full Name</p>
                      <p className="font-medium">{profile.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email Status</p>
                      <div className="flex items-center gap-2">
                        {profile.email_verified ? (
                          <>
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span className="text-green-700 font-medium">Verified</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                            <span className="text-yellow-700 font-medium">Not Verified</span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Data Source Info */}
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                      <RefreshCw className="h-5 w-5 text-[#004d9a]" />
                      Profile Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0 space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Data Source</p>
                      <Badge 
                        variant={source === 'linkedin' ? 'default' : 'secondary'}
                        className={source === 'linkedin' ? 'bg-blue-500' : 'bg-gray-500'}
                      >
                        {source === 'linkedin' ? 'Fresh from LinkedIn' : 'Cached from Database'}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                      <p className="font-medium text-sm">{formatDate(lastUpdated)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Refresh Data</p>
                      <p className="text-xs text-gray-600">
                        Click "Refresh Profile" to fetch the latest data from LinkedIn.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}

