"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import data from "@/data/data.json"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { about } = data

  return (
    <section id="about" ref={ref} className="py-20 tech-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto"
      >
        <h2 className="text-3xl font-bold mb-2 tech-heading">
          <span className="text-primary">#</span> About Me
        </h2>
        <div className="w-20 h-1 bg-primary mb-8"></div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            {about.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="text-muted-foreground"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8"
            >
              <h3 className="text-lg font-semibold mb-3">Languages</h3>
              <div className="flex gap-2 flex-wrap">
                {about.languages.map((language, index) => (
                  <div key={index} className="flex items-center">
                    <ChevronRight className="text-primary h-4 w-4 mr-1" />
                    <span>
                      {language.name} <span className="text-muted-foreground">({language.level})</span>
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4"
            >
              <h3 className="text-lg font-semibold mb-3">Interests</h3>
              <div className="flex gap-2 flex-wrap">
                {about.interests.map((interest, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1 tech-badge">
                    {interest}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="tech-card p-6"
          >
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">Data Analysis Journey</h3>
                <div className="space-y-4">
                  {about.journey.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                      className="flex gap-3"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs">
                          {index + 1}
                        </div>
                        {index < about.journey.length - 1 && <div className="w-0.5 h-full bg-primary/30 mt-1"></div>}
                      </div>
                      <div className="pb-6">
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

