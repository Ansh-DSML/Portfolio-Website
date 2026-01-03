"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase, Calendar } from "lucide-react"

const experiences = [
  {
    title: "AI Engineer",
    company: "Tech Innovations Inc.",
    period: "2023 - Present",
    description:
      "Leading AI initiatives, developing LLM-powered applications, and deploying scalable machine learning models in production.",
    highlights: ["Built GPT-powered chatbot system", "Improved model accuracy by 25%", "Led team of 5 engineers"],
  },
  {
    title: "Senior Data Scientist",
    company: "DataCorp Solutions",
    period: "2021 - 2023",
    description:
      "Developed predictive models, performed advanced analytics, and established ML infrastructure across the organization.",
    highlights: [
      "Implemented recommendation system",
      "Reduced churn rate by 18%",
      "Created data pipeline architecture",
    ],
  },
  {
    title: "Data Scientist",
    company: "Analytics Hub",
    period: "2019 - 2021",
    description:
      "Built classification and regression models, performed exploratory data analysis, and collaborated with cross-functional teams.",
    highlights: ["Automated reporting dashboards", "Deployed 10+ ML models", "Conducted A/B testing experiments"],
  },
]

export function Experience() {
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
    <section id="experience" ref={sectionRef} className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-balance">Experience</h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border hidden sm:block" />

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className={`relative pl-0 sm:pl-8 transition-all duration-700 delay-${index * 150}`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-2 w-3 h-3 bg-accent rounded-full -translate-x-1.5 hidden sm:block" />

                    <div className="group hover:bg-card p-6 rounded-lg transition-all duration-300 -ml-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <p className="text-lg text-muted-foreground">{exp.company}</p>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>

                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-accent mt-1">▹</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
