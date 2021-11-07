import { GroupResponse } from '@types';
import { GroupCreateInterface } from '@types';
import { requests } from './index';

export const getAllGroupList = (): Promise<GroupResponse> => requests.get(`/group`);

export const postGroupCreate = <T>(groupData: GroupCreateInterface): Promise<T> =>
  requests.post('/group/create', groupData);
