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
