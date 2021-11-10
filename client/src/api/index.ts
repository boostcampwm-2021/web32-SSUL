import axios from 'axios';
import { RequestBody } from '../types/ServerData';

const http = axios.create({
  baseURL: '/api',
  timeout: 15000,
});

http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export const requests = {
  get: <T>(url: string): Promise<T> => http.get(url),
  post: <T>(url: string, body: RequestBody): Promise<T> => http.post(url, body),
  patch: <T>(url: string, body: RequestBody): Promise<T> => http.patch(url, body),
};
