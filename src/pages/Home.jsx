import React, { useEffect, useState } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { fetchPreviews, genreMapping } from "../utils/api";

const Home = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPreviews();
        setShows(data);
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

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredShows = shows.filter((show) => {
    const matchesGenre = genre ? show.genres.includes(parseInt(genre)) : true;
    const matchesTitle = show.title
      .toLowerCase()
      .includes(filter.toLowerCase());
    return matchesGenre && matchesTitle;
  });

  if (loading) {
    return (
      <div className="loading">
        <div>Loading...</div>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-container">
      <h1>Podcasts</h1>
      <div className="filter-container">
        <div>
          <label htmlFor="genre">Filter by Genre:</label>
          <select id="genre" value={genre} onChange={handleGenreChange}>
            <option value="">All Genres</option>
            {Object.entries(genreMapping).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter">Filter by Title:</label>
          <input
            id="filter"
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Search by title..."
          />
        </div>
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
                Seasons: {show.seasons.length}
              </span>
              <span className="show-updated">
                Last updated: {new Date(show.updated).toLocaleDateString()}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
