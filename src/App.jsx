import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/HomeComponent";
import ShowDetail from "./components/ShowDetail";
import Favourites from "./components/Favourites";
import Navbar from "./components/Navbar";
import AudioPlayer from "./components/AudioPlayer";
import { PlayerProvider } from "./PlayerContext";

function App() {
  return (
    <BrowserRouter>
      <PlayerProvider>
        <Navbar />
        <AudioPlayer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:showId" element={<ShowDetail />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </PlayerProvider>
    </BrowserRouter>
  );
}

export default App;
