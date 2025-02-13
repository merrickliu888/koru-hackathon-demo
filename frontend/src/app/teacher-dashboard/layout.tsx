import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Handshake, Upload } from "lucide-react";

const tabs = [
  { label: "Supply Teacher Handoff", href: "/teacher-dashboard/", icon: Handshake },
  { label: "Upload Global Docs", href: "/teacher-dashboard/global-documents", icon: Upload },
  // { label: "Generate Lesson Plan", href: "/teacher-dashboard/generate-lesson-plan", icon: BookOpen },
  // { label: "Upload Docs", href: "/teacher-dashboard/upload-docs", icon: Upload },
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
