
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
      <TabsList className="mb-4">
        <TabsTrigger value="image" onClick={() => setTab('image')}>Image Posts</TabsTrigger>
        <TabsTrigger value="multi-image" onClick={() => setTab('multi-image')}>Multi-Image Posts</TabsTrigger>
      </TabsList>
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
                      {tab === 'image' && post.image_urn && (
                        <img
                          src={`https://media.licdn.com/dms/image/${post.image_urn.split(':').pop()?.toLowerCase()}/original`}
                          alt={post.image_filename || 'Image'}
                          className="w-32 h-32 object-cover rounded"
                          loading="lazy"
                        />
                      )}
                      {tab === 'multi-image' && post.images && (
                        <div className="flex gap-2 flex-wrap mt-2 md:mt-0">
                          {post.images.map((img: any, idx: number) => (
                            <img
                              key={idx}
                              src={`https://media.licdn.com/dms/image/${img.asset_urn.split(':').pop()?.toLowerCase()}/original`}
                              alt={img.filename}
                              className="w-20 h-20 object-cover rounded"
                              loading="lazy"
                            />
                          ))}
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

export default function PostsPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-2 md:px-0">
      <h1 className="text-2xl font-bold mb-6">My LinkedIn Posts</h1>
      <Tabs defaultValue="media" className="w-full">
        <TabsList>
          <TabsTrigger value="media">Media Posts</TabsTrigger>
          <TabsTrigger value="text">Text Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="media">
          <MediaPostsTab />
        </TabsContent>
        <TabsContent value="text">
          <TextPostsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}


