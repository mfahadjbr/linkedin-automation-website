"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import TextEditorToolbox from "@/components/text-editor-toolbox"

export default function TextUploadPage() {
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    if (description.trim()) {
      // Handle upload logic here
      console.log("Text post:", description)
      alert("Text post created successfully!")
    }
  }

  return (
    <div className="min-h-screen p-3 md:p-4 lg:p-6">
         <div className="mb-4 md:mb-6">
          <Link href="/dashboard/upload" className="inline-flex items-center text-[#0b64c1] hover:text-[#0a58ad] mb-3 md:mb-4 text-sm md:text-base">
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-2" />
            Back to Upload Options
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Create Text Post</h1>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg">Write a text-only post with formatting tools for bold, italic, and bullet points</p>
        </div>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
       

        <div className="space-y-6 md:space-y-8">
          {/* Text Post Section */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Text Post</h2>
              
              <TextEditorToolbox
                value={description}
                onChange={setDescription}
                placeholder="Write your text post here..."
              />
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6 md:mt-8">
          <Button
            onClick={handleSubmit}
            disabled={!description.trim()}
            className="bg-[#0b64c1] hover:bg-[#0a58ad] text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base lg:text-lg w-full sm:w-auto"
          >
            Create Text Post
          </Button>
        </div>
      </div>
    </div>
  )
}
