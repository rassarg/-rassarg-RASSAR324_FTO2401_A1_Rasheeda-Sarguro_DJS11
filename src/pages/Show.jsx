import React from "react";
import { Outlet } from "react-router-dom";

function Show() {
  return (
    <div className="show">
      <h1>Show page</h1>
      <Outlet />
    </div>
  );
}

export default Show;
