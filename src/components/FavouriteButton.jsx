import React, { useState, useEffect } from "react";
import "./FavouriteButton.css";

const FavouriteButton = ({ onToggle, uniqueId }) => {
  const [isFavourite, setIsFavourite] = useState(
    localStorage.getItem(`favourite-${uniqueId}`) === "true"
  );
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(`favourite-${uniqueId}`, isFavourite);

    if (isFavourite) {
      const hasShownNotification = localStorage.getItem(
        `notification-shown-${uniqueId}`
      );
      if (!hasShownNotification) {
        setNotificationMessage("Added to favourites!");
        setShowNotification(true);
        localStorage.setItem(`notification-shown-${uniqueId}`, "true");
        setTimeout(() => {
          setShowNotification(false);
        }, 1000); // Show notification for 1 second
        console.log("Added to favourites:", uniqueId);
      }
    }
  }, [isFavourite, uniqueId]);

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
    onToggle();

    if (isFavourite) {
      setNotificationMessage("Removed from favourites!");
      console.log("Removed from favourites:", uniqueId);
    } else {
      setNotificationMessage("Added to favourites!");
      console.log("Added to favourites:", uniqueId);
    }
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
