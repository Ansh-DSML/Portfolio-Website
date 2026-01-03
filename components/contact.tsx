"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Github, Linkedin, Mail, MapPin, Send, Twitter, Check, ChevronsUpDown, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const roles = [
  { value: "data-scientist", label: "Data Scientist", category: "Core (must-have)" },
  { value: "data-science-intern", label: "Data Science Intern", category: "Core (must-have)" },
  { value: "ml-engineer", label: "Machine Learning Engineer", category: "Core (must-have)" },
  { value: "ai-ml-intern-engineer", label: "AI / ML Intern/Engineer", category: "Core (must-have)" },
  { value: "data-analyst", label: "Data Analyst", category: "Analytics & Applied" },
  { value: "business-analyst", label: "Business Analyst (Data)", category: "Analytics & Applied" },
  { value: "applied-ml-engineer", label: "Applied ML Engineer", category: "Analytics & Applied" },
  { value: "research-intern", label: "Research Intern (AI / ML)", category: "Research / Advanced" },
  { value: "ai-research-engineer", label: "AI Research Engineer", category: "Research / Advanced" },
  { value: "mlops-engineer", label: "MLOps Engineer", category: "Platform / MLOps (optional but strong)" },
]

// API Configuration
// Always use the deployed backend (both local and production frontend)
const API_URL = 'https://ansh-portfolio-l6i9.onrender.com/api/contact'

