import Image from "next/image"
import { siteConfig } from "@/config/site.config"

export function AnnouncementBanner() {
  if (!siteConfig.announcementBannerUrl) {
    return null
  }

  return (
    <div className="w-full bg-black overflow-hidden">
      <Image
        src={siteConfig.announcementBannerUrl || "/placeholder.svg"}
        alt="Announcement Banner"
        width={1920} // Set a large width to ensure it covers most screens
        height={100} // Adjust height as needed for your banner image
        className="w-full h-auto object-cover"
        unoptimized // Use unoptimized for external images
        priority // Load banner early
      />
    </div>
  )
}
