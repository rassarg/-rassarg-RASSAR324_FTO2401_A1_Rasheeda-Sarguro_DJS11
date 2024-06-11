import React from "react";
import { Route, Routes } from "react-router-dom";

// components folder

import About from "./pages/About";
import Episode from "./pages/Episode";
import Genre from "./pages/Genre";
import Layout from "./pages/Layout";
import Preview from "./pages/Preview";
import Season from "./pages/Season";
import Show from "./pages/Show";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="show" element={<Show />}>
            <Route path="preview" element={<Preview />} />
            <Route path="episode" element={<Episode />} />
            <Route path="genre" element={<Genre />} />
            <Route path="season" element={<Season />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
