import HttpClient from './HttpClient';
import {
  SimpleGroupInfoResponse,
  UpdateGroupIntroData,
  UpdateGroupDateData,
  UpdateGroupNameData,
  ParticipationRequest,
} from '@types';

class GroupOwnerHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/group-owner' });
  }

  public getGroupAdminInfo = (groupId: number): Promise<SimpleGroupInfoResponse> =>
    this.httpClient.get(`/${groupId}`);

  public updateGroupName = (UpdateGroupNameData: UpdateGroupNameData): Promise<null> =>
    this.httpClient.patch('/name', UpdateGroupNameData);

  public updateGroupDate = (updateGroupDateData: UpdateGroupDateData): Promise<null> =>
    this.httpClient.patch('/date', updateGroupDateData);

  public updateGroupIntro = (updateGroupIntroData: UpdateGroupIntroData): Promise<null> =>
    this.httpClient.patch('/intro', updateGroupIntroData);

  public getApplyGroupList = (groupId: number): Promise<ParticipationRequest[]> =>
    this.httpClient.get(`/apply/${groupId}`);

  public acceptApplyList = (applyId: number): Promise<null> =>
    this.httpClient.patch(`/accept/${applyId}`);

  public acceptDeclineList = (applyId: number): Promise<null> =>
    this.httpClient.patch(`/decline/${applyId}`);
}

export const groupOwnerHttpClient = new GroupOwnerHttpClient();
