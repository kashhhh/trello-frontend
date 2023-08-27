import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://127.0.0.1:5000/",
  withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
