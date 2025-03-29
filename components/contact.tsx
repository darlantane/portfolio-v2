"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react"
import data from "@/data/data.json"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { contact } = data

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 2000)
  }

  return (
    <section id="contact" ref={ref} className="py-20 tech-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-2 tech-heading">
          <span className="text-primary">#</span> Contact Me
        </h2>
        <div className="w-20 h-1 bg-primary mb-12"></div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
            <p className="text-muted-foreground mb-6">{contact.description}</p>

            <div className="space-y-4">
              {contact.email && (
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a href={`mailto:${contact.email}`} className="text-sm text-muted-foreground hover:text-primary">
                      {contact.email}
                    </a>
                  </div>
                </div>
              )}

              {contact.phone && (
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <a href={`tel:${contact.phone}`} className="text-sm text-muted-foreground hover:text-primary">
                      {contact.phone}
                    </a>
                  </div>
                </div>
              )}

              {contact.location && (
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-sm text-muted-foreground">{contact.location}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="tech-card">
              <CardContent className="pt-6">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="mb-4 p-3 rounded-full bg-primary/10">
                      <Send className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for your message. I'll get back to you as soon as possible.
                    </p>
                    <Button variant="outline" className="mt-4 tech-button" onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" required className="border-primary/30 focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required className="border-primary/30 focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" rows={5} required className="border-primary/30 focus:border-primary" />
                    </div>
                    <Button type="submit" className="w-full tech-button" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

