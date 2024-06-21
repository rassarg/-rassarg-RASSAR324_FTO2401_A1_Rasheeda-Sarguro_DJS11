let showsData = {};
let previewsData = [];
let genreData = {};
let genreMapping = {};

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
    previewsData.sort((a, b) => a.title.localeCompare(b.title)); // Alphabetically sort data by title
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

// Function to fetch all genres and map them
export const fetchAndMapGenres = async () => {
  const genreIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // List of genre IDs
  const promises = genreIds.map(async (id) => {
    const genre = await fetchGenre(id);
    genreMapping[id] = genre.title;
  });
  await Promise.all(promises);
  return genreMapping;
};

export const { title, description, seasons } = showsData;
export const previews = previewsData;
export const genres = genreData;
export { genreMapping };
