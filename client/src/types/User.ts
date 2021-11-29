export interface OwnerInfo {
  githubId: string;
  name: string;
  avatarUrl: string;
  feverStack: number;
}

export interface MentorUserInfo {
  id: number;
  githubId: string;
  name: string;
  avatarUrl: string;
  shareStack: number;
  intro: string | null;
  createdAt: Date | null;
}

export interface IntroUpdateDto {
  id: number;
  intro: string;
}

export interface GithubUserResponse {
  id: number;
  githubId: string;
  name: string;
  avatarUrl: string;
  feverStack: number;
  shareStack: number;
}

export interface AuthedUserResponse extends GithubUserResponse {
  role: string;
}
