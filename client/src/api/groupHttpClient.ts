import HttpClient from './HttpClient';
import { GroupResponse, GroupCreateInterface, GroupActivity } from '@types';

class GroupHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/group' });
  }

  public getFilterdGroupList = (query: string): Promise<GroupResponse[]> => {
    return this.httpClient.get(`${query}`);
  };
  public postGroupCreate = <T>(groupData: GroupCreateInterface): Promise<T> =>
    this.httpClient.post('/', groupData);
  
  public getGroupActivity = (userId: number): Promise<GroupActivity[]> => this.httpClient.get(`/activity/${userId}`);
}

export const groupHttpClient = new GroupHttpClient();
