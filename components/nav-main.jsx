"use client";

import {
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Badge } from "./ui/badge";

export function NavMain({ items }) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.isActive}>
            <a href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
          <SidebarMenuBadge>
            {item.badge && (
              <Badge variant="outline" className="mr-2">
                {item.badge}
              </Badge>
            )}
          </SidebarMenuBadge>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
