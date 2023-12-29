import axios from "axios";

export const token = axios.create({
    baseURL: "http://localhost:3000"
})



