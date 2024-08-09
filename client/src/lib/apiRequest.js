import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://cateringboys.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;
