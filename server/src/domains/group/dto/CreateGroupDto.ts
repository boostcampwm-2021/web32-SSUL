import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsNumber()
  ownerId: number;
  @IsString()
  name: string;
  @IsNumber()
  maxUserCnt: number;
  @IsNumber()
  curUserCnt: number;
  @IsString()
  intro: string;
  @IsDate()
  startAt: string;
  @IsDate()
  endAt: string;
  @IsString()
  category: string;
  @IsArray()
  usingTechStacks: string[];
}
