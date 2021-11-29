import { NotificationTypeEnum } from '@constants/enums';

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

export interface Notification {
  id: number;
  senderId: number;
  recieverId: number;
  groupId: number;
  type: NotificationTypeEnum;
  createdAt: string;
  readChk: boolean;
  senderName: string;
  groupName: string;
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

export interface NotificationResponse {
  id: number;
  senderId: number;
  recieverId: number;
  groupId: number;
  type: NotificationTypeEnum;
  createdAt: string;
  readChk: boolean;
  senderName: string;
  groupName: string;
}
