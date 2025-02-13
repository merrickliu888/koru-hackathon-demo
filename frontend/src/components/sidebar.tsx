import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LucideIcon, Settings } from "lucide-react";
import Image from "next/image";

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
        <SidebarHeader className="font-bold text-2xl ml-5">
          <div className="flex items-center gap-2">
            <Image src="/relay.svg" alt="Relay" width={32} height={32} />
            <span className="text-3xl font-bold" style={{ color: "#21337A" }}>
              Relay
            </span>
          </div>
        </SidebarHeader>
        <SidebarMenu>
          {tabs.map((tab) => (
            <SidebarMenuItem className="ml-5" key={tab.label}>
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
