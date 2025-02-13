"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Deliverable {
  id: string;
  text: string;
  checked: boolean;
}

interface LessonPlanForm {
  date: string;
  grade: string;
  teacher: string;
  room: string;
  morningRoutine: string;
  periods: {
    [key: string]: {
      subject: string;
      topic: string;
      details: string;
    };
  };
  recess1: string;
  lunch: string;
  recess2: string;
  otherNotes: string;
  additionalInformation: string;
}

export default function LessonPlan() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [newDeliverable, setNewDeliverable] = useState("");
  const [formData, setFormData] = useState<LessonPlanForm>({
    date: "",
    grade: "",
    teacher: "",
    room: "",
    morningRoutine: "",
    periods: {
      period1: { subject: "Reading", topic: "", details: "" },
      period2: { subject: "English", topic: "", details: "" },
      period3: { subject: "Music", topic: "", details: "" },
      period4: { subject: "Math", topic: "", details: "" },
      period5: { subject: "Art", topic: "", details: "" },
      period6: { subject: "French", topic: "", details: "" },
      period7: { subject: "Art", topic: "", details: "" },
      period8: { subject: "Art", topic: "", details: "" },
    },
    recess1: "",
    lunch: "",
    recess2: "",
    otherNotes: "",
    additionalInformation: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files || [])]);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleCheckboxChange = (id: string) => {
    setDeliverables(deliverables.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  const handleTextChange = (id: string, newText: string) => {
    setDeliverables(deliverables.map((item) => (item.id === id ? { ...item, text: newText } : item)));
  };

  const addDeliverable = () => {
    if (newDeliverable.trim()) {
      setDeliverables([...deliverables, { id: Date.now().toString(), text: newDeliverable, checked: false }]);
      setNewDeliverable("");
    }
  };

  const removeDeliverable = (id: string) => {
    setDeliverables(deliverables.filter((item) => item.id !== id));
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const handleFormChange = (
    field: keyof LessonPlanForm | { period: string; field: "topic" | "details" },
    value: string
  ) => {
    if (typeof field === "string") {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        periods: {
          ...prev.periods,
          [field.period]: {
            ...prev.periods[field.period],
            [field.field]: value,
          },
        },
      }));
    }
  };

  const handleGeneratePlan = async () => {
    try {
      const form = new FormData();

      files.forEach((file) => {
        form.append("files", file);
      });

      // Add additional information and period topics
      form.append("additionalInformation", formData.additionalInformation || "");

      // Add period topics with proper type checking
      Object.entries(formData.periods).forEach(([periodKey, periodData]) => {
        const topic = periodData.topic || "";
        form.append(`${periodKey}_topic`, topic);
      });

      const response = await fetch("http://localhost:8000/api/generate-lesson-plan", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to generate lesson plan");
      }

      const data = await response.json();
      const responseFormData = JSON.parse(data.form);
      console.log("RESPONSE FORM DATA", responseFormData);

      // Populate form fields with response data
      setFormData((prev) => ({
        ...prev,
        morningRoutine: responseFormData["morning_routine"],
        periods: {
          period1: { ...prev.periods.period1, details: responseFormData["period_1"] },
          period2: { ...prev.periods.period2, details: responseFormData["period_2"] },
          period3: { ...prev.periods.period3, details: responseFormData["period_3"] },
          period4: { ...prev.periods.period4, details: responseFormData["period_4"] },
          period5: { ...prev.periods.period5, details: responseFormData["period_5"] },
          period6: { ...prev.periods.period6, details: responseFormData["period_6"] },
          period7: { ...prev.periods.period7, details: responseFormData["period_7"] },
          period8: { ...prev.periods.period8, details: responseFormData["period_8"] },
        },
        recess1: responseFormData["morning_recess"],
        lunch: responseFormData["lunch"],
        recess2: responseFormData["afternoon_recess"],
        otherNotes: responseFormData["other_notes"],
      }));
      // Add deliverables
      const newDeliverables = responseFormData["deliverables"].map((text: string) => ({
        id: Date.now().toString() + Math.random(),
        text,
        checked: false,
      }));
      setDeliverables(newDeliverables);
    } catch (error) {
      console.error("Error generating lesson plan:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 w-full">
      <div className="flex-grow grid gap-6 md:grid-cols-[1fr_300px]">
        <Card className="flex-grow flex flex-col">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Lesson Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 flex-grow">
            <div className="flex flex-col gap-4 p-4 overflow-scroll h-[650px] border-2 scrollbar-hide">
              <div>
                <Label className="text-lg font-bold">Deliverables</Label>
                <div className="mt-2 space-y-2">
                  {deliverables.length > 0 ? (
                    deliverables.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2 group">
                        <input
                          type="checkbox"
                          disabled={true}
                          checked={item.checked}
                          onChange={() => handleCheckboxChange(item.id)}
                          className="w-4 h-4"
                        />
                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) => handleTextChange(item.id, e.target.value)}
                          className="flex-1 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none"
                        />
                        <button
                          onClick={() => removeDeliverable(item.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground italic">
                      No deliverables added yet. Add tasks for the supply teacher below.
                    </div>
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="text"
                      value={newDeliverable}
                      onChange={(e) => setNewDeliverable(e.target.value)}
                      placeholder="Add new deliverable for supply teacher..."
                      className="flex-1 bg-transparent border-b border-gray-300 focus:border-gray-500 focus:outline-none"
                      onKeyPress={(e) => e.key === "Enter" && addDeliverable()}
                    />
                    <button onClick={addDeliverable} className="text-gray-500 hover:text-gray-700">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-lg font-bold">Supply Teacher&apos;s Notes</Label>
                <Textarea
                  disabled
                  placeholder="The best notes"
                  className="mt-2 bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
                  rows={4}
                />
              </div>

              <hr className="border-gray-500 dark:border-gray-700 border-1" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-lg font-bold">
                    Date
                  </Label>
                  <Input id="date" className="mt-1" value="March 24, 2024" readOnly />
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
                  <Input id="teacher" value="Jane Lekhi" className="mt-1" readOnly />
                </div>
                <div>
                  <Label htmlFor="room" className="text-lg font-bold">
                    Room
                  </Label>
                  <Input id="room" value="MP 101" className="mt-1" readOnly />
                </div>
              </div>

              <div>
                <Label htmlFor="morning-routine" className="text-lg font-bold">
                  Morning Routine
                </Label>
                <Textarea
                  id="morning-routine"
                  placeholder="Describe the morning routine..."
                  className="mt-1"
                  rows={3}
                  value={formData.morningRoutine}
                  onChange={(e) => handleFormChange("morningRoutine", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="period-1" className="text-lg font-bold">
                    Period 1 (8:45 – 9:15)
                  </Label>
                  <Input id="period-1" placeholder="Reading" className="mt-1" disabled />
                  <Input
                    id="period-1-topic"
                    placeholder="e.g. Fractions"
                    className="mt-1"
                    value={formData.periods.period1.topic}
                    onChange={(e) => handleFormChange({ period: "period1", field: "topic" }, e.target.value)}
                  />
                  <Textarea
                    placeholder="Lesson details..."
                    className="mt-1"
                    rows={2}
                    value={formData.periods.period1.details}
                    onChange={(e) => handleFormChange({ period: "period1", field: "details" }, e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="period-2" className="text-lg font-bold">
                    Period 2 (9:15 – 9:55)
                  </Label>
                  <Input id="period-2" placeholder="English" className="mt-1" disabled />
                  <Input
                    id="period-2-topic"
                    placeholder="e.g. Fractions"
                    className="mt-1"
                    value={formData.periods.period2.topic}
                    onChange={(e) => handleFormChange({ period: "period2", field: "topic" }, e.target.value)}
                  />
                  <Textarea
                    placeholder="Lesson details..."
                    className="mt-1"
                    rows={2}
                    value={formData.periods.period2.details}
                    onChange={(e) => handleFormChange({ period: "period2", field: "details" }, e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="recess" className="text-lg font-bold">
                  Recess (9:55 – 10:10)
                </Label>
                <Input id="recess" placeholder="e.g. YARD DUTY ON THE FIELD" className="mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="period-3" className="text-lg font-bold">
                    Period 3 (10:10 – 10:50)
                  </Label>
                  <Input id="period-3" placeholder="Music" className="mt-1" disabled />
                  <Input
                    id="period-3-topic"
                    placeholder="e.g. Fractions"
                    className="mt-1"
                    value={formData.periods.period3.topic}
                    onChange={(e) => handleFormChange({ period: "period3", field: "topic" }, e.target.value)}
                  />
                  <Textarea
                    placeholder="Lesson details..."
                    className="mt-1"
                    rows={2}
                    value={formData.periods.period3.details}
                    onChange={(e) => handleFormChange({ period: "period3", field: "details" }, e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="period-4" className="text-lg font-bold">
                    Period 4 (10:50 – 11:30)
                  </Label>
                  <Input id="period-4" placeholder="Math" className="mt-1" disabled />
                  <Input
                    id="period-4-topic"
                    placeholder="e.g. Fractions"
                    className="mt-1"
                    value={formData.periods.period4.topic}
                    onChange={(e) => handleFormChange({ period: "period4", field: "topic" }, e.target.value)}
                  />
                  <Textarea
                    placeholder="Lesson details..."
                    className="mt-1"
                    rows={2}
                    value={formData.periods.period4.details}
                    onChange={(e) => handleFormChange({ period: "period4", field: "details" }, e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="lunch" className="text-lg font-bold">
                  Lunch (11:30 – 12:30)
                </Label>
                <Input id="lunch" placeholder="Lunch routine..." className="mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="period-5" className="text-lg font-bold">
                    Period 5 (12:35 – 1:15)
                  </Label>
                  <Input id="period-5" placeholder="Art" className="mt-1" disabled />
                  <Input
                    id="period-5-topic"
                    placeholder="e.g. Fractions"
                    className="mt-1"
                    value={formData.periods.period5.topic}
                    onChange={(e) => handleFormChange({ period: "period5", field: "topic" }, e.target.value)}
                  />
                  <Textarea
                    placeholder="Lesson details..."
                    className="mt-1"
                    rows={2}
                    value={formData.periods.period5.details}
                    onChange={(e) => handleFormChange({ period: "period5", field: "details" }, e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="period-6" className="text-lg font-bold">
                    Period 6 (1:15 – 1:55)
                  </Label>
                  <Input id="period-6" placeholder="French" className="mt-1" disabled />
                  <Input
                    id="period-6-topic"
                    placeholder="e.g. Fractions"
                    className="mt-1"
                    value={formData.periods.period6.topic}
                    onChange={(e) => handleFormChange({ period: "period6", field: "topic" }, e.target.value)}
                  />
                  <Textarea
                    placeholder="Lesson details..."
                    className="mt-1"
                    rows={2}
                    value={formData.periods.period6.details}
                    onChange={(e) => handleFormChange({ period: "period6", field: "details" }, e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="recess" className="text-lg font-bold">
                  Recess (1:55 – 2:10)
                </Label>
                <Input id="recess" placeholder="e.g. YARD DUTY ON THE FIELD" className="mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="period-5" className="text-lg font-bold">
                    Period 7 (2:10 – 2:50)
                  </Label>
                  <Input id="period-5" placeholder="Art" className="mt-1" disabled />
                  <Input
                    id="period-5-topic"
                    placeholder="e.g. Fractions"
                    className="mt-1"
                    value={formData.periods.period7.topic}
                    onChange={(e) => handleFormChange({ period: "period7", field: "topic" }, e.target.value)}
                  />
                  <Textarea
                    placeholder="Lesson details..."
                    className="mt-1"
                    rows={2}
                    value={formData.periods.period7.details}
                    onChange={(e) => handleFormChange({ period: "period7", field: "details" }, e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="period-6" className="text-lg font-bold">
                    Period 8 (2:50 – 3:30)
                  </Label>
                  <Input id="period-6" placeholder="Art" className="mt-1" disabled />
                  <Input
                    id="period-6-topic"
                    placeholder="e.g. Fractions"
                    className="mt-1"
                    value={formData.periods.period8.topic}
                    onChange={(e) => handleFormChange({ period: "period8", field: "topic" }, e.target.value)}
                  />
                  <Textarea
                    placeholder="Lesson details..."
                    className="mt-1"
                    rows={2}
                    value={formData.periods.period8.details}
                    onChange={(e) => handleFormChange({ period: "period8", field: "details" }, e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="other-notes" className="text-lg font-bold">
                  Other Notes
                </Label>
                <Textarea id="other-notes" placeholder="Add any other notes here..." className="mt-1" rows={3} />
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

            <div>
              <Label htmlFor="things-to-remember" className="text-lg font-bold">
                Additional Information
              </Label>
              <Textarea
                id="things-to-remember"
                value={formData.additionalInformation}
                onChange={(e) => handleFormChange("additionalInformation", e.target.value)}
                placeholder="Add any additional information here..."
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="flex justify-center">
              <Button size="lg" className="w-full md:w-auto text-lg py-6 " onClick={handleGeneratePlan}>
                Generate AI Lesson Plan
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-lg pb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">Supply Teacher</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative h-24 w-24 border-2 border-gray-400 rounded-full">
                  <Image
                    src="/placeholder-avatar.png"
                    alt="Supply Teacher"
                    className="rounded-full object-cover w-full h-full"
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Sam Johnson</h3>
                  <p className="text-sm text-muted-foreground">Available Today</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Contact Information</h4>
                  <p className="text-sm">+1 (555) 123-4567</p>
                  <p className="text-sm">sam.johnson@email.com</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Qualifications</h4>
                  <ul className="text-sm list-disc list-inside">
                    <li>B.Ed Elementary Education</li>
                    <li>Special Education Certified</li>
                    <li>First Aid Certified</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Teaching Experience</h4>
                  <p className="text-sm">5+ years elementary teaching</p>
                  <p className="text-sm">Grades 1-6 expertise</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Preferred Subjects</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">Mathematics</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">Science</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">English</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Languages</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">
                      English (Native)
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">
                      French (Intermediate)
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg flex flex-col min-h-[300px] max-h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Upload className="h-6 w-6" />
                Upload Files
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 flex flex-col overflow-hidden">
              <div
                className={cn(
                  "relative border-2 border-dashed rounded-lg p-6 transition-colors min-h-[150px]",
                  isDragging ? "border-primary" : "hover:border-primary/50"
                )}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} multiple />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground text-center">
                    Drag and drop files here, or click to select files
                  </p>
                </label>
              </div>

              {files.length > 0 && (
                <div className="space-y-2 flex-1 flex flex-col min-h-0">
                  <h4 className="text-sm font-medium">Uploaded Files</h4>
                  <div className="border rounded-lg divide-y flex-1 overflow-y-auto">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50">
                        <span className="text-sm truncate">{file.name}</span>
                        <button onClick={() => removeFile(file)} className="text-gray-500 hover:text-red-500">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
