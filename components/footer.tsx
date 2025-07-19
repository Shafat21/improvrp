import Link from "next/link"
import { Icon } from "@/components/icon"
import { siteConfig } from "@/config/site.config"
import Image from "next/image"

interface FooterProps {
  siteName: string
  discordUrl: string
  storeUrl: string
}

export function Footer({ siteName, discordUrl, storeUrl }: FooterProps) {
  return (
    <footer className="glass-navbar py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center">
            <Image
              src={siteConfig.logoUrl || "/placeholder.svg"}
              alt={siteConfig.siteName}
              width={50}
              height={50}
              className="mr-3"
              unoptimized
            />
            <div>
              <h3 className="text-xl font-bold text-foreground">{siteName}</h3>
              <p className="text-sm text-muted-foreground mt-1">© {new Date().getFullYear()} All Rights Reserved</p>
              {siteConfig.slogan && (
                <p className="text-sm text-foreground mt-1 italic">
                  {"'"}
                  {siteConfig.slogan}
                  {"'"}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/" className="footer-link flex items-center">
              <Icon name="Home" size={14} className="mr-1.5" />
              Home
            </Link>
            <Link href="/rules" className="footer-link flex items-center">
              <Icon name="ScrollText" size={14} className="mr-1.5" />
              Rules
            </Link>
            <Link href={discordUrl} target="_blank" rel="noopener noreferrer" className="footer-link flex items-center">
              <Icon name="Discord" library="fa" size={14} className="mr-1.5" />
              Discord
            </Link>
            <Link
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md flex items-center bg-primary hover:bg-secondary text-primary-foreground hover:text-primary-foreground transition-colors"
            >
              <Icon name="ShoppingCart" size={14} className="mr-1.5" />
              Store
            </Link>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {siteConfig.redditUrl && (
                <Link href={siteConfig.redditUrl} target="_blank" rel="noopener noreferrer" aria-label="Reddit">
                  <Icon
                    name="Reddit"
                    library="fa"
                    size={20}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  />
                </Link>
              )}
              {siteConfig.youtubeUrl && (
                <Link href={siteConfig.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Icon
                    name="Youtube"
                    library="fa"
                    size={20}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm text-center text-muted-foreground mt-4 ">
        ❤️ Made by{" "}
        <Link
          href="https://shafat21.online"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-primary" 
          style={{ color: siteConfig.accentColor }}
        >
          Shafat & Marjana
        </Link>
      </div>
    </footer>
  )
}
