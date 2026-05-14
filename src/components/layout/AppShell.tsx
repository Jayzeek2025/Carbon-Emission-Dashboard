"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

type AppShellProps = {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  emissionTheme?: "green" | "orange" | "red";
};

export default function AppShell({
  children,
  headerContent,
  emissionTheme = "green",
}: AppShellProps) {
  return (
    <div className={`app-shell app-shell--${emissionTheme}`}>
      <input
        id="mobile-nav-toggle"
        className="mobile-nav-toggle"
        type="checkbox"
      />

      <label
        className="mobile-menu-button"
        htmlFor="mobile-nav-toggle"
        aria-label="Open navigation menu"
      >
        ☰
      </label>

      <label
        className="mobile-sidebar-overlay"
        htmlFor="mobile-nav-toggle"
        aria-label="Close navigation menu"
      />

      <Sidebar />

      <div className="app-content-wrapper">
        <Header headerContent={headerContent} />

        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}
