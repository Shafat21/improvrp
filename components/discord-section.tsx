"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/icon"
import Link from "next/link"
import { siteConfig } from "@/config/site.config"

const localMockData: DiscordData = {
  id: "1269001855476826267",
  name: "Improv Roleplay",
  instant_invite: "https://discord.gg/improvrp",
  presence_count: 28,
  members: [],
}

interface DiscordMember {
  id: string
  username: string
  avatar?: string | null
  status: string
}

interface DiscordData {
  id: string
  name: string
  instant_invite: string
  presence_count: number
  members: DiscordMember[]
}

interface DiscordSectionProps {
  widgetUrl: string
}

export function DiscordSection({ widgetUrl }: DiscordSectionProps) {
  const [discordData, setDiscordData] = useState<DiscordData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDiscordData = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/discord-widget")

      if (!response.ok) {
        throw new Error(`Failed to fetch Discord data: ${response.status}`)
      }

      const data = (await response.json()) as DiscordData
      setDiscordData(data)
    } catch (err) {
      console.error("Error fetching Discord data, using local mock:", err)
      // Use local mock on any failure (network, 500, preview mode, etc.)
      setDiscordData(localMockData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDiscordData()
  }, [])

  const handleRefresh = () => {
    fetchDiscordData()
  }

  // Function to get the appropriate icon component based on the icon name
  const getIconComponent = (iconName: string, size = 16) => {
    switch (iconName) {
      case "Users":
        return <Icon name="Users" size={size} className="mr-2" />
      case "Gamepad":
        return <Icon name="Gamepad" size={size} className="mr-2" />
      case "Info":
        return <Icon name="Info" size={size} className="mr-2" />
      case "Calendar":
        return <Icon name="Calendar" size={size} className="mr-2" />
      case "User":
        return <Icon name="User" size={size} className="mr-2" />
      default:
        return <Icon name="Info" size={size} className="mr-2" />
    }
  }

  return (
    <section className="py-16 px-4 container mx-auto" id="discord">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="glass-card p-8 rounded-xl"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Icon name="Discord" library="fa" className="mr-3 text-primary" size={24} />
            <h2 className="text-3xl font-bold">Join Our Discord</h2>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center hover:text-primary"
          >
            <Icon name="RefreshCw" size={16} className={`mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Server Info Card */}
          <div className="glass-card-light p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Server Info</h3>

            <p className="text-lg font-medium mb-2">{discordData?.name || "Horizon Roleplay"}</p>

            <div className="flex items-center mb-6 text-muted-foreground">
              <Icon name="Users" size={16} className="mr-2" />
              <span>{loading ? "Loading..." : `${discordData?.presence_count || 0} members online`}</span>
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="font-medium text-foreground">Discord Features:</h4>
              <ul className="space-y-2">
                {siteConfig.discordFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-muted-foreground text-sm">
                    <Icon name={feature.icon} size={16} className="mr-2" />
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>

            {siteConfig.nextEvent && (
              <div className="bg-background/30 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-foreground mb-2">Next Community Event:</h4>
                <p className="font-bold text-foreground">{siteConfig.nextEvent.title}</p>
                <p className="text-sm text-muted-foreground">{siteConfig.nextEvent.date}</p>
                <p className="text-sm text-muted-foreground mt-1">{siteConfig.nextEvent.description}</p>
              </div>
            )}

            <Link href={discordData?.instant_invite || siteConfig.discordUrl} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-primary hover:bg-accent/90 text-primary-foreground hover:text-primary flex items-center justify-center py-5">
                <Icon name="Discord" library="fa" className="mr-2" size={16} />
                Join Server
              </Button>
            </Link>
          </div>

          {/* Discord Widget */}
          <div className="w-full max-w-[500px] h-[500px] mx-auto bg-[#36393f] rounded-lg overflow-hidden">
            <iframe
              src="https://discord.com/widget?id=1269001855476826267&theme=dark"
              width="100%"
              height="100%"
              allowtransparency="true"
              frameBorder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              title="Discord Widget"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
