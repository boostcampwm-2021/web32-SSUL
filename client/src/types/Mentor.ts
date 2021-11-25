import { MentorUserInfo, TechStack } from '@types';

export interface Mentor {
  id: number;
  techStacks: TechStack[];
  user: MentorUserInfo;
}
