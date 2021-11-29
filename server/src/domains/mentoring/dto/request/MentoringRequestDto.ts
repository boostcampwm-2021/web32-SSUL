import { IsNumber } from 'class-validator';

export class MentoringRequestDto {
  @IsNumber()
  mentorId: number;
  @IsNumber()
  groupId: number;
}
