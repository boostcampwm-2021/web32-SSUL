import HttpClient from './HttpClient';

class UserClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/user' });
  }

  public patchRole = (): Promise<null> => this.httpClient.patch('/user/role');
}

export const userClient = new UserClient();
