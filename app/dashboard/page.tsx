"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, PieChart, Pie, Cell } from "recharts"
import { Users, UserCheck, TrendingUp, Calendar, RefreshCcw, BarChart3, Eye, Heart, MessageCircle, Share2, MousePointerClick, Gauge, UserPlus2, Users2 } from "lucide-react"
import useAnalytics from "@/lib/hooks/analytics/useAnalytics"
import { Spinner } from "@/components/ui/spinner"

const lineData = [
  { name: "Jan", views: 100, likes: 20 },
  { name: "Feb", views: 250, likes: 40 },
  { name: "Mar", views: 200, likes: 30 },
  { name: "Apr", views: 400, likes: 60 },
  { name: "May", views: 700, likes: 90 },
]

const radarData = [
  { subject: "Skills", A: 1.5 },
  { subject: "Experience", A: 2 },
  { subject: "Education", A: 3 },
  { subject: "Connections", A: 4 },
  { subject: "Activity", A: 5 },
]

const barData = [
  { name: "January", posts: 65 },
  { name: "February", posts: 58 },
  { name: "March", posts: 80 },
  { name: "April", posts: 81 },
  { name: "May", posts: 55 },
  { name: "June", posts: 54 },
  { name: "July", posts: 40 },
]

export default function OverviewPage() {
  const { data, isLoading, error, lastUpdated, source, fetchAnalytics } = useAnalytics()

  useEffect(() => {
    // Default load from cached/dashboard data (refresh=false)
    fetchAnalytics(false)
  }, [fetchAnalytics])

  return (
    <div className="space-y-3 md:space-y-4 p-2 md:p-3" style={{ backgroundColor: '#daebfe' }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-2xl font-bold">Dashboard Overview</h1>
          <Button size="sm" variant="outline" onClick={() => fetchAnalytics(true)} disabled={isLoading} className={`${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}>
            {isLoading ? (
              <span className="inline-flex items-center gap-2"><Spinner size="sm" /><span>Refreshing…</span></span>
            ) : (
              <span className="inline-flex items-center gap-2"><RefreshCcw className="h-4 w-4" /> Refresh analytics</span>
            )}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" asChild className="text-xs md:text-sm">
            <a href="/dashboard/posts">LinkedIn Posts</a>
          </Button>
          <Button size="sm" asChild className="text-xs md:text-sm">
            <a href="/dashboard/upload">Upload Posts</a>
          </Button>
        </div>
      </div>

      {/* Analytics status */}
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      {data && (
        <div className="text-xs text-muted-foreground">Last updated: {lastUpdated || '—'} {source ? `(source: ${source})` : ''}</div>
      )}

      {/* KPI cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-full -translate-y-8 translate-x-8"></div>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <BarChart3 className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{data?.total_posts ?? (isLoading ? '—' : 0)}</div>
            <div className="text-xs md:text-sm text-gray-500">Total Posts</div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-100 rounded-full -translate-y-8 translate-x-8"></div>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <Eye className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{data?.total_impressions ?? (isLoading ? '—' : 0)}</div>
            <div className="text-xs md:text-sm text-gray-500">Total Impressions</div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-600"></div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-100 rounded-full -translate-y-8 translate-x-8"></div>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-red-600" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{data?.total_engagement ?? (isLoading ? '—' : 0)}</div>
            <div className="text-xs md:text-sm text-gray-500">Total Engagement</div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600"></div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-100 rounded-full -translate-y-8 translate-x-8"></div>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <Users2 className="h-6 w-6 md:h-8 md:w-8 text-yellow-600" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{data?.follower_count ?? (isLoading ? '—' : 0)}</div>
            <div className="text-xs md:text-sm text-gray-500">Follower Count</div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-600"></div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed stats cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={<Users className="h-5 w-5 text-blue-600" />} label="Connections" value={data?.connection_count} isLoading={isLoading} barClass="bg-blue-600" />
        <StatCard icon={<Heart className="h-5 w-5 text-rose-600" />} label="Total Likes" value={data?.total_likes} isLoading={isLoading} barClass="bg-rose-600" />
        <StatCard icon={<MessageCircle className="h-5 w-5 text-emerald-600" />} label="Total Comments" value={data?.total_comments} isLoading={isLoading} barClass="bg-emerald-600" />
        <StatCard icon={<Share2 className="h-5 w-5 text-purple-600" />} label="Total Shares" value={data?.total_shares} isLoading={isLoading} barClass="bg-purple-600" />
        <StatCard icon={<MousePointerClick className="h-5 w-5 text-orange-600" />} label="Total Clicks" value={data?.total_clicks} isLoading={isLoading} barClass="bg-orange-600" />
        <StatCard icon={<Gauge className="h-5 w-5 text-teal-600" />} label="Avg Engagement Rate" value={typeof data?.average_engagement_rate === 'number' ? `${(data!.average_engagement_rate * 100).toFixed(2)}%` : undefined} isLoading={isLoading} barClass="bg-teal-600" />
        <StatCard icon={<Calendar className="h-5 w-5 text-indigo-600" />} label="Posts (30 days)" value={data?.posts_last_30_days} isLoading={isLoading} barClass="bg-indigo-600" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ views: { label: "Views", color: "#0b64c1" }, likes: { label: "Likes", color: "#e7eff8" } }}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="views" stroke="var(--color-views)" strokeWidth={2} dot />
                <Line type="monotone" dataKey="likes" stroke="var(--color-likes)" strokeWidth={2} dot />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ posts: { label: "Posts", color: "#0b64c1" } }}>
              <BarChart data={[{m:"Avg Likes",posts:8},{m:"Avg Comments",posts:2},{m:"Avg Shares",posts:3},{m:"Avg Clicks",posts:9}]}> 
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="m" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="posts" fill="var(--color-posts)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {/* Content Distribution Card */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 text-lg md:text-xl font-bold">Content Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center w-full">
              <div className="w-[220px] h-[180px] sm:w-[260px] sm:h-[200px] md:w-[280px] md:h-[220px] lg:w-[320px] lg:h-[240px] mx-auto">
                <ChartContainer config={{ tips:{label:"Tips", color:"#0b64c1"}, wins:{label:"Wins", color:"#e7eff8"}, news:{label:"News", color:"#daebfe"} }}>
                  <PieChart
                    width={320}
                    height={240}
                    className="w-full h-full"
                  >
                    <Pie
                      dataKey="value"
                      data={[
                        { name: "tips", value: 55 },
                        { name: "wins", value: 10 },
                        { name: "news", value: 35 }
                      ]}
                      innerRadius="60%"
                      outerRadius="100%"
                      paddingAngle={2}
                      startAngle={180}
                      endAngle={-180}
                      cx="50%"
                      cy="50%"
                    >
                      {["var(--color-tips)", "var(--color-wins)", "var(--color-news)"].map((c, i) => (
                        <Cell key={i} fill={c} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Strength Card */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 text-lg md:text-xl font-bold">Profile Strength</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center w-full">
              <div className="w-[220px] h-[180px] sm:w-[260px] sm:h-[200px] md:w-[280px] md:h-[220px] lg:w-[320px] lg:h-[240px] mx-auto">
                <ChartContainer config={{ A: { label: "Profile Strength", color: "#0b64c1" } }}>
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={radarData}
                    width={320}
                    height={240}
                    className="w-full h-full"
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Radar
                      name="Strength"
                      dataKey="A"
                      stroke="var(--color-A)"
                      fill="var(--color-A)"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts per Month moved to bottom; keep analytics above */}
      <Card className="mt-2 hidden">
        <CardHeader>
          <CardTitle>Posts per Month</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ posts: { label: "Posts", color: "#0ea5e9" } }}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="posts" fill="var(--color-posts)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Top LinkedIn Posts Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Top Post by Views</CardTitle>
            <p className="text-gray-600 text-sm">Best performing content by view count</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">LinkedIn Automation Best Practices</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Views:</span>
                  <span className="text-gray-900 font-medium ml-2">1,247</span>
                </div>
                <div>
                  <span className="text-gray-600">Likes:</span>
                  <span className="text-gray-900 font-medium ml-2">89</span>
                </div>
                <div>
                  <span className="text-gray-600">Comments:</span>
                  <span className="text-gray-900 font-medium ml-2">23</span>
                </div>
                <div>
                  <span className="text-gray-600">Engagement:</span>
                  <span className="text-[#0b64c1] font-bold ml-2">8.99%</span>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <div className="text-sm">
                  <span className="text-gray-600">Published:</span>
                  <span className="text-gray-900 ml-2">Dec 15, 2024</span>
                </div>
                <div className="text-sm mt-1">
                  <span className="text-gray-600">Post ID:</span>
                  <span className="text-gray-900 ml-2">LI_2024_001</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Top Post by Likes</CardTitle>
            <p className="text-gray-600 text-sm">Best performing content by likes</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Building Professional Networks</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Views:</span>
                  <span className="text-gray-900 font-medium ml-2">892</span>
                </div>
                <div>
                  <span className="text-gray-600">Likes:</span>
                  <span className="text-gray-900 font-medium ml-2">156</span>
                </div>
                <div>
                  <span className="text-gray-600">Comments:</span>
                  <span className="text-gray-900 font-medium ml-2">34</span>
                </div>
                <div>
                  <span className="text-gray-600">Engagement:</span>
                  <span className="text-[#0b64c1] font-bold ml-2">21.30%</span>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <div className="text-sm">
                  <span className="text-gray-600">Published:</span>
                  <span className="text-gray-900 ml-2">Dec 12, 2024</span>
                </div>
                <div className="text-sm mt-1">
                  <span className="text-gray-600">Post ID:</span>
                  <span className="text-gray-900 ml-2">LI_2024_002</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, isLoading, barClass }: { icon: React.ReactNode, label: string, value?: number | string, isLoading: boolean, barClass: string }) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          {icon}
        </div>
        <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{value ?? (isLoading ? '—' : 0)}</div>
        <div className="text-xs md:text-sm text-gray-500">{label}</div>
        <div className={`absolute bottom-0 left-0 right-0 h-1 ${barClass}`}></div>
      </CardContent>
    </Card>
  )
}


