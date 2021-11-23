import { IsDateString, IsNumber, IsString } from "class-validator";

export class UpdateGroupNameDto {
  @IsNumber()
  gid: number;
  @IsString()
  name: string;
}

export class UpdateGroupDateDto {
  @IsNumber()
  gid: number;
  @IsDateString()
  startAt: string;
  @IsDateString()
  endAt: string;
}

export class UpdateGroupIntroDto {
  @IsNumber()
  gid: number;
  @IsString()
  intro: string;
}