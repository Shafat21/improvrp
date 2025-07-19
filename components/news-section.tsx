"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/icon"
import { siteConfig } from "@/config/site.config"
import { formatDate } from "@/lib/utils"

interface NewsItem {
  id: string
  title: string
  date: string
  content: string
  excerpt: string
  image?: string
}

interface NewsSectionProps {
  news: NewsItem[]
}

export function NewsSection({ news }: NewsSectionProps) {
  const [expandedNews, setExpandedNews] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedNews((prev) => (prev === id ? null : id))
  }

  return (
    <section className="py-16 px-4 container mx-auto" id="news">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Latest News & Updates</h2>

        <div className="space-y-8">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              className="glass-card p-6 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {item.image && (
                  <div className="md:w-1/3 h-48 md:h-auto relative rounded-lg overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <div className={`${item.image ? "md:w-2/3" : "w-full"}`}>
                  <div className="flex items-center mb-2">
                    <Icon name="CalendarIcon" size={16} className="mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{formatDate(item.date)}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: siteConfig.accentColor }}>
                    {item.title}
                  </h3>

                  <div className="text-muted-foreground">
                    {expandedNews === item.id ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="whitespace-pre-line">{item.content}</p>
                      </motion.div>
                    ) : (
                      <p>{item.excerpt}</p>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    className="mt-4 text-foreground hover:text-primary"
                    onClick={() => toggleExpand(item.id)}
                  >
                    {expandedNews === item.id ? "Show Less" : "Read More"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
