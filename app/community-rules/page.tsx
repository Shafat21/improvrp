"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/config/site.config"
import { communityRulesConfig } from "@/config/community-rules"
import { Icon } from "@/components/icon"

const CommunityRulesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 mt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3" style={{ color: siteConfig.accentColor }}>
            {communityRulesConfig.pageTitle}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{communityRulesConfig.introduction}</p>
        </div>

        <div className="glass-card p-6 md:p-8 rounded-xl max-w-3xl mx-auto">
          <div className="space-y-4">
            {communityRulesConfig.rules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-start gap-3"
              >
                <Icon name="ChevronRight" size={16} className="mt-1 flex-shrink-0 text-primary" />
                <p className="text-muted-foreground">{rule}</p>
              </motion.div>
            ))}
          </div>
          {communityRulesConfig.note && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: communityRulesConfig.rules.length * 0.05 + 0.1 }}
              className="mt-8 pt-6 border-t border-foreground/10 text-sm text-muted-foreground italic"
            >
              <p>{communityRulesConfig.note}</p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer siteName={siteConfig.siteName} discordUrl={siteConfig.discordUrl} storeUrl={siteConfig.storeUrl} />
    </div>
  )
}

export default CommunityRulesPage
