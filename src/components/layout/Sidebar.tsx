import { ClipboardList } from "lucide-react";
import SidebarItems from "./SidebarItem";

const Sidebar = async () => {
  return (
    <aside className="hidden lg:flex flex-col w-60 h-screen sticky top-0 bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border">
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
      <SidebarItems />
    </aside>
  );
};

export default Sidebar;
