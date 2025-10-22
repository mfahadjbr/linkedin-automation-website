"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, ArrowLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"

export default function VideoUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
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
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const triggerFileInput = () => {
    const fileInput = document.getElementById('video-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  const handleSubmit = () => {
    if (selectedFile && description.trim()) {
      // Handle upload logic here
      console.log("Uploading video:", selectedFile.name)
      console.log("Description:", description)
      alert("Video uploaded successfully!")
    }
  }

  return (
    <div className="min-h-screen p-3 md:p-4 lg:p-6">
      <div className="mb-4 md:mb-6">
          <Link href="/dashboard/upload" className="inline-flex items-center text-[#0b64c1] hover:text-[#0a58ad] mb-3 md:mb-4 text-sm md:text-base">
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-2" />
            Back to Upload Options
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Upload Your Video</h1>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg">Upload a video file and we'll automatically generate titles, descriptions, timestamps, and thumbnails using AI</p>
        </div>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="space-y-6 md:space-y-8">
          {/* Video Upload Section */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Video Upload</h2>
              
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-4 md:p-6 lg:p-8 text-center transition-colors ${
                  isDragging 
                    ? 'border-[#0b64c1] bg-[#e7eff8]' 
                    : 'border-gray-300 hover:border-[#0b64c1] hover:bg-gray-50'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                {selectedFile ? (
                  <div className="space-y-3 md:space-y-4">
                    {/* Video Preview */}
                    <div className="relative">
                      <video
                        src={URL.createObjectURL(selectedFile)}
                        controls
                        className="w-full h-32 sm:h-40 md:h-48 bg-black rounded-lg object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-base md:text-lg font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-xs md:text-sm text-gray-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedFile(null)}
                      className="w-full text-red-600 border-red-300 hover:bg-red-50 text-sm md:text-base"
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 md:space-y-6">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileInput}
                      className="hidden"
                      id="video-upload"
                    />
                    <Button 
                      onClick={triggerFileInput}
                      className="bg-[#0b64c1] hover:bg-[#0a58ad] text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base lg:text-lg w-full sm:w-auto"
                    >
                      <Upload className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                      Upload File
                    </Button>
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#e7eff8] rounded-full flex items-center justify-center mx-auto">
                      <Upload className="h-8 w-8 md:h-10 md:w-10 text-[#0b64c1]" />
                    </div>
                    <div>
                      <p className="text-lg md:text-xl font-medium text-gray-900 mb-2">Click to upload or drag and drop</p>
                      <p className="text-xs md:text-sm text-gray-500">MP4, MOV, AVI, or any video format</p>
                    </div>
                    <Button 
                      onClick={triggerFileInput}
                      variant="outline" 
                      className="border-[#0b64c1] text-[#0b64c1] hover:bg-[#0b64c1] hover:text-white px-4 md:px-6 py-2 text-sm md:text-base w-full sm:w-auto"
                    >
                      Choose Video File
                    </Button>
                  </div>
                )}
              </div>
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
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6 md:mt-8">
          <Button
            onClick={handleSubmit}
            disabled={!selectedFile || !description.trim()}
            className="bg-[#0b64c1] hover:bg-[#0a58ad] text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base lg:text-lg w-full sm:w-auto"
          >
            Upload Video & Post
          </Button>
        </div>
      </div>
    </div>
  )
}
