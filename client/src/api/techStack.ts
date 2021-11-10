import { requests } from './index';
import { TechStack } from '@types';

export const getTechStackList = (): Promise<TechStack[]> => requests.get(`/techstack`);
