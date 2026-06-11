import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="shield">🛡️</span>
        <span className="brand">
          <span className="glow">Smart</span>Shield
        </span>
      </div>

      <div className="nav-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Detector
        </NavLink>

        <NavLink 
          to="/awareness" 
          className={({ isActive }) => 
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Awareness
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;