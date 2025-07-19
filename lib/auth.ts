import { cookies } from "next/headers"
import type { NextResponse } from "next/server"

interface DiscordUser {
  id: string
  username: string
  avatar?: string | null
}

const DISCORD_USER_COOKIE_NAME = "discord_user"

export function setDiscordUserCookie(user: DiscordUser, response: NextResponse) {
  try {
    const userString = JSON.stringify(user)
    console.log("Setting Discord user cookie:", userString)

    response.cookies.set({
      name: DISCORD_USER_COOKIE_NAME,
      value: userString,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "lax",
    })

    return true
  } catch (error) {
    console.error("Error setting Discord user cookie:", error)
    return false
  }
}

export async function getDiscordUserFromCookie(): Promise<DiscordUser | null> {
  try {
    // Await cookies() to satisfy Next.js dynamic API usage warning
    const cookieStore = await cookies()
    const userCookie = cookieStore.get(DISCORD_USER_COOKIE_NAME)

    if (userCookie) {
      console.log("Found Discord user cookie:", userCookie.value)
      return JSON.parse(userCookie.value) as DiscordUser
    }

    console.log("No Discord user cookie found")
    return null
  } catch (error) {
    console.error("Failed to parse Discord user cookie:", error)
    return null
  }
}

export function clearDiscordUserCookie(response: NextResponse) {
  try {
    console.log("Clearing Discord user cookie")
    response.cookies.delete(DISCORD_USER_COOKIE_NAME)
    return true
  } catch (error) {
    console.error("Error clearing Discord user cookie:", error)
    return false
  }
}
