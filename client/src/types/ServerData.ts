import { GroupEnrollment, GroupUsingTechStack } from '@types';

export interface ExampleInterface {
  somethingToRequestKey: number;
}

export interface GroupCreateInterface {
  ownerId: number;
  name: string;
  maxUserCnt: number;
  curUserCnt: number;
  intro: string;
  startAt: string;
  endAt: string;
  category: string;
  usingTechStacks: string[];
}

export interface ResponseGithubUserData {
  id: number;
  githubId: string;
  name: string;
  avatarUrl: string;
  feverStack: number;
  shareStack: number;
}
export interface ResponseUserData {
  id: number;
  githubId: string;
  name: string;
  avatarUrl: string;
  feverStack: number;
  shareStack: number;
  role: string;
}

export interface UpdateIntroData {
  id: number;
  intro: string;
}

export interface UpdateTechStackData {
  id: number;
  techStacks: string[];
}

export interface GroupActivity {
  name: string;
  startAt: string;
  endAt: string;
}

export interface MentorInfo {
  mentorId: number;
}

export interface RegisterMentorData {
  userId: number;
  techStacks: string[];
}

export interface MentoringRequestData {
  id: number;
  groupId: number;
  groupName: string;
  categoryImage: string;
  ownerName: string;
  createdAt: string;
}

export interface AcceptRequestInfo {
  id: number;
  userId: number;
  groupId: number;
}

export interface GroupDetailData {
  id: number;
  mentorId: number;
  ownerId: number;
  name: string;
  maxUserCnt: number;
  curUserCnt: number;
  intro: string;
  startAt: string;
  endAt: string;
  status: string;
  usingTechStacks: GroupUsingTechStack[];
  groupEnrollments: GroupEnrollment[];
}
