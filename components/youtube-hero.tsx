"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image" // Import Image component
import { Button } from "@/components/ui/button"

interface YouTubeHeroProps {
  videoId: string
  siteName: string
  tagline: string
  discordUrl: string
  logoUrl: string // New prop for the logo
  accentColor: string // New prop for accent color
}

export function YouTubeHero({ videoId, siteName, tagline, discordUrl, logoUrl, accentColor }: YouTubeHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 z-0 bg-black">
        {isLoaded && (
          <div
            className={`relative h-full w-full ${!isLoaded ? "opacity-0" : "opacity-100"} transition-opacity duration-1000`}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100vh]"
              style={{
                pointerEvents: "none",
              }}
              frameBorder="0"
              title="Improv Roleplay Video"
            />
          </div>
        )}

        {/* Overlay to darken the video */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {logoUrl && (
          <Image
            src={logoUrl || "/placeholder.svg"}
            alt={siteName}
            width={200} // Adjust width as needed
            height={200} // Adjust height as needed
            className="mb-6 rounded-full shadow-lg"
            priority // Load logo early
            unoptimized
          />
        )}
        <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{siteName}</span>
        </h1>
        <p className="mb-8 max-w-2xl text-xl text-muted-foreground sm:text-2xl">{tagline}</p>
        <Button
          asChild
          size="lg"
          style={{ backgroundColor: accentColor }}
          className="hover:opacity-90 transition-opacity"
        >
          <Link href={discordUrl}>Join Our Discord</Link>
        </Button>
      </div>
    </section>
  )
}
