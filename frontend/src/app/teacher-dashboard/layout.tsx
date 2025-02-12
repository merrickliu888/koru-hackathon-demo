import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BookOpen, Home, Search, Upload, Handshake } from "lucide-react";

const tabs = [
  { label: "Dashboard", href: "/teacher-dashboard", icon: Home },
  { label: "Search Supply Teachers", href: "/teacher-dashboard/search-supply-teachers", icon: Search },
  { label: "Supply Teacher Handoff", href: "/teacher-dashboard/supply-teacher-handoff", icon: Handshake },
  { label: "Generate Lesson Plan", href: "/teacher-dashboard/generate-lesson-plan", icon: BookOpen },
  { label: "Upload Docs", href: "/teacher-dashboard/upload-docs", icon: Upload },
];

export default function TeacherDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <SidebarProvider>
        <AppSidebar tabs={tabs} />
        {children}
      </SidebarProvider>
    </div>
  );
}
