import HttpClient from './HttpClient';
import {
  GroupResponse,
  GroupCreateInterface,
  GroupActivity,
  GroupDetailData,
  GroupApplyData,
  SimpleGroupCardData,
  ApplyState,
  GroupState,
  GroupEnrollmentState,
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

  public getGroupRole = <T>(groupId: number): Promise<T> => this.httpClient.get(`/role/${groupId}`);

  public getOwnGroups = (): Promise<SimpleGroupCardData[]> => this.httpClient.get(`/own`);

  public getApplyedGroups = (applyState: ApplyState): Promise<SimpleGroupCardData[]> =>
    this.httpClient.get(`/applyed?state=${applyState}`);

  public getMyGroups = (
    groupStatus: GroupState,
    enrollType: GroupEnrollmentState,
  ): Promise<SimpleGroupCardData[]> =>
    this.httpClient.get(`/my?status=${groupStatus}&type=${enrollType}`);
}

export const groupHttpClient = new GroupHttpClient();
