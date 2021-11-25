import { MentorUserInfo, TechStack } from '@types';

export interface MentorListResponse {
  mentors: Mentor[];
  pages: number;
}

export interface Mentor {
  id: number;
  techStacks: TechStack[];
  user: MentorUserInfo;
}
