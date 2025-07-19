import { NextResponse } from "next/server"
import { setDiscordUserCookie } from "@/lib/auth"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const error = url.searchParams.get("error")

  console.log("Discord OAuth callback received")

  if (error) {
    console.error("Discord OAuth error:", error)
    return NextResponse.redirect(`${url.origin}/whitelist?error=discord_oauth_error`)
  }

  if (!code) {
    console.error("No authorization code received from Discord")
    return NextResponse.redirect(`${url.origin}/whitelist?error=no_code`)
  }

  // Access client-safe environment variables from siteConfig
  const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
  const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI || `${url.origin}/api/discord-oauth/callback`

  // Access server-only environment variables directly from process.env
  const clientSecret = process.env.DISCORD_CLIENT_SECRET
  const guildId = process.env.DISCORD_GUILD_ID

  if (!clientId || !clientSecret || !redirectUri) {
    console.error("Missing Discord OAuth environment variables (client ID, secret, or redirect URI)")
    return NextResponse.redirect(`${url.origin}/whitelist?error=missing_env_vars`)
  }

  try {
    console.log("Exchanging code for access token...")
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error("Failed to exchange code for token:", tokenResponse.status, errorText)
      return NextResponse.redirect(`${url.origin}/whitelist?error=token_exchange_failed`)
    }

    const tokenData = await tokenResponse.json()
    const { access_token, token_type } = tokenData

    console.log("Fetching user data from Discord...")
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    })

    if (!userResponse.ok) {
      const errorText = await userResponse.text()
      console.error("Failed to fetch user data:", userResponse.status, errorText)
      return NextResponse.redirect(`${url.origin}/whitelist?error=user_fetch_failed`)
    }

    const userData = await userResponse.json()
    console.log("User data retrieved:", userData.id, userData.username)

    if (guildId) {
      console.log("Checking guild membership...")
      const guildMemberResponse = await fetch(`https://discord.com/api/users/@me/guilds/${guildId}/member`, {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      })

      if (!guildMemberResponse.ok) {
        console.error("User is not a member of the specified guild or API error:", guildMemberResponse.status)
        // You can choose to redirect with an error or continue anyway
        // return NextResponse.redirect(`${url.origin}/whitelist?error=not_guild_member`)
      } else {
        console.log("User is a member of the specified guild")
      }
    }

    const response = NextResponse.redirect(`${url.origin}/whitelist`)
    setDiscordUserCookie(
      {
        id: userData.id,
        username: userData.username,
        avatar: userData.avatar,
      },
      response,
    )

    return response
  } catch (error) {
    console.error("Error during Discord OAuth flow:", error)
    return NextResponse.redirect(`${url.origin}/whitelist?error=oauth_flow_error`)
  }
}
