export enum GroupState {
  READY = 'READY',
  DOING = 'DOING',
  END = 'END',
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
  status: GroupState;
  techStacks: string[];
  ownerFeverStack: number;
  ownerName: string;
  ownerAvatarUrl: string;
}

export interface GroupResponse {
  groups: Group[];
  totalPages: number;
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
