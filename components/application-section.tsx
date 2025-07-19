"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ApplicationSectionProps {
  title: string
  description: string
  formUrl: string
}

export function ApplicationSection({ title, description, formUrl }: ApplicationSectionProps) {
  return (
    <section className="py-16 px-4 container mx-auto" id="application">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="glass-card p-8 md:p-12 rounded-xl max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-8 text-muted-foreground">{description}</p>
        <Link href={formUrl} target="_blank" rel="noopener noreferrer">
          <Button
            size="lg"
            variant="outline" // Change to outline variant
            className="text-lg px-8 py-6 rounded-full transition-transform hover:scale-105 border-foreground text-foreground hover:text-background hover:border-foreground bg-transparent"
          >
            Apply Now
          </Button>
        </Link>
      </motion.div>
    </section>
  )
}
