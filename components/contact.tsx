"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, MapPin, Send, Twitter } from "lucide-react"

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="py-24 sm:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div
            className={`transition-all duration-700 text-center mb-16 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">Let's Build Something Together</h2>
            <p className="text-xl text-muted-foreground text-balance">
              I'm always interested in hearing about new projects and opportunities. Whether you have a question or just
              want to say hi, feel free to reach out!
            </p>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-card rounded-xl">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:hello@example.com"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      hello@example.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-card rounded-xl">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Location</h3>
                    <p className="text-muted-foreground">Available Worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" className="bg-card/50 border-border" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="your@email.com" className="bg-card/50 border-border" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What's this about?" className="bg-card/50 border-border" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={6}
                    className="bg-card/50 border-border resize-none"
                  />
                </div>

                <Button size="lg" className="w-full md:w-auto group">
                  <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Social Links and Footer */}
            <div className="text-center mt-12">
              <div className="flex items-center justify-center gap-6 mb-8">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
                >
                  <Github className="h-7 w-7" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="h-7 w-7" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
                >
                  <Twitter className="h-7 w-7" />
                </a>
              </div>

              <div className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} All rights reserved. Built with Next.js and deployed on Vercel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
