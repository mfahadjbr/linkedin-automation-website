"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, ArrowLeft, X, Image as ImageIcon, Link as LinkIcon } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import useUpload from "@/lib/hooks/upload/useUpload"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"

export default function ImagesUploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [description, setDescription] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [mode, setMode] = useState<'file' | 'url' | 'both'>("file")
  const [imageUrlsInput, setImageUrlsInput] = useState("")

  const handleFileSelect = (files: FileList) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'))
    setSelectedFiles(prev => [...prev, ...imageFiles])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      handleFileSelect(files)
    }
  }

  const triggerFileInput = () => {
    const fileInput = document.getElementById('images-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const { createImagePost, createMultiImagePost, isLoading, error, successMessage, lastPost, resetUpload } = useUpload()

  const parseUrls = (raw: string) => raw
    .split(/\n|,|\s+/)
    .map(s => s.trim())
    .filter(Boolean)

  const handleSubmit = async () => {
    const urls = parseUrls(imageUrlsInput)
    const files = selectedFiles
    const total = files.length + urls.length
    if (total >= 2) {
      try {
        const res = await createMultiImagePost({ files, imageUrls: urls, text: description.trim(), visibility: 'PUBLIC' })
        if (res?.success) {
          setSelectedFiles([])
          setDescription('')
          setImageUrlsInput('')
        }
      } catch {}
      return
    }
    // Fallback for single image use-case when only one source provided
    if (mode !== 'url' && files.length === 1 && description.trim()) {
      try {
        const res = await createImagePost({ file: files[0], text: description.trim(), visibility: 'PUBLIC' })
        if (res?.success) {
          setSelectedFiles([])
          setDescription('')
          setImageUrlsInput('')
        }
      } catch {}
      return
    }
    if (mode !== 'file' && urls.length === 1 && description.trim()) {
      try {
        const res = await createImagePost({ imageUrl: urls[0], text: description.trim(), visibility: 'PUBLIC' })
        if (res?.success) {
          setSelectedFiles([])
          setDescription('')
          setImageUrlsInput('')
        }
      } catch {}
    }
  }

  return (
    <div className="min-h-screen p-3 md:p-4 lg:p-6">
         <div className="mb-4 md:mb-6">
          <Link href="/dashboard/upload" className="inline-flex items-center text-[#0b64c1] hover:text-[#0a58ad] mb-3 md:mb-4 text-sm md:text-base">
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-2" />
            Back to Upload Options
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Upload Your Images</h1>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg">Upload multiple images or submit image URLs, and write a description</p>
        </div>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
       

        <div className="space-y-6 md:space-y-8">
          {/* Images Upload Section */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Images Upload</h2>
              {/* Mode selector */}
              <div className="mb-4">
                <Label className="mb-2 block text-sm md:text-base">Choose input mode</Label>
                <RadioGroup
                  value={mode}
                  onValueChange={(v) => setMode(v as 'file' | 'url' | 'both')}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="mode-file" value="file" />
                    <Label htmlFor="mode-file">Files</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="mode-url" value="url" />
                    <Label htmlFor="mode-url">URLs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="mode-both" value="both" />
                    <Label htmlFor="mode-both">Both</Label>
                  </div>
                </RadioGroup>
              </div>
              {/* Upload Area - Files (shown for file or both) */}
              {mode !== 'url' && (
                <div
                  className={`border-2 border-dashed rounded-lg p-4 md:p-6 lg:p-8 text-center transition-colors mb-3 md:mb-4 ${
                    isDragging 
                      ? 'border-[#0b64c1] bg-[#e7eff8]' 
                      : 'border-gray-300 hover:border-[#0b64c1] hover:bg-gray-50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                    id="images-upload"
                  />
                  <Button 
                    onClick={triggerFileInput}
                    className="bg-[#0b64c1] hover:bg-[#0a58ad] text-white mb-4 md:mb-6 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base lg:text-lg w-full sm:w-auto"
                  >
                    <Upload className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    Upload Files
                  </Button>
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#e7eff8] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <ImageIcon className="h-8 w-8 md:h-10 md:w-10 text-[#0b64c1]" />
                  </div>
                  <div className="mb-4 md:mb-6">
                    <p className="text-lg md:text-xl font-medium text-gray-900 mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs md:text-sm text-gray-500">JPG, PNG, GIF, or any image format</p>
                  </div>
                  <Button 
                    onClick={triggerFileInput}
                    variant="outline" 
                    className="border-[#0b64c1] text-[#0b64c1] hover:bg-[#0b64c1] hover:text-white px-4 md:px-6 py-2 text-sm md:text-base w-full sm:w-auto"
                  >
                    Choose Image Files
                  </Button>
                </div>
              )}

              {/* URL Area (shown for url or both) */}
              {mode !== 'file' && (
                <div className="border rounded-lg p-4 md:p-6 mb-4">
                  <div className="flex items-center gap-2 mb-2 text-gray-700">
                    <LinkIcon className="h-4 w-4" />
                    <span className="font-medium">Submit image URLs</span>
                  </div>
                  <Label htmlFor="image-urls" className="text-sm">Enter one or more URLs (comma or newline separated)</Label>
                  <Textarea
                    id="image-urls"
                    placeholder="https://example.com/image1.jpg\nhttps://example.com/image2.png"
                    value={imageUrlsInput}
                    onChange={(e) => setImageUrlsInput(e.target.value)}
                    className="min-h-[120px] mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-2">We will use the provided URLs {mode==='both' ? 'in addition to uploaded files' : 'instead of uploading files'}.</p>
                </div>
              )}

              {/* Selected Images Preview */}
              {mode !== 'url' && selectedFiles.length > 0 && (
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-base md:text-lg font-medium text-gray-900">Selected Images ({selectedFiles.length})</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 md:top-2 right-1 md:right-2 h-5 w-5 md:h-6 md:w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-2 w-2 md:h-3 md:w-3" />
                        </Button>
                        <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                        <p className="text-xs text-gray-400">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Description Section */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Post Description</h2>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your post description here..."
                className="min-h-[160px]"
              />
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
                    </AlertDescription>
                  </Alert>
                )}
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6 md:mt-8">
          <Button
            onClick={handleSubmit}
            disabled={((selectedFiles.length + parseUrls(imageUrlsInput).length) < 1) || !description.trim() || isLoading}
            className={`bg-[#0b64c1] hover:bg-[#0a58ad] text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base lg:text-lg w-full sm:w-auto ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <Spinner size="sm" />
                <span>Posting…</span>
              </span>
            ) : (
              (selectedFiles.length + parseUrls(imageUrlsInput).length) >= 2 ? 'Post Carousel' : 'Post Single Image'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
