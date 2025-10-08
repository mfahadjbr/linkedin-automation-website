"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RefreshCw, Play, Calendar, Clock, Eye, ThumbsUp, MessageCircle, BarChart3, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function VideoDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen p-3 md:p-6" style={{ backgroundColor: '#daebfe' }}>
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="text-center lg:text-left">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Video Details</h1>
            <p className="text-gray-600 text-sm md:text-lg">Comprehensive video analytics and insights</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
            <Link href="/dashboard/posts">
              <Button className="bg-[#0b64c1] hover:bg-[#0a58ad] text-white text-sm md:text-base w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Videos
              </Button>
            </Link>
            <Button variant="outline" className="border-[#0b64c1] text-[#0b64c1] hover:bg-[#0b64c1] hover:text-white text-sm md:text-base w-full sm:w-auto">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh for live data
            </Button>
          </div>
        </div>
      </div>

      {/* Video Player Section */}
      <Card className="mb-4 md:mb-6 bg-white border border-gray-200">
        <CardContent className="p-0">
          <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 bg-black rounded-t-lg">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://i.ytimg.com/vi/Lbr-sBp1Ldk/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD21fHTJEKHyW-HQGFQ_fLyvfZj9w')` }}>
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <Play className="text-black text-lg sm:text-2xl md:text-3xl ml-1" />
                </div>
              </div>
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                <Button className="bg-[#0b64c1] hover:bg-[#0a58ad] text-white text-xs sm:text-sm">
                  <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Watch on YouTube</span>
                  <span className="sm:hidden">Watch</span>
                </Button>
              </div>
              <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black bg-opacity-75 text-white text-xs sm:text-sm px-1 sm:px-2 py-1 rounded">
                0:00
              </div>
            </div>
          </div>
          
          {/* Video Information */}
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
              Part NO 7 | Demystify Strings Python! | Python & VS Setup: Print State #Python #Coding #Shorts #P...
            </h2>
            
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 text-xs md:text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm">Published August 5, 2025 at 06:34 PM</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm">0:00</span>
              </div>
              <div className="px-2 md:px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                Python Complete Course (Shorts)
              </div>
              <div className="px-2 md:px-3 py-1 bg-[#0b64c1] text-white rounded-full text-xs">
                public
              </div>
            </div>
            
            {/* Engagement Metrics */}
            <div className="flex flex-wrap gap-4 md:gap-8 mb-4 md:mb-6">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 md:h-5 md:w-5 text-[#0b64c1]" />
                <span className="text-base md:text-lg font-semibold text-gray-900">124</span>
                <span className="text-gray-600 text-sm md:text-base">Views</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 md:h-5 md:w-5 text-[#0b64c1]" />
                <span className="text-base md:text-lg font-semibold text-gray-900">3</span>
                <span className="text-gray-600 text-sm md:text-base">Likes</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-[#0b64c1]" />
                <span className="text-base md:text-lg font-semibold text-gray-900">1</span>
                <span className="text-gray-600 text-sm md:text-base">Comments</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

       {/* Description and Performance Analytics */}
       <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
         {/* Description Section */}
         <Card className="bg-white border border-gray-200 flex-1">
           <CardHeader className="p-4 md:p-6">
             <CardTitle className="text-gray-900 text-lg md:text-xl">Description</CardTitle>
           </CardHeader>
           <CardContent className="p-4 md:p-6 pt-0">
             <p className="text-gray-700 mb-4 text-sm md:text-base">
               🟣 Demystify strings in Python! Learn what strings are, how they are defined, and why they are essential for displaying text and characters in your programs.
             </p>
             <Button variant="outline" className="border-[#0b64c1] text-[#0b64c1] hover:bg-[#0b64c1] hover:text-white text-sm md:text-base w-full sm:w-auto">
               <ChevronDown className="h-4 w-4 mr-2" />
               Show More
             </Button>
           </CardContent>
         </Card>

         {/* Performance Analytics */}
         <Card className="bg-white border border-gray-200 flex-1">
           <CardHeader className="p-4 md:p-6">
             <CardTitle className="text-gray-900 flex items-center gap-2 text-lg md:text-xl">
               <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-[#0b64c1]" />
               Performance Analytics
             </CardTitle>
           </CardHeader>
           <CardContent className="p-4 md:p-6 pt-0">
             <div className="space-y-3 md:space-y-4">
               <div>
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-xs md:text-sm text-gray-600">Performance Score</span>
                   <span className="text-xs md:text-sm font-medium text-gray-900">0</span>
                 </div>
                 <div className="w-full bg-gray-200 rounded-full h-2">
                   <div className="bg-[#0b64c1] h-2 rounded-full" style={{ width: '0%' }}></div>
                 </div>
               </div>
               
               <div>
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-xs md:text-sm text-gray-600">Engagement Rate</span>
                   <span className="text-xs md:text-sm font-medium text-gray-900">0%</span>
                 </div>
                 <div className="w-full bg-gray-200 rounded-full h-2">
                   <div className="bg-[#0b64c1] h-2 rounded-full" style={{ width: '0%' }}></div>
                 </div>
               </div>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 md:mt-6">
               <div className="bg-gray-50 p-3 rounded-lg">
                 <div className="text-xs md:text-sm text-gray-600">Views per Day</div>
                 <div className="text-base md:text-lg font-semibold text-gray-900">1.97</div>
               </div>
               <div className="bg-gray-50 p-3 rounded-lg">
                 <div className="text-xs md:text-sm text-gray-600">Watch Time (hrs)</div>
                 <div className="text-base md:text-lg font-semibold text-gray-900">0.00</div>
               </div>
               <div className="bg-gray-50 p-3 rounded-lg">
                 <div className="text-xs md:text-sm text-gray-600">Days Since Published</div>
                 <div className="text-base md:text-lg font-semibold text-gray-900">63</div>
               </div>
             </div>
           </CardContent>
         </Card>
       </div>

      {/* Comments Section */}
      <Card className="mt-4 md:mt-6 bg-white border border-gray-200">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-gray-900 flex items-center gap-2 text-lg md:text-xl">
            <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-[#0b64c1]" />
            Comments 1
          </CardTitle>
          <p className="text-xs md:text-sm text-gray-600">Comments from YouTube viewers</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-gray-600 text-xs md:text-sm font-bold">!</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                  <span className="font-semibold text-gray-900 text-sm md:text-base">@iramsardar7960</span>
                  <span className="text-xs md:text-sm text-gray-500">Aug 7, 2025</span>
                </div>
                <p className="text-gray-700 mb-2 text-sm md:text-base">Nice</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3 md:h-4 md:w-4 text-gray-500" />
                    <span className="text-xs md:text-sm text-gray-500">1</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-100 text-xs h-8 md:h-9">
                      Reply
                    </Button>
                    <Button size="sm" className="bg-[#0b64c1] hover:bg-[#0a58ad] text-white text-xs h-8 md:h-9">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button variant="outline" className="border-[#0b64c1] text-[#0b64c1] hover:bg-[#0b64c1] hover:text-white text-sm md:text-base w-full sm:w-auto">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
