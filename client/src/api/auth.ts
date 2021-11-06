import { requests } from './index';
import { ResponseGithubUserData } from '../types';
export const getAccessToken = (code: string): Promise<ResponseGithubUserData> =>
  requests.get(`/auth/token?code=${code}`);
