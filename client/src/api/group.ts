import { GroupCreateInterface } from '../types/ServerData';
import { requests } from './index';

export const postGroupCreate = <T>(groupData: GroupCreateInterface): Promise<T> =>
  requests.post('/group/create', groupData);
