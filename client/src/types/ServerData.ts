export interface ExampleInterface {
  somethingToRequestKey: number;
}

export type RequestBody = ExampleInterface;

export interface ResponseGithubUserData {
  githubId: string;
  githubName: string;
  avatarUrl: string;
}
