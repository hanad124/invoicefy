import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

// axios instance
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
