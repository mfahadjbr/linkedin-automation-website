"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Image, FileText } from "lucide-react"
import Link from "next/link"

export default function UploadPage() {
  return (
    <div className="min-h-screen p-3 md:p-6">
      <div className="mb-4 md:mb-6 lg:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 lg:mb-8">Upload Posts</h1>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh]">
          <div className="w-full">
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-3 md:p-4 lg:p-6 xl:p-8">
                <div className="text-center mb-4 md:mb-6 lg:mb-8">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3 lg:mb-4">Choose Upload Type</h2>
                  <p className="text-gray-600 text-sm md:text-base lg:text-lg">Select the type of content you want to upload</p>
                </div>
            
                <div className="grid gap-3 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/dashboard/upload/video" className="block">
                <Card className="bg-white border-2 border-gray-200 hover:border-[#0b64c1] transition-colors cursor-pointer h-full">
                  <CardContent className="p-3 md:p-4 lg:p-6 text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#e7eff8] rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 lg:mb-4">
                      <Video className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-[#0b64c1]" />
                    </div>
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2">Video & Text Upload</h3>
                    <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed">Upload a video file and write a detailed description with formatting tools</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/dashboard/upload/images" className="block">
                <Card className="bg-white border-2 border-gray-200 hover:border-[#0b64c1] transition-colors cursor-pointer h-full">
                  <CardContent className="p-3 md:p-4 lg:p-6 text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#e7eff8] rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 lg:mb-4">
                      <Image className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-[#0b64c1]" />
                    </div>
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2">Images & Text Upload</h3>
                    <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed">Upload multiple images and write a detailed description with formatting tools</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/dashboard/upload/text" className="block">
                <Card className="bg-white border-2 border-gray-200 hover:border-[#0b64c1] transition-colors cursor-pointer h-full">
                  <CardContent className="p-3 md:p-4 lg:p-6 text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#e7eff8] rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 lg:mb-4">
                      <FileText className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-[#0b64c1]" />
                    </div>
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2">Text Post Only</h3>
                    <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed">Write a text-only post with formatting tools for bold, italic, and bullet points</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


