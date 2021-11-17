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
  techStackList: string[];
  ownerFeverStack: number;
  ownerName: string;
  ownerAvatarUrl: string;
}

export interface GroupResponse {
  groups: Group[];
  totalPages: number;
}
