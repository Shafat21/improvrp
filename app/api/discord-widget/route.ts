import { NextResponse } from "next/server"
import { siteConfig } from "@/config/site.config"

// Mock data for when the API is unavailable or for development
const mockDiscordData = {
  id: "1269001855476826267",
  name: "Improv Roleplay",
  instant_invite: "https://discord.gg/improvrp",
  presence_count: 28,
  members: [
    {
      id: "1",
      username: "Alex",
      avatar: null,
      status: "online",
    },
    {
      id: "2",
      username: "Sarah",
      avatar: null,
      status: "idle",
    },
    {
      id: "3",
      username: "Michael",
      avatar: null,
      status: "dnd",
    },
  ],
}

export async function GET() {
  // Check if we should use mock data (for development or testing)
  const useMockData = process.env.NODE_ENV === "development" && process.env.USE_MOCK_DATA === "true"

  if (useMockData) {
    console.log("Using mock Discord data")
    return NextResponse.json(mockDiscordData, { status: 200 })
  }

  try {
    // Extract Discord server ID from the widget URL
    const discordWidgetUrl = siteConfig.discordWidgetUrl
    const discordIdMatch = discordWidgetUrl.match(/id=(\d+)/)
    const discordId = discordIdMatch ? discordIdMatch[1] : "1379967917055279115"

    if (!discordId) {
      throw new Error("Discord server ID not found in widget URL")
    }

    const apiUrl = `https://discord.com/api/guilds/${discordId}/widget.json`
    console.log(`Attempting to fetch Discord widget data from: ${apiUrl}`)

    // Add a timeout to the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      console.warn(`Fetch to ${apiUrl} timed out after 5 seconds. Aborting.`)
      controller.abort()
    }, 5000) // 5 second timeout

    try {
      const response = await fetch(`https://discord.com/api/guilds/${discordId}/widget.json`, {
        cache: "no-store",
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Discord API returned status: ${response.status}, text: ${errorText}`)

        console.warn(`Discord API returned non-OK status (${response.status}). Returning mock data as fallback.`)
        return NextResponse.json(mockDiscordData, { status: 200 }) // Return mock data with 200 OK
      }

      const data = await response.json()
      console.log("Successfully fetched Discord widget data.")
      return NextResponse.json(data, { status: 200 })
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      if (fetchError.name === "AbortError") {
        console.error("Fetch aborted due to timeout. Returning mock data.", fetchError)
      } else {
        console.error("Error during Discord widget fetch operation (inner catch):", fetchError)
      }
      return NextResponse.json(mockDiscordData, { status: 200 }) // Return mock data with 200 OK
    }
  } catch (error: any) {
    console.error("An unexpected error occurred in Discord widget API route (outer catch):", error)
    return NextResponse.json(mockDiscordData, { status: 200 }) // Return mock data with 200 OK
  }
}
