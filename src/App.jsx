import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import ShowDetail from "./components/ShowDetail";
import Favourites from "./components/Favourites";
import Navbar from "./components/Navbar";
import AudioPlayer from "./components/AudioPlayer";
import { PlayerProvider } from "./components/PlayerContext";

function App() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((response) => response.json())
      .then((data) => setShows(data))
      .catch((error) => console.error("Error fetching shows:", error));
  }, []);

  return (
    <BrowserRouter>
      <PlayerProvider>
        <Navbar />
        <AudioPlayer />
        <Routes>
          <Route path="/" element={<Home shows={shows} />} />
          <Route path="/show/:showId" element={<ShowDetail shows={shows} />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </PlayerProvider>
    </BrowserRouter>
  );
}

export default App;
