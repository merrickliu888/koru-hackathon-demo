"use client";

import { useState, useEffect, Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";

// Stub types
type Message = {
  role: "user" | "assistant";
  content: string;
};

type LessonPlan = {
  id: string;
  teacher: string;
  school: string;
  grade: string;
  lessonPlan: {
    deliverables: {
      id: string;
      text: string;
      checked: boolean;
    }[];
    morning_routine: string;
    period_1: string;
    period_2: string;
    morning_recess: string;
    period_3: string;
    period_4: string;
    period_5: string;
    period_6: string;
    afternoon_recess: string;
    period_7: string;
    period_8: string;
    lunch: string;
    other_notes: string;
  };
};

// Create a client component for the part that uses useSearchParams
function ChatWithSearchParams() {
  // Initialize with default empty values
  const defaultLessonPlan = {
    id: "",
    teacher: "",
    school: "",
    grade: "",
    lessonPlan: {
      deliverables: [],
      morning_routine: "",
      period_1: "",
      period_2: "",
      morning_recess: "",
      period_3: "",
      period_4: "",
      period_5: "",
      period_6: "",
      period_7: "",
      period_8: "",
      lunch: "",
      afternoon_recess: "",
      other_notes: ""
    }
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [lessonPlan, setLessonPlan] = useState<LessonPlan>(defaultLessonPlan);  // Initialize with default values
  const [initialized, setInitialized] = useState(false);
  const [notes, setNotes] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!initialized && searchParams) {
      const id = searchParams.get("id");
      const teacher = searchParams.get("teacher");
      const school = searchParams.get("school");
      const grade = searchParams.get("grade");
      const lessonPlanParam = searchParams.get("lessonPlan");
      console.log(id, teacher, school, grade, lessonPlanParam);

      if (id && teacher && school && grade && lessonPlanParam) {
        const parsedLessonPlan = JSON.parse(decodeURIComponent(lessonPlanParam));
        setLessonPlan({ id, teacher, school, grade, lessonPlan: parsedLessonPlan });
        setMessages([
          {
            role: "assistant",
            content: `Hello! I'm Relay, your AI assistant for today's classes for the ${teacher}'s ${grade} class at ${school}. How can I help you today?`,
          },
        ]);
        setInitialized(true);
      }
    }
  }, [searchParams, initialized]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          lesson_plan: lessonPlan?.lessonPlan,
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage.role === "assistant") {
            return [...prev.slice(0, -1), { ...lastMessage, content: lastMessage.content + text }];
          } else {
            return [...prev, { id: Date.now().toString(), role: "assistant", content: text }];
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex h-screen bg-white h-screen p-4 mb-4 mr-4">
      {/* Empty left half */}
      <Card className="flex-grow flex flex-col h-full mr-3">
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
                                deliverables: lessonPlan.lessonPlan.deliverables.map((d) =>
                                  d.id === item.id ? { ...d, checked: !d.checked } : d
                                ),
                              },
                            });
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <p className="flex-1 bg-transparent border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none">
                        {item.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground italic"></div>
                )}
              </div>
            </div>

            <div>
              <Label className="text-lg font-bold">Supply Teacher&apos;s Notes</Label>
              <Textarea 
                placeholder="Enter notes here..." 
                className="mt-2" 
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <hr className="border-gray-500 dark:border-gray-700 border-1" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="text-lg font-bold">
                  Date
                </Label>
                <Input id="date" value="2025-02-24" className="mt-1" readOnly />
              </div>
              <div>
                <Label htmlFor="grade" className="text-lg font-bold">
                  Grade
                </Label>
                <Input id="grade" value="Grade 5" className="mt-1" readOnly />
              </div>
              <div>
                <Label htmlFor="teacher" className="text-lg font-bold">
                  Teacher
                </Label>
                <Input 
                  id="teacher" 
                  value={lessonPlan?.teacher || ""} 
                  className="mt-1" 
                  readOnly 
                />
              </div>
              <div>
                <Label htmlFor="room" className="text-lg font-bold">
                  Room
                </Label>
                <Input id="room" value={"210"} className="mt-1" readOnly />
              </div>
            </div>

            <div>
              <Label htmlFor="morning-routine" className="text-lg font-bold">
                Morning Routine
              </Label>
              <Textarea
                readOnly
                id="morning-routine"
                value={lessonPlan?.lessonPlan.morning_routine}
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="period-1" className="text-lg font-bold">
                  Period 1 (8:45 – 9:15)
                </Label>
                <Input id="period-1" value="Math" className="mt-1" readOnly />
                <Input id="period-1-topic" value="Fractions" className="mt-1" readOnly />
                <Textarea value={lessonPlan?.lessonPlan.period_1} className="mt-1" rows={2} readOnly />
              </div>
              <div>
                <Label htmlFor="period-2" className="text-lg font-bold">
                  Period 2 (9:15 – 9:55)
                </Label>
                <Input id="period-2" value="English" className="mt-1" readOnly />
                <Input id="period-2-topic" value="Essay Writing" className="mt-1" readOnly />
                <Textarea value={lessonPlan?.lessonPlan.period_2} className="mt-1" rows={2} readOnly />
              </div>
            </div>

            <div>
              <Label htmlFor="recess" className="text-lg font-bold">
                Recess (9:55 – 10:10)
              </Label>
              <Input id="recess" value={lessonPlan?.lessonPlan.morning_recess} className="mt-1" readOnly />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="period-3" className="text-lg font-bold">
                  Period 3 (10:10 – 10:50)
                </Label>
                <Input id="period-3" value="Music" className="mt-1" readOnly />
                <Input id="period-3-topic" value="History of Music" className="mt-1" readOnly />
                <Textarea value={lessonPlan?.lessonPlan.period_3} className="mt-1" rows={2} readOnly />
              </div>
              <div>
                <Label htmlFor="period-4" className="text-lg font-bold">
                  Period 4 (10:50 – 11:30)
                </Label>
                <Input id="period-4" value="Art" className="mt-1" readOnly />
                <Input id="period-4-topic" value="Art History" className="mt-1" readOnly />
                <Textarea value={lessonPlan?.lessonPlan.period_4} className="mt-1" rows={2} readOnly />
              </div>
            </div>

            <div>
              <Label htmlFor="lunch" className="text-lg font-bold">
                Lunch (11:30 – 12:30)
              </Label>
              <Input id="lunch" value={lessonPlan?.lessonPlan.lunch} className="mt-1" readOnly />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="period-5" className="text-lg font-bold">
                  Period 5 (12:35 – 1:15)
                </Label>
                <Input id="period-5" value="Art" className="mt-1" readOnly />
                <Input id="period-5-topic" value="Art History" className="mt-1" readOnly />
                <Textarea value={lessonPlan?.lessonPlan.period_5} className="mt-1" rows={2} readOnly />
              </div>
              <div>
                <Label htmlFor="period-6" className="text-lg font-bold">
                  Period 6 (1:15 – 1:55)
                </Label>
                <Input id="period-6" value="Physical Education" className="mt-1" readOnly />
                <Input id="period-6-topic" value="Basketball" className="mt-1" readOnly />
                <Textarea value={lessonPlan?.lessonPlan.period_6} className="mt-1" rows={2} readOnly />
              </div>
            </div>

            <div>
              <Label htmlFor="recess" className="text-lg font-bold">
                Recess (1:55 – 2:10)
              </Label>
              <Input id="recess" value={lessonPlan?.lessonPlan.afternoon_recess} className="mt-1" readOnly />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="period-5" className="text-lg font-bold">
                  Period 7 (2:10 – 2:50)
                </Label>
                <Input id="period-5" value="Science" className="mt-1" readOnly />
                <Input id="period-5-topic" value="Laws of Motion" className="mt-1" readOnly />
                <Textarea value={lessonPlan?.lessonPlan.period_7} className="mt-1" rows={2} readOnly />
              </div>
              <div>
                <Label htmlFor="period-6" className="text-lg font-bold">
                  Period 8 (2:50 – 3:30)
                </Label>
                <Input id="period-6" value="Writing" className="mt-1" readOnly />
                <Input id="period-6-topic" value="Creative Writing" className="mt-1" readOnly />
                <Textarea value={lessonPlan?.lessonPlan.period_8} className="mt-1" rows={2} readOnly />
              </div>
            </div>

            <div>
              <Label htmlFor="other-notes" className="text-lg font-bold">
                Other Notes
              </Label>
              <Textarea
                readOnly
                id="other-notes"
                value={lessonPlan?.lessonPlan.other_notes}
                className="mt-1"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="other-notes" className="text-lg font-bold">
                Important Information
              </Label>
              <div className="mt-2">
                <h4 className="font-medium">Allergies:</h4>
                <ul className="list-disc list-inside">
                  <li>Alex Huh: Peanut Allergy, Gluten Intolerance</li>
                  <li>John Doe: Dairy Allergy</li>
                  <li>Jane Smith: Egg Allergy</li>
                </ul>
              </div>
              <div className="mt-2">
                <h4 className="font-medium">Emergency Plans:</h4>
                <ul className="list-disc list-inside">
                  <li>In case of fire, evacuate to the nearest exit and gather at the designated meeting point.</li>
                  <li>For medical emergencies, call the school nurse and provide first aid if trained.</li>
                  <li>In case of severe weather, move to the interior rooms away from windows.</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat interface on the right half */}
      <Card className="w-1/2 flex flex-col ">
        {/* Lesson Plan Info */}
        {lessonPlan && (
          <div className="bg-white border-b p-4">
            <div className="flex items-center gap-3">
              {/* <Avatar className="h-10 w-10 bg-gray-200">
                <AvatarFallback>
                  {lessonPlan.teacher
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar> */}
              <div>
                <h1 className="text-xl font-bold text-[#21337A]">Relay Assist</h1>
              </div>
            </div>
          </div>
        )}

        {/* Main Chat Area */}
        <main className="flex-grow overflow-auto p-4">
          {messages.map((message, idx) => (
            <div key={idx} className="mb-6">
              <div className="flex items-start gap-4">
                {message.role === "user" ? (
                  <Avatar className={`w-8 h-8 ${message.role === "user" ? "bg-gray-500" : "bg-[#19C37D]"}`}>
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                ) : (
                  <Image src="/relay.svg" alt="Relay" width={32} height={32} />
                )}
                <div className="flex-1">
                  <p className={`text-sm ${message.role === "user" ? "text-gray-800" : "text-[#21337A]"}`}>
                    {message.content}
                  </p>
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
              placeholder={`Message Relay Assist...`}
              className="w-full bg-white border-gray-300 text-gray-900 pr-24 shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-2xl"
            />
          </form>
        </div>
      </Card>
      
    </div>
  );
}

// Your main page component remains a server component
export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatWithSearchParams />
    </Suspense>
  );
}
