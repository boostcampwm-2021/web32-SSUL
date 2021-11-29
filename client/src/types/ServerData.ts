import { NotificationTypeEnum } from '@constants/enums';
import { TechStack } from '@types';

export interface UpdateTechStackData {
  id: number;
  techStacks: TechStack[];
}

export interface MentorInfo {
  mentorId: number;
}

export interface RegisterMentorData {
  userId: number;
  techStacks: TechStack[];
}

export interface MentoringRequestData {
  id: number;
  groupId: number;
  groupName: string;
  categoryImage: string;
  ownerName: string;
  createdAt: string;
}

export interface AcceptRequestInfo {
  id: number;
  userId: number;
  groupId: number;
}

export interface GroupPostDto {
  id: number;
  groupId: number;
  userId: number;
  title: string;
  content: string;
  createdAt: Date | null;
  type: string;
  hit: number;
}

export interface GroupPostRequestDto {
  id?: number;
  groupId: number;
  title: string;
  content: string;
  type: string;
}

export interface NotificationData {
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
