import { IsNumber } from 'class-validator';

export class PostRequestDto {
  @IsNumber()
  mentorId: number;
  @IsNumber()
  groupId: number;
}
