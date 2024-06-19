import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

// Context to hold the player state and actions
const PlayerContext = createContext();

// Custom hook to access the player context
export const usePlayer = () => {
  return useContext(PlayerContext);
};

// Provider component to wrap the application and provide the player context
export const PlayerProvider = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState(null); // Currently playing episode
  const [currentShow, setCurrentShow] = useState(null); // Currently selected show
  const [currentSeason, setCurrentSeason] = useState(null); // Currently selected season
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null); // Reference to the audio element

  // Effect to update the audio source and play the episode when the current episode changes
  useEffect(() => {
    if (audioRef.current && currentEpisode) {
      audioRef.current.src = currentEpisode.file; // Set the audio source to the episode file
      audioRef.current.play(); // Play the audio
    }
  }, [currentEpisode]);

  // Function to simulate loading and start playing the selected episode
  const playEpisode = (episode, show, season) => {
    setLoading(true);
    setCurrentEpisode(null);
    setCurrentShow(show);
    setCurrentSeason(season);

    setTimeout(() => {
      setCurrentEpisode(episode);
      setLoading(false);
    }, 1000); // Simulate loading delay
  };

  // Value object to provide in the context
  const value = {
    currentEpisode,
    currentShow,
    currentSeason,
    playEpisode,
    audioRef,
    loading,
  };

  // Provide the player context to the children
  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
