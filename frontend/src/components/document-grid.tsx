"use client";

import { useState } from "react";
import { Plus, FileIcon, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Document {
  id: string;
  title: string;
  date: Date;
  thumbnail: string;
}

export default function DocumentGrid() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      title: "Emergency Contacts",
      date: new Date("2024-02-12"),
      thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2zFGl8n06MXJCSbyHEm6yFLZQZXrON.png",
    },
    {
      id: "2",
      title: "Emergency Plans",
      date: new Date("2024-02-12"),
      thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2zFGl8n06MXJCSbyHEm6yFLZQZXrON.png",
    },
    {
      id: "3",
      title: "Medication List",
      date: new Date("2024-02-12"),
      thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2zFGl8n06MXJCSbyHEm6yFLZQZXrON.png",
    },
    {
      id: "4",
      title: "Allergies",
      date: new Date("2024-02-12"),
      thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2zFGl8n06MXJCSbyHEm6yFLZQZXrON.png",
    },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to your server here
      const newDoc: Document = {
        id: Math.random().toString(),
        title: file.name.split(".")[0],
        date: new Date(),
        thumbnail: URL.createObjectURL(file),
      };
      setDocuments([...documents, newDoc]);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto w-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#21337A]">Global Documents</h1>
        <Tabs defaultValue="date" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="date">Name</TabsTrigger>
            <TabsTrigger value="Date">Date</TabsTrigger>
            <TabsTrigger value="type">Type</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Upload Card */}
        <div className="relative group">
          <label
            htmlFor="file-upload"
            className="block aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center h-full text-gray-500 group-hover:text-gray-600">
              <Plus className="w-6 h-6 m-2" />
              <span className="text-sm font-medium text-center">Add Document</span>
            </div>

            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*,.pdf,.doc,.docx"
            />
          </label>
        </div>

        {/* Document Cards */}
        {documents.map((doc) => (
          <div key={doc.id} className="group relative min-w-[205px]">
            <div className="aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="w-full h-full relative flex items-center justify-center">
                <FileIcon className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <div className="mt-2">
              <h3 className="text-sm font-medium truncate">{doc.title}</h3>
              <p className="text-xs text-gray-500">{format(doc.date, "MM/dd/yyyy")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
