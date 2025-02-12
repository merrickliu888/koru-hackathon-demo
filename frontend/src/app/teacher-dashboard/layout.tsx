import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BookOpen, Search, Upload } from "lucide-react";
const tabs = [
  { label: "Search Supply Teachers", href: "/teacher-dashboard/search-supply-teachers", icon: Search },
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
