import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Target, Award, TrendingUp, ArrowRight, Linkedin, Mail, Twitter } from "lucide-react"

const values = [
  {
    icon: Users,
    title: "Customer Success",
    description:
      "We're committed to helping every customer achieve their LinkedIn goals and grow their professional network.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We continuously innovate and improve our platform to stay ahead of LinkedIn's evolving landscape.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from product development to customer support.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description: "We believe in sustainable growth for our customers and our company, built on trust and results.",
  },
]

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    description: "Former LinkedIn executive with 10+ years in social media automation and B2B marketing.",
    image: "/professional-woman-ceo.png",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    description: "Expert in AI and automation technologies with experience at top tech companies.",
    image: "/professional-man-cto.png",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Product",
    description: "Product strategist focused on creating intuitive user experiences for professionals.",
    image: "/professional-woman-product-manager.png",
  },
  {
    name: "David Kim",
    role: "Head of Customer Success",
    description: "Dedicated to ensuring every customer achieves their LinkedIn automation goals.",
    image: "/professional-man-customer-success.jpg",
  },
]

const stats = [
  { value: "2019", label: "Founded" },
  { value: "10,000+", label: "Active Users" },
  { value: "50+", label: "Team Members" },
  { value: "99.9%", label: "Uptime" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold text-balance">
                About <span className="text-primary">Linkedin Automation</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                We're on a mission to help professionals and businesses unlock the full potential of LinkedIn through
                intelligent automation and meaningful connections.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-slide-in-left">
                <h2 className="text-3xl md:text-4xl font-bold text-balance">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Linkedin Automation was born from a simple frustration: spending countless hours manually managing LinkedIn
                    outreach while seeing minimal results. Our founder, Sarah Johnson, experienced this firsthand while
                    building her consulting business.
                  </p>
                  <p>
                    After years of working at LinkedIn and understanding the platform's intricacies, Sarah assembled a
                    team of experts in AI, automation, and B2B marketing to create a solution that would change how
                    professionals approach LinkedIn networking.
                  </p>
                  <p>
                    Today, Linkedin Automation helps over 10,000 professionals and businesses automate their LinkedIn activities
                    while maintaining authenticity and compliance with LinkedIn's terms of service.
                  </p>
                </div>
                <div className="flex flex-wrap gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative animate-slide-in-right">
                <div className="relative bg-card rounded-2xl border shadow-2xl p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <Linkedin className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Mission Statement</h3>
                        <p className="text-sm text-muted-foreground">Empowering professionals worldwide</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-secondary rounded-lg">
                        <h4 className="font-semibold mb-2">Our Mission</h4>
                        <p className="text-sm text-muted-foreground">
                          To democratize LinkedIn success by providing intelligent automation tools that help
                          professionals build meaningful connections and grow their businesses.
                        </p>
                      </div>

                      <div className="p-4 bg-secondary rounded-lg">
                        <h4 className="font-semibold mb-2">Our Vision</h4>
                        <p className="text-sm text-muted-foreground">
                          A world where every professional can leverage the power of LinkedIn to achieve their career
                          and business goals through authentic networking.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Our Values</h2>
              <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
                These core values guide everything we do and shape how we build products, serve customers, and grow as a
                company.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="text-center group hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section removed as requested */}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
              <h2 className="text-3xl md:text-5xl font-bold text-balance">Join Our Growing Community</h2>
              <p className="text-xl text-muted-foreground text-pretty">
                Become part of a community of successful professionals who are transforming their LinkedIn presence and
                achieving their business goals with Linkedin Automation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group text-lg px-8 py-6">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                  Contact Our Team
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
