import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  let { movieId } = useParams();
  const [movies, setMovies] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axiosInstance.get(
        `https://api.themoviedb.org/3/movie/${movieId}`
      );
      console.log(request);
      setMovies(request.data);
    }
    fetchData();
  }, [movieId]);

  if (!movies) return null;
  return (
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`}
        alt="modal__poster-img"
      />
      <div>X</div>
    </section>
  );
};

export default DetailPage;
