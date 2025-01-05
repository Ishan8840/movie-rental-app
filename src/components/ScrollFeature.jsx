import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddToCartButton from "../components/AddCart.jsx";
import "./ScrollFeature.css";

function ScrollFeature() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const movieListRef = useRef([]);
  const clickCounts = useRef({});

  useEffect(() => {
    (async function fetchMovies() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}`
      );

      const moviesData = response.data.results;
      const randomMovies = [];
      let availableMovies = [...moviesData];

      for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * availableMovies.length);
        const randomMovie = availableMovies[randomIndex];

        randomMovies.push(randomMovie);
        availableMovies.splice(randomIndex, 1);
      }
      setMovies(randomMovies);
    })();
  }, []);

  const arrowClick = (index) => {
    const listElement = movieListRef.current[index];
    const items = listElement.querySelectorAll(".movie-list-item");
    const itemCount = items.length;
    const ratio = Math.floor(window.innerWidth / 270);

    if (!clickCounts.current[index]) {
      clickCounts.current[index] = 0;
    }

    const maxClicks = itemCount - (4 + clickCounts.current[index]) + (3 - ratio);
    clickCounts.current[index]++;

    if (maxClicks >= 0) {
      const transformValue =
        parseFloat(
          getComputedStyle(listElement).transform.split(",")[4] || 0
        ) - 277;
      listElement.style.transform = `translateX(${transformValue}px)`;
    } else {
      listElement.style.transform = "translateX(0)";
      clickCounts.current[index] = 0;
    }
  };

  return (
    <div className="movie-list-container">
      <h1 className="movie-list-title">Top Rated</h1>
      <div className="movie-list-wrapper">
        <div
          className="movie-list"
          ref={(el) => (movieListRef.current[0] = el)}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-list-item"
            >
              <img
                className="movie-list-item-img"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                onClick={() => navigate(`/movies/details/${movie.id}`)}
              />
              <span className="movie-list-item-title" onClick={() => navigate(`/movies/details/${movie.id}`)}>{movie.title}</span>
              <p className="movie-list-item-description" onClick={() => navigate(`/movies/details/${movie.id}`)}>
                {movie.overview.length > 150
                  ? movie.overview.substring(0, 150) + "..."
                  : movie.overview}
              </p>
              <AddToCartButton movie={movie} variant="movie-list-item-button" />
            </div>
          ))}
        </div>
        <i
          className="fa-solid fa-chevron-right arrow"
          onClick={() => arrowClick(0)}
        ></i>
      </div>
    </div>
  );
}

export default ScrollFeature;
