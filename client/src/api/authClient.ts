import HttpClient from './HttpClient';
import { ResponseGithubUserData, ResponseUserData } from '@types';

class AuthClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/auth' });
  }

  public getSilentRefresh = (): Promise<ResponseUserData> => this.httpClient.get('/silent-refresh');
  public getAccessToken = (code: string): Promise<ResponseGithubUserData> =>
    this.httpClient.get(`/token?code=${code}`);
  public getLogout = (): Promise<null> => this.httpClient.get('/logout');
}

export const authClient = new AuthClient();
