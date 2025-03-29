"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Award, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import data from "@/data/data.json"

export default function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { certifications } = data

  return (
    <section id="certifications" ref={ref} className="py-20 tech-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-2 tech-heading">
          <span className="text-primary">#</span> Certifications
        </h2>
        <div className="w-20 h-1 bg-primary mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((certification, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            >
              <Card className="h-full flex flex-col tech-card">
                <CardContent className="pt-6 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">{certification.name}</h3>
                  </div>

                  <div className="text-sm text-muted-foreground mb-3">
                    <p>Issued by: {certification.issuer}</p>
                    {certification.date && <p>Date: {certification.date}</p>}
                  </div>

                  <div className="flex-grow"></div>

                  {certification.link && (
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="flex items-center gap-2 tech-button" asChild>
                        <a href={certification.link} target="_blank" rel="noopener noreferrer">
                          View Certificate <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

