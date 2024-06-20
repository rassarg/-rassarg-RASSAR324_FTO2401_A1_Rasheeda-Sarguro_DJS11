import React, { useState, useEffect } from "react";
import "./FavouriteButton.css";

const FavouriteButton = ({ onToggle, episodeData }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    // Check the favourite status from localStorage when the component mounts or episodeData changes
    setIsFavourite(
      localStorage.getItem(`favourite-${episodeData.id}`) === "true"
    );
  }, [episodeData]);

  const toggleFavourite = () => {
    const newIsFavourite = !isFavourite; // Determine the new favourite status
    setIsFavourite(newIsFavourite); // Update the favourite state
    onToggle(); // Trigger the parent component's toggle handler

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
    localStorage.setItem(`favourite-${episodeData.id}`, newIsFavourite);

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