// Map Select values to backend expected format
const REASON_MAP: Record<string, string> = {
  'hiring': 'Hiring / Job Opportunity',
  'collaboration': 'Project Collaboration',
  'freelance': 'Freelance / Contract Work',
  'general': 'General Inquiry',
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [reason, setReason] = useState<string>("")
  const [roleOpen, setRoleOpen] = useState(false)
  const [role, setRole] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Form state
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { toast } = useToast()
  
  const filteredRoles = role
    ? roles.filter((r) => r.label.toLowerCase().includes(role.toLowerCase()))
    : roles

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-card rounded-xl">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <a
                      href="mailto: ansh.mlops@gmail.com"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ansh.mlops@gmail.com
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
                    <p className="text-muted-foreground">India · Open to Remote / Relocation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Resume Button */}
            <div className="flex flex-col items-center mb-8">
              <Button
                size="lg"
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = '/Ansh_Resume.pdf'
                  link.download = 'Ansh_Resume.pdf'
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
                className="group text-base px-4 py-2"
              >
                <Download className="mr-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                Download Resume
              </Button>
              <p className="text-sm text-muted-foreground mt-2">Updated — 2026</p>
            </div>

            {/* Contact Form */}
            <div className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12">
              <form 
                className="space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault()
                  
                  // Client-side validation
                  if (!name.trim()) {
                    toast({
                      variant: "destructive",
                      title: "Validation Error",
                      description: "Name is required",
                    })
                    return
                  }
                  
                  if (!email.trim()) {
                    toast({
                      variant: "destructive",
                      title: "Validation Error",
                      description: "Email is required",
                    })
                    return
                  }
                  
                  if (!reason) {
                    toast({
                      variant: "destructive",
                      title: "Validation Error",
                      description: "Please select a reason",
                    })
                    return
                  }
                  
                  // Capture all form values BEFORE any state updates
                  // This ensures we read the current state values, not future ones
                  const currentName = name.trim()
                  const currentEmail = email.trim()
                  const currentReason = reason
                  const currentMessage = message.trim()
                  // Capture role value - check if it exists and has content after trim
                  const currentRole = role && typeof role === 'string' ? role.trim() : ''
                  
                  // Map reason value to backend expected format
                  const backendReason = REASON_MAP[currentReason]
                  if (!backendReason) {
                    toast({
                      variant: "destructive",
                      title: "Validation Error",
                      description: "Invalid reason value",
                    })
                    return
                  }
                  
                  // Prepare request payload
                  const payload: {
                    name: string
                    email: string
                    reason: string
                    message?: string
                    role?: string
                  } = {
                    name: currentName,
                    email: currentEmail,
                    reason: backendReason,
                    message: currentMessage || undefined,
                  }
                  
                  // Include role if reason is "Hiring / Job Opportunity" and role is filled
                  const isHiringReason = backendReason === 'Hiring / Job Opportunity'
                  if (isHiringReason && currentRole && currentRole.length > 0) {
                    payload.role = currentRole
                  }
                  
                  // Debug logging (remove in production)
                  if (process.env.NODE_ENV === 'development') {
                    console.log('Form submission - captured values:', {
                      currentReason,
                      backendReason,
                      isHiringReason,
                      roleState: role,
                      roleType: typeof role,
                      currentRole,
                      currentRoleLength: currentRole.length,
                      willIncludeRole: isHiringReason && currentRole && currentRole.length > 0,
                      payload,
                    })
                  }
                  
                  // Set loading state AFTER capturing all values
                  setIsSubmitting(true)
                  
                  try {
                    
                    // Log API URL being used (debugging)
                    if (process.env.NODE_ENV === 'development') {
                      console.log('[Contact Form] Sending request to:', API_URL);
                      console.log('[Contact Form] Payload:', JSON.stringify(payload, null, 2));
                    }
                    
                    // Send request to backend
                    const response = await fetch(API_URL, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(payload),
                    })
                    
                    // Handle response parsing
                    let data;
                    try {
                      data = await response.json()
                    } catch (parseError) {
                      // Failed to parse JSON response
                      throw new Error('Invalid response from server. Please try again later.')
                    }
                    
                    // Handle response
                    if (!response.ok) {
                      // Backend returned error (validation, rate limit, etc.)
                      throw new Error(data.error || 'Something went wrong. Please try again later.')
                    }
                    
                    if (data.success) {
                      // Success - show toast and reset form
                      toast({
                        title: "Success!",
                        description: data.message || "Message received successfully",
                      })
                      
                      // Reset form
                      setName("")
                      setEmail("")
                      setReason("")
                      setMessage("")
                      setRole("")
                    } else {
                      // Backend returned success: false
                      throw new Error(data.error || 'Something went wrong. Please try again later.')
                    }
                  } catch (error) {
                    // Handle errors with specific error types
                    let errorMessage = 'Something went wrong. Please try again later.'
                    let errorTitle = 'Error'
                    
                    // Log full error for debugging
                    if (process.env.NODE_ENV === 'development') {
                      console.error('[Contact Form] Error details:', {
                        error,
                        errorType: error instanceof Error ? error.constructor.name : typeof error,
                        errorMessage: error instanceof Error ? error.message : String(error),
                        errorStack: error instanceof Error ? error.stack : undefined,
                      })
                    }
                    
                    if (error instanceof Error) {
                      // Network/CORS errors (TypeError from fetch)
                      if (error instanceof TypeError && error.message.includes('fetch')) {
                        errorTitle = 'Network Error'
                        errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.'
                      } 
                      // CORS errors (usually manifest as network errors, but check message)
                      else if (error.message.includes('CORS') || error.message.includes('cors')) {
                        errorTitle = 'Connection Error'
                        errorMessage = 'Connection blocked. Please contact support if this persists.'
                      }
                      // Backend validation/rate limit errors (show backend message)
                      else {
                        errorTitle = 'Error'
                        errorMessage = error.message
                      }
                    } else if (typeof error === 'string') {
                      errorMessage = error
                    }
                    
                    toast({
                      variant: "destructive",
                      title: errorTitle,
                      description: errorMessage,
                    })
                  } finally {
                    // Reset loading state
                    setIsSubmitting(false)
                  }
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input 
                      id="name" 
                      placeholder="Your name" 
                      className="bg-card/50 border-border"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      className="bg-card/50 border-border"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reason" className="block text-sm font-medium mb-2">
                    Reason for reaching out
                  </label>
                  <Select value={reason} onValueChange={setReason} disabled={isSubmitting}>
                    <SelectTrigger id="reason" className="bg-card/50 border-border w-full">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hiring">Hiring / Job Opportunity</SelectItem>
                      <SelectItem value="collaboration">Project Collaboration</SelectItem>
                      <SelectItem value="freelance">Freelance / Contract Work</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {reason === "hiring" && (
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium mb-2">
                      Role
                    </label>
                    <Popover open={roleOpen} onOpenChange={setRoleOpen} modal={false}>
                      <PopoverAnchor asChild>
                        <div ref={containerRef} className="relative">
                          <Input
                            ref={inputRef}
                            id="role"
                            placeholder="Select or type a role"
                            value={role}
                            onChange={(e) => {
                              setRole(e.target.value)
                              if (!roleOpen) setRoleOpen(true)
                            }}
                            onFocus={(e) => {
                              e.target.focus()
                              setRoleOpen(true)
                            }}
                            onClick={() => setRoleOpen(true)}
                            className="bg-card/50 border-border pr-10"
                            autoComplete="off"
                            disabled={isSubmitting}
                          />
                          <ChevronsUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </PopoverAnchor>
                      <PopoverContent 
                        className="p-0 min-w-[200px]" 
                        align="start"
                        onInteractOutside={(e) => {
                          const target = e.target as Node
                          // Prevent closing when clicking on the input or container
                          if (containerRef.current?.contains(target) || inputRef.current?.contains(target)) {
                            e.preventDefault()
                          }
                        }}
                        onEscapeKeyDown={() => setRoleOpen(false)}
                      >
                        <Command shouldFilter={false}>
                          <CommandList>
                            {filteredRoles.length === 0 && (
                              <CommandEmpty>You can also type a custom role.</CommandEmpty>
                            )}
                            {filteredRoles.map((r) => (
                              <CommandItem
                                key={r.value}
                                value={r.label}
                                onSelect={(selectedLabel) => {
                                  setRole(selectedLabel)
                                  setRoleOpen(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    role === r.label ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {r.label}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You can also type a custom role.
                    </p>
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Briefly share details — role, project, or opportunity"
                    rows={6}
                    className="bg-card/50 border-border resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full md:w-auto group"
                  disabled={isSubmitting}
                >
                  <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  {isSubmitting ? 'Submitting...' : 'Submit'}
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
