import axios, { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { refreshToken } from "api/auth";
import { LOGIN, REGISTER, REFRESH_TOKEN } from "constants/paths";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      if ([LOGIN, REGISTER, REFRESH_TOKEN].some(el => error.request.responseURL.includes(el))) return

      try {
        const token = await refreshToken();
        const config = error.config;
        config.headers['Authorization'] = `Bearer ${token}`;
        return axios.request(config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
