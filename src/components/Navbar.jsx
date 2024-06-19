import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaStar } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => (
  <div className="navbar">
    <Link to="/" className="nav-link">
      <FaHome />
      <span className="tooltip">Home</span>
    </Link>
    <h1>✨ PODCAST PLAYGROUND ✨</h1>
    <Link to="/favourites" className="nav-link">
      <FaStar />
      <span className="tooltip">Favourites</span>
    </Link>
  </div>
);

export default Navbar;
