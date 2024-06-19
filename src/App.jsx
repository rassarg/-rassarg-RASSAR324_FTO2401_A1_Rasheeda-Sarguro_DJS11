import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShowDetail from "./components/ShowDetail";
import Favourites from "./components/Favourites";
import Navbar from "./components/Navbar";
// import AudioPlayer from "./components/AudioPlayer";
// import { PlayerProvider } from "./components/PlayerContext";
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
    <BrowserRouter>
      {/* <PlayerProvider> */}
      <Navbar />
      {/* <AudioPlayer /> */}
      <div className="content-container">
        <Routes>
          <Route path="/" element={<MemoizedHome />} />
          <Route path="/show/:showId" element={<MemoizedShowDetail />} />
          <Route path="/favourites" element={<MemoizedFavourites />} />
        </Routes>
      </div>
      {/* </PlayerProvider> */}
    </BrowserRouter>
  );
}

export default App;
