import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import ShowDetail from "./components/ShowDetail";
import Favourites from "./components/Favourites";
import Navbar from "./components/Navbar";
import AudioPlayer from "./components/AudioPlayer";
import { PlayerProvider } from "./components/PlayerContext";
import "./App.css";

function App() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((response) => response.json())
      .then((data) => {
        setShows(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000); // Intentionally show loading spinner for 1 second
      })
      .catch((error) => {
        console.error("Error fetching shows:", error);
        setError(
          "An error occurred while fetching the shows. Please try again later."
        );
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        Loading...
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

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
