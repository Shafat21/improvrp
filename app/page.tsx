import { DiscordSection } from "@/components/discord-section"
import { ApplicationSection } from "@/components/application-section"
import { NewsSection } from "@/components/news-section"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/config/site.config"
import { HeroSection } from "@/components/hero-section" // Import HeroSection
import { MediaGallery } from "@/components/media-gallery"
import { ytConfig } from "@/config/yt.config"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <HeroSection
          title={siteConfig.siteName}
          tagline={siteConfig.tagline}
          heroImage={siteConfig.heroImage} // Pass heroImage
          discordUrl={siteConfig.discordUrl}
        />
        <MediaGallery
          images={siteConfig.galleryImages}
          videos={ytConfig.videos}
          imageGalleryTitle="Server Gallery"
          videoGalleryTitle="Community Videos & Trailers"
        />
        <NewsSection news={siteConfig.newsItems} />
        <DiscordSection widgetUrl={siteConfig.discordWidgetUrl} />
        <ApplicationSection
          title="Whitelist Application"
          description="Ready to join Improv Roleplay? Submit your whitelist application to become part of our immersive community."
          formUrl="/whitelist"
        />
      </main>
      <Footer siteName={siteConfig.siteName} discordUrl={siteConfig.discordUrl} storeUrl={siteConfig.storeUrl} />
    </div>
  )
}
