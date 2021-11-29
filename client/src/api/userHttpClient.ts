import { AuthedUserResponse, IntroUpdateDto } from '@types';
import HttpClient from './HttpClient';

class UserHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/user' });
  }

  public patchRole = (): Promise<null> => this.httpClient.patch('/user/role');

  public getIntro = (userId: number): Promise<string> => this.httpClient.get(`/intro/${userId}`);

  public patchIntro = (body: IntroUpdateDto): Promise<null> =>
    this.httpClient.patch('/intro/', body);

  public getProfile = (githubId: string): Promise<AuthedUserResponse> =>
    this.httpClient.get(`/profile/${githubId}`);
}

export const userHttpClient = new UserHttpClient();
