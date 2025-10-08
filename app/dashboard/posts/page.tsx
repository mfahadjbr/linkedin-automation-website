"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Eye, ThumbsUp, MessageCircle, BarChart3, Calendar, ExternalLink, RefreshCw, Plus } from "lucide-react"
import Link from "next/link"

const postsData = [
  {
    id: 1,
    title: "Part NO 32 | Learn Elif Statements | Input Func, String , Indexing...",
    description: "Learn how to automate your LinkedIn activities effectively while maintaining authenticity and engagement.",
    views: 25,
    likes: 1,
    comments: 0,
    date: "Dec 15, 2024",
    timeAgo: "2d ago",
    thumbnail: "📊"
  },
  {
    id: 2,
    title: "Part NO 31 | Learn If Statements | Python Control Flow Tutorial",
    description: "Discover strategies to grow your professional network and create meaningful business connections.",
    views: 25,
    likes: 1,
    comments: 0,
    date: "Dec 12, 2024",
    timeAgo: "5d ago",
    thumbnail: "🤝"
  },
  {
    id: 3,
    title: "Part NO 30 | Python Variables | Data Types Explained",
    description: "Effective content marketing techniques that drive engagement and build your personal brand.",
    views: 25,
    likes: 1,
    comments: 0,
    date: "Dec 10, 2024",
    timeAgo: "7d ago",
    thumbnail: "📝"
  },
  {
    id: 4,
    title: "Part NO 29 | Python Basics | Print Function Tutorial",
    description: "Understanding how LinkedIn's algorithm works and optimizing your content for better reach.",
    views: 25,
    likes: 1,
    comments: 0,
    date: "Dec 8, 2024",
    timeAgo: "9d ago",
    thumbnail: "⚙️"
  },
  {
    id: 5,
    title: "Part NO 28 | Python Setup | VS Code Installation Guide",
    description: "Essential tips for building a strong personal brand on LinkedIn and standing out from the crowd.",
    views: 25,
    likes: 1,
    comments: 0,
    date: "Dec 5, 2024",
    timeAgo: "12d ago",
    thumbnail: "🎯"
  },
  {
    id: 6,
    title: "Part NO 27 | Python Introduction | Programming Basics",
    description: "Proven methods for generating high-quality leads through LinkedIn automation and engagement.",
    views: 25,
    likes: 1,
    comments: 0,
    date: "Dec 3, 2024",
    timeAgo: "14d ago",
    thumbnail: "🎣"
  }
]

