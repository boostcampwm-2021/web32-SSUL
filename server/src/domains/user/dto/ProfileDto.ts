import { User } from '../models/User';
export interface ProfileDto {
  userId: User;
  feverStack: number;
  shareStack: number;
  introduction: string;
}
