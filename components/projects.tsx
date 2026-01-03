"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "AI-Powered Customer Analytics",
    description:
      "Built an end-to-end machine learning pipeline for customer behavior prediction using deep learning and NLP.",
    tech: ["Python", "TensorFlow", "BERT", "AWS"],
    image: "/ai-analytics-dashboard.png",
    github: "#",
    demo: "#",
  },
  {
    title: "Computer Vision Defect Detection",
    description:
      "Developed a real-time defect detection system for manufacturing using CNN and object detection algorithms.",
    tech: ["PyTorch", "OpenCV", "YOLO", "Docker"],
    image: "/computer-vision-detection.jpg",
    github: "#",
    demo: "#",
  },
  {
    title: "NLP Sentiment Analysis Platform",
    description:
      "Created a scalable sentiment analysis system processing millions of social media posts with transformer models.",
    tech: ["Hugging Face", "FastAPI", "Redis", "Kubernetes"],
    image: "/sentiment-analysis-visualization.png",
    github: "#",
    demo: "#",
  },
  {
    title: "Time Series Forecasting System",
    description:
      "Built a multi-variate time series forecasting solution for financial market prediction using LSTM and attention mechanisms.",
    tech: ["TensorFlow", "Prophet", "Pandas", "Streamlit"],
    image: "/time-series-graphs.jpg",
    github: "#",
    demo: "#",
  },
]

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
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
    <section id="projects" ref={sectionRef} className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">Featured Projects</h2>
            <p className="text-xl text-muted-foreground mb-16 text-balance">
              A selection of projects showcasing my work in AI, machine learning, and data science
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className={`group overflow-hidden hover:shadow-xl transition-all duration-500 border-border hover:border-accent`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-accent transition-colors">{project.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
