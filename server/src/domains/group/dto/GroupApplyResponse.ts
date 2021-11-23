import { IsDate, IsNumber, IsString } from "class-validator";

export class GroupApplyResponse {
  @IsNumber()
  id: number | null;
  @IsString()
  name: string | null;
  @IsString()
  avatarUrl: string | null;
  @IsNumber()
  feverStack: number | null;
  @IsDate()
  createdAt: Date | null;
}