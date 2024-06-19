import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";
import Favourites from "./pages/Favourites";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import { PlayerProvider } from "./components/PlayerContext";
import "./App.css";

// memoization
const useMemoizedComponent = (Component) => {
  return React.memo(Component);
};

// Memoized components
const MemoizedHome = useMemoizedComponent(Home);
const MemoizedShowDetail = useMemoizedComponent(ShowDetail);
const MemoizedFavourites = useMemoizedComponent(Favourites);

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
