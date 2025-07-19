"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { faqConfig } from "@/config/faq"
import { siteConfig } from "@/config/site.config"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Icon } from "@/components/icon"
import { FAQCategory } from "@/components/faq-category"

const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCategories, setFilteredCategories] = useState(faqConfig.categories)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Filter categories and questions based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCategories(faqConfig.categories)
      return
    }

    const term = searchTerm.toLowerCase()
    const filtered = faqConfig.categories
      .map((category) => {
        // Filter questions within this category
        const filteredQuestions = category.questions.filter(
          (q) => q.question.toLowerCase().includes(term) || q.answer.toLowerCase().includes(term),
        )

        // Only include this category if it has matching questions
        if (filteredQuestions.length > 0) {
          return {
            ...category,
            questions: filteredQuestions,
          }
        }
        return null
      })
      .filter(Boolean) as typeof faqConfig.categories

    setFilteredCategories(filtered)
  }, [searchTerm])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the useEffect
  }

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId)
    const element = document.getElementById(categoryId)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 mt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3" style={{ color: siteConfig.accentColor }}>
            {faqConfig.pageTitle}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">{faqConfig.pageDescription}</p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-background/30 border-border focus:border-primary pl-10 py-6 text-base placeholder:text-muted-foreground"
              />
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-secondary text-primary-foreground"
                size="sm"
              >
                Search
              </Button>
            </div>
          </form>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Category Navigation */}
          <div className="md:w-64 flex-shrink-0">
            <div className="sticky top-24 glass-card p-4 rounded-xl">
              <h3 className="font-bold text-lg mb-4" style={{ color: siteConfig.accentColor }}>
                Categories
              </h3>
              <nav className="space-y-1">
                {faqConfig.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center text-sm transition-colors ${
                      activeCategory === category.id ? "bg-foreground/10 font-medium" : "hover:bg-foreground/5"
                    }`}
                  >
                    <Icon
                      name="ArrowRight"
                      size={16}
                      className={`mr-2 transition-transform ${
                        activeCategory === category.id ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    {category.title}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Can't find what you're looking for?</p>
                <Link href={siteConfig.discordUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-transparent" variant="outline">
                    Ask on Discord
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="flex-1">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <FAQCategory
                  key={category.id}
                  id={category.id}
                  title={category.title}
                  icon={category.icon}
                  questions={category.questions}
                  index={index}
                />
              ))
            ) : (
              <div className="glass-card p-8 rounded-xl text-center">
                <h3 className="text-xl font-medium mb-4">No Results Found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any answers matching your search. Try different keywords or browse the categories.
                </p>
                <Button
                  onClick={() => setSearchTerm("")}
                  className="bg-primary hover:bg-secondary text-primary-foreground"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer siteName={siteConfig.siteName} discordUrl={siteConfig.discordUrl} storeUrl={siteConfig.storeUrl} />
    </div>
  )
}

export default FAQPage
