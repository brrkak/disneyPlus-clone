import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import "./Searchpage.css";
import useDebounce from "../../hooks/useDebounce";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  const DebouncedSearchTerm = useDebounce(query.get("q"), 500);
  const navigate = useNavigate();

  useEffect(() => {
    if (DebouncedSearchTerm) fetchSearchMovie(DebouncedSearchTerm);
  }, [DebouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axiosInstance.get(
        `/search/multi?include_adult=true&query=${searchTerm}`
      );
      setSearchResults(response.data.results);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (searchResults.length > 0) {
    return (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div
                  onClick={() => navigate(`/${movie.id}`)}
                  className="movie__column-poster"
                >
                  <img
                    src={movieImageUrl}
                    alt="movie"
                    className="movie__poster"
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    );
  } else {
    return (
      <section className="no-results">
        <div className="no-results__text">
          <p>
            찾고자하는 검색어"{DebouncedSearchTerm}"에 맞는 영화가 업습니다.
          </p>
        </div>
      </section>
    );
  }
};

export default SearchPage;
