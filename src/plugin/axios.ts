import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dev.moydomonline.ru/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("@access-token");
  if (config.headers && token)
    config.headers["Authorization"] = `Token ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest?._retry) {
      originalRequest._retry = true;
      if (window.location.pathname !== "/login") window.location.href = "/login";
    } else if (error.response?.status === 500) {
      console.log("Ошибка сервера [500]");
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
