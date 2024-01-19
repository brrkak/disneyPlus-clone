import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.css"
const DetailPage = () => {
  let { movieId } = useParams();
  const [movies, setMovies] = useState({});
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axiosInstance.get(
          `https://api.themoviedb.org/3/movie/${movieId}`
        )
        setMovies(request.data);
        setError(false)
      } catch (error) {
        console.error(error.message);
        setError(true)
      }
    }
    fetchData();
  }, [movieId]);

  if (!movies) return null;
  return (
    error ? (
      <Container>
        <a>영화 정보를 불러올 수 없습니다.</a>
        <div className="detail_closeBtn" onClick={() => navigate("/main")}>
          <span class="material-symbols-rounded"></span>
        </div>
      </Container>
    )
      : (
        <section>
          <img
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`}
            alt="modal__poster-img"
          />
          <div className="detail_closeBtn" onClick={() => navigate("/main")}>
            <span class="material-symbols-rounded"></span>
          </div>
        </section>
      ))
};

const Container = styled.div`
display: flex;
flex-direction: column;
width: 100%;
align-items: center;
justify-content: center;

height: 500px;
`
export default DetailPage;


