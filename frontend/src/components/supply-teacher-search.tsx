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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

const dummyAbsences = [
  { 
    id: 1, 
    date: "2024-03-20", 
    supplyTeacher: "John Doe",
    status: "completed" 
  },
  { 
    id: 2, 
    date: "2024-03-25", 
    supplyTeacher: "Pending",
    status: "pending" 
  },
  { 
    id: 3, 
    date: "2024-04-01", 
    supplyTeacher: "Not assigned",
    status: "upcoming" 
  },
];

export default function TeacherSearchPage() {
  const [date, setDate] = useState<Date | undefined>();
  const [teacherName, setTeacherName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [requestedTeachers, setRequestedTeachers] = useState<Set<number>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequest = (teacherId: number) => {
    setRequestedTeachers((prev) => new Set(prev).add(teacherId));
  };

  const handleAddAbsence = () => {
    if (date) {
      // Handle adding the absence here
      console.log("Adding absence for:", format(date, "yyyy-MM-dd"));
      setIsModalOpen(false);
      setDate(undefined);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
      <h1 className="text-2xl font-bold mb-6">Manage Absences</h1>

      <div className="mb-6">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Add an absence</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Select Absence Date</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                initialFocus
              />
              <Button onClick={handleAddAbsence} disabled={!date}>
                Confirm Absence
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Supply Teacher</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyAbsences.map((absence) => (
              <tr key={absence.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {format(new Date(absence.date), "MMMM d, yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {absence.supplyTeacher}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                    getStatusBadgeClass(absence.status)
                  )}>
                    {absence.status.charAt(0).toUpperCase() + absence.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
