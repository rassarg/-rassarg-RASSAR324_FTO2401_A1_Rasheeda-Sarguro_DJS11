import { useContext } from "react";
import { PlayerContext } from "./components/PlayerContext";

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

/* Defines a custom hook that allows components to access and
interact with the player state.
It uses the useContext hook to access the player context
and provides functions like handlePlayEpisode to play episodes.
This file encapsulates the player logic and provides a clean interface
for components to use. */
