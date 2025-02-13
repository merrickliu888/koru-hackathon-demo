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
import { useRouter } from "next/navigation";
import Image from "next/image";
// Updated stub data for lesson plans
const lessonPlans = [
  {
    id: "1",
    date: "2025-02-15",
    school: "Springfield Elementary",
    teacher: "John Doe",
    grade: "5th Grade",
    status: "Upcoming",
    lessonPlan: {
      deliverables: [
        {
          id: "1",
          text: "Deliverable 1",
          checked: false,
        },
        {
          id: "2",
          text: "Deliverable 2",
          checked: false,
        },
      ],
      morning_routine: "",
      period_1: "",
      period_2: "",
      morning_recess: "",
      period_3: "",
      period_4: "",
      period_5: "",
      period_6: "",
      afternoon_recess: "",
      period_7: "",
      period_8: "",
      lunch: "",
      other_notes: "",
    },
  },
  {
    id: "2",
    date: "2025-02-14",
    school: "Central High",
    teacher: "Jane Smith",
    grade: "10th Grade",
    status: "Completed",
    lessonPlan: {
      deliverables: [
        {
          id: "1",
          text: "Deliverable 1",
          checked: true,
        },
        {
          id: "2",
          text: "Deliverable 2",
          checked: false,
        },
      ],
      morning_routine: "",
      period_1: "",
      period_2: "",
      morning_recess: "",
      period_4: "",
      period_5: "",
      period_6: "",
      afternoon_recess: "",
      period_7: "",
      period_8: "",
      lunch: "",
      other_notes: "",
    },
  },
  {
    id: "3",
    date: "2025-02-16",
    school: "Westfield Middle",
    teacher: "Bob Johnson",
    grade: "8th Grade",
    status: "Upcoming",
    lessonPlan: {
      deliverables: [
        {
          id: "1",
          text: "Deliverable 1",
          checked: true,
        },
        {
          id: "2",
          text: "Deliverable 2",
          checked: false,
        },
      ],
      morning_routine: "",
      period_1: "",
      period_2: "",
      morning_recess: "",
      period_3: "",
      period_4: "",
      period_5: "",
      period_6: "",
      afternoon_recess: "",
      period_7: "",
      period_8: "",
      lunch: "",
      other_notes: "",
    },
  },
  {
    id: "4",
    date: "2025-02-13",
    school: "Eastside Academy",
    teacher: "Alice Brown",
    grade: "3rd Grade",
    status: "Completed",
    lessonPlan: {
      deliverables: [
        {
          id: "1",
          text: "Deliverable 1",
          checked: true,
        },
        {
          id: "2",
          text: "Deliverable 2",
          checked: false,
        },
      ],
      morning_routine: "",
      period_1: "",
      period_5: "",
      period_6: "",
      afternoon_recess: "",
      period_7: "",
      period_8: "",
      lunch: "",
      other_notes: "",
    },
  },
  {
    id: "5",
    date: "2025-02-17",
    school: "Northview High",
    teacher: "Charlie Davis",
    grade: "11th Grade",
    status: "Upcoming",
    lessonPlan: {
      deliverables: [
        {
          id: "1",
          text: "Deliverable 1",
          checked: true,
        },
        {
          id: "2",
          text: "Deliverable 2",
          checked: false,
        },
      ],
      morning_routine: "",
      period_1: "",
      period_2: "",
      period_6: "",
      afternoon_recess: "",
      period_7: "",
      period_8: "",
      lunch: "",
      other_notes: "",
    },
  },
];

const schools = [...new Set(lessonPlans.map((plan) => plan.school))];
const grades = [...new Set(lessonPlans.map((plan) => plan.grade))];

export default function LessonPlansPage() {
  const [date, setDate] = useState<Date | undefined>();
  const [schoolFilter, setSchoolFilter] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const router = useRouter();

  const filteredLessonPlans = lessonPlans.filter((plan) => {
    const matchesDate = !date || plan.date === format(date, "yyyy-MM-dd");
    const matchesSchool = !schoolFilter || plan.school === schoolFilter;
    const matchesTeacher = !teacherFilter || plan.teacher.toLowerCase().includes(teacherFilter.toLowerCase());
    const matchesGrade = !gradeFilter || plan.grade === gradeFilter;
    const matchesStatus = !statusFilter || plan.status === statusFilter;

    return matchesDate && matchesSchool && matchesTeacher && matchesGrade && matchesStatus;
  });

  const handleViewLesson = (plan: (typeof lessonPlans)[0]) => {
    router.push(
      `/chat?id=${plan.id}&teacher=${encodeURIComponent(plan.teacher)}&school=${encodeURIComponent(
        plan.school
      )}&grade=${encodeURIComponent(plan.grade)}&lessonPlan=${encodeURIComponent(JSON.stringify(plan.lessonPlan))}`
    );
  };

  console.log("lesson plan", lessonPlans[0].lessonPlan);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Image src="/relay.svg" alt="Relay" width={32} height={32} />
        <span className="text-3xl font-bold" style={{ color: "#21337A" }}>
          Relay
        </span>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>

        <Select value={schoolFilter} onValueChange={setSchoolFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Select school" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Schools">All Schools</SelectItem>
            {schools.map((school) => (
              <SelectItem key={school} value={school}>
                {school}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Enter teacher name"
          value={teacherFilter}
          onChange={(e) => setTeacherFilter(e.target.value)}
        />

        <Select value={gradeFilter} onValueChange={setGradeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Select grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Grades">All Grades</SelectItem>
            {grades.map((grade) => (
              <SelectItem key={grade} value={grade}>
                {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Statuses">All Statuses</SelectItem>
            <SelectItem value="Upcoming">Upcoming</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLessonPlans.map((plan) => (
              <tr key={plan.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleViewLesson(plan)}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.school}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.teacher}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.grade}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      plan.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    )}
                  >
                    {plan.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewLesson(plan);
                    }}
                  >
                    View Lesson
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
