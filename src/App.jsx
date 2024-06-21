// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// Pages folder
import CompletedEpisodes from "./pages/CompletedEpisodes";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";
import Favourites from "./pages/Favourites";
// Components folder
import Navbar from "./components/Navbar";
import Player from "./components/Player";
// Context providers
import { FavouritesProvider } from "./context/FavouritesContext";
import { PlayerProvider } from "./context/PlayerContext";
import { CompletedEpisodesProvider } from "./context/CompletedEpisodesContext"; // Import the CompletedEpisodesProvider

// Memoized components
const MemoizedHome = React.memo(Home);
const MemoizedShowDetail = React.memo(ShowDetail);
const MemoizedFavourites = React.memo(Favourites);
const MemoizedCompletedEpisodes = React.memo(CompletedEpisodes);

function App() {
  return (
    <PlayerProvider>
      <FavouritesProvider>
        <CompletedEpisodesProvider>
          <BrowserRouter>
            <Navbar />

            <Routes>
              <Route path="/" element={<MemoizedHome />} />
              <Route path="/show/:id" element={<MemoizedShowDetail />} />
              <Route path="/favourites" element={<MemoizedFavourites />} />
              <Route
                path="/completed-episodes"
                element={<MemoizedCompletedEpisodes />}
              />
            </Routes>

            <Player />
          </BrowserRouter>
        </CompletedEpisodesProvider>
      </FavouritesProvider>
    </PlayerProvider>
  );
}

export default App;
