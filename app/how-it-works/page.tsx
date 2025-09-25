"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Users,
  MessageSquare,
  Target,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react"
import Link from "next/link"

const demoSteps = [
  {
    id: 1,
    title: "Smart Profile Targeting",
    description: "AI-powered targeting finds your ideal prospects based on industry, role, and engagement patterns.",
    icon: Target,
    color: "bg-primary",
    features: ["Advanced search filters", "AI prospect scoring", "Industry-specific targeting", "Engagement analysis"],
  },
  {
    id: 2,
    title: "Automated Connection Requests",
    description: "Send personalized connection requests at optimal times with intelligent rate limiting.",
    icon: Users,
    color: "bg-primary",
    features: ["Personalized messaging", "Optimal timing", "Rate limiting", "A/B testing"],
  },
  {
    id: 3,
    title: "Smart Follow-up Sequences",
    description: "Automated follow-up messages that feel natural and drive meaningful conversations.",
    icon: MessageSquare,
    color: "bg-primary",
    features: ["Multi-step sequences", "Natural language", "Response detection", "Conversation tracking"],
  },
  {
    id: 4,
    title: "Performance Analytics",
    description: "Track your growth with detailed analytics and insights to optimize your strategy.",
    icon: BarChart3,
    color: "bg-primary",
    features: ["Real-time metrics", "Growth tracking", "ROI analysis", "Strategy optimization"],
  },
  {
    id: 5,
    title: "Safety & Compliance",
    description: "LinkedIn-safe automation with built-in compliance and account protection features.",
    icon: Shield,
    color: "bg-primary",
    features: ["LinkedIn compliance", "Account protection", "Safe limits", "Risk monitoring"],
  },
  {
    id: 6,
    title: "Lightning Fast Results",
    description: "See results within days with our proven automation strategies and optimization.",
    icon: Zap,
    color: "bg-primary",
    features: ["Quick setup", "Fast results", "Proven strategies", "Continuous optimization"],
  },
]

const YOUTUBE_ID = "ysz5S6PUM-U"

export default function HowItWorksPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const toggleVideo = () => {
    setIsPlaying(!isPlaying)
  }

  const resetDemo = () => {
    setIsPlaying(false)
    setCurrentStep(1)
  }

  const currentStepData = demoSteps.find((step) => step.id === currentStep)

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="bg-gradient-to-br from-background to-secondary/20 py-5">
          <div className="container mx-auto px-4 pb-12">
            <div className="text-center space-y-6 animate-fade-in-up">
              <Badge variant="outline" className="px-4 py-2">
                <Play className="mr-2 h-4 w-4" />
                Interactive Demo
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
                See How <span className="text-primary">LinkedIn Automation</span> Works
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
                Watch our interactive demo to understand how our platform automates your LinkedIn growth while keeping your
                account safe and compliant.
              </p>
            </div>
          </div>

          {/* Video Section - Centered */}
          <div className="container mx-auto px-4 pb-16">
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden shadow-2xl">
                <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  {!isPlaying ? (
                    <div className="text-center space-y-6">
                      <div
                        className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto cursor-pointer hover:scale-110 transition-transform shadow-lg"
                        onClick={toggleVideo}
                      >
                        <Play className="h-10 w-10 text-primary-foreground ml-1" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-semibold">Watch Our Demo</h3>
                        <p className="text-muted-foreground">Click to start the interactive demonstration</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full relative">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
                        title="LinkedIn Automation Demo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                      <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded-lg p-3">
                        <div className="flex items-center justify-between text-white text-sm">
                          <span>LinkedIn Automation Demo</span>
                          <span>
                            {currentStep}:30 / {demoSteps.length}:00
                          </span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                          <div
                            className="bg-primary h-1 rounded-full transition-all duration-1000"
                            style={{ width: `${(currentStep / demoSteps.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Video Controls */}
              <div className="flex items-center justify-center space-x-4 mt-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={toggleVideo}
                  className="flex items-center space-x-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{isPlaying ? "Pause" : "Play"} Demo</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={resetDemo}
                  className="flex items-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Restart</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Choose Your Step Section */}
          <div className="container mx-auto px-4 pb-16">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold">Choose Your Step</h2>
              <p className="text-muted-foreground">Click on any step to see how it works in detail</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoSteps.map((step) => (
                <Card
                  key={step.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    currentStep === step.id ? "ring-2 ring-primary shadow-xl scale-105" : ""
                  }`}
                  onClick={() => setCurrentStep(step.id)}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center shadow-md`}>
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant={currentStep === step.id ? "default" : "secondary"}>Step {step.id}</Badge>
                    </div>

                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

                    {currentStep === step.id && (
                      <div className="pt-3 border-t border-primary/20">
                        <div className="flex items-center space-x-2 text-primary">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Currently viewing</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="container mx-auto px-4 pb-16">
            <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-2xl">
              <CardContent className="p-12 text-center space-y-6">
                <h2 className="text-3xl font-bold">Ready to Automate Your LinkedIn Growth?</h2>
                <p className="text-primary-foreground/90 max-w-2xl mx-auto text-lg">
                  Join thousands of professionals who are already using our platform to grow their LinkedIn presence and
                  generate more leads automatically.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/signup">
                    <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                      Start Free Trial
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent w-full sm:w-auto">
                    Schedule Demo Call
                  </Button>
              </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


