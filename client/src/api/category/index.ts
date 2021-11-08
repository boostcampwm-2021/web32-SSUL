import axios, { AxiosResponse } from 'axios';
import { Category } from '../../types/Category';

const http = axios.create({
  timeout: 15000,
});

const passResponse = (response: AxiosResponse) => response.data;

export const requests = {
  get: (url: string): Promise<Category[]> => http.get(url).then(passResponse),
};

export const getCategories = (): Promise<Category[]> => requests.get(`/category`);
