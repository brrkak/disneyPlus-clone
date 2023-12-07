import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "d4b74d5d174a8a0f77b3597f8e1e8844",
    language: "ko-KR",
  },
});

export default instance;
