"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Dashboard", path: "/" },
  { label: "Companies", path: "/companies" },
  { label: "Reports", path: "/" },
  { label: "Posts", path: "/" },
  { label: "Settings", path: "/" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="app-sidebar">
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
              pathname === item.path && item.label === "Dashboard"
                ? "app-nav-item active"
                : "app-nav-item"
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
