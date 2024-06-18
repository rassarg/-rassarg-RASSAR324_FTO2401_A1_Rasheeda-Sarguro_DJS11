import { useContext } from "react";
import { PlayerContext } from "./components/PlayerContext";

export const usePlayer = () => {
  const {
    currentEpisode,
    playEpisode,
    episodes,
    setEpisodes,
    currentShowTitle,
    show,
    updateShows,
  } = useContext(PlayerContext);

  const handlePlayEpisode = (episode) => {
    playEpisode(episode);
  };

  return {
    currentEpisode,
    handlePlayEpisode,
    episodes,
    setEpisodes,
    playEpisode,
    currentShowTitle,
    show,
    updateShows,
  };
};
