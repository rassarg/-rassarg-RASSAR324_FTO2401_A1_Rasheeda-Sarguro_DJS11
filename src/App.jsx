import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";
import Favourites from "./pages/Favourites";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import { PlayerProvider } from "./components/PlayerContext";
import "./App.css";

// Memoized components
const MemoizedHome = React.memo(Home);
const MemoizedShowDetail = React.memo(ShowDetail);
const MemoizedFavourites = React.memo(Favourites);

function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<MemoizedHome />} />
            <Route path="/show/:id" element={<MemoizedShowDetail />} />
            <Route path="/favourites" element={<MemoizedFavourites />} />
          </Routes>
        </div>
        <Player />
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default App;
