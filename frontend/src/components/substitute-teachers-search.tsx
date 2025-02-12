"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  grade: string;
  available: boolean;
}

const subjects = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Art",
  "Music",
  "Physical Education",
  "Foreign Languages",
];

const grades = ["Elementary", "Middle School", "High School"];

const dummyTeachers = [
  { id: 1, name: "John Doe", subject: "Mathematics", grade: "High School", available: true, experience: "5 years" },
  { id: 2, name: "Jane Smith", subject: "Science", grade: "Middle School", available: false, experience: "3 years" },
  { id: 3, name: "Bob Johnson", subject: "English", grade: "Elementary", available: true, experience: "7 years" },
  { id: 4, name: "Alice Brown", subject: "History", grade: "High School", available: true, experience: "4 years" },
  { id: 5, name: "Charlie Davis", subject: "Art", grade: "Elementary", available: false, experience: "2 years" },
];

export default function SubstituteTeacherSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [requestedTeachers, setRequestedTeachers] = useState<Set<Teacher>>(new Set());

  const filteredTeachers = dummyTeachers.filter((teacher) => {
    return (
      teacher.name.toLowerCase().includes(teacherName.toLowerCase()) &&
      (selectedSubject === "" || teacher.subject === selectedSubject) &&
      (selectedGrade === "" || teacher.grade === selectedGrade) &&
      (!showOnlyAvailable || teacher.available)
    );
  });

  const handleRequest = (teacherId: number) => {
    setRequestedTeachers((prev) => {
      const newSet = new Set(prev);
      newSet.add(teacherId);
      return newSet;
    });
    console.log(`Requesting teacher with ID: ${teacherId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Substitute Teacher Search</h1>
      <div className="grid gap-4 mb-6">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="I am looking for a teacher for..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter teacher name"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="grade">Grade Level</Label>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger id="grade">
                <SelectValue placeholder="Select grade level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="availability">Availability</Label>
            <Select
              value={showOnlyAvailable ? "available" : "all"}
              onValueChange={(value) => setShowOnlyAvailable(value === "available")}
            >
              <SelectTrigger id="availability">
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teachers</SelectItem>
                <SelectItem value="available">Available Teachers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Subject</th>
              <th className="p-2 text-left">Grade Level</th>
              <th className="p-2 text-left">Availability</th>
              <th className="p-2 text-left">Request</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.id} className="border-t">
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={``} alt={teacher.name} />
                      <AvatarFallback>
                        {teacher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="link" className="p-0 h-auto font-normal">
                          {teacher.name}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">{teacher.name}</h4>
                            <p className="text-sm text-muted-foreground">Quick Profile Summary</p>
                          </div>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <span className="text-sm">Subject:</span>
                              <span className="col-span-2 text-sm">{teacher.subject}</span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <span className="text-sm">Grade Level:</span>
                              <span className="col-span-2 text-sm">{teacher.grade}</span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <span className="text-sm">Availability:</span>
                              <span
                                className={`col-span-2 text-sm ${
                                  teacher.available ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                {teacher.available ? "Available" : "Not Available"}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <span className="text-sm">Experience:</span>
                              <span className="col-span-2 text-sm">{teacher.experience}</span>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </td>
                <td className="p-2">{teacher.subject}</td>
                <td className="p-2">{teacher.grade}</td>
                <td className="p-2">
                  <span className={teacher.available ? "text-green-600" : "text-red-600"}>
                    {teacher.available ? "Available" : "Not Available"}
                  </span>
                </td>
                <td className="p-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRequest(teacher.id)}
                    disabled={requestedTeachers.has(teacher.id)}
                    className={requestedTeachers.has(teacher.id) ? "bg-gray-200 text-gray-600 w-20" : "w-20"}
                  >
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
