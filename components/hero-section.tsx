"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Icon } from "@/components/icon"
import { siteConfig } from "@/config/site.config"

interface HeroSectionProps {
  title: string
  tagline: string
  heroImage: string // Changed from heroVideoUrl
  discordUrl: string
}

export function HeroSection({ title, tagline, heroImage, discordUrl }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage || "/placeholder.svg"}
          alt="Hero background"
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Top left decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -100, y: -100 }}
          animate={{ opacity: 0.15, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-primary rounded-full filter blur-3xl"
        ></motion.div>

        {/* Bottom right decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 100, y: 100 }}
          animate={{ opacity: 0.15, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary rounded-full filter blur-3xl"
        ></motion.div>
      </div>

      {/* Content area */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <Image
            src={siteConfig.logoUrl || "/placeholder.svg"}
            alt={siteConfig.siteName}
            width={300}
            height={300}
            className="mx-auto"
            unoptimized
          />
        </motion.div>

        {/* Main hero content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md"
          >
            {tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mb-6"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={discordUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 bg-primary hover:text-primary hover:bg-secondary text-primary-foreground border-0 w-full sm:w-auto"
                >
                  <Icon name="Discord" library="fa" className="mr-2" size={20} />
                  Join our Discord
                </Button>
              </Link>

              <Link href="/whitelist">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-full border-foreground text-foreground hover:text-primary hover:border-foreground transition-all duration-300 hover:scale-105 w-full sm:w-auto bg-transparent"
                >
                  <Icon name="UserRound" className="mr-2" size={20} />
                  Apply Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
