import { GroupEnrollment, GroupUsingTechStack, TechStack } from '@types';

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
  categoryId: number;
  techStacks: TechStack[];
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
  techStacks: TechStack[];
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
  techStacks: TechStack[];
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

export interface GroupApplyData {
  groupId: number;
  userId?: number;
}

export type RequestBody = ExampleInterface | GroupCreateInterface | null;

export interface GroupPostDto {
  id: number;
  groupId: number;
  userId: number;
  title: string;
  content: string;
  createdAt: Date | null;
  type: string;
  hit: number;
}

export interface GroupPostRequestDto {
  id?: number;
  groupId: number;
  title: string;
  content: string;
  type: string;
}

export interface SimpleGroupInfoResponse {
  name: string;
  intro: string;
  startAt: string;
  endAt: string;
}

export interface UpdateGroupNameData {
  gid: number;
  name: string;
}

export interface UpdateGroupDateData {
  gid: number;
  startAt: string;
  endAt: string;
}

export interface UpdateGroupIntroData {
  gid: number;
  intro: string;
}

export interface ParticipationRequest {
  id: number;
  name: string;
  githubId: string;
  avatarUrl: string;
  feverStack: number;
  createdAt: Date;
}

export interface NotificationData {
  id: number;
  senderId: number;
  recieverId: number;
  groupId: number;
  type: string;
  createdAt: string;
  readChk: number;
  senderName: string;
  groupName: string;
}
