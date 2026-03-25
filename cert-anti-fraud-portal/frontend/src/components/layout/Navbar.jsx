import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="nav-root">
      <div className="nav-inner">
        <div className="nav-brand">
          <div className="nav-logo">शिक्षा</div>
          <div className="nav-text">
            <span className="nav-title">Certificate Anti‑Fraud Portal</span>
            <span className="nav-tagline">
              Cryptographically verifiable academic credentials
            </span>
          </div>
        </div>

        <nav className="nav-links">
          <NavLink end to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/students" className="nav-link">
            Students
          </NavLink>
          <NavLink to="/institutions" className="nav-link">
            Institutions
          </NavLink>
          <NavLink to="/verify" className="nav-link">
            Verify
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
