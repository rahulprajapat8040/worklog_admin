import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  FileSpreadsheet,
  LayoutDashboard,
  Plus,
  Settings,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

const navItems = [
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

const Sidebar = async () => {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  return (
    <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <ClipboardList className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-sidebar-accent-foreground">
              WorkLog Pro
            </h1>
            <p className="text-[11px] text-sidebar-muted">
              Work Intelligence Platform
            </p>
          </div>
        </div>
      </div>
      <SidebarItems pathName={pathname || ""} />
    </aside>
  );
};

export default Sidebar;

const SidebarItems = ({ pathName }: { pathName: string }) => {
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
