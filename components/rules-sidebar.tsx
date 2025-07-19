"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/icon"
import { siteConfig } from "@/config/site.config"

interface Rule {
  id: string
  title: string
}

interface RulesSidebarProps {
  rules: Rule[]
  activeRule: string | null
  setActiveRule: (id: string) => void
}

export function RulesSidebar({ rules, activeRule, setActiveRule }: RulesSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("rules-sidebar")
      const toggleButton = document.getElementById("sidebar-toggle")

      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        toggleButton &&
        !toggleButton.contains(event.target as Node) &&
        isMobileOpen
      ) {
        setIsMobileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileOpen])

  // Scroll to rule section when clicked
  const scrollToRule = (id: string) => {
    setActiveRule(id)
    const element = document.getElementById(id)
    if (element) {
      // Add offset for the sticky header
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      })
    }
    // Close mobile sidebar after selection
    setIsMobileOpen(false)
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-20 left-4 z-40">
        <Button
          id="sidebar-toggle"
          variant="outline"
          size="sm"
          className="glass-card-light border-border bg-transparent"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <Icon name="X" size={18} /> : <Icon name="Menu" size={18} />}
          <span className="ml-2">Rules</span>
        </Button>
      </div>

      {/* Sidebar */}
      <div
        id="rules-sidebar"
        className={cn(
          "fixed md:sticky top-20 left-0 md:top-24 h-[calc(100vh-5rem)] md:h-[calc(100vh-8rem)] z-30 w-64 glass-card overflow-y-auto transition-transform duration-300 transform",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="p-4">
          <h3 className="text-lg font-bold mb-4" style={{ color: siteConfig.accentColor }}>
            Rule Categories
          </h3>
          <nav className="space-y-1">
            {rules.map((rule) => (
              <button
                key={rule.id}
                onClick={() => scrollToRule(rule.id)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md flex items-center text-sm transition-colors",
                  activeRule === rule.id ? "bg-foreground/10 font-medium" : "hover:bg-foreground/5",
                )}
              >
                <Icon
                  name="ChevronRight"
                  size={16}
                  className={cn(
                    "mr-2 transition-transform",
                    activeRule === rule.id ? "text-primary" : "text-muted-foreground",
                  )}
                />
                {rule.title}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
