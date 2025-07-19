export const whitelistConfig = {
  title: "The Commonwealth Roleplay Whitelist Application",
  sections: [
    {
      id: "whitelist-application",
      title: "Whitelist Application",
      questions: [
        {
          id: "priority-review",
          label:
            "Have you purchased a priority application review? If yes, please provide your Tebex username and email.",
          type: "textarea",
          required: false,
          placeholder: "e.g., johndoe123 | johndoe@example.com",
        },
        {
          id: "microphone-quality",
          label: "Do you have a quality microphone? Please ensure all static/background noise is removed.",
          type: "checkbox",
          required: true,
          checkboxLabel: "Yes, I have a clear and quality microphone.",
        },
        {
          id: "age-confirmation",
          label:
            "Do you confirm you are over the age of 18? Anyone found in breach of this faces immediate permanent removal.",
          type: "checkbox",
          required: true,
          checkboxLabel: "Yes, I am over 18 years old.",
        },
        {
          id: "read-rules",
          label: "Have you read our server rules?",
          type: "checkbox",
          required: true,
          checkboxLabel: "Yes, I have read and agree to the server rules.",
        },
        {
          id: "steam-id",
          label: "Please link your SteamID. You can find it here: https://steamid.pro/",
          type: "text",
          required: true,
          placeholder: "e.g., steam:110000103123456",
        },
        {
          id: "rp-experience",
          label: "How much roleplaying experience do you have?",
          type: "textarea",
          required: true,
          placeholder: "Describe your overall RP experience (servers, characters, etc).",
        },
        {
          id: "rp-confidence",
          label:
            "Based on your answer above, how confident are you with your roleplaying ability on a scale of 1 - 10?",
          type: "number",
          required: true,
          min: 1,
          max: 10,
          placeholder: "e.g., 8",
        },
        {
          id: "rp-paths",
          label: "Which character paths are you interested in?",
          type: "textarea",
          required: true,
          placeholder: "e.g., Civilian, Criminal, Emergency Services, Business Owner, etc.",
        },
        {
          id: "best-rp-scenario",
          label: "Based on previous experiences, what was the best RP scenario you've been a part of and why?",
          type: "textarea",
          required: true,
          placeholder: "Describe your most memorable RP experience and what made it special.",
        },
        {
          id: "ooc-to-ic",
          label: "How should you reference OOC terms properly IC?",
          type: "textarea",
          required: true,
          placeholder: "Explain how to keep immersion while referencing OOC info correctly.",
        },
      ],
    },
  ],
}