export default function PostsPage() {
  return (
    <div className="min-h-screen p-2 md:p-3">
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
           <div>
             <h1 className="text-2xl md:text-2xl font-bold text-gray-900 mb-2">LinkedIn Videos</h1>
             <p className="text-gray-600 text-base md:text-lg">Manage your uploaded and processed videos with comprehensive analytics and insights</p>
           </div>
           <div className="flex gap-3">
             <Button className="bg-[#0b64c1] hover:bg-[#0a58ad] text-white text-sm md:text-base">
               <Plus className="h-4 w-4 mr-2" />
               Upload New Video
             </Button>
           </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-3 md:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-6">
        <Card className="bg-white border border-gray-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full -translate-y-6 md:-translate-y-8 translate-x-6 md:translate-x-8"></div>
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <Camera className="h-5 w-5 md:h-8 md:w-8 text-blue-600" />
            </div>
            <div className="text-xl md:text-3xl font-bold text-gray-900 mb-1">16</div>
            <div className="text-xs md:text-sm text-gray-500">Total Posts</div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full -translate-y-6 md:-translate-y-8 translate-x-6 md:translate-x-8"></div>
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <Eye className="h-5 w-5 md:h-8 md:w-8 text-purple-600" />
            </div>
            <div className="text-xl md:text-3xl font-bold text-gray-900 mb-1">4,497</div>
            <div className="text-xs md:text-sm text-gray-500">Total Views</div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-600"></div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full -translate-y-6 md:-translate-y-8 translate-x-6 md:translate-x-8"></div>
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <ThumbsUp className="h-5 w-5 md:h-8 md:w-8 text-red-600" />
            </div>
            <div className="text-xl md:text-3xl font-bold text-gray-900 mb-1">469</div>
            <div className="text-xs md:text-sm text-gray-500">Total Likes</div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600"></div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full -translate-y-6 md:-translate-y-8 translate-x-6 md:translate-x-8"></div>
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <MessageCircle className="h-5 w-5 md:h-8 md:w-8 text-green-600" />
            </div>
            <div className="text-xl md:text-3xl font-bold text-gray-900 mb-1">121</div>
            <div className="text-xs md:text-sm text-gray-500">Total Comments</div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600"></div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-yellow-100 rounded-full -translate-y-6 md:-translate-y-8 translate-x-6 md:translate-x-8"></div>
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <BarChart3 className="h-5 w-5 md:h-8 md:w-8 text-yellow-600" />
            </div>
            <div className="text-xl md:text-3xl font-bold text-gray-900 mb-1">10.4%</div>
            <div className="text-xs md:text-sm text-gray-500">Avg Performance</div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-600"></div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Performance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">High Performance (80+)</span>
                <span className="text-sm font-medium text-gray-900">3 posts</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#0b64c1] h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Medium Performance (40-79)</span>
                <span className="text-sm font-medium text-gray-900">8 posts</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#e7eff8] h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Low Performance (0-39)</span>
                <span className="text-sm font-medium text-gray-900">5 posts</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#daebfe] h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Engagement Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">High Engagement (10%+)</span>
                <span className="text-sm font-medium text-gray-900">4 posts</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#0b64c1] h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Medium Engagement (5-9%)</span>
                <span className="text-sm font-medium text-gray-900">7 posts</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#e7eff8] h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Low Engagement (0-4%)</span>
                <span className="text-sm font-medium text-gray-900">5 posts</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#daebfe] h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* LinkedIn Posts Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {postsData.map((post) => (
          <Card key={post.id} className="bg-white border border-gray-200 overflow-hidden">
            <CardContent className="p-0">
               {/* Post Thumbnail */}
               <div className="relative h-40 md:h-48 bg-cover bg-center" style={{ backgroundImage: `url('https://i.ytimg.com/vi/Lbr-sBp1Ldk/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD21fHTJEKHyW-HQGFQ_fLyvfZj9w')` }}>
                 <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-12 h-12 md:w-16 md:h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center cursor-pointer">
                     <span className="text-black text-lg md:text-2xl ml-1">▶</span>
                   </div>
                 </div>
                 <div className="absolute top-3 md:top-4 right-3 md:right-4">
                   <div className="w-6 h-6 md:w-8 md:h-8 bg-[#e7eff8] rounded-full flex items-center justify-center">
                     <span className="text-[#0b64c1] font-bold text-xs md:text-sm">LI</span>
                   </div>
                 </div>
                 <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 bg-black bg-opacity-75 text-white text-xs md:text-sm px-1 md:px-2 py-1 rounded">
                   {Math.floor(Math.random() * 30 + 15)}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                 </div>
               </div>
              
              {/* Post Content */}
              <div className="p-3 md:p-4 space-y-2 md:space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-xs md:text-sm leading-tight">{post.title}</h3>
                </div>
                
                {/* Stats */}
                <div className="flex gap-3 md:gap-4 text-xs md:text-sm text-gray-600">
                  <div>{post.views} Views</div>
                  <div>{post.likes} Likes</div>
                  <div>{post.comments} Comments</div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Link href={`/dashboard/posts/${post.id}`} className="flex-[2]">
                    <Button size="sm" className="w-full bg-[#0b64c1] hover:bg-[#0a58ad] text-white text-xs">
                      View Details
                    </Button>
                  </Link>
                  <Button size="sm" className="flex-1 bg-[#0a58ad] hover:bg-[#094a9a] text-white text-xs">
                    Watch
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center pt-6">
        <Button variant="outline" className="border-[#0b64c1] text-[#0b64c1] hover:bg-[#0b64c1] hover:text-white px-6 py-2">
          See More Posts
        </Button>
      </div>
    </div>
  )
}


