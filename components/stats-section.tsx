"use client"

import { TrendingUp, Users, MessageCircle, Target } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Active Users",
    description: "Professionals trust our platform",
  },
  {
    icon: MessageCircle,
    value: "2.5M+",
    label: "Messages Sent",
    description: "Automated messages delivered",
  },
  {
    icon: Target,
    value: "500K+",
    label: "Connections Made",
    description: "New professional connections",
  },
  {
    icon: TrendingUp,
    value: "300%",
    label: "Average Growth",
    description: "Increase in LinkedIn engagement",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">Trusted by Thousands of Professionals</h2>
          <p className="text-xl opacity-90 text-pretty max-w-3xl mx-auto">
            Join the growing community of sales professionals, marketers, and business owners who are scaling their
            LinkedIn presence with our automation platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center space-y-4 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto">
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold">{stat.value}</div>
                <div className="text-xl font-semibold">{stat.label}</div>
                <div className="text-sm opacity-80">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
