import { MentorUserInfo, OnlyGroupId, TechStack } from '@types';

export interface Mentor {
  id: number;
  techStacks: TechStack[];
  user: MentorUserInfo;
}

export interface MentoringRequest {
  id: number;
  groupId: number;
  groupName: string;
  categoryImage: string;
  ownerName: string;
  createdAt: string;
}

export interface SimpleMentoringRequest {
  id: number;
  group: OnlyGroupId;
  mentor: OnlyMentorId;
}

export interface RegisterMentorDto {
  userId: number;
  techStacks: TechStack[];
}
export interface MentoringAcceptRequestDto {
  id: number;
  userId: number;
  groupId: number;
}

export interface MentorListResponse {
  mentors: Mentor[];
  totalPages: number;
}

export interface MentorInfoResponse {
  mentorId: number;
}

export interface MentoringRequestResponse {
  id: number;
  groupId: number;
  groupName: string;
  categoryImage: string;
  ownerName: string;
  createdAt: string;
}

export interface SimpleMentoringRequestResponse {
  id: number;
  group: OnlyGroupId;
  mentor: OnlyMentorId;
}

export interface OnlyMentorId {
  id: number;
}

export interface MentoringRequestPostData {
  mentorId: number;
  groupId: number;
}
