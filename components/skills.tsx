"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import data from "@/data/data.json"
import Image from "next/image"

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { skills } = data

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof skills>,
  )

  const categoryColors: Record<string, string> = {
    "Programming Languages": "text-blue-500",
    "Data Analysis Tools": "text-green-500",
    "Visualization Tools": "text-purple-500",
    Other: "text-amber-500",
  }

  // Map of skill names to their logo URLs
  const skillLogos: Record<string, string> = {
    Python: "/logos/python.svg",
    SQL: "/logos/sql.svg",
    R: "/logos/r.png",
    JavaScript: "/logos/javascript.svg",
    Pandas: "/logos/pandas.svg",
    NumPy: "/logos/numpy.svg",
    Excel: "/logos/excel.svg",
    "Jupyter Notebook": "/logos/jupyter.svg",
    "Power BI": "/logos/powerbi.svg",
    Tableau: "/logos/tableau.svg",
    "Looker Studio": "/logos/looker.svg",
    Seaborn: "/logos/seaborn.svg",
    Hubspot: "/logos/hubspot.svg",
    "VS Code": "/logos/vscode.svg",
  }

  return (
    <section id="skills" ref={ref} className="py-20 tech-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-2 tech-heading">
          <span className="text-primary">#</span> Skills
        </h2>
        <div className="w-20 h-1 bg-primary mb-12"></div>

        <div className="space-y-12">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className={`text-xl font-bold ${categoryColors[category] || "text-primary"}`}>{category}</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {categorySkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.05 }}
                  >
                    <Card className="tech-card h-full">
                      <CardContent className="pt-6 flex flex-col items-center justify-center h-full">
                        <div className="w-16 h-16 mb-4 relative flex items-center justify-center">
                          {skillLogos[skill.name] ? (
                            <Image
                              src={skillLogos[skill.name] || "/placeholder.svg"}
                              alt={`${skill.name} logo`}
                              width={64}
                              height={64}
                              className="object-contain"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                              {skill.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <h4 className="font-medium text-center">{skill.name}</h4>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

