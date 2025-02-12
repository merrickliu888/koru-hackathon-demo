import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BookOpen, Home, User } from "lucide-react";

const tabs = [
  { label: "Dashboard", href: "/sub-dashboard", icon: Home },
  { label: "Profile", href: "/sub-dashboard/profile", icon: User },
  { label: "Duties", href: "/sub-dashboard/duties", icon: BookOpen },
];

export default function SubDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <SidebarProvider>
        <AppSidebar tabs={tabs} />
        {children}
      </SidebarProvider>
    </div>
  );
}
