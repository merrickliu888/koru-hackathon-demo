"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Globe, MoreHorizontal, Mic } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useSearchParams } from "next/navigation"
import type React from "react"

// Stub types
type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

type LessonPlan = {
  id: string
  teacher: string
  school: string
  grade: string
  lessonPlan: {
    deliverables: string[]
    morning_routine: string
    period_1: string
    period_2: string
    morning_recess: string
    period_3: string
    period_4: string
    period_5: string
    period_6: string
    afternoon_recess: string
    period_7: string
    period_8: string
    lunch: string
    other_notes: string
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null)
  const [initialized, setInitialized] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!initialized && searchParams) {
      const id = searchParams.get("id")
      const teacher = searchParams.get("teacher")
      const school = searchParams.get("school")
      const grade = searchParams.get("grade")
      const lessonPlanParam = searchParams.get("lessonPlan")
      console.log(id, teacher, school, grade, lessonPlanParam)

      if (id && teacher && school && grade && lessonPlanParam) {
        const parsedLessonPlan = JSON.parse(decodeURIComponent(lessonPlanParam))
        setLessonPlan({ id, teacher, school, grade, lessonPlan: parsedLessonPlan })
        setMessages([
          {
            id: "1",
            role: "assistant",
            content: `Hello! I'm ${teacher}, your teacher for the ${grade} class at ${school}. How can I help you today?`,
          },
        ])
        setInitialized(true)
      }
    }
  }, [searchParams, initialized])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])

    // Simulate AI response
    setIsLoading(true)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Thank you for your question about "${input}". As your ${lessonPlan?.grade} teacher at ${lessonPlan?.school}, I'll do my best to help you understand this topic. Let me check our lesson plan for today...`,
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)

    setInput("")
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Empty left half */}
      <div className="w-1/2 bg-gray-100"></div>

      {/* Chat interface on the right half */}
      <div className="w-1/2 flex flex-col">
        {/* Lesson Plan Info */}
        {lessonPlan && (
          <div className="bg-white border-b p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-gray-200">
                <AvatarFallback>
                  {lessonPlan.teacher
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">{lessonPlan.teacher}</h1>
                <p className="text-sm text-gray-600">
                  {lessonPlan.school} - {lessonPlan.grade}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Chat Area */}
        <main className="flex-grow overflow-auto p-4">
          {messages.map((message) => (
            <div key={message.id} className="mb-6">
              <div className="flex items-start gap-4">
                <Avatar className={`w-8 h-8 ${message.role === "user" ? "bg-gray-500" : "bg-[#19C37D]"}`}>
                  <AvatarFallback>
                    {message.role === "user"
                      ? "U"
                      : lessonPlan?.teacher
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{message.content}</p>
                  {message.role === "assistant" && (
                    <div className="flex gap-2 mt-2">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                        👍
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                        👎
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </main>

        {/* Input Area */}
        <div className="p-4">
          <form onSubmit={handleSubmit} className="relative">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder={`Message ${lessonPlan?.teacher || "teacher"}...`}
              className="w-full bg-white border-gray-300 text-gray-900 pr-24 pl-12 shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-2xl"
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button type="button" variant="ghost" size="icon" className="w-8 h-8 text-gray-500 hover:text-gray-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button type="button" variant="ghost" size="icon" className="w-8 h-8 text-gray-500 hover:text-gray-700">
                <Globe className="w-4 h-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="w-8 h-8 text-gray-500 hover:text-gray-700">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="w-8 h-8 text-gray-500 hover:text-gray-700">
                <Mic className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

