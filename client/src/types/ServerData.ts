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

export interface UpdateIntroRequest {
  id: number;
  intro: string;
}

export interface UpdateTechStackRequest {
  id: number;
  techStacks: string[];
}

export interface GroupActivity{
  name: string;
  startAt: string;
  endAt: string;
}

export interface MentorInfoResponse {
  isMentor: boolean;
  mentorId: number;
}

export interface RegisterMentorRequest {
  userId: number;
  techStacks: string[];
}

export type RequestBody = ExampleInterface | GroupCreateInterface | null;
