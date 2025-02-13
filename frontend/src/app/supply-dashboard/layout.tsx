import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BookOpen, Search, Upload, Handshake } from "lucide-react";

// const tabs = [
//   { label: "Lesson Plans", href: "/supply-dashboard/lesson-plans", icon: Search },
//   { label: "Chat with Lesson Plan", href: "/supply-dashboard/chat", icon: Handshake },
//   // { label: "Generate Lesson Plan", href: "/teacher-dashboard/generate-lesson-plan", icon: BookOpen },
//   // { label: "Upload Docs", href: "/teacher-dashboard/upload-docs", icon: Upload },
// ];

export default function TeacherDashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen w-screen">{children}</div>;
}
