"use client"

import Link from "next/link"
import { Icon } from "@/components/icon"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site.config"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-gray-900 text-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 md:p-12 rounded-xl max-w-md w-full"
        >
          <Icon name="Frown" size={64} className="mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-6xl md:text-8xl font-bold mb-4" style={{ color: siteConfig.accentColor }}>
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-full transition-transform hover:scale-105 bg-primary hover:bg-secondary text-primary-foreground"
            >
              Go to Homepage
            </Button>
          </Link>
        </motion.div>
      </main>
      <Footer siteName={siteConfig.siteName} discordUrl={siteConfig.discordUrl} storeUrl={siteConfig.storeUrl} />
    </div>
  )
}
