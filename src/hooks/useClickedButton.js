import { useState } from "react";

export const useClickedButton = () => {
  const [clickedButton, setClickedButton] = useState(null);

  return {
    clickedButton,
    setClickedButton,
  };
};
