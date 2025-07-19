"use client"

import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { motion } from "framer-motion"

interface FAQItemProps {
  id: string
  question: string
  answer: string
  index: number
}

export function FAQItem({ id, question, answer, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <AccordionItem value={id} className="border-b border-foreground/10 last:border-0">
        <AccordionTrigger className="text-left font-medium text-base hover:text-primary">{question}</AccordionTrigger>
        <AccordionContent className="text-muted-foreground whitespace-pre-line">{answer}</AccordionContent>
      </AccordionItem>
    </motion.div>
  )
}
