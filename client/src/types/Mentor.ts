import { MentorUserInfo, OnlyGroupId, TechStack } from '@types';

export interface MentorListResponse {
  mentors: Mentor[];
  totalPages: number;
}

export interface Mentor {
  id: number;
  techStacks: TechStack[];
  user: MentorUserInfo;
}

export interface OnlyMentorId {
  id: number;
}

export interface MentoringRequest {
  id: number;
  group: OnlyGroupId;
  mentor: OnlyMentorId;
}
