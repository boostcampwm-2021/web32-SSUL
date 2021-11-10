import HttpClient from './HttpClient';
import { GroupResponse, GroupCreateInterface } from '@types';

class GroupClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/group' });
  }

  public getAllGroupList = (): Promise<GroupResponse> => this.httpClient.get('/');
  public postGroupCreate = <T>(groupData: GroupCreateInterface): Promise<T> =>
    this.httpClient.post('/create', groupData);
}

export const groupClient = new GroupClient();
