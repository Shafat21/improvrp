"use client"

import type React from "react"

import { useState, useEffect } from "react" // Import useEffect
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { siteConfig } from "@/config/site.config"
import { whitelistConfig } from "@/config/whitelist.config"
import { Icon } from "@/components/icon"

interface DiscordUser {
  id: string
  username: string
  avatar?: string | null
}

interface FormData {
  [key: string]: string | boolean | number
  discordId?: string // Add discordId to FormData
  discordUsername?: string // Add discordUsername to FormData
}

interface WhitelistFormProps {
  discordUser: DiscordUser // Accept discordUser as a prop
}

export function WhitelistForm({ discordUser }: WhitelistFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({})
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<"success" | "error" | null>(null)
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null)

  const sections = whitelistConfig.sections
  const currentSection = sections[currentStep]

  // Pre-fill Discord name and ID on component mount or discordUser change
  useEffect(() => {
    if (discordUser) {
      setFormData((prev) => ({
        ...prev,
        discordId: discordUser.id,
        "discord-name": discordUser.username, // Assuming "discord-name" is the ID for the Discord name question
      }))
    }
  }, [discordUser])

  const handleChange = (questionId: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [questionId]: value }))
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[questionId]
      return newErrors
    })
  }

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {}
    let isValid = true

    currentSection.questions.forEach((question) => {
      // Skip validation for discord-name if it's pre-filled and read-only
      if (question.id === "discord-name" && discordUser) {
        return
      }

      const value = formData[question.id]

      if (question.required) {
        if (question.type === "checkbox") {
          if (!value) {
            newErrors[question.id] = `You must agree to this.`
            isValid = false
          }
        } else if (!value || String(value).trim() === "") {
          newErrors[question.id] = `${question.label} is required.`
          isValid = false
        }
      }

      if (question.type === "number" && question.min && typeof value === "number" && value < question.min) {
        newErrors[question.id] = `Age must be ${question.min} or older.`
        isValid = false
      }

      if (question.type === "textarea" && question.minWords) {
        const wordCount = String(value || "")
          .trim()
          .split(/\s+/)
          .filter(Boolean).length
        if (wordCount < question.minWords) {
          newErrors[question.id] = `Minimum ${question.minWords} words required. Current: ${wordCount}`
          isValid = false
        }
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < sections.length - 1) {
        setCurrentStep((prev) => prev + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleLogout = () => {
    window.location.href = "/api/discord-oauth/logout"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep()) {
      setSubmissionStatus("error")
      setSubmissionMessage("Please correct the errors in the current section.")
      return
    }

    setIsSubmitting(true)
    setSubmissionStatus(null)
    setSubmissionMessage(null)

    // Add discordId and discordUsername to the form data before submission
    const dataToSubmit = {
      ...formData,
      discordId: discordUser.id,
      discordUsername: discordUser.username,
    }

    try {
      const response = await fetch("/api/submit-whitelist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit), // Use dataToSubmit
      })

      const result = await response.json()

      if (response.ok) {
        setSubmissionStatus("success")
        setSubmissionMessage(result.message || "Application submitted successfully!")
        setFormData({}) // Clear form
        setCurrentStep(0) // Reset to first step
        // Optionally, clear Discord cookie after successful submission if desired
        // window.location.href = "/api/discord-oauth/logout"
      } else {
        setSubmissionStatus("error")
        if (response.status === 429) {
          setSubmissionMessage(result.error || "Too many requests. Please wait before trying again.")
        } else if (response.status === 403) {
          setSubmissionMessage(result.error || "You are blocked from submitting applications.")
        } else {
          setSubmissionMessage(result.error || "Failed to submit application. Please try again.")
        }
      }
    } catch (error) {
      console.error("Submission error:", error)
      setSubmissionStatus("error")
      setSubmissionMessage("An unexpected error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderQuestion = (question: (typeof currentSection.questions)[0]) => {
    const value = formData[question.id]
    const error = errors[question.id]

    // Handle discord-name field specifically
    if (question.id === "discord-name") {
      return (
        <div key={question.id} className="mb-4">
          <Label htmlFor={question.id} className="mb-2 block">
            {question.label}
            {question.required && <span className="text-destructive ml-1">*</span>}
          </Label>
          <Input
            id={question.id}
            type="text"
            value={discordUser.username} // Always use the authenticated Discord username
            readOnly // Make it read-only
            disabled // Visually disable it
            className="bg-background/80 cursor-not-allowed" // Add styling for disabled state
          />
          <p className="text-sm text-muted-foreground mt-1">This field is pre-filled from your Discord login.</p>
        </div>
      )
    }

    switch (question.type) {
      case "text":
      case "number":
        return (
          <div key={question.id} className="mb-4">
            <Label htmlFor={question.id} className="mb-2 block">
              {question.label}
              {question.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              id={question.id}
              type={question.type}
              value={(value as string | number) || ""}
              onChange={(e) =>
                handleChange(question.id, question.type === "number" ? Number(e.target.value) : e.target.value)
              }
              placeholder={question.placeholder}
              min={question.min}
              className={error ? "border-destructive" : ""}
            />
            {error && <p className="text-destructive text-sm mt-1">{error}</p>}
          </div>
        )
      case "textarea":
        return (
          <div key={question.id} className="mb-4">
            <Label htmlFor={question.id} className="mb-2 block">
              {question.label}
              {question.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Textarea
              id={question.id}
              value={(value as string) || ""}
              onChange={(e) => handleChange(question.id, e.target.value)}
              placeholder={question.placeholder}
              className={error ? "border-destructive" : ""}
              rows={question.id === "character-story" ? 8 : 4}
            />
            {question.id === "character-story" && question.minWords && (
              <p className="text-sm text-muted-foreground mt-1">
                Word count:{" "}
                {
                  String(value || "")
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean).length
                }{" "}
                / {question.minWords}
              </p>
            )}
            {error && <p className="text-destructive text-sm mt-1">{error}</p>}
          </div>
        )
      case "radio":
        return (
          <div key={question.id} className="mb-4">
            <Label className="mb-2 block">
              {question.label}
              {question.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <RadioGroup
              value={(value as string) || ""}
              onValueChange={(val) => handleChange(question.id, val)}
              className="flex flex-col space-y-2"
            >
              {question.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                  <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
            {error && <p className="text-destructive text-sm mt-1">{error}</p>}
          </div>
        )
      case "checkbox":
        return (
          <div key={question.id} className="mb-4 flex items-center space-x-2">
            <Checkbox
              id={question.id}
              checked={(value as boolean) || false}
              onCheckedChange={(checked) => handleChange(question.id, checked as boolean)}
              className={error ? "border-destructive" : ""}
            />
            <Label htmlFor={question.id}>
              {question.checkboxLabel || question.label}
              {question.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {error && <p className="text-destructive text-sm mt-1">{error}</p>}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="max-w-3xl mx-auto glass-card p-6 md:p-8">
      <CardHeader className="mb-6 text-center">
        <CardTitle className="text-2xl md:text-3xl" style={{ color: siteConfig.accentColor }}>
          {currentSection.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Step {currentStep + 1} of {sections.length}
        </CardDescription>
        <div className="w-full bg-border rounded-full h-2.5 mt-4">
          <div
            className="h-2.5 rounded-full"
            style={{
              width: `${((currentStep + 1) / sections.length) * 100}%`,
              backgroundColor: siteConfig.accentColor,
              transition: "width 0.3s ease-in-out",
            }}
          ></div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {currentSection.questions.map(renderQuestion)}
          </motion.div>

          {submissionStatus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-md flex items-center gap-3 ${
                submissionStatus === "success"
                  ? "bg-green-900/20 text-green-400"
                  : "bg-destructive/20 text-destructive-foreground"
              }`}
            >
              {submissionStatus === "success" ? (
                <Icon name="CheckCircle" size={20} />
              ) : (
                <Icon name="XCircle" size={20} />
              )}
              <div>
                <p>{submissionMessage}</p>
                {submissionStatus === "error" && submissionMessage?.includes("Discord authentication") && (
                  <p className="text-sm mt-2">
                    Please try logging out and logging back in with Discord.
                    <Button
                      variant="link"
                      onClick={handleLogout}
                      className="p-0 h-auto text-sm text-destructive-foreground hover:text-destructive"
                    >
                      Logout
                    </Button>
                  </p>
                )}
              </div>
            </motion.div>
          )}

          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={isSubmitting}
                className="px-6 py-3 bg-transparent"
              >
                Previous
              </Button>
            )}
            {currentStep < sections.length - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="ml-auto px-6 py-3 bg-primary hover:bg-secondary text-primary-foreground"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  (submissionStatus === "error" &&
                    (submissionMessage?.includes("blocked") || submissionMessage?.includes("wait")))
                }
                className="ml-auto px-6 py-3 bg-primary hover:bg-secondary text-primary-foreground"
              >
                {isSubmitting && <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />}
                Submit Application
              </Button>
            )}
          </div>
        </form>
        <div className="mt-6 text-center">
          <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
            <Icon name="LogOut" className="mr-2 h-4 w-4" />
            Logout from Discord
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
