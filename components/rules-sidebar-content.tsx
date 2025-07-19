"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icon } from "@/components/icon"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site.config"
import { formatShortDate } from "@/lib/utils"
import { rules } from "@/config/rules"
import Link from "next/link"

interface RulesSidebarContentProps {
  onSearch: (searchTerm: string) => void
}

export function RulesSidebarContent({ onSearch }: RulesSidebarContentProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  // Get the most recently updated rules
  const recentlyUpdatedRules = [...rules]
    .sort((a, b) => {
      const dateA = new Date(a.lastUpdated || "2000-01-01")
      const dateB = new Date(b.lastUpdated || "2000-01-01")
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, 3) // Get the top 3 most recently updated rules

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="glass-card-light p-4 rounded-lg">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Search rules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-background/30 border-border focus:border-primary placeholder:text-muted-foreground"
          />
          <Button type="submit" variant="outline">
            <Icon name="Search" size={18} />
          </Button>
        </form>
      </div>

      {/* Key Rules Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card-light p-4 rounded-lg"
      >
        <div className="flex items-center gap-2 mb-3">
          <Icon name="AlertTriangle" size={18} className="text-primary" />
          <h3 className="font-bold text-lg">Key Rules to Remember</h3>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2 items-start">
            <div className="min-w-4 h-4 rounded-full bg-destructive mt-1"></div>
            <p>No RDM (Random Death Match) - Don't kill players without proper roleplay</p>
          </li>
          <li className="flex gap-2 items-start">
            <div className="min-w-4 h-4 rounded-full bg-primary mt-1"></div>
            <p>Value Your Life (VDL) - Act as if your character fears death</p>
          </li>
          <li className="flex gap-2 items-start">
            <div className="min-w-4 h-4 rounded-full bg-secondary mt-1"></div>
            <p>No Metagaming - Don't use out-of-character knowledge in-game</p>
          </li>
          <li className="flex gap-2 items-start">
            <div className="min-w-4 h-4 rounded-full bg-accent mt-1"></div>
            <p>Stay In Character - Maintain roleplay at all times in-game</p>
          </li>
        </ul>
        <div className="mt-4 text-sm text-muted-foreground">
          Breaking these core rules may result in immediate administrative action.
        </div>
      </motion.div>

      {/* Rule Updates - Now dynamically generated and styled to match the image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card-light p-4 rounded-lg bg-background/60"
      >
        <h3 className="font-bold text-lg mb-4">Recent Rule Updates</h3>
        <div className="space-y-4">
          {recentlyUpdatedRules.map((rule) => (
            <div key={rule.id} className="relative pl-5">
              {/* Primary vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full"></div>
              <div>
                <p className="font-medium text-foreground">{rule.title}</p>
                <p className="text-muted-foreground text-sm">{formatShortDate(rule.lastUpdated || "")}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Questions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card p-4 rounded-lg border border-primary/30"
      >
        <div className="flex items-center gap-2 mb-3">
          <Icon name="HelpCircle" size={18} className="text-primary" />
          <h3 className="font-bold text-lg">Have Questions?</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          If you're unsure about any rules or need clarification, our staff team is here to help.
        </p>
        <Link href={siteConfig.discordUrl} target="_blank" rel="noopener noreferrer">
          <Button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-primary-foreground">
            <Icon name="Discord" library="fa" size={16} />
            Ask in Discord
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
