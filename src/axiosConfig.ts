import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config: AxiosRequestConfig|any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    };
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
