"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, MoveUp } from "lucide-react"
import data from "@/data/data.json"

export default function Footer() {
  const { footer } = data

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-12 border-t border-primary/20 circuit-bg">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className="mb-6 tech-button"
            aria-label="Scroll to top"
          >
            <MoveUp className="h-5 w-5" />
          </Button>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold glow-text">Darlan Tane</h2>
            <p className="text-muted-foreground">Data Analyst</p>
          </div>

          <div className="flex gap-4 mb-8">
            {footer.socialLinks.map((link) => (
              <Button key={link.name} variant="ghost" size="icon" asChild className="tech-button">
                <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                  {link.name === "GitHub" && <Github className="h-5 w-5" />}
                  {link.name === "LinkedIn" && <Linkedin className="h-5 w-5" />}
                  {link.name === "Mail" && <Mail className="h-5 w-5" />}
                </a>
              </Button>
            ))}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>{footer.copyright}</p>
            <p className="mt-1">Built with Next.js and Tailwind CSS</p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

