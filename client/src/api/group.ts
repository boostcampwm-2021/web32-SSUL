import { GroupResponse } from '@types';
import { requests } from './index';

export const getAllGroupList = (): Promise<GroupResponse> => requests.get(`/group`);
