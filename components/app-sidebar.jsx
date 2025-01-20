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
import { useSession } from "next-auth/react"

// This is sample data.
const data = {
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
      url: "/dashboard",
      isActive: true,
      icon: HomeIcon,
    },
    {
      title: "Shortlink",
      url: "/dashboard/shortlinks",
      icon: Link,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
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
  const {data: session} = useSession();
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
        <NavUser user={session.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
