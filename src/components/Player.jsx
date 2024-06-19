import React from "react";
import { usePlayer } from "./PlayerContext";
import "./Player.css";

const Player = () => {
  const { audioRef, currentEpisode, currentShow } = usePlayer();

  return (
    <div className="player">
      <audio ref={audioRef} controls />
      {currentEpisode && currentShow && (
        <div className="player-details">
          <img
            src={currentShow.image}
            alt={currentShow.title}
            className="player-image"
          />
          <div>
            <h3>{currentEpisode.title}</h3>
            <p>{currentShow.title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
