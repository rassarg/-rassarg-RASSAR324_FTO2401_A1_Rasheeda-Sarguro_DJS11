import { useState } from "react";

export const useSelectedSeason = () => {
  const [selectedSeason, setSelectedSeason] = useState(null);

  return {
    selectedSeason,
    setSelectedSeason,
  };
};
