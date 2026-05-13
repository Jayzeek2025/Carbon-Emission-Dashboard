import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-content-wrapper">
        <Header />

        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}