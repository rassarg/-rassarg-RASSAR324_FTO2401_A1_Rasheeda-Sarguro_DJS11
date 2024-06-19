import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import ShowDetail from "./components/ShowDetail";
import Favourites from "./components/Favourites";
import Navbar from "./components/Navbar";
import AudioPlayer from "./components/AudioPlayer";
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
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShows = useCallback(async () => {
    try {
      const response = await fetch("https://podcast-api.netlify.app/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setShows(data);
      setLoading(false);
    } catch (error) {
      setError(
        "An error occurred while fetching the shows. Please try again later."
      );
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShows();
  }, [fetchShows]);

  return (
    <BrowserRouter>
      <PlayerProvider>
        <Navbar />
        <AudioPlayer />
        <div className="content-container">
          {loading ? (
            <div className="spinner-container">
              Loading...
              <div className="spinner"></div>
            </div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <Routes>
              <Route path="/" element={<MemoizedHome shows={shows} />} />
              <Route
                path="/show/:showId"
                element={<MemoizedShowDetail shows={shows} />}
              />
              <Route path="/favourites" element={<MemoizedFavourites />} />
            </Routes>
          )}
        </div>
      </PlayerProvider>
    </BrowserRouter>
  );
}

export default App;
