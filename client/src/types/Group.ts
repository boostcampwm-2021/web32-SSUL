import { GroupState } from '@constants/enums';
import { Category, CategoryData, OwnerInfo, TechStack } from '@types';

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
  techStacks: TechStack[];
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

export interface GroupCardDetail {
  id: number;
  name: string | null;
  maxUserCnt: number | null;
  curUserCnt: number | null;
  intro: string | null;
  startAt: Date | null;
  endAt: Date | null;
  techStacks: TechStack[];
  category: CategoryData;
  ownerInfo: OwnerInfo;
}

export interface SimpleGroupCard {
  id: number;
  name: string;
  maxUserCnt: number;
  curUserCnt: number;
  status: string;
  ownerInfo: {
    avatarUrl: string;
  };
}

export interface GroupActivity {
  name: string;
  startAt: string;
  endAt: string;
}

export interface OwnGroup {
  id: number;
  name: string;
  intro: string;
  mentorId: number | null;
  startAt: Date | null;
  endAt: Date | null;
  category: Category;
}

export interface GroupCreateDto {
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

export interface GroupApplyDto {
  groupId: number;
  userId?: number;
}

export interface GroupResponse {
  groups: Group[];
  totalPages: number;
}

export interface GroupDetailResponse extends GroupDetail {
  usingTechStacks: GroupUsingTechStack[];
  groupEnrollments: GroupEnrollment[];
}

export interface GroupActivityResponse {
  name: string;
  startAt: string;
  endAt: string;
}

export interface OwnGroupResponse {
  id: number;
  name: string;
  intro: string;
  mentorId: number | null;
  startAt: Date | null;
  endAt: Date | null;
  category: Category;
}

export interface GroupRoleResponse {
  type?: string;
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

export interface SimpleGroupCardResponse {
  id: number;
  name: string;
  maxUserCnt: number;
  curUserCnt: number;
  status: string;
  ownerInfo: {
    avatarUrl: string;
  };
}

export interface SimpleGroupInfoResponse {
  name: string;
  intro: string;
  startAt: string;
  endAt: string;
}

export interface OnlyGroupId {
  id: number;
}
