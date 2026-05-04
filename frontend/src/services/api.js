import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Add token only for protected routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  
  if (token && !req.url.includes("/auth")) {
    req.headers.Authorization = token;   
  }

  return req;
});

export default API;