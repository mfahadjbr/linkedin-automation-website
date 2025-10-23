
"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import usePosts from "@/lib/hooks/posts/usePosts"
import { Spinner } from "@/components/ui/spinner"

function MediaPostsTab() {
  const [tab, setTab] = useState<'image' | 'multi-image'>('image')
  const postsHook = usePosts(tab, 10)
  const { posts, isLoading, error, page, pageSize, total, fetchPosts, goToPage } = postsHook

  useEffect(() => { fetchPosts(1) }, [tab])

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Button
          variant={tab === 'image' ? 'default' : 'outline'}
          onClick={() => setTab('image')}
        >
          Image Posts
        </Button>
        <Button
          variant={tab === 'multi-image' ? 'default' : 'outline'}
          onClick={() => setTab('multi-image')}
        >
          Multi-Image Posts
        </Button>
      </div>
      {isLoading ? <Spinner /> : error ? <div className="text-red-500">{error}</div> : (
        <div>
          {posts.length === 0 ? <div className="text-gray-500">No posts found.</div> : (
            <div className="space-y-4">
              {posts.map((post: any) => (
                <Card key={post.post_id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                      <div className="flex-1">
                        <div className="font-semibold text-lg mb-1">{post.text || <span className="italic text-gray-400">No caption</span>}</div>
                        <div className="text-xs text-gray-500 mb-2">{new Date(post.posted_at).toLocaleString()} | {post.visibility}</div>
                        <a href={post.post_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View on LinkedIn</a>
                        <div className="text-xs text-gray-400 mt-1">Status: {post.status}</div>
                      </div>
                      {tab === 'image' && post.image_urn && (() => {
                        const assetId = post.image_urn.split(':').pop();
                        const imgUrl = `https://media.licdn.com/dms/image/v2/${assetId}/original`;
                        console.log('Image Post URL:', imgUrl, 'Asset ID:', assetId, post);
                        return (
                          <img
                            src={imgUrl}
                            alt={post.image_filename || 'Image'}
                            className="w-32 h-32 object-cover rounded"
                            loading="lazy"
                            onError={(e) => {
                              const img = e.currentTarget;
                              // Check if we've already tried the fallback
                              if (!img.dataset.fallbackAttempted) {
                                console.error('Image failed to load:', imgUrl);
                                // Try alternative URL format
                                const altUrl = `https://media.licdn.com/dms/image/${assetId}/original`;
                                img.dataset.fallbackAttempted = 'true';
                                img.src = altUrl;
                              } else {
                                // Both URLs failed, use placeholder
                                console.error('Both image URLs failed, using placeholder');
                                img.src = '/placeholder.jpg';
                              }
                            }}
                          />
                        );
                      })()}
                      {tab === 'multi-image' && post.images && (
                        <div className="flex gap-2 flex-wrap mt-2 md:mt-0">
                          {post.images.map((img: any, idx: number) => {
                            const assetId = img.asset_urn.split(':').pop();
                            const imgUrl = `https://media.licdn.com/dms/image/v2/${assetId}/original`;
                            console.log('Multi-Image Post URL:', imgUrl, 'Asset ID:', assetId, img);
                            return (
                              <img
                                key={idx}
                                src={imgUrl}
                                alt={img.filename}
                                className="w-20 h-20 object-cover rounded"
                                loading="lazy"
                                onError={(e) => {
                                  const imgElement = e.currentTarget;
                                  // Check if we've already tried the fallback
                                  if (!imgElement.dataset.fallbackAttempted) {
                                    console.error('Multi-image failed to load:', imgUrl);
                                    const altUrl = `https://media.licdn.com/dms/image/${assetId}/original`;
                                    imgElement.dataset.fallbackAttempted = 'true';
                                    imgElement.src = altUrl;
                                  } else {
                                    // Both URLs failed, use placeholder
                                    console.error('Both multi-image URLs failed, using placeholder');
                                    imgElement.src = '/placeholder.jpg';
                                  }
                                }}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="flex justify-between items-center mt-6">
            <Button disabled={page <= 1} onClick={() => goToPage(page - 1)}>Previous</Button>
            <span className="text-sm">Page {page} of {Math.ceil(total / pageSize) || 1}</span>
            <Button disabled={page >= Math.ceil(total / pageSize)} onClick={() => goToPage(page + 1)}>Next</Button>
          </div>
        </div>
      )}
    </div>
  )
}


function TextPostsTab() {
  const postsHook = usePosts('text', 10)
  const { posts, isLoading, error, page, pageSize, total, fetchPosts, goToPage } = postsHook

  useEffect(() => { fetchPosts(1) }, [])

  return (
    <div>
      {isLoading ? <Spinner /> : error ? <div className="text-red-500">{error}</div> : (
        <div>
          {posts.length === 0 ? <div className="text-gray-500">No posts found.</div> : (
            <div className="space-y-4">
              {posts.map((post: any) => (
                <Card key={post.post_id}>
                  <CardContent className="p-4">
                    <div className="font-semibold text-lg mb-1">{post.text || <span className="italic text-gray-400">No text</span>}</div>
                    <div className="text-xs text-gray-500 mb-2">{new Date(post.posted_at).toLocaleString()} | {post.visibility}</div>
                    <a href={post.post_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View on LinkedIn</a>
                    <div className="text-xs text-gray-400 mt-1">Status: {post.status}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="flex justify-between items-center mt-6">
            <Button disabled={page <= 1} onClick={() => goToPage(page - 1)}>Previous</Button>
            <span className="text-sm">Page {page} of {Math.ceil(total / pageSize) || 1}</span>
            <Button disabled={page >= Math.ceil(total / pageSize)} onClick={() => goToPage(page + 1)}>Next</Button>
          </div>
        </div>
      )}
    </div>
  )
}

function VideoPostsTab() {
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 10

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const token = localStorage.getItem('auth_token')
        
        if (!token) {
          throw new Error('No authentication token found. Please log in.')
        }

        const res = await fetch(`/api/proxy/video-posts?limit=${pageSize}&offset=${(page-1)*pageSize}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (!res.ok) throw new Error('Failed to fetch video posts')
        const data = await res.json()
        if (!data.success) throw new Error(data.error || 'Failed to fetch video posts')
        setPosts(data.posts)
        setTotal(data.total)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch video posts')
      } finally {
        setIsLoading(false)
      }
    }
    fetchVideos()
  }, [page])

  return (
    <div>
      {isLoading ? <Spinner /> : error ? <div className="text-red-500">{error}</div> : (
        <div>
          {posts.length === 0 ? <div className="text-gray-500">No video posts found.</div> : (
            <div className="space-y-4">
              {posts.map((post: any) => (
                <Card key={post.post_id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                      <div className="flex-1">
                        <div className="font-semibold text-lg mb-1">{post.title || <span className="italic text-gray-400">No title</span>}</div>
                        <div className="text-xs text-gray-500 mb-2">{new Date(post.posted_at).toLocaleString()} | {post.visibility}</div>
                        <a href={post.post_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View on LinkedIn</a>
                        <div className="text-xs text-gray-400 mt-1">Status: {post.status}</div>
                        {post.text && <div className="text-sm text-gray-700 mt-2">{post.text}</div>}
                      </div>
                      {post.video_urn && (() => {
                        const assetId = post.video_urn.split(':').pop();
                        const videoUrl = `https://media.licdn.com/dms/video/v2/${assetId}/original`;
                        console.log('Video Post URL:', videoUrl, 'Asset ID:', assetId, post);
                        return (
                          <video
                            controls
                            controlsList="nodownload"
                            className="w-48 h-32 rounded bg-black mt-4 md:mt-0"
                            poster="/placeholder.jpg"
                            preload="metadata"
                            playsInline
                            onError={(e) => {
                              const videoElement = e.currentTarget;
                              const source = videoElement.querySelector('source');
                              // Check if we've already tried the fallback
                              if (source && !videoElement.dataset.fallbackAttempted) {
                                console.error('Video failed to load:', videoUrl);
                                // Try alternative URL format
                                const altUrl = `https://media.licdn.com/dms/video/${assetId}/original`;
                                videoElement.dataset.fallbackAttempted = 'true';
                                source.src = altUrl;
                                videoElement.load(); // Reload the video with new source
                              } else {
                                // Both URLs failed
                                console.error('Both video URLs failed, cannot load video');
                              }
                            }}
                          >
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        );
                      })()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="flex justify-between items-center mt-6">
            <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</Button>
            <span className="text-sm">Page {page} of {Math.ceil(total / pageSize) || 1}</span>
            <Button disabled={page >= Math.ceil(total / pageSize)} onClick={() => setPage(page + 1)}>Next</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function PostsPage() {
  const [postType, setPostType] = useState<'text' | 'media' | 'video'>('text')

  return (
    <div className="max-w-4xl mx-auto py-8 px-2 md:px-0">
      <h1 className="text-2xl font-bold mb-6">My LinkedIn Posts</h1>
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm bg-gray-100 p-1">
          <button
            className={`px-4 py-2 rounded-l-md text-sm font-medium focus:outline-none transition-colors ${postType === 'text' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'}`}
            onClick={() => setPostType('text')}
            type="button"
          >
            Text Posts
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium focus:outline-none transition-colors ${postType === 'media' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'}`}
            onClick={() => setPostType('media')}
            type="button"
          >
            Image/Multi-Image Posts
          </button>
          <button
            className={`px-4 py-2 rounded-r-md text-sm font-medium focus:outline-none transition-colors ${postType === 'video' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'}`}
            onClick={() => setPostType('video')}
            type="button"
          >
            Video Posts
          </button>
        </div>
      </div>
      <div>
        {postType === 'text' && <TextPostsTab />}
        {postType === 'media' && <MediaPostsTab />}
        {postType === 'video' && <VideoPostsTab />}
      </div>
    </div>
  )
}


