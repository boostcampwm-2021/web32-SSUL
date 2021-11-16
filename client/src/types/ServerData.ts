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

export interface updateTechStackRequest {
  id: number;
  techStacks: string[];
}

export type RequestBody = ExampleInterface | GroupCreateInterface | null;
