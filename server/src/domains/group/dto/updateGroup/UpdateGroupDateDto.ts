import { IsDateString, IsNumber } from "class-validator";

export class UpdateGroupDateDto {
  @IsNumber()
  gid: number;
  @IsDateString()
  startAt: string;
  @IsDateString()
  endAt: string;
}