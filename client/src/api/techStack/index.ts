import axios, { AxiosResponse } from 'axios';
import { TechStack } from '../../types/TechStack';

const http = axios.create({
  timeout: 15000,
});

const passResponse = (response: AxiosResponse) => response.data;

export const requests = {
  get: (url: string): Promise<TechStack[]> => http.get(url).then(passResponse),
};

export const getTechStackList = (): Promise<TechStack[]> => requests.get(`/TechStack`);
