"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Link as LinkIcon, Video as VideoIcon, ArrowLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import useUpload from "@/lib/hooks/upload/useUpload"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"

const VIDEO_FORMATS = ["mp4", "mov", "avi", "wmv", "flv", "mkv", "webm", "m4v"]
const MAX_SIZE = 5 * 1024 * 1024 * 1024 // 5GB

export default function VideoUploadPage() {
  const [mode, setMode] = useState<'file' | 'url'>("file")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [visibility, setVisibility] = useState<'PUBLIC' | 'CONNECTIONS'>("PUBLIC")

  const { createVideoPost, isLoading, error, successMessage, lastPost, resetUpload } = useUpload()

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase()
      if (!ext || !VIDEO_FORMATS.includes(ext)) {
        alert("Unsupported video format. Allowed: " + VIDEO_FORMATS.join(", "))
        return
      }
      if (file.size > MAX_SIZE) {
        alert("File too large. Max 5GB allowed.")
        return
      }
      setSelectedFile(file)
    }
  }

  const handleSubmit = async () => {
    if (mode === "file" && !selectedFile) return
    if (mode === "url" && !videoUrl.trim()) return
    try {
      const res = await createVideoPost({
        video: mode === "file" ? selectedFile! : undefined,
        video_url: mode === "url" ? videoUrl.trim() : undefined,
        title: title.trim() || undefined,
        text: description.trim() || undefined,
        visibility,
      })
      if (res?.success) {
        setSelectedFile(null)
        setVideoUrl("")
        setTitle("")
        setDescription("")
        resetUpload()
      }
    } catch {}
  }

  return (
    <div className="min-h-screen p-3 md:p-4 lg:p-6">
      <div className="mb-4 md:mb-6">
        <Link href="/dashboard/upload" className="inline-flex items-center text-[#0b64c1] hover:text-[#0a58ad] mb-3 md:mb-4 text-sm md:text-base">
          <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-2" />
          Back to Upload Options
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Upload a Video Post</h1>
        <p className="text-gray-600 text-sm md:text-base lg:text-lg">Share a video on LinkedIn by uploading a file or providing a direct video URL.</p>
      </div>
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white border border-gray-200 mb-6">
          <CardContent className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Video Source</h2>
            <div className="mb-4">
              <Label className="mb-2 block text-sm md:text-base">Choose input mode</Label>
              <RadioGroup value={mode} onValueChange={v => setMode(v as 'file' | 'url')} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="mode-file" value="file" />
                  <Label htmlFor="mode-file">Upload File</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="mode-url" value="url" />
                  <Label htmlFor="mode-url">Video URL</Label>
                </div>
              </RadioGroup>
            </div>
            {mode === "file" && (
              <div className="mb-4">
                <Input type="file" accept={VIDEO_FORMATS.map(f => "."+f).join(",")} onChange={handleFileInput} />
                {selectedFile && (
                  <div className="mt-2 text-xs text-gray-700">Selected: {selectedFile.name} ({(selectedFile.size/(1024*1024)).toFixed(1)} MB)</div>
                )}
              </div>
            )}
            {mode === "url" && (
              <div className="mb-4">
                <Label htmlFor="video-url" className="text-sm">Direct video URL</Label>
                <Input id="video-url" type="url" placeholder="https://example.com/video.mp4" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />
              </div>
            )}
            <div className="mb-4">
              <Label htmlFor="title" className="text-sm">Title (optional, max 200 chars)</Label>
              <Input id="title" maxLength={200} value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter a title for your video" />
            </div>
            <div className="mb-4">
              <Label htmlFor="description" className="text-sm">Description (optional, max 3000 chars)</Label>
              <Textarea id="description" maxLength={3000} value={description} onChange={e => setDescription(e.target.value)} placeholder="Write a caption or description..." className="min-h-[120px]" />
            </div>
            <div className="mb-4">
              <Label className="text-sm mb-2 block">Visibility</Label>
              <RadioGroup value={visibility} onValueChange={v => setVisibility(v as 'PUBLIC' | 'CONNECTIONS')} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="vis-public" value="PUBLIC" />
                  <Label htmlFor="vis-public">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="vis-connections" value="CONNECTIONS" />
                  <Label htmlFor="vis-connections">Connections</Label>
                </div>
              </RadioGroup>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Post failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {successMessage && (
              <Alert className="mt-4">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  {successMessage}
                  {lastPost?.post_url && (
                    <>
                      {" "}
                      <a href={lastPost.post_url} target="_blank" rel="noopener noreferrer" className="underline">View on LinkedIn</a>
                    </>
                  )}
                  {lastPost && (lastPost as any).status && (
                    <div className="text-xs text-gray-500 mt-2">Status: {(lastPost as any).status}</div>
                  )}
                </AlertDescription>
              </Alert>
            )}
            <div className="flex justify-center mt-6 md:mt-8">
              <Button
                onClick={handleSubmit}
                disabled={isLoading || (mode === "file" && !selectedFile) || (mode === "url" && !videoUrl.trim())}
                className={`bg-[#0b64c1] hover:bg-[#0a58ad] text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base lg:text-lg w-full sm:w-auto ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <Spinner size="sm" />
                    <span>Posting…</span>
                  </span>
                ) : (
                  "Post Video"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
