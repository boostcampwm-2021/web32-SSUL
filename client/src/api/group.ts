import { GroupCreateInterface } from '@types';
import { requests } from './index';

export const postGroupCreate = <T>(groupData: GroupCreateInterface): Promise<T> =>
  requests.post('/group/create', groupData);
