const menuItems = ["Dashboard", "Companies", "Reports", "Posts", "Settings"];

export default function Sidebar() {
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
          <button
            key={item}
            className={
              item === "Dashboard" ? "app-nav-item active" : "app-nav-item"
            }
            type="button"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}