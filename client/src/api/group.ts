import { requests } from './index';

export const getAllGroupList = (): Promise<any> => requests.get(`/group`);
