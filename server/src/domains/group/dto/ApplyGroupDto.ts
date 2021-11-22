import { IsNumber, IsString } from 'class-validator';

export class ApplyGroupDto {
  @IsNumber()
  groupId: number;
  @IsNumber()
  userId: number;
}
