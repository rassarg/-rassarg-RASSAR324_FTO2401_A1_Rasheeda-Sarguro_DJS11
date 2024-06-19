// Map of genre IDs to genre names
export const genreMapping = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

// Object to store show data by ID
let showsData = {};
// Array to store preview data
let previewsData = [];
// Object to store genre data by ID
let genreData = {};

// Function to fetch show details by ID
export const fetchShowById = async (id) => {
  try {
    const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
    const data = await response.json();
    showsData[id] = data;
    return data;
  } catch (error) {
    console.error("Error fetching show details:", error);
    throw new Error(
      "An error occurred while fetching the show details. Please try again later."
    );
  }
};

// Function to fetch all previews
export const fetchPreviews = async () => {
  try {
    const response = await fetch(`https://podcast-api.netlify.app`);
    const previews = await response.json();
    previewsData = await Promise.all(
      previews.map(async (preview) => {
        const showDetails = await fetchShowById(preview.id);
        return {
          ...preview,
          seasons: showDetails.seasons,
          updated: showDetails.updated,
        };
      })
    );
    previewsData.sort((a, b) => a.title.localeCompare(b.title)); // alphabetically sort data by title
    return previewsData;
  } catch (error) {
    console.error("Error fetching previews:", error);
    throw new Error(
      "An error occurred while fetching the previews. Please try again later."
    );
  }
};

// Function to fetch genre details by ID
export const fetchGenre = async (id) => {
  try {
    const response = await fetch(`https://podcast-api.netlify.app/genre/${id}`);
    const data = await response.json();
    genreData[id] = data;
    return data;
  } catch (error) {
    console.error("Error fetching genre details:", error);
    throw new Error(
      "An error occurred while fetching the genre details. Please try again later."
    );
  }
};

export const { title, description, seasons } = showsData;
export const previews = previewsData;
export const genres = genreData;
