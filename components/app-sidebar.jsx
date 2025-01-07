"use client"

import * as React from "react"
import {
  FileText,
  GalleryVerticalEnd,
  HomeIcon,
  Link,
  ScanQrCode,
  Settings2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"

// This is sample data.
const data = {
  user: {
    name: "Zaky Ahmad Fauzi",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Default",
      logo: GalleryVerticalEnd,
      plan: "Normal plan",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "#",
      isActive: true,
      icon: HomeIcon,
    },
    {
      title: "Shortlink",
      url: "#",
      icon: Link,
    },
    {
      title: "Qr Code",
      url: "#",
      icon: ScanQrCode,
    },
    {
      title: "Pages",
      url: "#",
      icon: FileText,
      badge: "Coming soon",
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
