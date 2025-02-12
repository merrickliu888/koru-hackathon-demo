"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, UserCircle, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Deliverable {
  id: string;
  text: string;
  checked: boolean;
}

export default function LessonPlan() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [newDeliverable, setNewDeliverable] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleCheckboxChange = (id: string) => {
    setDeliverables(deliverables.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleTextChange = (id: string, newText: string) => {
    setDeliverables(deliverables.map(item => 
      item.id === id ? { ...item, text: newText } : item
    ));
  };

  const addDeliverable = () => {
    if (newDeliverable.trim()) {
      setDeliverables([
        ...deliverables,
        { id: Date.now().toString(), text: newDeliverable, checked: false }
      ]);
      setNewDeliverable('');
    }
  };

  const removeDeliverable = (id: string) => {
    setDeliverables(deliverables.filter(item => item.id !== id));
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
                    No deliverables added yet. Add tasks for the substitute teacher below.
                  </div>
                )}
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    value={newDeliverable}
                    onChange={(e) => setNewDeliverable(e.target.value)}
                    placeholder="Add new deliverable for substitute..."
                    className="flex-1 bg-transparent border-b border-gray-300 focus:border-gray-500 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && addDeliverable()}
                  />
                  <button
                    onClick={addDeliverable}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-lg font-bold">Substitute's Notes</Label>
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
                <Input id="date" type="date" className="mt-1" disabled  />
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
              <Textarea id="morning-routine" placeholder="Describe the morning routine..." className="mt-1" rows={3} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="period-1" className="text-lg font-bold">
                  Period 1 (8:45 – 9:15)
                </Label>
                <Input id="period-1" placeholder="Reading" className="mt-1" disabled />
                <Input id="period-1-topic" placeholder="e.g. Fractions" className="mt-1" />
                <Textarea placeholder="Lesson details..." className="mt-1" rows={2} />
              </div>
              <div>
                <Label htmlFor="period-2" className="text-lg font-bold">
                  Period 2 (9:15 – 9:55)
                </Label>
                <Input id="period-2" placeholder="English" className="mt-1" disabled />
                <Input id="period-2-topic" placeholder="e.g. Fractions" className="mt-1" />
                <Textarea placeholder="Lesson details..." className="mt-1" rows={2} />
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
                <Input id="period-3-topic" placeholder="e.g. Fractions" className="mt-1" />
                <Textarea placeholder="Lesson details..." className="mt-1" rows={2} />
              </div>
              <div>
                <Label htmlFor="period-4" className="text-lg font-bold">
                  Period 4 (10:50 – 11:30)
                </Label>
                <Input id="period-4" placeholder="Math" className="mt-1" disabled />
                <Input id="period-4-topic" placeholder="e.g. Fractions" className="mt-1" />
                <Textarea placeholder="Lesson details..." className="mt-1" rows={2} />
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
                <Input id="period-5-topic" placeholder="e.g. Fractions" className="mt-1" />
                <Textarea placeholder="Lesson details..." className="mt-1" rows={2} />
              </div>
              <div>
                <Label htmlFor="period-6" className="text-lg font-bold">
                  Period 6 (1:15 – 1:55)
                </Label>
                <Input id="period-6" placeholder="French" className="mt-1" disabled />
                <Input id="period-6-topic" placeholder="e.g. Fractions" className="mt-1" />
                <Textarea placeholder="Lesson details..." className="mt-1" rows={2} />
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
                <Input id="period-5-topic" placeholder="e.g. Fractions" className="mt-1" />
                <Textarea placeholder="Lesson details..." className="mt-1" rows={2} />
              </div>
              <div>
                <Label htmlFor="period-6" className="text-lg font-bold">
                  Period 8 (2:50 – 3:30)
                </Label>
                <Input id="period-6" placeholder="Art" className="mt-1" disabled />
                <Input id="period-6-topic" placeholder="e.g. Fractions" className="mt-1" />
                <Textarea placeholder="Lesson details..." className="mt-1" rows={2} />
              </div>
            </div>

            <div>
                <Label htmlFor="other-notes" className="text-lg font-bold">
                    Other Notes
                </Label>
                <Textarea id="other-notes" placeholder="Add any other notes here..." className="mt-1" rows={3} />
            </div>
            </div>

        

            <div>
              <Label htmlFor="things-to-remember" className="text-lg font-bold">
                Additional Information
              </Label>
              <Textarea
                id="things-to-remember"
                placeholder="Add any additional information here..."
                className="mt-1"
                rows={3}
              />
            </div>
            

            <div className="flex justify-center">
              <Button size="lg" className="w-full md:w-auto text-lg py-6 ">
                Generate AI Lesson Plan
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-lg pb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                Your Selected Substitute
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative h-24 w-24 border-2 border-gray-400 rounded-full">
                  <img
                    src="/placeholder-avatar.png"
                    alt="Substitute Teacher"
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">Available Today</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Contact Information</h4>
                  <p className="text-sm">+1 (555) 123-4567</p>
                  <p className="text-sm">sarah.johnson@email.com</p>
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
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">English (Native)</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">French (Intermediate)</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Availability</h4>
                  <div className="text-sm space-y-1">
                    <p className="flex justify-between">
                      <span>Today</span>
                      <span className="text-green-500">Available</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Tomorrow</span>
                      <span className="text-green-500">Available</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Next Week</span>
                      <span className="text-yellow-500">Limited</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Upload className="h-6 w-6" />
                Upload Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "relative border-2 border-dashed rounded-lg p-6 transition-colors",
                  isDragging ? "border-primary" : "hover:border-primary/50",
                )}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground text-center">
                    {file ? file.name : "Drag and drop a file here, or click to select a file"}
                  </p>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

