import { IsDate, IsNumber, IsString } from "class-validator";

export class GroupApplyResponse {
  @IsString()
  name: string | null;
  @IsString()
  avatarUrl: string | null;
  @IsNumber()
  feverStack: number | null;
  @IsDate()
  createdAt: Date | null;
}