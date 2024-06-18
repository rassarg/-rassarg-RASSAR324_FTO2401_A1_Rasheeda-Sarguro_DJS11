import React, { useEffect, useRef } from "react";
import { usePlayer } from "../usePlayer";
import "./AudioPlayer.css";

const AudioPlayer = () => {
  const { currentEpisode, handlePlayEpisode, show } = usePlayer(); // Add show to destructuring
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && currentEpisode) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [currentEpisode]);

  const handlePlay = () => {
    if (audioRef.current && currentEpisode) {
      audioRef.current.play().catch((error) => {
        console.log("Autoplay prevented: user interaction required");
      });
    }
  };

  return (
    <div className="audio-player">
      <h2 className="audio-player-title">
        {currentEpisode && show // Check if currentEpisode and show are both available
          ? `${show.title} - Episode ${currentEpisode.episode}`
          : ""}
      </h2>

      {currentEpisode ? (
        <div className="audio-player-current">
          <p>{currentEpisode.title}</p>
          <audio className="audio-player-element" ref={audioRef} controls>
            <source src={currentEpisode.file} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ) : (
        <p className="audio-player-select-episode">Select an episode</p>
      )}
    </div>
  );
};

export default AudioPlayer;
