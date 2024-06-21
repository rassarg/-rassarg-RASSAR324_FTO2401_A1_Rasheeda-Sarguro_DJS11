import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaStar, FaHistory } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => (
  <div className="navbar">
    <div className="navbar-title">
      <h1>✨ PODCAST PLAYGROUND ✨</h1>
    </div>
    <div className="nav-icons">
      <Link to="/" className="nav-link">
        <FaHome size={24} />
        <span className="tooltip">Home</span>
      </Link>
      <Link to="/favourites" className="nav-link">
        <FaStar size={24} />
        <span className="tooltip">Favourites</span>
      </Link>
      <Link to="/completed-episodes" className="nav-link">
        {" "}
        <FaHistory size={24} />
        <span className="tooltip">Completed</span>
      </Link>
    </div>
  </div>
);

export default Navbar;
