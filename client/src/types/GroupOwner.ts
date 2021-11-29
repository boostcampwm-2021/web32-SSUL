export interface Participation {
  id: number;
  name: string;
  githubId: string;
  avatarUrl: string;
  feverStack: number;
  createdAt: Date;
}
export interface ParticipationDto {
  id: number;
  name: string;
  githubId: string;
  avatarUrl: string;
  feverStack: number;
  createdAt: Date;
}

export interface GroupNameUpdateDto {
  gid: number;
  name: string;
}

export interface GroupDateUpdateDto {
  gid: number;
  startAt: string;
  endAt: string;
}

export interface GroupIntroUpdateDto {
  gid: number;
  intro: string;
}
