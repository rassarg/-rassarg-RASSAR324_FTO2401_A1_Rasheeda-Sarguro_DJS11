// FavouriteButton.jsx
import React, { useState } from "react";

const FavouriteButton = ({ onToggle }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
    onToggle();
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
