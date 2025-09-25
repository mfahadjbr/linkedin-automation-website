import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  Users,
  Target,
  BarChart3,
  Clock,
  Shield,
  Zap,
  Brain,
  Globe,
  CheckCircle,
  ArrowRight,
} from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "Smart Messaging",
    description:
      "Send personalized messages at scale with AI-powered templates that feel authentic and drive engagement.",
    benefits: [
      "AI-powered message personalization",
      "Template library with proven results",
      "A/B testing for message optimization",
      "Automatic follow-up sequences",
    ],
  },
  {
    icon: Users,
    title: "Connection Automation",
    description:
      "Automatically send connection requests to your ideal prospects with intelligent targeting and timing.",
    benefits: [
      "Smart connection request automation",
      "Custom invitation messages",
      "Connection acceptance tracking",
      "Daily limits and safety controls",
    ],
  },
  {
    icon: Target,
    title: "Advanced Lead Targeting",
    description:
      "Find and connect with decision-makers using advanced search filters and LinkedIn Sales Navigator integration.",
    benefits: [
      "Sales Navigator integration",
      "Advanced search filters",
      "Lead scoring and qualification",
      "CRM integration capabilities",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track your LinkedIn performance with detailed analytics on connections, messages, and lead generation.",
    benefits: [
      "Real-time performance metrics",
      "Connection growth tracking",
      "Message response rates",
      "ROI and conversion analytics",
    ],
  },
  {
    icon: Clock,
    title: "Smart Scheduling",
    description: "Schedule your LinkedIn activities to run at optimal times when your prospects are most active.",
    benefits: [
      "Optimal timing recommendations",
      "Timezone-aware scheduling",
      "Activity queue management",
      "Weekend and holiday controls",
    ],
  },
  {
    icon: Shield,
    title: "Safety & Compliance",
    description: "Stay within LinkedIn's limits with built-in safety features and compliance monitoring.",
    benefits: [
      "LinkedIn limit compliance",
      "Account safety monitoring",
      "Risk assessment alerts",
      "Automatic pause features",
    ],
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-10 bg-gradient-to-br from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold text-balance">
                Powerful Features for <span className="text-primary">LinkedIn Success</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Discover all the tools and features that make Linkedin Automation the most comprehensive LinkedIn automation
                platform for professionals and businesses.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="py-5 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Even More Powerful Features</h2>
              <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
                Our platform includes additional advanced features to help you maximize your LinkedIn success.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center animate-fade-in-up">
                <CardHeader>
                  <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>AI-Powered Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Get intelligent recommendations on who to connect with and what messages to send based on AI
                    analysis.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Multi-Account Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Manage multiple LinkedIn accounts from one dashboard with team collaboration features and role-based
                    access.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Real-time Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Get instant alerts for new connections, messages, and important LinkedIn activities via email or
                    Slack.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-5 bg-gradient-to-br from-primary/5 to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
              <h2 className="text-3xl md:text-5xl font-bold text-balance">Ready to Experience All These Features?</h2>
              <p className="text-xl text-muted-foreground text-pretty">
                Start your free trial today and discover how our comprehensive feature set can transform your LinkedIn
                strategy and drive real business results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group text-lg px-8 py-6">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
