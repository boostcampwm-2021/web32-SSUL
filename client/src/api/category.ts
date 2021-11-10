import { requests } from './index';
import { Category } from '@types';

export const getCategories = (): Promise<Category[]> => requests.get(`/api/category`);
