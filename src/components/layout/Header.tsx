export default function Header() {
  return (
    <header className="app-header">
      <div>
        <h1>Carbon Emissions Dashboard</h1>
        <p>Track company emissions, reports, and sustainability updates.</p>
      </div>

      <div className="app-user-badge">
        <span className="app-user-avatar">CV</span>
        <div>
          <strong>EcoAdmin</strong>
          <span>CarbonVista</span>
        </div>
      </div>
    </header>
  );
}