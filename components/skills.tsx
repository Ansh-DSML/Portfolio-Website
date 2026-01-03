"use client"

import { useEffect, useRef, useState } from "react"

const skillCategories = [
  {
    name: "Machine Learning & AI",
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "XGBoost", "LangChain", "Hugging Face"],
  },
  {
    name: "Programming Languages",
    skills: ["Python", "R", "SQL", "JavaScript", "C++", "Julia"],
  },
  {
    name: "Data Engineering",
    skills: ["Apache Spark", "Airflow", "Pandas", "NumPy", "Dask", "ETL Pipelines"],
  },
  {
    name: "Cloud & MLOps",
    skills: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "MLflow", "Weights & Biases"],
  },
  {
    name: "Specializations",
    skills: ["NLP", "Computer Vision", "Time Series", "Recommender Systems", "Deep Learning", "Statistical Modeling"],
  },
]

export function Skills() {
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
    <section id="skills" ref={sectionRef} className="py-24 sm:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-balance">Skills & Expertise</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skillCategories.map((category, catIndex) => (
                <div
                  key={catIndex}
                  className={`group transition-all duration-700`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${catIndex * 100}ms`,
                  }}
                >
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-4 py-2 bg-background text-foreground text-sm rounded-md border border-border hover:border-accent hover:bg-secondary transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
