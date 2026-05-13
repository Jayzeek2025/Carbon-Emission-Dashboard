type HeaderProps = {
  headerContent?: React.ReactNode;
};

export default function Header({ headerContent }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header-left">
        <h1>Carbon Emissions Dashboard</h1>
        <p>Track company emissions, reports, and sustainability updates.</p>
      </div>

      <div className="app-header-center">{headerContent}</div>

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
