import { NextResponse } from "next/server"
import { siteConfig } from "@/config/site.config"
import { whitelistConfig } from "@/config/whitelist.config"
import { getDiscordUserFromCookie } from "@/lib/auth"
import { Redis } from "@upstash/redis"

const redis = Redis.fromEnv()

export async function POST(request: Request) {
  const data = await request.json()
  const webhookUrl = siteConfig.whitelistWebhookUrl

  if (!webhookUrl) {
    return NextResponse.json({ error: "Discord webhook URL not configured." }, { status: 500 })
  }

  const authenticatedDiscordUser = await getDiscordUserFromCookie()

  if (!authenticatedDiscordUser) {
    return NextResponse.json({ error: "Discord authentication required. Please log in with Discord." }, { status: 401 })
  }

  if (!data.discordId || authenticatedDiscordUser.id !== data.discordId) {
    return NextResponse.json(
      { error: "Discord authentication mismatch or missing. Please re-authenticate." },
      { status: 401 },
    )
  }

  const userId = authenticatedDiscordUser.id
  const REDIS_KEY = `whitelist:user:${userId}`
  const currentTime = Date.now()
  const COOLDOWN_DURATION = 2 * 60 * 1000
  const MAX_SUBMISSIONS = 3
  const MAX_DISCORD_CONTENT_LENGTH = 1950

  let userRecord: { lastSubmissionTime: number; submissionCount: number; isBlocked: boolean } | null = null

  try {
    const recordValue = await redis.get(REDIS_KEY)
    if (typeof recordValue === "string" && recordValue) {
      userRecord = JSON.parse(recordValue)
    } else if (recordValue !== null && typeof recordValue === "object") {
      userRecord = recordValue as typeof userRecord
    }
  } catch (err) {
    console.error("Redis fetch error:", err)
  }

  if (userRecord?.isBlocked) {
    return NextResponse.json(
      { error: "You have been permanently blocked from submitting applications." },
      { status: 403 },
    )
  }

  if (userRecord && currentTime - userRecord.lastSubmissionTime < COOLDOWN_DURATION) {
    const timeLeft = Math.ceil((COOLDOWN_DURATION - (currentTime - userRecord.lastSubmissionTime)) / 1000)
    return NextResponse.json(
      { error: `Please wait ${Math.ceil(timeLeft / 60)} minutes before submitting another application.` },
      { status: 429 },
    )
  }

  // --- Build Message Chunks ---
  const chunks: string[] = []
  let currentChunk = `📩 **New Whitelist Application**\n`
  currentChunk += `**User:** <@${userId}> (${authenticatedDiscordUser.username})\n`
  currentChunk += `**User ID:** ${userId}\n\n`

  for (const section of whitelistConfig.sections) {
    const sectionHeader = `__**# ${section.title}**__\n\n`

    if (currentChunk.length + sectionHeader.length > MAX_DISCORD_CONTENT_LENGTH) {
      if (currentChunk.trim().length > 0) chunks.push(currentChunk)
      currentChunk = ""
    }
    currentChunk += sectionHeader

    for (const question of section.questions) {
      if (question.id === "discord-name") continue

      let answer = data[question.id]
      if (typeof answer === "boolean") answer = answer ? "✅ Yes" : "❌ No"
      if (answer === undefined || answer === null || answer === "") answer = "N/A"
      answer = String(answer).trim()
      if (answer.length > 1500) answer = answer.slice(0, 1497) + "..."

      const line = `**${question.label}?**\n__Answer__: ${answer}\n\n`

      // Handle rare case: a single line too large to fit
      if (line.length > MAX_DISCORD_CONTENT_LENGTH) {
        const parts = line.match(/.{1,1900}/gs) || []
        for (const part of parts) {
          if (currentChunk.trim().length > 0) chunks.push(currentChunk)
          chunks.push(part)
          currentChunk = ""
        }
        continue
      }

      // Flush if line would overflow current chunk
      if (currentChunk.length + line.length > MAX_DISCORD_CONTENT_LENGTH) {
        if (currentChunk.trim().length > 0) chunks.push(currentChunk)
        currentChunk = ""
      }

      currentChunk += line
    }

    if (currentChunk.length >= MAX_DISCORD_CONTENT_LENGTH - 100) {
      if (currentChunk.trim().length > 0) chunks.push(currentChunk)
      currentChunk = ""
    }
  }

  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk)
  }

  // --- Send Messages ---
  try {
    for (const chunk of chunks) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Whitelist Application Bot",
          avatar_url: "https://i.postimg.cc/mDrxKSwb/Improve-RP.png", // New logo URL
          content: chunk,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Discord webhook error:", response.status, errorText)
        return NextResponse.json({ error: "Failed to send message to Discord." }, { status: 500 })
      }
    }

    // --- Update Redis ---
    const currentSubmissionCount = (userRecord?.submissionCount || 0) + 1
    const isBlocked = currentSubmissionCount >= MAX_SUBMISSIONS
    const newRecord = {
      lastSubmissionTime: currentTime,
      submissionCount: currentSubmissionCount,
      isBlocked,
    }

    await redis.set(REDIS_KEY, JSON.stringify(newRecord), {
      ex: isBlocked ? undefined : 60 * 60 * 24 * 365,
    })

    const finalMsg = isBlocked
      ? "Application submitted successfully! Multiple responses will block you forever."
      : "Application submitted successfully!"
    return NextResponse.json({ message: finalMsg }, { status: 200 })
  } catch (err) {
    console.error("Error sending application:", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
