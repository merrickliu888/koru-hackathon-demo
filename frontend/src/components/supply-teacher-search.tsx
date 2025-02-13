"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const subjects = [
  "Mathematics", "Science", "English", "History", "Art", "Music", "Physical Education", "Foreign Languages"
];

const grades = ["Elementary", "Middle School", "High School"];

const dummyTeachers = [
  { id: 1, name: "John Doe", subject: "Mathematics", grade: "High School", available: true, experience: "5 years" },
  { id: 2, name: "Jane Smith", subject: "Science", grade: "Middle School", available: false, experience: "3 years" },
  { id: 3, name: "Bob Johnson", subject: "English", grade: "Elementary", available: true, experience: "7 years" },
  { id: 4, name: "Alice Brown", subject: "History", grade: "High School", available: true, experience: "4 years" },
  { id: 5, name: "Charlie Davis", subject: "Art", grade: "Elementary", available: false, experience: "2 years" },
];

export default function TeacherSearchPage() {
  const [date, setDate] = useState<Date | undefined>();
  const [teacherName, setTeacherName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [requestedTeachers, setRequestedTeachers] = useState<Set<number>>(new Set());

  const handleRequest = (teacherId: number) => {
    setRequestedTeachers((prev) => new Set(prev).add(teacherId));
  };

  const filteredTeachers = dummyTeachers.filter((teacher) => {
    return (
      teacher.name.toLowerCase().includes(teacherName.toLowerCase()) &&
      (selectedSubject === "" || teacher.subject === selectedSubject) &&
      (selectedGrade === "" || teacher.grade === selectedGrade) &&
      (!showOnlyAvailable || teacher.available)
    );
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Find a Supply Teacher</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>

        <Input placeholder="Enter teacher name" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} />

        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger>
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedGrade} onValueChange={setSelectedGrade}>
          <SelectTrigger>
            <SelectValue placeholder="Select grade level" />
          </SelectTrigger>
          <SelectContent>
            {grades.map((grade) => (
              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Grade</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Availability</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Request</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">{teacher.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.grade}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={cn("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", teacher.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")}>
                    {teacher.available ? "Available" : "Not Available"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button variant="outline" onClick={() => handleRequest(teacher.id)} disabled={requestedTeachers.has(teacher.id)}>
                    {requestedTeachers.has(teacher.id) ? "Requested" : "Request"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
