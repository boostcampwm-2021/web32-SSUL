import HttpClient from './HttpClient';
import {
  GroupResponse,
  GroupCreateInterface,
  GroupActivity,
  GroupDetailData,
  GroupApplyData,
  SimpleGroupInfoResponse,
  UpdateGroupIntroData,
  UpdateGroupDateData,
  UpdateGroupNameData,
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
  
  public getGroupAdminInfo = (groupId: number): Promise<SimpleGroupInfoResponse> =>
    this.httpClient.get(`/admin/${groupId}`);

  public patchGroupName = (UpdateGroupNameData: UpdateGroupNameData): Promise<null> =>
    this.httpClient.patch('/admin/name', UpdateGroupNameData);

  public patchGroupDate = (updateGroupDateData: UpdateGroupDateData): Promise<null> =>
    this.httpClient.patch('/admin/date', updateGroupDateData);

  public patchGroupIntro = (updateGroupIntroData: UpdateGroupIntroData): Promise<null> =>
    this.httpClient.patch('/admin/intro', updateGroupIntroData);
}

export const groupHttpClient = new GroupHttpClient();
