// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";
import Favourites from "./pages/Favourites";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import { FavouritesProvider } from "./context/FavouritesContext";
import { PlayerProvider } from "./context/PlayerContext";
import "./App.css";

// Memoized components
const MemoizedHome = React.memo(Home);
const MemoizedShowDetail = React.memo(ShowDetail);
const MemoizedFavourites = React.memo(Favourites);

function App() {
  return (
    <PlayerProvider>
      <FavouritesProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<MemoizedHome />} />
            <Route path="/show/:id" element={<MemoizedShowDetail />} />
            <Route path="/favourites" element={<MemoizedFavourites />} />
          </Routes>

          <Player />
        </BrowserRouter>
      </FavouritesProvider>
    </PlayerProvider>
  );
}

export default App;
