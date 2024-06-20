import React, { useState, useEffect } from "react";
import "./FavouriteButton.css";
import { useFavourites } from "../context/FavouritesContext";

const FavouriteButton = ({ episodeData }) => {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
  const [isFavouriteState, setIsFavouriteState] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    setIsFavouriteState(isFavourite(episodeData.id));
  }, [isFavourite, episodeData.id]);

  const toggleFavourite = () => {
    if (isFavouriteState) {
      removeFavourite(episodeData.id);
      setNotificationMessage("Removed from favourites!");
    } else {
      addFavourite(episodeData);
      setNotificationMessage("Added to favourites!");
    }

    setIsFavouriteState(!isFavouriteState);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 1000);
  };

  return (
    <span
      className={`favourite-button ${isFavouriteState ? "gold" : ""}`}
      onClick={toggleFavourite}
    >
      {isFavouriteState ? "⭐" : "☆"}
      <span className={`notification ${showNotification ? "show" : ""}`}>
        {notificationMessage}
      </span>
    </span>
  );
};

export default FavouriteButton;
