import HttpClient from './HttpClient';
import { GithubUserResponse, AuthedUserResponse } from '@types';

class AuthHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/auth' });
  }

  public getSilentRefresh = (): Promise<AuthedUserResponse> =>
    this.httpClient.get('/silent-refresh');

  public login = (code: string): Promise<GithubUserResponse> =>
    this.httpClient.post(`/login/social?code=${code}`);

  public logout = (): Promise<null> => this.httpClient.get('/logout');

  public isAuthUser = (): Promise<null> => this.httpClient.get('/');

  public isGroupBelong = (gid: string): Promise<null> =>
    this.httpClient.get(`/group/belong?gid=${gid}`);

  public isGroupOwner = (gid: string): Promise<null> =>
    this.httpClient.get(`/group/owner?gid=${gid}`);
}

export const authHttpClient = new AuthHttpClient();
