const menuItems = ["Dashboard", "Companies", "Reports", "Posts", "Settings"];

export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      <h2>CarbonVista</h2>

      <nav className="app-nav">
        {menuItems.map((item) => (
          <button
            key={item}
            className={item === "Dashboard" ? "app-nav-item active" : "app-nav-item"}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}