import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Pill,
  FolderOpen,
  Settings,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Pill, label: "Medications", path: "/medications" },
  { icon: FolderOpen, label: "Categories", path: "/categories" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="h-screen w-64 border-r bg-white p-4 flex flex-col">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-white text-xl">💊</span>
        </div>
        <h1 className="text-xl font-bold">PharmTrack</h1>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link to={item.path} key={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2",
                  isActive && "bg-primary-light text-primary hover:bg-primary-light"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="border-t pt-4">
        <Button variant="outline" className="w-full justify-start gap-2">
          <span className="w-4 h-4 rounded-full bg-green-500" />
          Dr. Smith
        </Button>
      </div>
    </div>
  );
};