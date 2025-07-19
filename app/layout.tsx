import type React from "react"
import type { Metadata } from "next/types"
import { Inter, Pacifico } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig } from "@/config/site.config"
import { AnnouncementBanner } from "@/components/announcement-banner" // Import the new component

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.siteName,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  icons: {
    // Add this section for explicit favicon control
    icon: "https://i.postimg.cc/mDrxKSwb/Improve-RP.png", // Path to your favicon.ico in public directory
    shortcut: "https://i.postimg.cc/mDrxKSwb/Improve-RP.png", // Example for a specific size
    apple: "https://i.postimg.cc/mDrxKSwb/Improve-RP.png", // Example for Apple touch icon
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "https://i.postimg.cc/mDrxKSwb/Improve-RP.png",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        url: "https://i.postimg.cc/mDrxKSwb/Improve-RP.png",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${pacifico.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {/* <AnnouncementBanner /> Add the announcement banner here */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
