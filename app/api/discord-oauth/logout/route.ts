import { NextResponse } from "next/server"
import { clearDiscordUserCookie } from "@/lib/auth"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const response = NextResponse.redirect(`${url.origin}/whitelist`)

  // Clear the Discord user cookie
  clearDiscordUserCookie(response)

  return response
}
