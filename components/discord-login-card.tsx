"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { siteConfig } from "@/config/site.config"
import { Icon } from "@/components/icon" // Assuming you have a Discord icon component
import { motion } from "framer-motion"

export function DiscordLoginCard() {
  const handleLogin = () => {
    window.location.href = "/api/discord-oauth/login"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto glass-card p-6 md:p-8 text-center"
    >
      <CardHeader className="mb-6">
        <Icon name="Discord" library="fa" className="mx-auto mb-4 text-primary" size={64} />
        <CardTitle className="text-2xl md:text-3xl" style={{ color: siteConfig.accentColor }}>
          Discord Verification Required
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Please log in with Discord to access the whitelist application. This helps us verify your identity and ensure
          you're part of our community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleLogin}
          className="w-full py-6 text-lg flex items-center justify-center bg-[#5865F2] hover:bg-[#4752C4] transition-colors"
        >
          <Icon name="Discord" library="fa" className="mr-2" size={24} />
          Login with Discord
        </Button>
        <p className="text-sm text-muted-foreground mt-4">
          You will be redirected to Discord to authorize our application.
        </p>
      </CardContent>
    </motion.div>
  )
}
