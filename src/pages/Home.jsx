import React, { useEffect, useState } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { fetchPreviews, genreMapping } from "../utils/api";

const Home = () => {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [titleFilter, setTitleFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPreviews();
        setShows(data);
        setFilteredShows(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching previews:", error);
        setError(
          "An error occurred while fetching the previews. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterShows = () => {
      let filtered = shows;

      if (selectedGenre) {
        filtered = filtered.filter((show) =>
          show.genres.includes(Number(selectedGenre))
        );
      }

      if (titleFilter) {
        filtered = filtered.filter((show) =>
          show.title.toLowerCase().includes(titleFilter.toLowerCase())
        );
      }

      setFilteredShows(filtered);
    };

    filterShows();
  }, [selectedGenre, titleFilter, shows]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitleFilter(event.target.value);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-container">
      <h1>Podcasts</h1>
      <div className="filter-container">
        <label htmlFor="genre-filter">Filter by genre:</label>
        <select
          id="genre-filter"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">All Genres</option>
          {Object.entries(genreMapping).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <label htmlFor="title-filter">Filter by title:</label>
        <input
          type="text"
          id="title-filter"
          value={titleFilter}
          onChange={handleTitleChange}
          placeholder="Enter title"
        />
      </div>
      <ul className="home-list">
        {filteredShows.map((show) => (
          <li key={show.id} className="home-list-item">
            <NavLink to={`/show/${show.id}`} className="a">
              <img className="season-image" src={show.image} alt={show.title} />
              <span className="show-title">{show.title}</span>
              <span className="show-genre">
                {show.genres.map((genreId) => genreMapping[genreId]).join(", ")}
              </span>
              <span className="show-seasons">
                Seasons: {show.seasons ? show.seasons.length : 0}
              </span>
              <span className="show-updated">
                Last updated:{" "}
                {new Date(show.updated).toLocaleDateString("en-UK", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
