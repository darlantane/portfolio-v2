"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase } from "lucide-react"
import data from "@/data/data.json"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { experience } = data

  return (
    <section id="experience" ref={ref} className="py-20 tech-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-2 tech-heading">
          <span className="text-primary">#</span> Professional Experience
        </h2>
        <div className="w-20 h-1 bg-primary mb-12"></div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-primary/30"></div>

          <div className="space-y-16">
            {experience.map((job, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Timeline bullet with icon */}
                {index !== 0 && <div className="absolute left-0 -top-12 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>}

                {/* Date badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`w-full md:w-5/12 flex ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"} mb-4 md:mb-0`}
                >
                  <div className="text-primary px-4 py-1 text-sm font-medium">
                  <div className="mb-4">
                    {job.period}
                  </div>
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="flex items-center justify-center ml-4 max-w-40" />
                  </div>
                </motion.div>

                {/* Job card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="w-full md:w-5/12 ml-5 md:ml-0"
                >
                  <Card className="tech-card">
                    <CardHeader>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="flex flex-col gap-1">
                        <span className="font-medium text-primary">{job.company}</span>
                        <span className="text-sm">{job.location}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                        {job.responsibilities.map((responsibility, idx) => (
                          <li key={idx}>{responsibility}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

