import axios from 'axios';

// Create an instance of Axios with the default configuration
const axiosAPIInstance = axios.create({
  baseURL: 'https://eplant.onrender.com', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json', 
  },
});

// Request Interceptor
axiosAPIInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosAPIInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server error! Please try again later.");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosAPIInstance;
