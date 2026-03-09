"use client";

import { INavItems } from "@/lib/interfaces/common/common.interface";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  FileSpreadsheet,
  LayoutDashboard,
  Plus,
  Settings,
  Shield,
  Star,
  Users,
} from "lucide-react";

const navItems: INavItems[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Add Task", url: "/add-task", icon: Plus },
  { title: "Task History", url: "/tasks", icon: CalendarDays },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Reviews", url: "/reviews", icon: Star },
  { title: "Reports", url: "/reports", icon: FileSpreadsheet },
  { title: "Team", url: "/manager", icon: Users },
  { title: "HR", url: "/hr", icon: Shield },
  { title: "Admin", url: "/admin", icon: Settings },
];

const SidebarItems = () => {
  const pathName = usePathname();
  return (
    <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
      {navItems.map((i) => {
        const isActive = pathName === i.url;
        return (
          <Link
            key={i.url}
            href={i.url}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors
                   ${
                     isActive
                       ? "bg-sidebar-accent text-sidebar-primary font-medium"
                       : "hover:text-sidebar-accent-foreground hover:bg-sidebar-accent"
                   }`}
          >
            <i.icon className="w-4 h-4" />
            {i.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarItems;
