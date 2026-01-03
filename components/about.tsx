"use client"

import { useEffect, useRef, useState } from "react"

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
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
    <section id="about" ref={sectionRef} className="py-24 sm:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-balance">About Me</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate <span className="text-foreground font-semibold">Data Scientist</span> and{" "}
                <span className="text-foreground font-semibold">AI Engineer</span> with a deep fascination for
                transforming complex data into actionable insights and building intelligent systems that push the
                boundaries of what's possible.
              </p>
              <p>
                Currently working as an AI Engineer, I specialize in developing machine learning models, natural
                language processing systems, and data-driven solutions that solve real-world business challenges. My
                work spans across computer vision, predictive analytics, and deep learning applications.
              </p>
              <p>
                With expertise in Python, TensorFlow, PyTorch, and various cloud platforms, I bridge the gap between
                cutting-edge research and practical implementation. I'm committed to building ethical, scalable AI
                systems that make a positive impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
