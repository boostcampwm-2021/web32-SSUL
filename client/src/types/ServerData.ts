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
export type RequestBody = ExampleInterface | GroupCreateInterface | null;

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

export type RequestBody = ExampleInterface | GroupCreateInterface;
