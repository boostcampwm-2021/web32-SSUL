import HttpClient from './HttpClient';
import { ResponseGithubUserData, ResponseUserData } from '@types';

class AuthHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/auth' });
  }

  public getSilentRefresh = (): Promise<ResponseUserData> => this.httpClient.get('/silent-refresh');
  public login = (code: string): Promise<ResponseGithubUserData> =>
    this.httpClient.post(`/login/social?code=${code}`);
  public logout = (): Promise<null> => this.httpClient.get('/logout');
}

export const authHttpClient = new AuthHttpClient();
