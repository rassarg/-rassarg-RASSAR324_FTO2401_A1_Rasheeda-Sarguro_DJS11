// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ShowDetail from "./components/ShowDetail";
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
        </Routes>
      </PlayerProvider>
    </BrowserRouter>
  );
}

export default App;
