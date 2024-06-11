import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <>
      <nav className="layout-nav">
        <Link to="/">HOME</Link>

        <NavLink to="search">Search</NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
