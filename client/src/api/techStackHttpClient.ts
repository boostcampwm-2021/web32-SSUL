import HttpClient from './HttpClient';
import { TechStack } from '@types';

class TechStackHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/techstack' });
  }

  public getTechStackList = (): Promise<TechStack[]> => this.httpClient.get('/');
}

export const techStackHttpClient = new TechStackHttpClient();
