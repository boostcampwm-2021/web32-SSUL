export interface CreateGroupDto {
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
