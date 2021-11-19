import { IsNumber } from 'class-validator';

export class MentorInfoDto {
  @IsNumber()
  mentorId: number;
}
