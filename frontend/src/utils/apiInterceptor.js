import axios from "axios";

const createApiInterceptor = (showError, logout) => {
  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(
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

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response, code } = error;

      if (code === "NETWORK_ERROR" || !response) {
        showError("Network error. Please check your connection and try again.");
        return Promise.reject(error);
      }

      switch (response.status) {
        case 401:
          showError("Session expired. Please login again.");
          logout();
          break;
        case 403:
          showError("You do not have permission to perform this action.");
          break;
        case 404:
          showError("The requested resource was not found.");
          break;
        case 429:
          showError("Too many requests. Please wait a moment and try again.");
          break;
        case 500:
          showError("Server error. Please try again later.");
          break;
        default:
          showError(response.data?.message || "An unexpected error occurred.");
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createApiInterceptor;
