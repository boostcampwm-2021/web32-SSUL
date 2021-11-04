import { requests } from './index';
export const getAccessToken = <T>(code: string): Promise<T> =>
  requests.get(`/auth/token?code=${code}`);
