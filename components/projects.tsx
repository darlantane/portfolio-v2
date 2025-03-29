"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, FileCode, BarChart4 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import data from "@/data/data.json"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { projects } = data
  const [selectedType, setSelectedType] = useState("all")

  const filteredProjects =
    selectedType === "all" ? projects : projects.filter((project) => project.type === selectedType)

  const projectTypes = ["all", ...new Set(projects.map((project) => project.type))]

  const getProjectIcon = (type: string) => {
    switch (type) {
      case "data-analysis":
        return <BarChart4 className="h-5 w-5" />
      case "development":
        return <FileCode className="h-5 w-5" />
      default:
        return <BarChart4 className="h-5 w-5" />
    }
  }

  return (
    <section id="projects" ref={ref} className="py-20 tech-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-2 tech-heading">
          <span className="text-primary">#</span> Projects
        </h2>
        <div className="w-20 h-1 bg-primary mb-8"></div>

        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {projectTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className={`capitalize tech-button ${selectedType === type ? "" : "hover:border-primary"}`}
              >
                {type === "all" ? "All Projects" : type.replace("-", " ")}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            >
              <Card className="h-full flex flex-col tech-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="p-2 rounded-md bg-primary/10">{getProjectIcon(project.type)}</div>
                    <Badge variant="outline" className="capitalize tech-badge">
                      {project.type.replace("-", " ")}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4">{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <h4 className="text-sm font-medium mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="px-2 py-1 tech-badge">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  {project.link && (
                    <Button variant="outline" size="sm" className="flex items-center gap-2 tech-button" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        View Project <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

