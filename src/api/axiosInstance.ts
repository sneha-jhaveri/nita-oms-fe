/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const publicBaseUrl = "https://chvs4xgl-3000.inc1.devtunnels.ms/api";

const axiosInstance = axios.create({
  baseURL: publicBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
