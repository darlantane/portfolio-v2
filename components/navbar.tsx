"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import Image from "next/image"
import data from "@/data/data.json"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { navLinks } = data
  // Update the navbar component to include active section indicator
  // First, add a state to track the active section
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Determine which section is currently in view
      const sections = navLinks.map((link) => document.getElementById(link.id))
      const scrollPosition = window.scrollY + 100 // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [navLinks])

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    const offset = 80
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = element?.getBoundingClientRect().top ?? 0
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a
            href="#"
            className="text-xl font-bold tracking-tighter"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            <Image src="/favicon.ico" alt="DT Logo" width={40} height={40} className="h-10 w-auto" />
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-foreground/80 hover:text-primary transition-colors relative nav-link ${
                  activeSection === link.id ? "active text-primary" : ""
                }`}
              >
                {link.text}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="tech-button"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="tech-button"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed top-16 left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg z-40 py-4 border-b"
        >
          <div className="container mx-auto px-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`py-2 text-left transition-colors ${
                  activeSection === link.id ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.text}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </>
  )
}

