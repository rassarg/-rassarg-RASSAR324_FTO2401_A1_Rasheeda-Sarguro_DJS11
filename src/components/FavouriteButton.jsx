import React, { useState, useEffect } from "react";
import "./FavouriteButton.css";

const FavouriteButton = ({ onToggle, episodeData }) => {
  // Initialize state to check if the episode is a favourite
  const [isFavourite, setIsFavourite] = useState(
    localStorage.getItem(`favourite-${episodeData.id}`) === "true"
  );
  // State to handle the visibility of the notification
  const [showNotification, setShowNotification] = useState(false);
  // State to store the notification message
  const [notificationMessage, setNotificationMessage] = useState("");

  // Effect to synchronize localStorage with the favourite state
  useEffect(() => {
    localStorage.setItem(`favourite-${episodeData.id}`, isFavourite);
  }, [isFavourite, episodeData.id]);

  // Function to toggle the favourite status of the episode
  const toggleFavourite = () => {
    const newIsFavourite = !isFavourite; // Determine the new favourite status
    setIsFavourite(newIsFavourite); // Update the favourite state
    onToggle();

    // Retrieve the list of favourite episodes from localStorage
    let favouriteEpisodes =
      JSON.parse(localStorage.getItem("favouriteEpisodes")) || [];
    const episodeIndex = favouriteEpisodes.findIndex(
      (episode) => episode.id === episodeData.id
    );

    // Add or remove the episode from the favourites list based on the new status & set notification message
    if (newIsFavourite) {
      if (episodeIndex === -1) {
        favouriteEpisodes.push(episodeData);
      }
      setNotificationMessage("Added to favourites!");
      // console.log("Added to favourites:", episodeData);
    } else {
      favouriteEpisodes = favouriteEpisodes.filter(
        (episode) => episode.id !== episodeData.id
      );
      setNotificationMessage("Removed from favourites!");
      // console.log("Removed from favourites:", episodeData);
    }

    // Update localStorage
    localStorage.setItem(
      "favouriteEpisodes",
      JSON.stringify(favouriteEpisodes)
    );

    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 1000);
  };

  return (
    <span
      className={`favourite-button ${isFavourite ? "gold" : ""}`}
      onClick={toggleFavourite}
    >
      &#9734;
      <span className={`notification ${showNotification ? "show" : ""}`}>
        {notificationMessage}
      </span>
    </span>
  );
};

export default FavouriteButton;
