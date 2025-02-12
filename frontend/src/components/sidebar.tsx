import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LucideIcon, Settings, School } from "lucide-react";

interface SidebarProps {
  tabs: {
    label: string;
    href: string;
    icon: LucideIcon;
  }[];
}

export function AppSidebar({ tabs }: SidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="font-bold ml-3">Relay</SidebarHeader>
        <SidebarMenu>
          {tabs.map((tab) => (
            <SidebarMenuItem className="ml-3" key={tab.label}>
              <SidebarMenuButton asChild>
                <a href={tab.href}>
                  <tab.icon />
                  <span>{tab.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <Settings />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
