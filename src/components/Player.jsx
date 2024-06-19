import React from "react";
import { usePlayer } from "./PlayerContext";
import "./Player.css";

const Player = () => {
  const { audioRef, currentEpisode, currentShow, currentSeason } = usePlayer();

  return (
    <div className="player">
      {currentEpisode ? (
        <>
          <audio ref={audioRef} controls />
          <div className="player-details">
            <img
              src={currentShow.image}
              alt={currentShow.title}
              className="player-image"
            />
            <div>
              <h3>{currentEpisode.title}</h3>
              <p>{currentShow.title}</p>
              {currentSeason && <p>Season {currentSeason.season}</p>}
            </div>
          </div>
        </>
      ) : (
        <div className="select-podcast">
          <small>
            <p>Select a podcast</p>
          </small>
        </div>
      )}
    </div>
  );
};

export default Player;
