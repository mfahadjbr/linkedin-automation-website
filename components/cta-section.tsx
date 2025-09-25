"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

const benefits = ["14-day free trial", "No credit card required", "Cancel anytime", "24/7 support"]

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/20 ">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">Ready to Transform Your LinkedIn Strategy?</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Join thousands of professionals who are already growing their networks and generating more leads with our
            intelligent LinkedIn automation platform.
          </p>

          <div className="flex flex-wrap justify-center gap-6 py-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group text-lg px-8 py-6">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              Schedule a Demo
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            No spam, no risk. Start automating your LinkedIn growth today.
          </p>
        </div>
      </div>
    </section>
  )
}
