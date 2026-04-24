"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Award } from "lucide-react"
import data from "@/data/data.json"

export default function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { certifications } = data

  return (
    <section id="certifications" ref={ref} className="py-20 tech-section">
      <motion.div transition={{ duration: 0.8 }}>
        <h2 className="text-3xl font-bold mb-2 tech-heading">
          <span className="text-primary">#</span> Certifications
        </h2>
        <div className="w-20 h-1 bg-primary mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {certifications.map((certification, index) => (
            <motion.div key={index}>
              <div>
                <div className="pt-6 flex flex-col h-full">
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Award className="h-5 w-5 text-primary" />
                    </div>

                    {certification.link ? (
                      <a
                        href={certification.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary transition-colors underline-offset-4 hover:underline"
                      >
                        {certification.name}
                      </a>
                    ) : (
                      <h3 className="font-medium">
                        {certification.name}
                      </h3>
                    )}
                  </div>

                  <div className="text-sm text-muted-foreground mb-3">
                    <p>Issued by: {certification.issuer}</p>
                    {certification.date && <p>Date: {certification.date}</p>}
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}