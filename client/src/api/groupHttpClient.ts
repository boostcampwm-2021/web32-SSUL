import HttpClient from './HttpClient';
import {
  GroupResponse,
  GroupCreateInterface,
  GroupActivity,
  GroupDetailData,
  GroupApplyData,
} from '@types';

class GroupHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/group' });
  }

  public getFilterdGroupList = (query: string): Promise<GroupResponse> =>
    this.httpClient.get(`${query}`);

  public postGroupCreate = <T>(groupData: GroupCreateInterface): Promise<T> =>
    this.httpClient.post('/', groupData);

  public getGroupActivity = (userId: number): Promise<GroupActivity[]> =>
    this.httpClient.get(`/activity/${userId}`);

  public getGroupDetail = (groupId: number): Promise<GroupDetailData> =>
    this.httpClient.get(`/${groupId}`);

  public postApplyGroup = <T>(applyInfo: GroupApplyData): Promise<T> =>
    this.httpClient.post('/apply', applyInfo);
}

export const groupHttpClient = new GroupHttpClient();
