import React, { useEffect, useRef } from "react";
import { usePlayer } from "../usePlayer";
import "./AudioPlayer.css";

const AudioPlayer = () => {
  const { currentEpisode } = usePlayer();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && currentEpisode) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play().catch((error) => {
        console.log("Autoplay prevented: user interaction required");
      });
    }
  }, [currentEpisode]);

  return (
    <div className="audio-player">
      <h2>Audio Player</h2>
      {currentEpisode ? (
        <>
          <p>Currently playing: {currentEpisode.title}</p>
          <audio ref={audioRef} controls>
            <source src={currentEpisode.file} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </>
      ) : (
        <p>Select an episode</p>
      )}
    </div>
  );
};

export default AudioPlayer;
