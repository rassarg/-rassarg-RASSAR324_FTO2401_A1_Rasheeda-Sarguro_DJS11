import React, { useState, useEffect } from "react";
import "./FavouriteButton.css";
import { useSelectedSeason } from "../hooks/useSelectedSeason";

const FavouriteButton = ({ onToggle, episodeData }) => {
  const [isFavourite, setIsFavourite] = useState(
    localStorage.getItem(`favourite-${episodeData.id}`) === "true"
  );
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(`favourite-${episodeData.id}`, isFavourite);

    if (isFavourite) {
      const hasShownNotification = localStorage.getItem(
        `notification-shown-${episodeData.id}`
      );
      if (!hasShownNotification) {
        setNotificationMessage("Added to favourites!");
        setShowNotification(true);
        localStorage.setItem(`notification-shown-${episodeData.id}`, "true");
        setTimeout(() => {
          setShowNotification(false);
        }, 1000); // Show notification for 1 second
        console.log("Added to favourites:", episodeData);
      }
    }
  }, [isFavourite, episodeData]);

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
    onToggle();

    let favouriteEpisodes =
      JSON.parse(localStorage.getItem("favouriteEpisodes")) || [];
    const episodeIndex = favouriteEpisodes.findIndex(
      (episode) => episode.id === episodeData.id
    );

    if (isFavourite) {
      favouriteEpisodes = favouriteEpisodes.filter(
        (episode) => episode.id !== episodeData.id
      );
    } else {
      favouriteEpisodes.push(episodeData);
    }

    localStorage.setItem(
      "favouriteEpisodes",
      JSON.stringify(favouriteEpisodes)
    );

    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 1000); // Show notification for 1 second
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
