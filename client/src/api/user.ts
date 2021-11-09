import { requests } from './index';

export const patchRole = (): Promise<null> => requests.patch(`/user/role`, null);
