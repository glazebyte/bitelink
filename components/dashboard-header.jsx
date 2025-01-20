"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { set } from "react-hook-form";

function DashboardHeader() {
  const [breadcrumbs, setBreadcrumbs] = useState(null);
  useEffect(() => {
    function generateBreadcrumbsItems() {
      const currentPath = window.location.pathname;
      const parts = currentPath.split("/");
      const breadcrumbs = [];
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
        if (part === "") continue;
        const url = parts.slice(0, i + 1).join("/");
        breadcrumbs.push({ url: url, part: part });
      }
      return breadcrumbs;
    }
    setBreadcrumbs(generateBreadcrumbsItems());
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs &&
              breadcrumbs.map((breadcrumb, index) => (
                <>
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink href={breadcrumb.url}>
                      {breadcrumb.part}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </>
              ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}

export default DashboardHeader;
