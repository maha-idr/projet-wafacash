import React from "react";
import { NavLink } from "react-router-dom";
import './Menu.css';

const Menu = ({ userRole }) => {
  return (
    <nav className="menu">
      <ul>
        {userRole === "Commercial" && (
          <li>
            <NavLink to="/saisie" className={({ isActive }) => isActive ? "active" : ""}>
              Saisie demande
            </NavLink>
          </li>
        )}
        {userRole === "Admin" && (
          <li>
            <NavLink to="/affectation" className={({ isActive }) => isActive ? "active" : ""}>
              Affectation
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/consultation" className={({ isActive }) => isActive ? "active" : ""}>
            Consultation
          </NavLink>
        </li>
        <li>
          <NavLink to="/consultation" className={({ isActive }) => isActive ? "active" : ""}>
            Consultation
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
