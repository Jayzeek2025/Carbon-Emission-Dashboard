type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <h2>CarbonVista</h2>

        <nav className="app-nav">
          <button>Dashboard</button>
          <button>Companies</button>
          <button>Reports</button>
          <button>Posts</button>
          <button>Settings</button>
        </nav>
      </aside>

      <div className="app-content-wrapper">
        <header className="app-header">
          <h1>Carbon Emissions Dashboard</h1>
        </header>

        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}