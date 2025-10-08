"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Globe, 
  Edit3, 
  Award, 
  Briefcase,
  GraduationCap,
  Star,
  Users,
  TrendingUp,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <>
    <div className="mb-4 md:mb-6 lg:mb-8">
        <div className="flex items-center justify-between mb-4 md:mb-6 lg:mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-[#004d9a] hover:text-[#0a58ad] text-sm md:text-base">
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 lg:mb-8 ml-2 md:ml-4">Profile Overview</h1>
      </div>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center py-4 md:py-6 lg:py-8 rounded-lg">
      <div className="w-full max-w-6xl mx-auto px-3 md:px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 border-4 border-blue-200 shadow-lg">
              <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
              <AvatarFallback className="text-lg sm:text-xl md:text-2xl font-bold bg-[#004d9a]">JD</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-gray-900">John Doe</h1>
              <p className="text-gray-600 text-base md:text-lg mb-2 font-medium">Lead Software Engineer</p>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">john.doe@email.com</span>
                  <span className="sm:hidden">john.doe@...</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden md:inline">linkedin.com/in/johndoe</span>
                  <span className="md:hidden">linkedin.com/...</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center sm:justify-end w-full sm:w-auto">
              <Button variant="outline" className="bg-[#004d9a] cursor-pointer hover:bg-[#004d9a] text-white text-sm md:text-base w-full sm:w-auto">
                <Edit3 className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* About Section */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Users className="h-4 w-4 md:h-5 md:w-5 text-[#004d9a]" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  Passionate software engineer with 5+ years of experience building scalable web applications. 
                  Specialized in React, TypeScript, and automation tools. Currently leading development of 
                  LinkedIn automation platform that helps professionals grow their network efficiently.
                </p>
              </CardContent>
            </Card>

            {/* Experience Section */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Briefcase className="h-4 w-4 md:h-5 md:w-5 text-[#004d9a]" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0 space-y-4 md:space-y-6">
                <div className="border-l-4 border-[#004d9a] pl-3 md:pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="font-semibold text-base md:text-lg">Lead Software Engineer</h3>
                    <Badge variant="secondary" className="w-fit text-xs md:text-sm">2022 - Present</Badge>
                  </div>
                  <p className="text-[#004d9a] font-medium mb-1 text-sm md:text-base">LinkedIn Automation Inc.</p>
                  <p className="text-gray-600 text-xs md:text-sm mb-2">San Francisco, CA</p>
                  <p className="text-gray-700 text-sm md:text-base">
                    Leading development of automation tools for LinkedIn post scheduling, analytics, and growth. 
                    Built scalable React/Node.js applications serving 10K+ users.
                  </p>
      </div>

                <Separator />
                
                <div className="border-l-4 border-gray-300 pl-3 md:pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="font-semibold text-base md:text-lg">Software Engineer</h3>
                    <Badge variant="outline" className="w-fit text-xs md:text-sm">2019 - 2022</Badge>
                  </div>
                  <p className="text-[#004d9a] font-medium mb-1 text-sm md:text-base">Tech Corp</p>
                  <p className="text-gray-600 text-xs md:text-sm mb-2">Austin, TX</p>
                  <p className="text-gray-700 text-sm md:text-base">
                    Developed React/Node.js applications and data dashboards. Collaborated with cross-functional 
                    teams to deliver high-quality software solutions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Education Section */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-[#004d9a]" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="border-l-4 border-[#004d9a] pl-3 md:pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="font-semibold text-base md:text-lg">Bachelor of Science, Computer Science</h3>
                    <Badge variant="secondary" className="w-fit text-xs md:text-sm">2015 - 2019</Badge>
                  </div>
                  <p className="text-[#004d9a] font-medium text-sm md:text-base">State University</p>
                  <p className="text-gray-600 text-xs md:text-sm">GPA: 3.8/4.0</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 md:space-y-6">
            {/* Skills Section */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Award className="h-4 w-4 md:h-5 md:w-5 text-[#004d9a]" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="flex flex-wrap gap-2">
                  {[
                    "React", "TypeScript", "Next.js", "Node.js", 
                    "Python", "PostgreSQL", "AWS", "Docker",
                    "Git", "Agile", "Leadership", "Automation"
                  ].map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-2 md:px-3 py-1 text-xs md:text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats Section */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-[#004d9a]" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0 space-y-3 md:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm md:text-base">Connections</span>
                  <span className="font-semibold text-[#004d9a] text-sm md:text-base">2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm md:text-base">Posts This Month</span>
                  <span className="font-semibold text-[#004d9a] text-sm md:text-base">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm md:text-base">Profile Views</span>
                  <span className="font-semibold text-[#004d9a] text-sm md:text-base">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm md:text-base">Engagement Rate</span>
                  <span className="font-semibold text-[#004d9a] text-sm md:text-base">8.5%</span>
                </div>
              </CardContent>
            </Card>

            {/* Achievements Section */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Star className="h-4 w-4 md:h-5 md:w-5 text-[#004d9a]" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#004d9a] rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-xs md:text-sm">Top 1% LinkedIn Creator</p>
                    <p className="text-xs text-gray-600">2023</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#004d9a] rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-xs md:text-sm">Best Automation Tool</p>
                    <p className="text-xs text-gray-600">TechCrunch 2022</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#004d9a] rounded-full mt-2"></div>
        <div>
                    <p className="font-medium text-xs md:text-sm">Open Source Contributor</p>
                    <p className="text-xs text-gray-600">50+ repos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
        </div>
        </div>
        </>
  )
}

