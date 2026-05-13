"use client";

import "./SidebarCarbonMonitor.css";

export default function SidebarCarbonMonitor() {
  return (
    <div className="sidebar-carbon-monitor">
      <div className="sidebar-carbon-monitor__status">
        <span className="sidebar-carbon-monitor__pulse" />

        <span className="sidebar-carbon-monitor__live">LIVE MONITOR</span>
      </div>

      <h3 className="sidebar-carbon-monitor__title">Carbon Tracking Active</h3>

      <p className="sidebar-carbon-monitor__description">
        Monitoring emissions across 10 companies in real time.
      </p>

      <div className="sidebar-carbon-monitor__stats">
        <div className="sidebar-carbon-monitor__stat">
          <span className="sidebar-carbon-monitor__label">Active</span>

          <span className="sidebar-carbon-monitor__value">10</span>
        </div>

        <div className="sidebar-carbon-monitor__stat">
          <span className="sidebar-carbon-monitor__label">Updated</span>

          <span className="sidebar-carbon-monitor__value">2m ago</span>
        </div>
      </div>

      <div className="sidebar-carbon-monitor__graph">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
