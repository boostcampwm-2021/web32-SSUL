import HttpClient from './HttpClient';
import { CategoryResponse } from '@types';

class CategoryHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/category' });
  }

  public getCategories = (): Promise<CategoryResponse[]> => this.httpClient.get('/');
}

export const categoryHttpClient = new CategoryHttpClient();
