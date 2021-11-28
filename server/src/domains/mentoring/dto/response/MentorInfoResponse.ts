import { IsNumber } from 'class-validator';

export class MentorInfoResponse {
  @IsNumber()
  mentorId: number;
}
