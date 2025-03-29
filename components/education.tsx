"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import data from "@/data/data.json"

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { education } = data

  return (
    <section id="education" ref={ref} className="py-20 tech-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-2 tech-heading">
          <span className="text-primary">#</span> Education
        </h2>
        <div className="w-20 h-1 bg-primary mb-12"></div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/30"></div>

          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="tech-timeline-item"
            >
              <div className="relative">
                {/* Timeline dot with icon */}
                <div className="absolute -left-8 top-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                  <GraduationCap className="h-3 w-3 text-white" />
                </div>

                <img src={edu.logo} alt={`${edu.school} logo`} className="flex items-center justify-center ml-4 w-40 mb-4" />

                {/* Content */}
                <Card className="tech-card">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="md:w-1/3">
                        <div className="text-primary font-bold text-lg mb-2">{edu.period}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{edu.location}</span>
                        </div>
                      </div>

                      <div className="md:w-2/3">
                        <h3 className="text-xl font-bold mb-1">{edu.school}</h3>
                        <h4 className="text-lg font-medium text-primary mb-3">{edu.degree}</h4>

                        <div className="mt-4">
                          <h5 className="text-sm font-medium mb-2">Subjects & Topics:</h5>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {edu.subjects.map((subject, idx) => (
                              <li key={idx}>{subject}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

