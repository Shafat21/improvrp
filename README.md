# ImproveRP Next.js Discord OAuth App

A Next.js application that lets users sign in with Discord, checks guild membership, and stores session data in Upstash Redis.

## Features

- 🔑 **Discord OAuth2** login flow  
- ✅ Verify user is in a specific Discord guild  
- 🗄️ Session storage & caching using Upstash Redis  
- 🔒 Secure API routes behind Discord authentication  

## Prerequisites

- Node.js v16+  
- A Discord application (Client ID & Secret)  
- A Discord server (Guild) you control or have access to  
- Upstash Redis account (REST URL & Token)  

## Getting Started

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-org/your-repo.git
   cd your-repo
````

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create your `.env` file**
   Copy `.env.example` to `.env` and fill in the values:

   ```ini
   # Upstash Redis (for session store)
   UPSTASH_REDIS_REST_URL=""
   UPSTASH_REDIS_REST_TOKEN=""

   # Public-facing Discord OAuth settings
   NEXT_PUBLIC_DISCORD_CLIENT_ID="1395752028252147784"
   NEXT_PUBLIC_DISCORD_GUILD_ID="1269001855476826267"
   NEXT_PUBLIC_DISCORD_REDIRECT_URI="http://improvrp.net/api/discord-oauth/callback"

   # Server-side Discord OAuth settings
   DISCORD_CLIENT_SECRET="V2fLwsv7gRR9TgM75H_oBRIvghRRZmTq"
   DISCORD_GUILD_ID="1269001855476826267"
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build & start in production**

   ```bash
   npm run build
   npm start
   # or
   yarn build && yarn start
   ```

## Environment Variables

| Name                               | Description                                               |
| ---------------------------------- | --------------------------------------------------------- |
| `UPSTASH_REDIS_REST_URL`           | Your Upstash Redis REST API URL                           |
| `UPSTASH_REDIS_REST_TOKEN`         | Your Upstash Redis REST API Token                         |
| `NEXT_PUBLIC_DISCORD_CLIENT_ID`    | Discord OAuth2 Client ID (public)                         |
| `NEXT_PUBLIC_DISCORD_GUILD_ID`     | Discord Guild ID for membership checks (public)           |
| `NEXT_PUBLIC_DISCORD_REDIRECT_URI` | OAuth2 callback URL (public)                              |
| `DISCORD_CLIENT_SECRET`            | Discord OAuth2 Client Secret (server-side only)           |
| `DISCORD_GUILD_ID`                 | Discord Guild ID for membership checks (server-side only) |

> **Note:** Never commit your `.env` to source control. Add it to your `.gitignore`.

## Project Structure

```
/
├── pages/
│   ├── api/
│   │   └── discord-oauth/
│   │       └── callback.ts      # Handles Discord OAuth2 callback
│   └── protected.tsx            # Example of a guild‑locked page
├── lib/
│   ├── redis.ts                 # Upstash Redis client
│   └── discord.ts               # Discord OAuth & API helpers
├── components/
│   └── Navbar.tsx               # Site navigation & user info
├── .env.example                 # Example env file
├── next.config.js
├── package.json
└── README.md
```

## Usage

* Visit `/api/discord-oauth/login` to initiate login.
* After consenting, Discord redirects to your `NEXT_PUBLIC_DISCORD_REDIRECT_URI`.
* Your app fetches an access token, stores user & session data in Redis, then checks guild membership.
* Protected pages redirect unauthorized users to login.

## Deploying

* Push to Vercel, Netlify, or any Node.js host.
* Ensure your environment variables are set in your host’s dashboard.
* For Vercel, set them under **Project Settings » Environment Variables**.

## License

[MIT License](LICENSE)

