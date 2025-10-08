import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { ChatbotWidget } from "@/components/chatbot-widget"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Linkedin Automation - Linkedin Automation Platform",
  description:
    "Linkedin Automation Platform",
  }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
        <ChatbotWidget />
      </body>
    </html>
  )
}
