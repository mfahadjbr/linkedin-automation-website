"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, TrendingUp, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-secondary/20 py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 md:space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
              <Zap className="mr-2 h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Automate your LinkedIn growth</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance transition-colors duration-100 bg-gradient-to-b from-primary to-primary/70 bg-clip-text text-transparent">
              Linkedin Automation for Faster, Smarter Growth
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl">
              Automate outreach, grow your network, and generate more leads with intelligent workflows built for LinkedIn.
              Save hours each week while building authentic connections.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" asChild>
                <a href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="group bg-transparent">
                <Play className="mr-2 h-4 w-4" />
                <a href="/how-it-works">  
                Watch Demo
                </a>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                <span className="text-xs md:text-sm text-muted-foreground">10,000+ users</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                <span className="text-xs md:text-sm text-muted-foreground">300% avg growth</span>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="relative bg-card rounded-xl md:rounded-2xl border shadow-xl md:shadow-2xl p-4 md:p-6 lg:p-8">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Connection Requests</h3>
                    <p className="text-sm text-muted-foreground">+247 this week</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <span className="text-sm">Profile Views</span>
                    <span className="font-semibold text-primary">+89%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <span className="text-sm">Message Responses</span>
                    <span className="font-semibold text-primary">+156%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <span className="text-sm">Lead Generation</span>
                    <span className="font-semibold text-primary">+234%</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Automation Status</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
                      <span className="text-sm font-medium text-green-600">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full animate-pulse-slow"></div>
            <div
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/5 rounded-full animate-pulse-slow"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  )
}
