"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RulesContent } from "@/components/rules-content"
import { RulesSidebar } from "@/components/rules-sidebar"
import { RulesSidebarContent } from "@/components/rules-sidebar-content"
import { siteConfig } from "@/config/site.config"
import { rules } from "@/config/rules"
import { AlertCircle } from "lucide-react"

export default function RulesPage() {
  const [activeRule, setActiveRule] = useState<string | null>(null)
  const [filteredRules, setFilteredRules] = useState(rules)
  const [searchActive, setSearchActive] = useState(false)

  // Set active rule based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (searchActive) return

      const scrollPosition = window.scrollY + 150 // Offset for header

      // Find the section that is currently in view
      for (const rule of rules) {
        const element = document.getElementById(rule.id)
        if (element) {
          const { top, bottom } = element.getBoundingClientRect()
          if (top <= 150 && bottom > 150) {
            setActiveRule(rule.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Set initial active rule
    if (rules.length > 0 && !activeRule) {
      setActiveRule(rules[0].id)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [activeRule, searchActive])

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredRules(rules)
      setSearchActive(false)
      return
    }

    const term = searchTerm.toLowerCase()
    const filtered = rules.filter(
      (rule) =>
        rule.title.toLowerCase().includes(term) ||
        rule.description.toLowerCase().includes(term) ||
        rule.items?.some((item) => item.toLowerCase().includes(term)),
    )

    setFilteredRules(filtered)
    setSearchActive(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 mt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3" style={{ color: siteConfig.accentColor }}>
            Server Rules
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our rules are designed to ensure a fair, enjoyable, and immersive roleplay experience for all players.
            Please familiarize yourself with these guidelines before joining our server.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 relative">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <RulesSidebar rules={rules} activeRule={activeRule} setActiveRule={setActiveRule} />
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="glass-card p-8 rounded-xl">
              {searchActive && (
                <div className="mb-6 p-4 bg-primary/20 border border-primary/30 rounded-lg flex items-start gap-3">
                  <AlertCircle size={20} className="text-primary-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Search Results</p>
                    <p className="text-sm text-muted-foreground">
                      {filteredRules.length === 0
                        ? "No rules match your search. Try different keywords."
                        : `Found ${filteredRules.length} matching rule${filteredRules.length === 1 ? "" : "s"}.`}
                    </p>
                  </div>
                </div>
              )}
              <RulesContent rules={filteredRules} activeRule={activeRule} />
            </div>
          </div>

          {/* Additional content */}
          <div className="md:w-72 flex-shrink-0 mt-6 md:mt-0">
            <RulesSidebarContent onSearch={handleSearch} />
          </div>
        </div>
      </main>
      <Footer siteName={siteConfig.siteName} discordUrl={siteConfig.discordUrl} storeUrl={siteConfig.storeUrl} />
    </div>
  )
}
