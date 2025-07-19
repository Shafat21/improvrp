"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Icon } from "@/components/icon"
import { siteConfig } from "@/config/site.config"
import Image from "next/image"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu" // Import DropdownMenu components

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-navbar px-4 md:px-6 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            {siteConfig.logoUrl && (
              <Image
                src={siteConfig.logoUrl || "/placeholder.svg"}
                alt={siteConfig.siteName}
                width={50}
                height={50}
                className="rounded-full"
                unoptimized
              />
            )}
            <span className="font-bold text-xl text-foreground">{siteConfig.siteName}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="nav-link flex items-center">
              <Icon name="Home" size={16} className="mr-1.5" />
              Home
            </Link>

            {/* Rules Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="nav-link flex items-center px-0 hover:bg-transparent">
                  <Icon name="ScrollText" size={16} className="mr-1.5" />
                  Rules
                  <Icon name="ChevronDown" size={16} className="ml-1.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-card border-border text-foreground">
                <DropdownMenuItem asChild>
                  <Link
                    href="/rules"
                    className="flex items-center py-2 px-3 hover:bg-accent hover:text-accent-foreground"
                  >
                    <Icon name="ScrollText" size={16} className="mr-2" />
                    RP Rules
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/rp-guide"
                    className="flex items-center py-2 px-3 hover:bg-accent hover:text-accent-foreground"
                  >
                    <Icon name="BookOpen" size={16} className="mr-2" />
                    RP Guide
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/community-rules"
                    className="flex items-center py-2 px-3 hover:bg-accent hover:text-accent-foreground"
                  >
                    <Icon name="Users" size={16} className="mr-2" />
                    Community Rules
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/faq" className="nav-link flex items-center">
              <Icon name="HelpCircle" size={16} className="mr-1.5" />
              FAQ
            </Link>
            <Link href="/whitelist" className="nav-link flex items-center">
              <Icon name="UserRound" size={16} className="mr-1.5" />
              Whitelist
            </Link>
            <Link href="/#discord" className="nav-link flex items-center">
              <Icon name="Discord" library="fa" size={16} className="mr-1.5" />
              Discord
            </Link>
            <div className="flex space-x-2">
              <Link href={siteConfig.storeUrl} target="_blank" rel="noopener noreferrer">
                <Button className="store-button flex items-center bg-primary hover:bg-secondary/90 text-primary-foreground hover:text-primary">
                  <Icon name="ShoppingCart" size={16} className="mr-1.5" />
                  Store
                </Button>
              </Link>
              <Link href="fivem://connect/play.improvrp.net?streamerMode=true" target="_blank" rel="noopener noreferrer">
                <Button className="store-button flex items-center bg-primary hover:bg-secondary/90 text-primary-foreground hover:text-primary">
                  <Icon name="Play" size={16} className="mr-1.5" />
                  Play Now
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <Icon name="X" size={24} /> : <Icon name="Menu" size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="glass-navbar md:hidden px-4 py-4">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="nav-link flex items-center" onClick={() => setIsMenuOpen(false)}>
              <Icon name="Home" size={16} className="mr-1.5" />
              Home
            </Link>
            {/* Mobile Rules Dropdown - simplified for mobile */}
            <div className="flex flex-col space-y-2">
              <span className="nav-link flex items-center font-medium text-foreground">
                <Icon name="ScrollText" size={16} className="mr-1.5" />
                Rules
              </span>
              <Link href="/rules" className="nav-link flex items-center pl-6" onClick={() => setIsMenuOpen(false)}>
                <Icon name="ChevronRight" size={14} className="mr-1.5" />
                RP Rules
              </Link>
              <Link href="/rp-guide" className="nav-link flex items-center pl-6" onClick={() => setIsMenuOpen(false)}>
                <Icon name="ChevronRight" size={14} className="mr-1.5" />
                RP Guide
              </Link>
              <Link
                href="/community-rules"
                className="nav-link flex items-center pl-6"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon name="ChevronRight" size={14} className="mr-1.5" />
                Community Rules
              </Link>
            </div>
            <Link href="/faq" className="nav-link flex items-center" onClick={() => setIsMenuOpen(false)}>
              <Icon name="HelpCircle" size={16} className="mr-1.5" />
              FAQ
            </Link>
            <Link href="/whitelist" className="nav-link flex items-center" onClick={() => setIsMenuOpen(false)}>
              <Icon name="UserRound" size={16} className="mr-1.5" />
              Whitelist
            </Link>
            <Link href="/#discord" className="nav-link flex items-center" onClick={() => setIsMenuOpen(false)}>
              <Icon name="Discord" library="fa" size={16} className="mr-1.5" />
              Discord
            </Link>
            <Link
              href={siteConfig.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button className="store-button w-full flex items-center justify-center bg-primary hover:bg-secondary text-primary-foreground">
                <Icon name="ShoppingCart" size={16} className="mr-1.5" />
                Store
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
