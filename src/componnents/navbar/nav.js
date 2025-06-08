import React from "react";
import "./nav.css";
import { Link } from "react-router-dom"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">My Configurator</div>
      <ul className="nav-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/config">Configuration</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
