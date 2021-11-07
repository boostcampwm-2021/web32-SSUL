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
  githubId: string;
  name: string;
  avatarUrl: string;
}

export type RequestBody = ExampleInterface | GroupCreateInterface;
