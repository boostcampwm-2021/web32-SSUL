export interface Post {
  id: number;
  groupId: number;
  userId: number;
  writer: string;
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

export interface GroupPostResponse {
  id: number;
  groupId: number;
  userId: number;
  title: string;
  content: string;
  createdAt: Date | null;
  type: string;
  hit: number;
}
