import React, { useEffect, useState } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { fetchPreviews, genreMapping } from "../utils/api";
import Loading from "../components/Loading";

const Home = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [genre, setGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("A-Z");

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

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const getSortedShows = (shows) => {
    return shows.slice().sort((a, b) => {
      if (sortOrder === "A-Z") {
        return a.title.localeCompare(b.title);
      } else if (sortOrder === "Z-A") {
        return b.title.localeCompare(a.title);
      } else if (sortOrder === "Newest") {
        return new Date(b.updated) - new Date(a.updated);
      } else if (sortOrder === "Oldest") {
        return new Date(a.updated) - new Date(b.updated);
      }
      return 0;
    });
  };

  const filteredShows = getSortedShows(
    shows.filter((show) => {
      const matchesGenre = genre ? show.genres.includes(parseInt(genre)) : true;
      const matchesTitle = show.title
        .toLowerCase()
        .includes(filter.toLowerCase());
      return matchesGenre && matchesTitle;
    })
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-container">
      <h1>Podcasts</h1>
      <div className="filter-container">
        <div>
          <label htmlFor="filter"></label>
          <textarea
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Search titles"
            rows="1"
            style={{ resize: "none" }} // Prevent the textarea from being resized by the user
          />
        </div>

        <div>
          <label htmlFor="genre"></label>
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
          <label htmlFor="sortOrder"></label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="A-Z">Sort by Title: A-Z</option>
            <option value="Z-A">Sort by Title: Z-A</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
      </div>
      <ul className="home-list">
        {filteredShows.map((show) => (
          <li key={show.id} className="home-list-item">
            <NavLink to={`/show/${show.id}`} className="a">
              <img className="season-image" src={show.image} alt={show.title} />
              <h3 className="show-title">{show.title}</h3>
              <span className="show-genre">
                <strong>Genre: </strong>
                {show.genres.map((genreId) => genreMapping[genreId]).join(", ")}
              </span>
              <span className="show-seasons">
                <strong>Seasons: </strong>
                {show.seasons.length}
              </span>
              <span className="show-updated">
                <strong>Last updated: </strong>{" "}
                {new Date(show.updated).toLocaleDateString("en-ZA", {
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
