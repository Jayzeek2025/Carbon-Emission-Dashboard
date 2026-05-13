"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import SidebarCarbonMonitor from "./SidebarCarbonMonitor";

const menuItems = [
  { label: "Dashboard", path: "/" },
  { label: "Companies", path: "/companies" },
  { label: "Reports", path: "/reports" },
  { label: "Posts", path: "/posts" },
  { label: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="app-sidebar">
      <div>
        <div className="app-sidebar-header">
          <h2>CarbonVista</h2>

          <label
            className="mobile-close-button"
            htmlFor="mobile-nav-toggle"
            aria-label="Close navigation menu"
          >
            ×
          </label>
        </div>

        <nav className="app-nav">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.path}
              className={
                pathname === item.path ? "app-nav-item active" : "app-nav-item"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <SidebarCarbonMonitor />
    </aside>
  );
}
