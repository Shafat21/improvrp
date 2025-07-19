import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhitelistForm } from "@/components/whitelist-form"
import { siteConfig } from "@/config/site.config"
import { getDiscordUserFromCookie } from "@/lib/auth" // Import the auth utility
import { DiscordLoginCard } from "@/components/discord-login-card" // Import the new component

export default async function WhitelistPage() {
  // Make it an async component
  const discordUser = await getDiscordUserFromCookie() // Get Discord user from cookie

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-gray-900 text-foreground">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 mt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3" style={{ color: siteConfig.accentColor }}>
            Improv Roleplay Whitelist Application
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Please fill out the application carefully. Your responses will help us understand your roleplay style and
            ensure a high-quality experience for everyone.
          </p>
        </div>
        {discordUser ? (
          <WhitelistForm discordUser={discordUser} /> // Pass discordUser to the form
        ) : (
          <DiscordLoginCard /> // Show login card if not authenticated
        )}
      </main>
      <Footer siteName={siteConfig.siteName} discordUrl={siteConfig.discordUrl} storeUrl={siteConfig.storeUrl} />
    </div>
  )
}
