import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LucideIcon, Settings, Bolt } from "lucide-react";

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
        <SidebarHeader className="font-bold text-2xl ml-3">
          <div className="flex items-center gap-2">
            <Bolt /> Relay
          </div>
        </SidebarHeader>
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
