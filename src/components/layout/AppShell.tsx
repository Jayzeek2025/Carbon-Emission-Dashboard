import Sidebar from "@/components/layout/Sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-content-wrapper">
        <header className="app-header">
          <h1>Carbon Emissions Dashboard</h1>
        </header>

        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}