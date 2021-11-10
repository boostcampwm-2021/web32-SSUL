import HttpClient from './HttpClient';
import { Category } from '@types';

class CategoryClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/category' });
  }

  public getCategories = (): Promise<Category[]> => this.httpClient.get('/');
}

export const categoryClient = new CategoryClient();
