import { ResponseUserData, UpdateIntroData } from '@types';
import HttpClient from './HttpClient';

class UserHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/user' });
  }

  public patchRole = (): Promise<null> => this.httpClient.patch('/user/role');
  public getIntro = (userId: number): Promise<string> => this.httpClient.get(`/intro/${userId}`);
  public patchIntro = (request: UpdateIntroData): Promise<null> =>
    this.httpClient.patch('/intro/', request);
  public getProfile = (githubId: string): Promise<ResponseUserData> =>
    this.httpClient.get(`/profile/${githubId}`);
}

export const userHttpClient = new UserHttpClient();
