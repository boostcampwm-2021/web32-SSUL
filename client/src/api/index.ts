import axios, { AxiosResponse } from 'axios';
import { ResponseData } from '../types/ServerData';

const http = axios.create({
  timeout: 15000,
});

const passResponse = (response: AxiosResponse) => response.data;

export const requests = {
  get: <T>(url: string): Promise<T> => http.get(url).then(passResponse),
  post: <T>(url: string, body: ResponseData): Promise<T> => http.post(url, body).then(passResponse),
};