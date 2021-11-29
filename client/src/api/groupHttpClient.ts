import HttpClient from './HttpClient';
import {
  GroupResponse,
  GroupDetailResponse,
  GroupApplyDto,
  SimpleGroupCardResponse,
  OwnGroupResponse,
  GroupCreateDto,
  GroupActivityResponse,
  GroupRoleResponse,
} from '@types';
import { ApplyState } from '@constants/enums';

class GroupHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/group' });
  }

  public getFilterdGroupList = (query: string): Promise<GroupResponse> =>
    this.httpClient.get(`${query}`);

  public postGroupCreate = (groupData: GroupCreateDto): Promise<null> =>
    this.httpClient.post('/', groupData);

  public getGroupActivity = (userId: number): Promise<GroupActivityResponse[]> =>
    this.httpClient.get(`/activity/${userId}`);

  public getGroupDetail = (groupId: number): Promise<GroupDetailResponse> =>
    this.httpClient.get(`/${groupId}`);

  public postApplyGroup = (applyInfo: GroupApplyDto): Promise<null> =>
    this.httpClient.post('/apply', applyInfo);

  public getGroupRole = (groupId: number): Promise<GroupRoleResponse> =>
    this.httpClient.get(`/role/${groupId}`);

  public getOwnSimpleGroups = (): Promise<SimpleGroupCardResponse[]> =>
    this.httpClient.get(`/own/simple`);

  public getApplyedGroups = (applyState: ApplyState): Promise<SimpleGroupCardResponse[]> =>
    this.httpClient.get(`/applyed?state=${applyState}`);

  public getMyGroups = (query: string): Promise<SimpleGroupCardResponse[]> =>
    this.httpClient.get(`/my${query}`);

  public getOwnGroups = (): Promise<OwnGroupResponse[]> => this.httpClient.get(`/own`);
}

export const groupHttpClient = new GroupHttpClient();
