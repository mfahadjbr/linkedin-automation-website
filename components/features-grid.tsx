"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Users, Target, BarChart3, Clock, Shield, Zap, Brain, Globe } from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "Smart Messaging",
    description:
      "Send personalized messages at scale with AI-powered templates that feel authentic and drive engagement.",
  },
  {
    icon: Users,
    title: "Connection Automation",
    description:
      "Automatically send connection requests to your ideal prospects with intelligent targeting and timing.",
  },
  {
    icon: Target,
    title: "Lead Targeting",
    description:
      "Find and connect with decision-makers using advanced search filters and LinkedIn Sales Navigator integration.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track your LinkedIn performance with detailed analytics on connections, messages, and lead generation.",
  },
  {
    icon: Clock,
    title: "Time Scheduling",
    description: "Schedule your LinkedIn activities to run at optimal times when your prospects are most active.",
  },
  {
    icon: Shield,
    title: "Safe & Compliant",
    description: "Stay within LinkedIn's limits with built-in safety features and compliance monitoring.",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Get intelligent recommendations on who to connect with and what messages to send.",
  },
  {
    icon: Globe,
    title: "Multi-Account Support",
    description: "Manage multiple LinkedIn accounts from one dashboard with team collaboration features.",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description: "Get real-time alerts for new connections, messages, and important LinkedIn activities.",
  },
]

export function FeaturesGrid() {
  return (
    <section className="bg-secondary/20 mb-5 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-3 md:space-y-4 mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-balance">
            The Ultimate LinkedIn Automation Platform
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Unlock powerful automation to grow your network, generate more leads, and accelerate your LinkedIn success — all with smart, safe, and easy-to-use tools.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="p-4 md:p-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <CardTitle className="text-lg md:text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <CardDescription className="text-sm md:text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
