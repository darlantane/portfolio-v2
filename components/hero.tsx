"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import data from "@/data/data.json"
import DataVisualization from "./data-visualization"

export default function Hero() {
  const { hero } = data

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-16 pb-8 tech-section">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-primary font-medium mb-2 inline-block border border-primary/30 px-3 py-1 rounded-full text-sm"
            >
              Hello, I'm
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-4 glow-text"
            >
              {hero.name}
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl md:text-3xl text-foreground/80 font-medium mb-6"
            >
              {hero.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-muted-foreground max-w-md"
            >
              {hero.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex gap-4"
          >
            <Button onClick={scrollToContact} size="lg" className="tech-button">
              Contact Me
            </Button>
            <Button variant="outline" size="lg" asChild className="tech-button">
              <a href={hero.resumeLink} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex gap-6 mt-2"
          >
            {hero.socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors relative group"
                aria-label={link.name}
              >
                {link.name === "GitHub" && <Github className="h-6 w-6" />}
                {link.name === "LinkedIn" && <Linkedin className="h-6 w-6" />}
                {link.name === "Mail" && <Mail className="h-6 w-6" />}
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative hidden md:block"
        >
          <DataVisualization />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="flex justify-center mt-16 md:mt-24"
      >
        <button
          onClick={() =>
            document.getElementById("about")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
          className="animate-bounce p-2 rounded-full border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-6 w-6" />
        </button>
      </motion.div>
    </section>
  )
}

