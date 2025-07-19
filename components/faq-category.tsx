"use client"

import { Accordion } from "@/components/ui/accordion"
import { FAQItem } from "@/components/faq-item"
import { motion } from "framer-motion"
import { Icon } from "@/components/icon"
import { siteConfig } from "@/config/site.config"

interface Question {
  id: string
  question: string
  answer: string
}

interface FAQCategoryProps {
  id: string
  title: string
  icon: string
  questions: Question[]
  index: number
}

export function FAQCategory({ id, title, icon, questions, index }: FAQCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-6 rounded-xl mb-8"
      id={id}
    >
      <div className="flex items-center mb-6">
        <Icon name={icon} size={24} className="mr-3 text-primary" />
        <h2 className="text-2xl font-bold" style={{ color: siteConfig.accentColor }}>
          {title}
        </h2>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {questions.map((question, idx) => (
          <FAQItem
            key={question.id}
            id={question.id}
            question={question.question}
            answer={question.answer}
            index={idx}
          />
        ))}
      </Accordion>
    </motion.div>
  )
}
