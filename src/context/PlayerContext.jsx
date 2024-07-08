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
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [currentShow, setCurrentShow] = useState(null);
  const [currentSeason, setCurrentSeason] = useState(null);
  const [completedEpisodes, setCompletedEpisodes] = useState(() => {
    return JSON.parse(localStorage.getItem("completedEpisodes")) || [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  // Effect to update the audio source and play the episode when the current episode changes
  useEffect(() => {
    if (audioRef.current && currentEpisode) {
      audioRef.current.src = currentEpisode.file;
      audioRef.current.play(); // Play the audio

      // Add event listener to detect when the episode ends
      const handleEnded = () => {
        markEpisodeAsCompleted(currentEpisode);
      };
      audioRef.current.addEventListener("ended", handleEnded);

      // Cleanup event listener when component unmounts or when currentEpisode changes
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("ended", handleEnded);
        }
      };
    }
  }, [currentEpisode]);

  // Effect to handle preventing user from closing page while audio is playing
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (audioRef.current && !audioRef.current.paused) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [audioRef]);

  // Function to simulate loading and start playing the selected episode
  const playEpisode = (episode, show, season) => {
    try {
      setLoading(true);
      setCurrentEpisode(null);
      setCurrentShow(show);
      setCurrentSeason(season);
      setError(null);

      setTimeout(() => {
        setCurrentEpisode(episode);
        setLoading(false);
      }, 1000); // Simulate loading delay for demonstration purposes
    } catch (err) {
      console.error("Error playing episode:", err);
      setError(
        "An error occurred while playing the episode. Please try again."
      );
      setLoading(false);
    }
  };

  // Function to mark an episode as completed
  const markEpisodeAsCompleted = (episode) => {
    const updatedCompletedEpisodes = [
      ...completedEpisodes,
      {
        ...episode,
        showName: currentShow.title,
        season: currentSeason.season,
        image: currentSeason.image,
      },
    ];
    setCompletedEpisodes(updatedCompletedEpisodes);
    localStorage.setItem(
      "completedEpisodes",
      JSON.stringify(updatedCompletedEpisodes)
    );
  };

  // Value to provide in the context
  const value = {
    currentEpisode,
    currentShow,
    currentSeason,
    playEpisode,
    audioRef,
    loading,
    error,
    completedEpisodes,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
