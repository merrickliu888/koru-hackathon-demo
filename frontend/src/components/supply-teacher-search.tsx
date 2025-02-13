"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const dummyAbsences = [
  {
    id: 1,
    date: "2024-03-20",
    supplyTeacher: "John Doe",
    status: "completed",
  },
  {
    id: 2,
    date: "2024-03-25",
    supplyTeacher: "Sam Johnson",
    status: "pending",
  },
].reverse();

const newAbsence = {
  id: 3,
  date: "2024-04-01",
  supplyTeacher: "Not assigned",
  status: "upcoming",
};

export default function TeacherSearchPage() {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNewAbsence, setShowNewAbsence] = useState(false);

  const handleAddAbsence = () => {
    if (date) {
      // Handle adding the absence here
      console.log("Adding absence for:", format(date, "yyyy-MM-dd"));
      setShowNewAbsence(true);
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#21337A]">Manage Absences</h1>

      <div className="mb-6">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="bg-[#21337A] hover:bg-[#67A0C9]">
              Add an absence
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[350px] flex flex-col items-center">
            <DialogHeader>
              <DialogTitle className="text-[#21337A]">Select Absence Date</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                classNames={{
                  day_selected: "bg-[#21337A] text-white rounded-md hover:bg-[#67A0C9]",
                }}
                initialFocus
              />
              <Button onClick={handleAddAbsence} disabled={!date} className="bg-[#21337A] hover:bg-[#67A0C9]">
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
            {showNewAbsence && (
              <tr key={newAbsence.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {format(new Date(newAbsence.date), "MMMM d, yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{newAbsence.supplyTeacher}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      getStatusBadgeClass(newAbsence.status)
                    )}
                  >
                    {newAbsence.status.charAt(0).toUpperCase() + newAbsence.status.slice(1)}
                  </span>
                </td>
              </tr>
            )}
            {dummyAbsences.map((absence) => (
              <tr
                key={absence.id}
                className="hover:bg-gray-50"
                onClick={() => router.push(`/teacher-dashboard/generate-plan`)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {format(new Date(absence.date), "MMMM d, yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{absence.supplyTeacher}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      getStatusBadgeClass(absence.status)
                    )}
                  >
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
