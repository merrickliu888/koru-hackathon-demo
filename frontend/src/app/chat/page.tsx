"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Globe, MoreHorizontal, Mic, X } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useSearchParams } from "next/navigation"
import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

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
    deliverables: {
      id: string
      text: string
      checked: boolean
    }[]
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
    <div className="flex h-screen bg-white h-screen p-4 mb-4 mr-4">
      {/* Empty left half */}
      <Card className="flex-grow flex flex-col h-full border-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Lesson Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 flex-grow overflow-scroll">
            <div className="flex flex-col gap-4 p-4 overflow-scroll h-full scrollbar-hide">
              <div>
                <Label className="text-lg font-bold">Deliverables</Label>
                <div className="mt-2 space-y-2">
                  {lessonPlan && lessonPlan.lessonPlan.deliverables.length > 0 ? (
                    lessonPlan.lessonPlan.deliverables.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2 group">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => {
                            if (lessonPlan) {
                              setLessonPlan({
                                ...lessonPlan,
                                lessonPlan: {
                                  ...lessonPlan.lessonPlan,
                                  deliverables: lessonPlan.lessonPlan.deliverables.map(d => 
                                    d.id === item.id ? { ...d, checked: !d.checked } : d
                                  )
                                }
                              });
                            }
                          }}
                          className="w-4 h-4"
                        />
                        <p
                          className="flex-1 bg-transparent border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none"
                        >
                          {item.text}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground italic">
                     
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-lg font-bold">Substitute's Notes</Label>
                <Textarea
                  placeholder="Enter notes here..."
                  className="mt-2"
                  rows={4}
                />
              </div>

              <hr className="border-gray-500 dark:border-gray-700 border-1" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-lg font-bold">
                    Date
                  </Label>
                  <Input id="date" type="date" className="mt-1" disabled />
                </div>
                <div>
                  <Label htmlFor="grade" className="text-lg font-bold">
                    Grade
                  </Label>
                  <Input id="grade" placeholder="e.g. Grade 5" className="mt-1" disabled />
                </div>
                <div>
                  <Label htmlFor="teacher" className="text-lg font-bold">
                    Teacher
                  </Label>
                  <Input id="teacher" placeholder="Teacher's name" className="mt-1" disabled />
                </div>
                <div>
                  <Label htmlFor="room" className="text-lg font-bold">
                    Room
                  </Label>
                  <Input id="room" placeholder="Room number" className="mt-1" disabled />
                </div>
              </div>

              <div>
                <Label htmlFor="morning-routine" className="text-lg font-bold">
                  Morning Routine
                </Label>
                <Textarea
                  disabled={true}
                  id="morning-routine"
                  placeholder="Describe the morning routine..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="period-1" className="text-lg font-bold">
                    Period 1 (8:45 – 9:15)
                  </Label>
                  <Input id="period-1" placeholder="Reading" className="mt-1" disabled />
                  <Input id="period-1-topic" placeholder="e.g. Fractions" className="mt-1" disabled />
                  <Textarea placeholder="Lesson details..." className="mt-1" rows={2} disabled />
                </div>
                <div>
                  <Label htmlFor="period-2" className="text-lg font-bold">
                    Period 2 (9:15 – 9:55)
                  </Label>
                  <Input id="period-2" placeholder="English" className="mt-1" disabled />
                  <Input id="period-2-topic" placeholder="e.g. Fractions" className="mt-1" disabled />
                  <Textarea placeholder="Lesson details..." className="mt-1" rows={2} disabled />
                </div>
              </div>

              <div>
                <Label htmlFor="recess" className="text-lg font-bold">
                  Recess (9:55 – 10:10)
                </Label>
                <Input id="recess" placeholder="e.g. YARD DUTY ON THE FIELD" className="mt-1" disabled />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="period-3" className="text-lg font-bold">
                    Period 3 (10:10 – 10:50)
                  </Label>
                  <Input id="period-3" placeholder="Music" className="mt-1" disabled />
                  <Input id="period-3-topic" placeholder="e.g. Fractions" className="mt-1" disabled />
                  <Textarea placeholder="Lesson details..." className="mt-1" rows={2} disabled />
                </div>
                <div>
                  <Label htmlFor="period-4" className="text-lg font-bold">
                    Period 4 (10:50 – 11:30)
                  </Label>
                  <Input id="period-4" placeholder="Math" className="mt-1" disabled />
                  <Input id="period-4-topic" placeholder="e.g. Fractions" className="mt-1" disabled />
                  <Textarea placeholder="Lesson details..." className="mt-1" rows={2} disabled />
                </div>
              </div>

              <div>
                <Label htmlFor="lunch" className="text-lg font-bold">
                  Lunch (11:30 – 12:30)
                </Label>
                <Input id="lunch" placeholder="Lunch routine..." className="mt-1" disabled />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="period-5" className="text-lg font-bold">
                    Period 5 (12:35 – 1:15)
                  </Label>
                  <Input id="period-5" placeholder="Art" className="mt-1" disabled />
                  <Input id="period-5-topic" placeholder="e.g. Fractions" className="mt-1" disabled />
                  <Textarea placeholder="Lesson details..." className="mt-1" rows={2} disabled />
                </div>
                <div>
                  <Label htmlFor="period-6" className="text-lg font-bold">
                    Period 6 (1:15 – 1:55)
                  </Label>
                  <Input id="period-6" placeholder="French" className="mt-1" disabled />
                  <Input id="period-6-topic" placeholder="e.g. Fractions" className="mt-1" disabled />
                  <Textarea placeholder="Lesson details..." className="mt-1" rows={2} disabled />
                </div>
              </div>

              <div>
                <Label htmlFor="recess" className="text-lg font-bold">
                  Recess (1:55 – 2:10)
                </Label>
                <Input id="recess" placeholder="e.g. YARD DUTY ON THE FIELD" className="mt-1" disabled />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="period-5" className="text-lg font-bold">
                    Period 7 (2:10 – 2:50)
                  </Label>
                  <Input id="period-5" placeholder="Art" className="mt-1" disabled />
                  <Input id="period-5-topic" placeholder="e.g. Fractions" className="mt-1" disabled />
                  <Textarea placeholder="Lesson details..." className="mt-1" rows={2} disabled />
                </div>
                <div>
                  <Label htmlFor="period-6" className="text-lg font-bold">
                    Period 8 (2:50 – 3:30)
                  </Label>
                  <Input id="period-6" placeholder="Art" className="mt-1" disabled />
                  <Input id="period-6-topic" placeholder="e.g. Fractions" className="mt-1" disabled />
                  <Textarea placeholder="Lesson details..." className="mt-1" rows={2} disabled />
                </div>
              </div>

              <div>
                <Label htmlFor="other-notes" className="text-lg font-bold">
                  Other Notes
                </Label>
                <Textarea disabled={true} id="other-notes" placeholder="Add any other notes here..." className="mt-1" rows={3} />
              </div>
            </div>
          </CardContent>
        </Card>

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
              className="w-full bg-white border-gray-300 text-gray-900 pr-24 shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-2xl"
            />
          </form>
        </div>
      </div>
    </div>
  )
}

