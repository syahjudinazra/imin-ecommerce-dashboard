import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://127.0.0.1:8000/api",
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error status codes
    if (error.response) {
      switch (error.response.status) {
        case 401: // Unauthorized
          // Clear local authentication and redirect to login
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          // Only redirect to login if not already on login page
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
          break;
        case 403: // Forbidden
          console.error("You do not have permission to perform this action");
          break;
        case 500: // Server Error
          console.error("Server error occurred");
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network error - no response received");
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
