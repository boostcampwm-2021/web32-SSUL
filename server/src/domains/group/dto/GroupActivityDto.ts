import { IsDate, IsDateString, IsString } from 'class-validator';

export class GroupActivityDto {
  @IsString()
  name: string;
  @IsDateString()
  startAt: string;
  @IsDateString()
  endAt: string;
}
