import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const origin = url.origin

    console.log("Discord OAuth login route called")
    console.log("Request URL:", request.url)
    console.log("Origin:", origin)

    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
    // Revert to using the environment variable, with a fallback to the correct path
    const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI || `${origin}/api/discord-oauth/callback`

    console.log("Resolved NEXT_PUBLIC_DISCORD_CLIENT_ID:", clientId ? "exists" : "missing")
    console.log("Resolved NEXT_PUBLIC_DISCORD_REDIRECT_URI (used in auth URL):", redirectUri)

    // Use environment variables directly for server-only access
    console.log("Direct env check - DISCORD_CLIENT_SECRET:", process.env.DISCORD_CLIENT_SECRET ? "exists" : "missing")
    console.log("Direct env check - DISCORD_GUILD_ID:", process.env.DISCORD_GUILD_ID ? "exists" : "missing")

    if (!clientId || !redirectUri) {
      console.error(
        "Missing Discord Client ID or Redirect URI. Please ensure NEXT_PUBLIC_DISCORD_CLIENT_ID and NEXT_PUBLIC_DISCORD_REDIRECT_URI environment variables are set correctly.",
      )
      return NextResponse.json(
        {
          error:
            "Discord Client ID or Redirect URI not configured. Please ensure NEXT_PUBLIC_DISCORD_CLIENT_ID and NEXT_PUBLIC_DISCORD_REDIRECT_URI environment variables are set.",
          details: "Check server logs for more information.",
        },
        { status: 500 },
      )
    }

    // Define the scopes we need
    const scopes = ["identify", "email", "guilds", "guilds.members.read"]

    // Construct the Discord authorization URL
    const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&scope=${encodeURIComponent(scopes.join(" "))}`

    console.log("Redirecting to Discord Auth URL:", discordAuthUrl)

    // Return the redirect response
    return NextResponse.redirect(discordAuthUrl)
  } catch (error) {
    console.error("Error in Discord OAuth login route:", error)
    return NextResponse.json(
      {
        error: "An error occurred while processing the Discord OAuth login request.",
        message: error instanceof Error ? error.message : "Unknown error occurred",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
