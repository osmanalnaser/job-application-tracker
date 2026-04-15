import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://job-application-tracker-31lr.onrender.com/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response && error.response.status === 401) {

      console.log("Unauthorized — removing token");

      localStorage.removeItem("token");

      // KEIN redirect hier
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;