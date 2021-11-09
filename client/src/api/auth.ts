import { requests } from './index';
import { ResponseGithubUserData } from '../types';
export const getSilentRefresh = (): Promise<ResponseGithubUserData> =>
  requests.get(`/auth/silent-refresh`);
export const getAccessToken = (code: string): Promise<ResponseGithubUserData> =>
  requests.get(`/auth/token?code=${code}`);
export const getLogout = (): Promise<null> => requests.get(`/auth/logout`);
