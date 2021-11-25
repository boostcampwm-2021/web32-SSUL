import { MentorUserInfo, TechStack } from '@types';

export interface MentorListResponse {
  mentors: Mentor[];
  totalPages: number;
}

export interface Mentor {
  id: number;
  techStacks: TechStack[];
  user: MentorUserInfo;
}
