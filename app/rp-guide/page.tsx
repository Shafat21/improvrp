"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/config/site.config"
import { rpGuideConfig } from "@/config/rp-guide"

const RPGuidePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 mt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3" style={{ color: siteConfig.accentColor }}>
            {rpGuideConfig.pageTitle}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{rpGuideConfig.pageDescription}</p>
        </div>

        <div className="glass-card p-6 md:p-8 rounded-xl max-w-3xl mx-auto">
          <div className="space-y-6">
            {rpGuideConfig.terms.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="pb-4 border-b border-foreground/10 last:border-b-0"
              >
                <h3 className="text-xl font-semibold mb-2" style={{ color: siteConfig.accentColor }}>
                  {item.term}
                </h3>
                <p className="text-muted-foreground">{item.definition}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer siteName={siteConfig.siteName} discordUrl={siteConfig.discordUrl} storeUrl={siteConfig.storeUrl} />
    </div>
  )
}

export default RPGuidePage
