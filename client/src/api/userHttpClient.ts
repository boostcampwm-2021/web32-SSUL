import HttpClient from './HttpClient';

class UserHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/user' });
  }

  public patchRole = (): Promise<null> => this.httpClient.patch('/user/role');
}

export const userHttpClient = new UserHttpClient();
