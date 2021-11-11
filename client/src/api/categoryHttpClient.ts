import HttpClient from './HttpClient';
import { Category } from '@types';

class CategoryHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/category' });
  }

  public getCategories = (): Promise<Category[]> => this.httpClient.get('/');
}

export const categoryHttpClient = new CategoryHttpClient();
