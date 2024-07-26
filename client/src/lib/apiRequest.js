import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://catringboys.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;
