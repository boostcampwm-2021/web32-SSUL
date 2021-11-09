export enum GroupState {
  READY = 'READY',
  DOING = 'DOING',
  END = 'END',
}

export interface Group {
  id: number;
  mentorId: number;
  ownerId: number;
  name?: string;
  maxUserCnt?: number;
  curUserCnt?: number;
  intro?: string;
  startAt?: Date;
  endAt?: Date;
  status: GroupState;
}
