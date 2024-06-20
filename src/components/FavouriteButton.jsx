// FavouriteButton.jsx
import React, { useState, useEffect } from "react";

const FavouriteButton = ({ onToggle, uniqueId }) => {
  const [isFavourite, setIsFavourite] = useState(
    localStorage.getItem(`favourite-${uniqueId}`) === "true"
  );

  useEffect(() => {
    localStorage.setItem(`favourite-${uniqueId}`, isFavourite);
  }, [isFavourite, uniqueId]);

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
    onToggle();
    console.log(
      `Episode ${uniqueId} ${
        isFavourite ? "removed from" : "added to"
      } favorites`
    );
  };

  return (
    <span
      onClick={toggleFavourite}
      style={{ cursor: "pointer", color: isFavourite ? "gold" : "black" }}
    >
      &#9734;
    </span>
  );
};

export default FavouriteButton;
