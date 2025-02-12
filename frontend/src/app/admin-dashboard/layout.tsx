import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BookOpen, Home, Search, Upload } from "lucide-react";

const tabs = [
  { label: "Dashboard", href: "/admin-dashboard", icon: Home },
  { label: "Supply Teacher Requests", href: "/admin-dashboard/supply-teacher-requests", icon: BookOpen },
  { label: "Search Supply Teachers", href: "/admin-dashboard/search-supply-teachers", icon: Search },
  { label: "Upload Docs", href: "/admin-dashboard/upload-docs", icon: Upload },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <SidebarProvider>
        <AppSidebar tabs={tabs} />
        {children}
      </SidebarProvider>
    </div>
  );
}
