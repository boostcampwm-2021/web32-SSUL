import { CategoryData, OwnerInfo } from '@types';

export enum GroupState {
  READY = 'READY',
  DOING = 'DOING',
  END = 'END',
}

export enum ApplyState {
  PENDING = 'PENDING',
  DECLINED = 'DECLINED',
  ACCEPTED = 'ACCEPTED',
}

export enum GroupEnrollmentState {
  MENTOR = 'MENTOR',
  MENTEE = 'MENTEE',
  OWNER = 'OWNER',
}

export interface Group {
  id: number;
  mentorId: number;
  ownerId: number;
  name: string | null;
  maxUserCnt: number | null;
  curUserCnt: number | null;
  intro: string | null;
  startAt: Date | null;
  endAt: Date | null;
  categoryId: number | null;
  status: GroupState;
  category: CategoryData;
  ownerInfo: OwnerInfo;
  techStacks: string[];
}

export interface GroupCardDetail {
  id: number;
  name: string | null;
  maxUserCnt: number | null;
  curUserCnt: number | null;
  intro: string | null;
  startAt: Date | null;
  endAt: Date | null;
  techStacks: string[];
  category: CategoryData;
  ownerInfo: OwnerInfo;
}

export interface GroupDetail {
  id: number;
  mentorId?: number;
  ownerId: number;
  categoryId: number;
  name: string;
  maxUserCnt: number;
  curUserCnt: number;
  intro: string;
  startAt: Date | null;
  endAt: Date | null;
  status: string;
}

export interface GroupResponse {
  groups: Group[];
  totalPages: number;
}

export interface GroupUsingTechStack {
  techStackId: number;
  name: string;
}

export interface GroupEnrollment {
  userId: number;
  githubId: string;
  name: string;
  avatarUrl: string;
  type: string;
}

export interface SimpleGroupCardData {
  id: number;
  name: string;
  maxUserCnt: number;
  curUserCnt: number;
  status: string;
  ownerInfo: {
    avatarUrl: string;
  };
}
