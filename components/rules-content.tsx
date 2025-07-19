"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/config/site.config"
import { formatDate } from "@/lib/utils"
import { Icon } from "@/components/icon"

interface Rule {
  id: string
  title: string
  description: string
  lastUpdated?: string
  items?: string[]
}

interface RulesContentProps {
  rules: Rule[]
  activeRule: string | null
}

export function RulesContent({ rules, activeRule }: RulesContentProps) {
  if (rules.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No Rules Found</h3>
        <p className="text-muted-foreground">Try adjusting your search criteria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {rules.map((rule, index) => (
        <motion.div
          key={rule.id}
          id={rule.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="glass-card-light p-6 rounded-lg scroll-mt-24"
        >
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-bold" style={{ color: siteConfig.accentColor }}>
              {rule.title}
            </h2>
            {rule.lastUpdated && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Icon name="CalendarIcon" size={12} className="mr-1" />
                <span>Updated: {formatDate(rule.lastUpdated)}</span>
              </div>
            )}
          </div>
          <p className="mb-4 text-muted-foreground">{rule.description}</p>

          {rule.items && rule.items.length > 0 && (
            <ul className="list-disc pl-5 space-y-2">
              {rule.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      ))}
    </div>
  )
}
