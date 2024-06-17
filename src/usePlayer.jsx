// usePlayer.jsx
import { useContext } from "react";
import { PlayerContext } from "./PlayerContext";

export const usePlayer = () => {
  const { currentEpisode, playEpisode, episodes, setEpisodes } =
    useContext(PlayerContext);

  const handlePlayEpisode = (episode) => {
    playEpisode(episode);
  };

  return {
    currentEpisode,
    handlePlayEpisode,
    episodes,
    setEpisodes,
    playEpisode,
  };
};
