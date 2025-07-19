import { siteConfig } from "./site.config.js"

export const faqConfig = {
  pageTitle: "Frequently Asked Questions",
  pageDescription: "Find answers to common questions about our FiveM roleplay server.",
  categories: [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: "HelpCircle",
      questions: [
        {
          id: "how-to-join",
          question: "How do I join the server?",
          answer:
            "To join our server, you'll need to own GTA V on PC and have FiveM installed. Once you have FiveM set up, you can connect to our server by searching for our server name or by using the direct connect feature with our server IP. You can find our server by searching for \"" +
            (typeof siteConfig !== "undefined" ? siteConfig.siteName : "Improv Roleplay Website") +
            '" in the FiveM server browser.',
        },
        {
          id: "application-process",
          question: "Do I need to apply before joining?",
          answer:
            'Yes, we require all players to complete an application before joining our roleplay community. This helps us maintain a high-quality roleplay environment. You can find the application form on our Discord server or by clicking the "Apply Now" button on our website. Applications are typically reviewed within 24-48 hours.',
        },
        {
          id: "minimum-requirements",
          question: "What are the minimum requirements to play?",
          answer:
            "To play on our server, you'll need:\n\n• GTA V for PC\n• FiveM client installed\n• A stable internet connection\n• A microphone for voice communication\n• Discord account to join our community\n• Basic understanding of roleplay concepts\n\nWe also recommend having at least 8GB of RAM and a decent CPU to ensure smooth gameplay.",
        },
        {
          id: "character-creation",
          question: "How do I create my character?",
          answer:
            "After being approved and joining the server, you'll start at the character creation screen. Here you can customize your character's appearance, choose their name, and set their background story. We recommend taking your time to create a well-rounded character with a believable backstory. Once you're satisfied with your character, you'll be spawned into the city to begin your roleplay journey.",
        },
      ],
    },
    {
      id: "gameplay",
      title: "Gameplay & Features",
      icon: "Gamepad",
      questions: [
        {
          id: "available-jobs",
          question: "What jobs are available on the server?",
          answer:
            "Our server offers a wide range of jobs and career paths, including:\n\n• Law Enforcement (Police, Sheriff, Highway Patrol)\n• Emergency Medical Services\n• Fire Department\n• Legal Professionals (Lawyers, Judges)\n• Mechanics\n• Real Estate Agents\n• Taxi/Uber Drivers\n• Truckers\n• Fishermen\n• Miners\n• Farmers\n• Various criminal organizations\n\nEach job has unique gameplay mechanics, progression systems, and roleplay opportunities.",
        },
        {
          id: "custom-vehicles",
          question: "Are there custom vehicles on the server?",
          answer:
            "Yes! Our server features over 500 custom vehicles, including police cars, civilian vehicles, motorcycles, boats, and aircraft. Many vehicles have custom handling and modifications. You can purchase vehicles at various dealerships throughout the city, and store them in your personal garages. Some special or high-end vehicles may require specific jobs or achievements to unlock.",
        },
        {
          id: "economy-system",
          question: "How does the economy system work?",
          answer:
            "Our server features a balanced economy system where players earn money through legal jobs, businesses, or criminal activities. Money is used to purchase vehicles, properties, items, and services. We have multiple banking locations, ATMs, and a stock market system. Players can also invest in businesses, own properties for passive income, and participate in various money-making activities. The economy is carefully monitored by our staff to prevent inflation or exploitation.",
        },
        {
          id: "phone-system",
          question: "Is there a phone system in-game?",
          answer:
            "Yes, our server features a comprehensive phone system that allows you to call other players, send text messages, use social media, access banking apps, request services (taxi, mechanic, etc.), view job information, and more. The phone is an essential tool for communication and accessing various server features. You'll receive a phone when you first join the server.",
        },
      ],
    },
    {
      id: "rules-policies",
      title: "Rules & Policies",
      icon: "ScrollText",
      questions: [
        {
          id: "voice-chat",
          question: "Is voice chat required?",
          answer:
            "Yes, a working microphone and voice chat are required to play on our server. We use proximity-based voice chat, which means you can only hear players who are physically close to you in-game. This enhances the roleplay experience and makes interactions more immersive. If you're unable to use voice chat due to a disability, please contact our staff team for accommodations.",
        },
        {
          id: "character-permadeath",
          question: "Is there permadeath on the server?",
          answer:
            "We have an optional permadeath system. If your character dies in a way that would realistically be fatal, you have the option to permadeath them (permanently retire the character) for roleplay immersion. However, it's not mandatory. We do have a 'New Life Rule' which means if your character is downed and revived, they don't remember the events leading up to their death. This helps maintain realistic roleplay scenarios.",
        },
        {
          id: "rule-breaking",
          question: "What happens if someone breaks the rules?",
          answer:
            "Rule violations are taken seriously to maintain our roleplay environment. Depending on the severity and frequency of violations, consequences may include:\n\n• Verbal warnings\n• Written warnings\n• Temporary bans (24 hours to 30 days)\n• Permanent bans\n\nWe have an appeal process for players who believe they were unfairly punished. All rule enforcement decisions are documented and reviewed by senior staff members.",
        },
        {
          id: "reporting-players",
          question: "How do I report a player who is breaking rules?",
          answer:
            "If you encounter a player breaking rules, you can report them through our Discord server using the dedicated report channels. Please include:\n\n• Your in-game name\n• The offender's in-game name\n• Date and time of the incident\n• Description of what happened\n• Any evidence (screenshots, video clips, etc.)\n\nReports are handled confidentially, and our staff team will investigate all legitimate reports promptly.",
        },
      ],
    },
    {
      id: "technical",
      title: "Technical Support",
      icon: "Wrench",
      questions: [
        {
          id: "connection-issues",
          question: "I'm having trouble connecting to the server. What should I do?",
          answer:
            "If you're experiencing connection issues, try these troubleshooting steps:\n\n1. Restart your FiveM client\n2. Verify your GTA V game files\n3. Clear your FiveM cache\n4. Check if your firewall is blocking FiveM\n5. Ensure you have the latest FiveM version\n6. Try connecting via direct connect using our IP address\n\nIf you're still having issues, please join our Discord server and ask for help in the technical-support channel.",
        },
        {
          id: "performance-issues",
          question: "How can I improve my game performance on the server?",
          answer:
            "To improve performance:\n\n1. Lower your in-game graphics settings\n2. Set FiveM to high priority in Task Manager\n3. Close unnecessary background applications\n4. Update your graphics drivers\n5. Reduce your screen resolution\n6. Disable unnecessary overlays (Discord, Steam, etc.)\n7. Allocate more RAM to FiveM in its settings\n\nOur server also has performance-friendly areas and optimized custom resources to help maintain good FPS.",
        },
        {
          id: "voice-chat-issues",
          question: "My voice chat isn't working. How can I fix it?",
          answer:
            "For voice chat issues:\n\n1. Ensure your microphone is properly connected and set as default in Windows\n2. Check if your microphone is working in Discord or other applications\n3. Verify that you've allowed FiveM to access your microphone in Windows privacy settings\n4. Make sure you haven't accidentally muted yourself in-game (default key: N)\n5. Try reconnecting to the server\n6. Check if your voice chat range is set correctly (default keys: Z, X, C)\n\nIf these steps don't resolve the issue, please contact our technical support team on Discord.",
        },
        {
          id: "custom-files",
          question: "Do I need to download any additional files to play?",
          answer:
            "No, you don't need to manually download any additional files. Our server uses the FiveM client's automatic resource downloading feature, which will download all necessary custom files when you connect to the server. This includes custom vehicles, maps, scripts, and other resources. Just make sure you have enough disk space (at least 5GB free) for these downloads.",
        },
      ],
    },
    {
      id: "community",
      title: "Community & Events",
      icon: "Users",
      questions: [
        {
          id: "community-events",
          question: "Does the server host regular events?",
          answer:
            "Yes! We host a variety of regular events including:\n\n• Weekly car meets\n• Racing tournaments\n• Fishing competitions\n• Hunting challenges\n• Criminal activities (bank heists, jewelry store robberies)\n• Special holiday events\n• Community gatherings\n\nEvents are announced in our Discord server and in-game. Many events offer special rewards, unique items, or cash prizes for participants.",
        },
        {
          id: "content-creation",
          question: "Can I create content (videos/streams) on your server?",
          answer:
            "We encourage content creation and streaming on our server. We have a dedicated channel in our Discord for content creators to share their work. We occasionally feature community content on our social media platforms. If you're a larger content creator looking for special accommodations or partnerships, please contact our management team through Discord.",
        },
        {
          id: "staff-applications",
          question: "How can I apply to become staff?",
          answer:
            "We periodically open staff applications based on server needs. To be considered for a staff position, you should:\n\n• Have at least 100 hours of playtime on our server\n• Be in good standing with no recent rule violations\n• Be at least 18 years old\n• Have a good understanding of our rules and roleplay standards\n• Be active in our community\n\nWhen applications are open, you'll find the application form in our Discord server's announcements channel.",
        },
        {
          id: "donations",
          question: "What benefits do donors receive?",
          answer:
            "Donors receive various perks as a thank you for supporting our server, including:\n\n• Priority queue access\n• Special Discord roles\n• Access to donor-only vehicles\n• Exclusive clothing options\n• Custom license plates\n• Additional character slots\n• Special housing options\n\nAll donor perks are cosmetic or quality-of-life improvements and don't provide gameplay advantages that would disrupt server balance. You can find more information about donation tiers and perks on our store page.",
        },
      ],
    },
  ],
}
